'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import styles from './ThemeToggle.module.scss';

const themes = [
  { name: 'light', icon: '☀️' },
  { name: 'dark', icon: '🌙' },
  { name: 'blue', icon: '💙' },
  { name: 'green', icon: '🌿' }
] as const;

type Theme = (typeof themes)[number]['name'];

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.className = initial;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Theme;
    setTheme(selected);
    document.documentElement.className = selected;
    localStorage.setItem('theme', selected);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className={styles.themeSelect}
      aria-label="Select theme"
    >
      {themes.map(t => (
        <option key={t.name} value={t.name}>
          {t.icon} {t.name}
        </option>
      ))}
    </select>
  );
};
