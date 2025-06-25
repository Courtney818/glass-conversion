import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TikTokTokenResponse {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface TikTokUserResponse {
  data: {
    user: {
      open_id: string;
      union_id: string;
      avatar_url: string;
      avatar_url_100: string;
      avatar_large_url: string;
      display_name: string;
    }
  };
  error: {
    code: string;
    message: string;
    log_id: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { code } = await req.json()

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Authorization code is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // TikTok OAuth configuration
    const clientKey = Deno.env.get('TIKTOK_CLIENT_KEY')
    const clientSecret = Deno.env.get('TIKTOK_CLIENT_SECRET')
    const redirectUri = Deno.env.get('TIKTOK_REDIRECT_URI')

    if (!clientKey || !clientSecret || !redirectUri) {
      return new Response(
        JSON.stringify({ error: 'TikTok OAuth configuration missing' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://open-api.tiktok.com/oauth/access_token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`TikTok token exchange failed: ${tokenResponse.status}`)
    }

    const tokenData: TikTokTokenResponse = await tokenResponse.json()

    // Get user information
    const userResponse = await fetch(`https://open-api.tiktok.com/user/info/?fields=open_id,union_id,avatar_url,avatar_url_100,avatar_large_url,display_name`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error(`TikTok user info failed: ${userResponse.status}`)
    }

    const userData: TikTokUserResponse = await userResponse.json()

    if (userData.error) {
      throw new Error(`TikTok API error: ${userData.error.message}`)
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store or update user in database
    const { data: user, error: dbError } = await supabase
      .from('users')
      .upsert({
        id: userData.data.user.open_id,
        email: `${userData.data.user.open_id}@tiktok.placeholder`, // TikTok doesn't provide email
        display_name: userData.data.user.display_name,
        avatar_url: userData.data.user.avatar_url,
        tiktok_open_id: userData.data.user.open_id,
        tiktok_union_id: userData.data.user.union_id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store user data')
    }

    // Return user data (without sensitive tokens)
    return new Response(
      JSON.stringify({
        open_id: userData.data.user.open_id,
        display_name: userData.data.user.display_name,
        avatar_url: userData.data.user.avatar_url,
        username: userData.data.user.display_name.toLowerCase().replace(/\s+/g, ''),
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('TikTok auth error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Authentication failed',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})