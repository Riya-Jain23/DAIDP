export const Colors = {
  PRIMARY: '#1B5E3B',
  ACCENT: '#4CAF7D',
  AMBER: '#F59E0B',
  AMBER_LIGHT: '#FEF3C7',
  BG: '#FDFAF5',
  SURFACE: '#FFFFFF',
  SURFACE_2: '#F3F4F6',
  AI_BUBBLE: '#EAF4EE',
  BORDER: '#E5E7EB',
  ERROR: '#EF4444',
  ERROR_LIGHT: '#FEF2F2',
  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6B7280',
  TEXT_MUTED: '#9CA3AF',
  TEXT_INVERSE: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;
