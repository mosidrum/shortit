'use client';

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { apiClient } from './api';
import styles from './App.module.scss';
import { Text, ThemeToggle } from './components';
import { toast } from './utils';

import type { UrlType } from './types';

type formValueType = {
  url: string;
};

const initialValues: formValueType = {
  url: ''
};

const validationSchema = Yup.object({
  url: Yup.string().url('Enter a valid website URL.').required('Website URL is required.')
});

const handleSubmit = async (values: formValueType, { resetForm }: FormikHelpers<formValueType>) => {
  resetForm();
  const { data } = await apiClient.post('/urls', { originalUrl: values.url });
  toast.success(data.message);
};

export const App = () => {
  const [url, setUrl] = useState<UrlType | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await apiClient.get('/urls');
      setUrl(data.data[0]);
    })();
  }, []);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <div className={styles.inputContainer}>
                <Field
                  type="url"
                  id="url"
                  name="url"
                  className={styles.urlInput}
                  placeholder="Paste your long URL here..."
                />
                <ErrorMessage name="url" component="div" className={styles.error} />
                <button type="submit" className={styles.shortenButton}>
                  Shorten
                </button>
              </div>
            </Form>
          </Formik>

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
