import React from 'react';
import { Users, ClipboardList, CheckSquare, Wrench } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from './RoleDashboard.module.css';

const statusSummary = [
  { status: 'Pendiente', count: 12 }, { status: 'Diagnóstico', count: 8 },
  { status: 'EnAprobacion', count: 5 }, { status: 'Aprobada', count: 3 },
  { status: 'EnProceso', count: 15 }, { status: 'Completada', count: 23 },
];

export default function JefeTallerDashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Panel Jefe de Taller 🏭</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Mecánicos Activos" value="6" icon={Users} color="blue" />
        <StatsCard title="Órdenes Pendientes" value="12" icon={ClipboardList} color="amber" />
        <StatsCard title="Por Aprobar" value="5" icon={CheckSquare} color="purple" />
        <StatsCard title="En Proceso" value="15" icon={Wrench} color="cyan" />
      </div>
      <Card title="Resumen del Flujo de Órdenes" hoverable={false}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {statusSummary.map((item) => (
            <div key={item.status} style={{ flex: '1 1 140px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <StatusBadge status={item.status} size="sm" />
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '8px 0 0' }}>{item.count}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
