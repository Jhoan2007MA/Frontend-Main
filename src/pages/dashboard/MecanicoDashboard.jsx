import React from 'react';
import { ClipboardList, Stethoscope, Wrench, CheckCircle } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from './RoleDashboard.module.css';

const myOrders = [
  { id: 1, numero: 'ORD-003', vehiculo: 'Renault Duster 2024', estado: 'Diagnóstico', cliente: 'Juan García' },
  { id: 2, numero: 'ORD-007', vehiculo: 'Chevrolet Tracker 2023', estado: 'EnProceso', cliente: 'Laura Díaz' },
  { id: 3, numero: 'ORD-009', vehiculo: 'Nissan Kicks 2024', estado: 'Pendiente', cliente: 'Diego Ríos' },
];

export default function MecanicoDashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Panel de Mecánico 🔧</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Órdenes Asignadas" value="3" icon={ClipboardList} color="blue" />
        <StatsCard title="En Diagnóstico" value="1" icon={Stethoscope} color="amber" />
        <StatsCard title="En Proceso" value="1" icon={Wrench} color="purple" />
        <StatsCard title="Completadas Hoy" value="2" icon={CheckCircle} color="green" />
      </div>
      <Card title="Mis Órdenes Asignadas" hoverable={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myOrders.map((order) => (
            <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ color: 'var(--color-primary-light)', fontSize: '0.9rem' }}>{order.numero}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{order.vehiculo} — {order.cliente}</p>
              </div>
              <StatusBadge status={order.estado} size="sm" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
