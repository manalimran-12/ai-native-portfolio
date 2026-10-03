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
  accent: '#ac5c44',
  accentSoft: '#b7644b',
  ambient: '#f5f4f4',
};

const DARK: ThemeAccentColors = {
  accent: '#deb0a2',
  accentSoft: '#d7a08f',
  ambient: '#2d1a14',
};

export function useThemeColors(): ThemeAccentColors {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return LIGHT;
  return resolvedTheme === 'dark' ? DARK : LIGHT;
}
