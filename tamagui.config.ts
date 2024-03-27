import { createFont, createTamagui, createTokens } from 'tamagui';

const interFont = createFont({
  family: 'Inter, Helvetica, Arial, sans-serif',
  size: {
    sm: 16,
    md: 28,
    true: 40,
    lg: 40,
  },
  lineHeight: {
    sm: 24,
    md: 36,
    true: 48,
    lg: 48,
  },
  weight: {
    sm: '300',
    true: '300',
    lg: '600',
  },
  letterSpacing: {
    sm: 0,
    true: 0,
    md: 2,
    lg: 5,
  },
  face: {
    300: { normal: 'InterLight', italic: 'InterItalic' },
    600: { normal: 'InterBold' },
  },
});

// Set up our tokens
const size = {
  sm: 0,
  md: 5,
  true: 5,
  lg: 10,
};

export const tokens = createTokens({
  size,
  space: { ...size },
  radius: { sm: 0, md: 3, lg: 5 },
  zIndex: { sm: 0, md: 100, lg: 200 },
  color: {
    white: '#fff',
    black: '#000',
  },
});

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  tokens,
  themes: {
    light: {
      bg: '#f2f2f2',
      color: tokens.color.black,
    },
    dark: {
      bg: '#111',
      color: tokens.color.white,
    },
  },
});

type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}

  interface TypeOverride {
    groupNames(): 'a' | 'b' | 'c';
  }
}

export default config;
