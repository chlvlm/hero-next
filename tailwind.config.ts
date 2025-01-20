import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom-shadow': '0px 1px 1px rgba(0, 0, 0, .1)',
        'custom-inset': 'inset 0 0 0 1px #e6e6e6',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.ellipsis-2': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          overflow: 'hidden',
        },
        '.ellipsis-3': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          overflow: 'hidden',
        },
        '.no-scrollbar-x': {
          'overflow-x': 'scroll',
          'scroll-behavior': 'smooth',
          'scrollbar-width': 'none', // Firefox
          '-ms-overflow-style': 'none', // IE and Edge
          '&::-webkit-scrollbar': {
            display: 'none', // Safari and Chrome
          },
        },
        '.no-scrollbar-y': {
          'overflow-y': 'scroll',
          'scroll-behavior': 'smooth',
          '.w-calc-width': {
            width: 'calc(100% - 224px)',
          },
        },
      }
      addUtilities(newUtilities, {
        variants: ['responsive', 'hover'],
      } as any)
    }),
  ],
}
export default config
