/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#F8F9FA',
        accent: '#FF3B5C',
      },
      spacing: {
        '60': '15rem', // 240px for 60px equivalent vertical spacing
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      screens: {
        'xs': '320px',
        'sm': '768px',
        'lg': '1200px',
      },
    },
  },
  plugins: [],
};