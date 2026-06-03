import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Users, Car, ClipboardList, Package, FileText,
  CreditCard, UserCog, Shield, ChevronLeft, ChevronRight, LogOut, Wrench
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Sidebar.module.css';

const ICON_MAP = {
  dashboard: LayoutDashboard,
  clientes: Users,
  vehiculos: Car,
  ordenes: ClipboardList,
  repuestos: Package,
  facturas: FileText,
  pagos: CreditCard,
  usuarios: UserCog,
  auditorias: Shield,
};

const ROLE_MENU = {
  Admin: [
    { key: 'dashboard', path: '/dashboard/admin' },
    { key: 'clientes', path: '/clientes' },
    { key: 'vehiculos', path: '/vehiculos' },
    { key: 'ordenes', path: '/ordenes' },
    { key: 'repuestos', path: '/repuestos' },
    { key: 'facturas', path: '/facturas' },
    { key: 'pagos', path: '/pagos' },
    { key: 'usuarios', path: '/usuarios' },
    { key: 'auditorias', path: '/auditorias' },
  ],
  Recepcionista: [
    { key: 'dashboard', path: '/dashboard/recepcionista' },
    { key: 'clientes', path: '/clientes' },
    { key: 'vehiculos', path: '/vehiculos' },
    { key: 'ordenes', path: '/ordenes' },
    { key: 'facturas', path: '/facturas' },
    { key: 'pagos', path: '/pagos' },
  ],
  'Mecánico': [
    { key: 'dashboard', path: '/dashboard/mecanico' },
    { key: 'ordenes', path: '/ordenes' },
  ],
  JefeTaller: [
    { key: 'dashboard', path: '/dashboard/jefe-taller' },
    { key: 'vehiculos', path: '/vehiculos' },
    { key: 'ordenes', path: '/ordenes' },
    { key: 'repuestos', path: '/repuestos' },
  ],
  JefeAlmacen: [
    { key: 'dashboard', path: '/dashboard/jefe-almacen' },
    { key: 'repuestos', path: '/repuestos' },
  ],
  JefeBodega: [
    { key: 'dashboard', path: '/dashboard/jefe-bodega' },
    { key: 'repuestos', path: '/repuestos' },
  ],
  Cliente: [
    { key: 'dashboard', path: '/dashboard/cliente' },
    { key: 'ordenes', path: '/ordenes' },
    { key: 'facturas', path: '/facturas' },
    { key: 'pagos', path: '/pagos' },
  ],
};

export default function Sidebar({ collapsed, onToggle }) {
  const { t } = useTranslation();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = ROLE_MENU[role] || ROLE_MENU.Cliente;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Wrench size={22} /></div>
          {!collapsed && (
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>AutoTaller</span>
              <span className={styles.logoSub}>Manager</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = ICON_MAP[item.key] || LayoutDashboard;
            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                title={collapsed ? t(`sidebar.${item.key}`) : ''}
              >
                <Icon size={20} className={styles.navIcon} />
                {!collapsed && <span className={styles.navLabel}>{t(`sidebar.${item.key}`)}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className={styles.bottom}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {!collapsed && (
              <div className={styles.userText}>
                <span className={styles.userName}>{user?.name || 'Usuario'}</span>
                <span className={styles.userRole}>{t(`usuarios.roles.${role}`) || role}</span>
              </div>
            )}
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title={t('auth.logout')}>
            <LogOut size={18} />
            {!collapsed && <span>{t('auth.logout')}</span>}
          </button>
        </div>

        {/* Toggle */}
        <button className={styles.toggle} onClick={onToggle}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
}
