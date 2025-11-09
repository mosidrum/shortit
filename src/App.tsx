'use client';

import { Link } from 'lucide-react';
import { useState } from 'react';

import { apiClient } from './api';
import styles from './App.module.scss';
import { Text, ThemeToggle } from './components';

import type { UrlType } from './types';

export const App = () => {
  const [url, setUrl] = useState<UrlType | null>(null);
  const [copied, setCopied] = useState(false);

  (async () => {
    const { data } = await apiClient.get('/urls');
    setUrl(data.data[0]);
  })();

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // reset after 3s
  };

  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link size={20} />
            <Text fontSize="fs-lg" fontWeight="bold">
              SmartUrls
            </Text>
          </div>
          <nav className={styles.nav}>
            <Text fontSize="fs-lg">Sign In</Text>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.hero}>
            <Text fontSize="fs-2xl" fontWeight="bolder" variant="default" className={styles.title}>
              Shorten your <span className={styles.highlight}>URLs,</span> not your time ⏰
            </Text>
            <Text fontSize="fs-base" fontStyle="italic" className={styles.subtitle}>
              Because life’s too short for long links, get sleek, smart URLs in a snap.
            </Text>
          </div>

          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Paste your long URL here..."
                className={styles.urlInput}
              />
              <button type="submit" className={styles.shortenButton}>
                Shorten
              </button>
            </div>
          </form>

          <div className={styles.result}>
            <div className={styles.resultContainer}>
              <span className={styles.resultUrl}>{url?.shortUrl || 'No URLs yet'}</span>
              <button className={styles.copyButton} onClick={handleCopy}>
                {copied ? 'Copied! ✅' : 'Copy 📋'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Text fontSize="fs-base" fontStyle="underline" className={styles.footerText}>
          Isaac Ayodele ©
        </Text>
      </footer>
    </div>
  );
};
