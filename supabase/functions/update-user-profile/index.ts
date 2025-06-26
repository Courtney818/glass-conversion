import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface UpdateProfileRequest {
  custom_tiktok_handle?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client with the user's JWT
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { custom_tiktok_handle }: UpdateProfileRequest = await req.json()

    // Validate custom_tiktok_handle if provided
    if (custom_tiktok_handle !== undefined) {
      if (custom_tiktok_handle && typeof custom_tiktok_handle !== 'string') {
        return new Response(
          JSON.stringify({ error: 'custom_tiktok_handle must be a string' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Basic validation for TikTok handle format
      if (custom_tiktok_handle) {
        const cleanHandle = custom_tiktok_handle.startsWith('@') 
          ? custom_tiktok_handle.slice(1) 
          : custom_tiktok_handle;
        
        if (cleanHandle.length < 2 || !/^[a-zA-Z0-9._]+$/.test(cleanHandle)) {
          return new Response(
            JSON.stringify({ 
              error: 'Invalid handle format. Use letters, numbers, dots, and underscores only.' 
            }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Ensure handle starts with @
        const formattedHandle = cleanHandle.startsWith('@') ? cleanHandle : `@${cleanHandle}`;
        
        // Update user profile
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({ 
            custom_tiktok_handle: formattedHandle,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
          .select()
          .single()

        if (updateError) {
          console.error('Database update error:', updateError)
          return new Response(
            JSON.stringify({ error: 'Failed to update profile' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            user: {
              id: updatedUser.id,
              display_name: updatedUser.display_name,
              avatar_url: updatedUser.avatar_url,
              custom_tiktok_handle: updatedUser.custom_tiktok_handle,
            }
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else {
        // Clear custom handle (set to null)
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({ 
            custom_tiktok_handle: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
          .select()
          .single()

        if (updateError) {
          console.error('Database update error:', updateError)
          return new Response(
            JSON.stringify({ error: 'Failed to update profile' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            user: {
              id: updatedUser.id,
              display_name: updatedUser.display_name,
              avatar_url: updatedUser.avatar_url,
              custom_tiktok_handle: updatedUser.custom_tiktok_handle,
            }
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ error: 'No valid fields to update' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Profile update error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})