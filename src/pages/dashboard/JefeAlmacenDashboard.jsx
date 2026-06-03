import React from 'react';
import { Package, AlertTriangle, Truck, ArrowDownCircle } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import styles from './RoleDashboard.module.css';

export default function JefeAlmacenDashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Panel Jefe de Almacén 📦</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Solicitudes Pendientes" value="4" icon={Package} color="amber" />
        <StatsCard title="Entregas Hoy" value="6" icon={Truck} color="green" />
        <StatsCard title="Items en Almacén" value="342" icon={ArrowDownCircle} color="blue" />
        <StatsCard title="Bajo Stock" value="7" icon={AlertTriangle} color="red" />
      </div>
      <Card title="Solicitudes de Repuestos Pendientes" hoverable={false}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Las solicitudes de repuestos aparecerán aquí cuando estén conectadas al backend.</p>
      </Card>
    </div>
  );
}
