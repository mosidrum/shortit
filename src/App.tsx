'use client';

import { Link } from 'lucide-react';

import styles from './App.module.scss';

export const App = () => (
  <div className={styles.landingpage}>
    <header className={styles.header}>
      <div className={styles.headercontent}>
        <div className={styles.logo}>
          <Link size={20} />
          <span className={styles.logotext}>SmartUrls</span>
        </div>
        <nav className={styles.nav}>
          <a href="/dashboard" className={styles.signinlink}>
            Sign in
          </a>
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
          <div className={styles.inputcontainer}>
            <input
              type="text"
              placeholder="Paste your long URL here..."
              className={styles.urlinput}
            />
            <button type="submit" className={styles.shortenbutton}>
              Shorten
            </button>
          </div>
        </form>

        <div className={styles.result}>
          <div className={styles.resultcontainer}>
            <span className={styles.resulturl}>https://short.ly/abc123</span>
            <button className={styles.copybutton}>Copy</button>
          </div>
        </div>
      </div>
    </main>

    <footer className={styles.footer}>
      <p className={styles.footertext}>Isaac Ayodele ©</p>
    </footer>
  </div>
);
