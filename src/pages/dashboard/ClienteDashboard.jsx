import React from 'react';
import { Car, ClipboardList, FileText, Clock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import Button from '../../components/common/Button/Button';
import styles from './RoleDashboard.module.css';

const myVehicles = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2023, placa: 'ABC-123', color: 'Blanco' },
  { id: 2, marca: 'Chevrolet', modelo: 'Spark', anio: 2022, placa: 'DEF-456', color: 'Rojo' },
];

const myOrders = [
  { id: 1, numero: 'ORD-001', vehiculo: 'Toyota Corolla 2023', estado: 'EnProceso', fecha: '2026-06-02' },
  { id: 2, numero: 'ORD-008', vehiculo: 'Chevrolet Spark 2022', estado: 'EnAprobacion', fecha: '2026-06-01' },
];

export default function ClienteDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Bienvenido, {user?.name || 'Cliente'} 👋</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Mis Vehículos" value={String(myVehicles.length)} icon={Car} color="blue" />
        <StatsCard title="Órdenes Activas" value={String(myOrders.length)} icon={ClipboardList} color="amber" />
        <StatsCard title="Facturas Pendientes" value="1" icon={FileText} color="red" />
        <StatsCard title="Último Servicio" value="2 Jun" icon={Clock} color="green" />
      </div>
      <Card title="Mis Vehículos" hoverable={false}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {myVehicles.map((v) => (
            <div key={v.id} style={{ flex: '1 1 240px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-light)' }}><Car size={20} /></div>
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{v.marca} {v.modelo} {v.anio}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{v.placa} · {v.color}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Mis Órdenes Activas" hoverable={false} action={<Button variant="outline" size="sm" icon={CreditCard} onClick={() => navigate('/pagos/nuevo')}>Pagar Factura</Button>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {myOrders.map((o) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => navigate(`/ordenes/${o.id}`)}>
              <div>
                <strong style={{ color: 'var(--color-primary-light)' }}>{o.numero}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{o.vehiculo}</p>
              </div>
              <StatusBadge status={o.estado} size="sm" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
