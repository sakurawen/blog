import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        spotlight: 'var(--spotlight)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // eslint-disable-next-line ts/no-require-imports
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar'), require('tailwindcss-animate'), require('tailwindcss-animated')],
};

export default config;
