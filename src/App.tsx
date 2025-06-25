import React, { useEffect } from 'react';
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
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  // Check current page
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  const isHelpPage = currentPath === '/help' || currentHash === '#help';
  const isPrivacyPage = currentPath === '/privacy' || currentHash === '#privacy';
  const isTermsPage = currentPath === '/terms' || currentHash === '#terms';
  const isSignUpPage = currentPath === '/signup' || currentHash === '#signup';
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

  if (isHelpPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <Navigation />
        <HelpPage />
      </div>
    );
  }

  if (isPrivacyPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <Navigation />
        <PrivacyPolicy />
      </div>
    );
  }

  if (isTermsPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <Navigation />
        <TermsOfService />
      </div>
    );
  }

  if (isSignUpPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <SignUp />
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <Login />
      </div>
    );
  }

  if (isDashboardPage) {
    return (
      <div className="min-h-screen bg-white font-inter antialiased">
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter antialiased">
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
    </div>
  );
}

export default App;