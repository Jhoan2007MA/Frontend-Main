import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button className={styles.toggle} onClick={toggleLanguage} title="Cambiar idioma">
      <span className={`${styles.option} ${language === 'es' ? styles.active : ''}`}>ES</span>
      <span className={styles.divider}>/</span>
      <span className={`${styles.option} ${language === 'en' ? styles.active : ''}`}>EN</span>
    </button>
  );
}
