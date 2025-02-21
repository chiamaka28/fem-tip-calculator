import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       'strong-cyan': 'hsl(172, 67%, 45%)',
       'dark-cyan' : 'hsl(183, 100%, 15%)',
       'dark-grayish-cyan' : 'hsl(186, 14%, 43%)',
       'grayish-cyan' : 'hsl(184, 14%, 56%)',
       'light-grayish-cyan' : 'hsl(184, 14%, 56%)',
       'very-light-grayish-cyan' : 'hsl(189, 41%, 97%)',
       'white' : 'hsl(0, 0%, 100%)'
      },
      fontFamily:  {
        sans: ['var(--font-spaceMono)']
      },
    },
  },
  plugins: [],
} satisfies Config;
