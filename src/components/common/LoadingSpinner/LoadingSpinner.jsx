import React from 'react';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'md', text, fullPage = false }) {
  const content = (
    <div className={styles.wrapper}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
  if (fullPage) return <div className={styles.fullPage}>{content}</div>;
  return content;
}
