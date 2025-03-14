 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, hsl(0, 0%, 0%))",  // Add a fallback
        secondary: "var(--color-secondary, hsl(0, 0%, 50%))",
        bgPrimary: "var(--color-bg-primary, hsl(0, 0%, 100%))",
        tBase: "var(--color-text-base, hsl(0, 0%, 100%))"
      }
    },
    // as tailwind -> internally purge any extra or accidentally added class so we can save them via safelist inside theme object in tailwind  config
    safelist: [
      'bg-black-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500', 'bg-blue-500'
    ]
    
  },
  plugins: [],
}

