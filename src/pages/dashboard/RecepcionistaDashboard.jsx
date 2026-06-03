import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Car, ClipboardList, CreditCard, UserPlus, CarFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './RoleDashboard.module.css';

export default function RecepcionistaDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Panel de Recepción 🏢</h1>
      <div className={styles.statsGrid}>
        <StatsCard title="Clientes Hoy" value="12" icon={Users} color="blue" trend={5} trendDirection="up" />
        <StatsCard title="Vehículos Registrados" value="186" icon={Car} color="cyan" />
        <StatsCard title="Órdenes Pendientes" value="8" icon={ClipboardList} color="amber" />
        <StatsCard title="Pagos del Día" value="$1.8M" icon={CreditCard} color="green" trend={10} trendDirection="up" />
      </div>
      <Card title="Acciones Rápidas" hoverable={false}>
        <div className={styles.quickActions}>
          <Button icon={UserPlus} onClick={() => navigate('/clientes/nuevo')}>Nuevo Cliente</Button>
          <Button icon={CarFront} variant="secondary" onClick={() => navigate('/vehiculos/nuevo')}>Nuevo Vehículo</Button>
          <Button icon={CreditCard} variant="outline" onClick={() => navigate('/pagos/nuevo')}>Registrar Pago</Button>
        </div>
      </Card>
    </div>
  );
}
