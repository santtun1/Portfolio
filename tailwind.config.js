/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { display: ['Space Grotesk', 'sans-serif'], sans: ['Inter', 'sans-serif'] },
      colors: { ink: '#050712', violet: '#7c3aed', cyan: '#22d3ee' },
      boxShadow: { glow: '0 0 45px rgba(124,58,237,.24)' }
    }
  },
  plugins: []
}
