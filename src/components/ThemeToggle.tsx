'use client';

import { useState, useEffect } from 'react';

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.className = initial;
  }, []);

  const handleSelect = (t: Theme) => {
    setTheme(t);
    document.documentElement.className = t;
    localStorage.setItem('theme', t);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.current} onClick={() => setOpen(!open)}>
        <span>{themes.find(t => t.name === theme)?.icon}</span>
      </div>
      {open && (
        <div className={styles.dropdown}>
          {themes.map(t => (
            <div
              key={t.name}
              className={`${styles.item} ${theme === t.name ? styles.active : ''}`}
              onClick={() => handleSelect(t.name)}
            >
              <span>{t.icon}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
