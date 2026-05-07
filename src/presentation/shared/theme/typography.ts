export const typography = {
  family: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  size: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 32,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
  lineHeight: {
    xs: 15,
    sm: 17,
    md: 20,
    lg: 22,
    xl: 28,
    xxl: 45,
  },
} as const;
