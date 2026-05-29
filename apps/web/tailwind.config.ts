import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(124, 58, 237, 0.25)',
        card: '0 10px 30px rgba(2,6,23,0.6)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(.98)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 0 rgba(124,58,237,0.12)' },
          '50%': { boxShadow: '0 0 30px rgba(124,58,237,0.18)' },
          '100%': { boxShadow: '0 0 0 rgba(124,58,237,0.12)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        pop: 'pop .45s cubic-bezier(.2,.9,.3,1) both',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
