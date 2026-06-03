import React from 'react';
import { Menu, Bell } from 'lucide-react';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar({ onToggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
      </div>
      <div className={styles.right}>
        <LanguageToggle />
        <ThemeToggle />
        <button className={styles.iconBtn} title="Notificaciones">
          <Bell size={18} />
          <span className={styles.notifDot}></span>
        </button>
        <div className={styles.userPill}>
          <div className={styles.avatar}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
          <span className={styles.userName}>{user?.name || 'Usuario'}</span>
        </div>
      </div>
    </header>
  );
}
