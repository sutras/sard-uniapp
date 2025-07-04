import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/components/**/*.vue', './src/pages/**/*.vue'],
    extract: {
      vue: (content) => content.match(/[^<>"'`\s!:]*/g),
    },
  },

  corePlugins: {
    preflight: false,
    container: false,
    float: false,
    clear: false,
    listStyleType: false,
    listStyleImage: false,
    listStylePosition: false,
  },

  theme: {
    spacing: {
      0: '0px',
      px: '1px',
      ...Array(750)
        .fill(0)
        .reduce((pair, _, i) => {
          const n = i + 1
          if (n % 2 === 0) {
            pair[n] = n + 'rpx'
          }
          return pair
        }, {}),
    },
    colors: {
      primary: 'var(--sar-primary)',
      secondary: 'var(--sar-secondary)',
      success: 'var(--sar-success)',
      info: 'var(--sar-info)',
      warning: 'var(--sar-warning)',
      danger: 'var(--sar-danger)',
    },
    borderRadius: {
      none: 0,
      xs: 'var(--sar-rounded-xs)',
      sm: 'var(--sar-rounded-sm)',
      DEFAULT: 'var(--sar-rounded)',
      lg: 'var(--sar-rounded-lg)',
      xl: 'var(--sar-rounded-xl)',
      full: 'var(--sar-rounded-full)',
    },
    borderColor: {
      current: 'currentColor',
      transparent: 'transparent',
      inherit: 'inherit',
      white: 'white',
      black: 'black',
      base: 'var(--sar-border-color)',
    },
    fontSize: {
      xs: 'var(--sar-text-xs)',
      sm: 'var(--sar-text-sm)',
      base: 'var(--sar-text-base)',
      lg: 'var(--sar-text-lg)',
      xl: 'var(--sar-text-xl)',
      '2xl': 'var(--sar-text-2xl)',
    },
    fontWeight: {
      bold: 'var(--sar-font-bold)',
      normal: 'var(--sar-font-normal)',
      light: 'var(--sar-font-light)',
    },
    lineHeight: {
      none: 'var(--sar-leading-none)',
      tight: 'var(--sar-leading-tight)',
      snug: 'var(--sar-leading-snug)',
      normal: 'var(--sar-leading-normal)',
      relaxed: 'var(--sar-leading-relaxed)',
      loose: 'var(--sar-leading-loose)',
    },
    fontFamily: {
      sans: 'var(--sar-font-sans)',
      serif: 'var(--sar-font-serif)',
      mono: 'var(--sar-font-mono)',
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.sbg-body': {
          'background-color': 'var(--sar-body-bg)',
        },
        '.sbg-secondary': {
          'background-color': 'var(--sar-secondary-bg)',
        },
        '.sbg-tertiary': {
          'background-color': 'var(--sar-tertiary-bg)',
        },
        '.sbg-fourth': {
          'background-color': 'var(--sar-fourth-bg)',
        },
        '.sbg-emphasis': {
          'background-color': 'var(--sar-emphasis-bg)',
        },
        '.sbg-active': {
          'background-color': 'var(--sar-active-bg)',
        },
        '.sbg-active-deep': {
          'background-color': 'var(--sar-active-deep-bg)',
        },

        '.stext-body': {
          color: 'var(--sar-body-color)',
        },
        '.stext-secondary': {
          color: 'var(--sar-secondary-color)',
        },
        '.stext-tertiary': {
          color: 'var(--sar-tertiary-color)',
        },
        '.stext-fourth': {
          color: 'var(--sar-fourth-color)',
        },
        '.stext-emphasis': {
          color: 'var(--sar-emphasis-color)',
        },
      })
    }),
  ],
  important: true,
}
