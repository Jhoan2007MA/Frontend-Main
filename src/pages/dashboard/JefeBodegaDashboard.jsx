import React from 'react';
import { Package, AlertTriangle, ShoppingCart, ArrowUpDown } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import styles from './RoleDashboard.module.css';

export default function JefeBodegaDashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Panel Jefe de Bodega 🏪</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Total Repuestos" value="1,247" icon={Package} color="blue" />
        <StatsCard title="Bajo Stock" value="7" icon={AlertTriangle} color="red" />
        <StatsCard title="Compras del Mes" value="$3.2M" icon={ShoppingCart} color="green" trend={8} trendDirection="up" />
        <StatsCard title="Transferencias" value="3" icon={ArrowUpDown} color="amber" />
      </div>
      <Card title="Inventario General" hoverable={false}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>El resumen de inventario se mostrará aquí cuando esté conectado al backend.</p>
      </Card>
    </div>
  );
}
