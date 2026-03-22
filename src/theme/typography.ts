import {Platform} from 'react-native';

export const FontFamily = {
  DISPLAY: Platform.select({
    ios: 'DMSerifDisplay-Regular',
    android: 'DMSerifDisplay-Regular',
    default: 'DMSerifDisplay-Regular',
  }),
  DISPLAY_ITALIC: Platform.select({
    ios: 'DMSerifDisplay-Italic',
    android: 'DMSerifDisplay-Italic',
    default: 'DMSerifDisplay-Italic',
  }),
  BODY_LIGHT: 'DMSans-Light',
  BODY: 'DMSans-Regular',
  BODY_MEDIUM: 'DMSans-Medium',
  BODY_SEMIBOLD: 'DMSans-SemiBold',
  BODY_BOLD: 'DMSans-Bold',
  MONO: Platform.select({
    ios: 'DMMono-Regular',
    android: 'DMMono-Regular',
    default: 'DMMono-Regular',
  }),
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 22,
  '4xl': 26,
  '5xl': 30,
  '6xl': 36,
} as const;

export const FontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;
