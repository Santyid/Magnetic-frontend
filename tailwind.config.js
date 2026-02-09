/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue (from Color palette SVG)
        primary: {
          50: '#E6EFFF',
          100: '#B0CEFF',
          200: '#8AB6FF',
          300: '#5495FE',
          400: '#3381FE',
          500: '#0061FE',
          600: '#0058E7',
          700: '#0045B4',
          800: '#00358C',
          900: '#00296B',
        },
        // Secondary Purple (from Color palette SVG)
        secondary: {
          50: '#F5EEFC',
          100: '#E1CAF6',
          200: '#D2B0F2',
          300: '#BE8CEC',
          400: '#B176E8',
          500: '#9E54E2',
          600: '#904CCE',
          700: '#703CA0',
          800: '#572E7C',
          900: '#42235F',
        },
        // Greyscale (from Color palette SVG)
        grey: {
          50: '#ECECEC',
          100: '#C3C3C3',
          200: '#A6A6A6',
          300: '#7D7D7D',
          400: '#646464',
          500: '#3D3D3D',
          600: '#383838',
          700: '#2B2B2B',
          800: '#222222',
          900: '#1A1A1A',
        },
        // Success Green (from Color palette SVG)
        success: {
          50: '#EBFAF1',
          100: '#AEEBC7',
          200: '#8DE3B0',
          300: '#5BD68D',
          400: '#3ACE76',
          500: '#299053',
          600: '#237E48',
          DEFAULT: '#3ACE76',
        },
        // Error Red (from Color palette SVG)
        error: {
          50: '#FFECEC',
          100: '#FEB0B0',
          200: '#FD8F8F',
          300: '#FD5F5F',
          400: '#FC3E3E',
          500: '#B02B2B',
          600: '#9A2626',
          DEFAULT: '#FC3E3E',
        },
        // Warning Orange (from Color palette SVG)
        warning: {
          50: '#FFF5EA',
          100: '#FFD4A8',
          200: '#FFC285',
          300: '#FFA850',
          400: '#FF962C',
          500: '#B3691F',
          600: '#9C5C1B',
          DEFAULT: '#FF962C',
        },
        // Danger (alias for backwards compat)
        danger: {
          500: '#EE4A79',
          600: '#D9436E',
        },
        // Whites / Backgrounds
        'white-50': '#FAFAFA',
        'white-100': '#F5F7FA',
        'white-200': '#F1F1F1',
        // Legacy aliases
        'white-600': '#FAFAFA',
        'white-700': '#F1F1F1',
        'success-bg': '#EBFAF1',
        // Info blue backgrounds (from Buttons SVG)
        info: {
          50: '#E5F6FF',
          100: '#C9EDFF',
        },
        // Selectable colors
        selectable: {
          red: '#F61A4A',
          orange: '#FF7D4A',
          yellow: '#F9CE16',
          green: '#3ECC80',
          blue: '#528BFE',
          purple: '#9ABABF',
          pink: '#F572C5',
          grey: '#9EA1A6',
          turquoise: '#BCFFFF',
        },
      },
      borderRadius: {
        'xs': '2.5px',
        'sm': '5px',
        'ds': '12px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'pill': '14px',
        'input': '10px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        urbanist: ['Urbanist', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'ds-xs': ['12px', { lineHeight: '16px' }],
        'ds-sm': ['13px', { lineHeight: '18px' }],
        'ds-base': ['14px', { lineHeight: '20px' }],
        'ds-md': ['15px', { lineHeight: '22px' }],
        'ds-lg': ['16px', { lineHeight: '24px' }],
        'ds-xl': ['18px', { lineHeight: '26px' }],
        'ds-2xl': ['20px', { lineHeight: '28px' }],
        'ds-3xl': ['24px', { lineHeight: '32px' }],
      },
      spacing: {
        'ds-1': '4px',
        'ds-2': '8px',
        'ds-3': '12px',
        'ds-4': '16px',
        'ds-5': '20px',
        'ds-6': '24px',
        'ds-8': '32px',
        'ds-10': '40px',
        'ds-12': '48px',
      },
      boxShadow: {
        'ds-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'ds-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'ds-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'ds-modal': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
