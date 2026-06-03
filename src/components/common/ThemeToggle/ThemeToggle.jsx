import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={styles.toggle} onClick={toggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
      <div className={`${styles.iconWrap} ${theme === 'dark' ? styles.dark : styles.light}`}>
        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
      </div>
    </button>
  );
}
