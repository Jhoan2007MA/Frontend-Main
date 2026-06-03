import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar/Sidebar';
import Navbar from '../components/common/Navbar/Navbar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={`${styles.main} ${collapsed ? styles.collapsed : ''}`}>
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
