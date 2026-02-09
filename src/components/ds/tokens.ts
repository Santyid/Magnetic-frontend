/**
 * Magnetic Design System - Design Tokens
 * Extracted from SystemDesing/ SVG files (Figma exports)
 * Source of truth for all design tokens used across components
 */

// ─── COLORS ────────────────────────────────────────────────────────────────────

export const colors = {
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
  success: {
    50: '#EBFAF1',
    100: '#AEEBC7',
    200: '#8DE3B0',
    300: '#5BD68D',
    400: '#3ACE76',
    500: '#299053',
    600: '#237E48',
  },
  error: {
    50: '#FFECEC',
    100: '#FEB0B0',
    200: '#FD8F8F',
    300: '#FD5F5F',
    400: '#FC3E3E',
    500: '#B02B2B',
    600: '#9A2626',
  },
  warning: {
    50: '#FFF5EA',
    100: '#FFD4A8',
    200: '#FFC285',
    300: '#FFA850',
    400: '#FF962C',
    500: '#B3691F',
    600: '#9C5C1B',
  },
  white: {
    50: '#FAFAFA',
    100: '#F5F7FA',
    200: '#F1F1F1',
  },
  info: {
    50: '#E5F6FF',
    100: '#C9EDFF',
  },
} as const;

// ─── SIZING ────────────────────────────────────────────────────────────────────

export const sizes = {
  button: {
    lg: { height: 48, minWidth: 196, px: 24, fontSize: 15 },
    md: { height: 40, minWidth: 182, px: 20, fontSize: 14 },
    sm: { height: 36, minWidth: 164, px: 16, fontSize: 13 },
  },
  iconButton: {
    lg: { size: 48 },
    md: { size: 40 },
    sm: { size: 36 },
  },
  input: {
    lg: { height: 48, fontSize: 15 },
    md: { height: 40, fontSize: 14 },
    sm: { height: 36, fontSize: 13 },
  },
  avatar: {
    xs: { size: 17, radius: 8.5 },
    sm: { size: 28, radius: 10 },
    md: { size: 36, radius: 12 },
    lg: { size: 49, radius: 24.5 },
  },
  chip: {
    md: { height: 28, px: 12, fontSize: 13 },
    sm: { height: 24, px: 10, fontSize: 12 },
  },
  tab: {
    lg: { containerHeight: 48, itemHeight: 34 },
    md: { containerHeight: 40, itemHeight: 32 },
    sm: { containerHeight: 36, itemHeight: 28 },
  },
  modal: {
    lg: { width: 699, minHeight: 412 },
    md: { width: 699, minHeight: 356 },
    sm: { width: 699, minHeight: 300 },
  },
  status: {
    dot: 10,
  },
} as const;

// ─── BORDER RADIUS ─────────────────────────────────────────────────────────────

export const radii = {
  xs: '2.5px',
  sm: '5px',
  md: '8px',
  input: '10px',
  lg: '12px',
  pill: '14px',
  xl: '16px',
  full: '9999px',
} as const;

// ─── STROKE ────────────────────────────────────────────────────────────────────

export const stroke = {
  width: {
    default: 1.66667,
    small: 1.33333,
  },
  linecap: 'round' as const,
  linejoin: 'round' as const,
} as const;

// ─── SHADOWS ───────────────────────────────────────────────────────────────────

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  modal: '0 20px 60px rgba(0, 0, 0, 0.15)',
} as const;

// ─── TRANSITIONS ───────────────────────────────────────────────────────────────

export const transitions = {
  fast: '150ms ease',
  default: '200ms ease',
  slow: '300ms ease',
} as const;

export type DSColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'grey';
export type DSSize = 'sm' | 'md' | 'lg';
