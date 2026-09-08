'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export interface ThemeAccentColors {
  accent: string;
  accentSoft: string;
  ambient: string;
}

// Mirrors the purple/pink gradient already used across the site
// (from-purple-700 to-pink-600 light / from-purple-400 to-pink-400 dark)
// and the --background token from globals.css, so the 3D lighting stays
// in sync with the rest of the theme without parsing oklch() at runtime.
const LIGHT: ThemeAccentColors = {
  accent: '#7e22ce',
  accentSoft: '#db2777',
  ambient: '#f4f4f5',
};

const DARK: ThemeAccentColors = {
  accent: '#c084fc',
  accentSoft: '#f472b6',
  ambient: '#270b36',
};

export function useThemeColors(): ThemeAccentColors {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return LIGHT;
  return resolvedTheme === 'dark' ? DARK : LIGHT;
}
