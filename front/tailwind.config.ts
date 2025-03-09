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
      fontFamily: {
        odor: ['Odor Mean Chey', 'sans-serif'],
        holtwood: ["'Holtwood One SC'", 'serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
