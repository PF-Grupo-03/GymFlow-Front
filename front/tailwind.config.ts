import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#F5F5F5',
        tertiary: '#FF7700',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        whiteShadow:
          '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        orangeShadow:
          'rgba(255, 119, 0, 0.4) 5px 5px, rgba(255, 119, 0, 0.3) 10px 10px, rgba(255, 119, 0, 0.2) 15px 15px',
      },
      fontFamily: {
        odor: ['Odor Mean Chey', 'sans-serif'],
        holtwood: ["'Holtwood One SC'", 'serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
