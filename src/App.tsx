'use client';

import { Link } from 'lucide-react';

import styles from './App.module.scss';
import { ThemeToggle } from './components';

export const App = () => (
  <div className={styles.landingPage}>
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link size={20} />
          <span className={styles.logoText}>SmartUrls</span>
        </div>
        <nav className={styles.nav}>
          <a href="/dashboard" className={styles.signinLink}>
            Sign in
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>

    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Shorten your <span className={styles.highlight}>URLs,</span> not your time ⏰
          </h1>
          <p className={styles.subtitle}>
            Because life’s too short for long links, get sleek, smart URLs in a snap.
          </p>
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
            <span className={styles.resultUrl}>https://short.ly/abc123</span>
            <button className={styles.copyButton}>Copy</button>
          </div>
        </div>
      </div>
    </main>

    <footer className={styles.footer}>
      <p className={styles.footerText}>Isaac Ayodele ©</p>
    </footer>
  </div>
);
