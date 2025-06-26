import React, { useEffect } from 'react';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhyNoUsernames from './components/WhyNoUsernames';
import AnalyticsPreview from './components/AnalyticsPreview';
import Pricing from './components/Pricing';
import TrustIndicators from './components/TrustIndicators';
import Footer from './components/Footer';
import HelpPage from './components/HelpPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import LoginWithTikTok from './components/LoginWithTikTok';
import Dashboard from './components/Dashboard';
import DashboardLayout from './components/DashboardLayout';

function App() {
  // Check current page
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  const isHelpPage = currentPath === '/help' || currentHash === '#help';
  const isPrivacyPage = currentPath === '/privacy' || currentHash === '#privacy';
  const isTermsPage = currentPath === '/terms' || currentHash === '#terms';
  const isLoginPage = currentPath === '/login' || currentHash === '#login';
  const isDashboardPage = currentPath === '/dashboard' || currentHash === '#dashboard';

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white font-inter antialiased">
        {isHelpPage && (
          <>
            <Navigation />
            <HelpPage />
          </>
        )}

        {isPrivacyPage && (
          <>
            <Navigation />
            <PrivacyPolicy />
          </>
        )}

        {isTermsPage && (
          <>
            <Navigation />
            <TermsOfService />
          </>
        )}

        {isLoginPage && <LoginWithTikTok />}

        {isDashboardPage && (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        )}

        {!isHelpPage && !isPrivacyPage && !isTermsPage && !isLoginPage && !isDashboardPage && (
          <>
            <Navigation />
            <main>
              <Hero />
              <Features />
              <HowItWorks />
              <WhyNoUsernames />
              <AnalyticsPreview />
              <Pricing />
              <TrustIndicators />
            </main>
            <Footer />
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;