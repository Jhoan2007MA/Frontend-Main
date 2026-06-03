import React from 'react';
import styles from './StatusBadge.module.css';

const STATUS_CONFIG = {
  Pendiente: { label: 'Pendiente', color: 'amber' },
  'Diagnóstico': { label: 'Diagnóstico', color: 'blue' },
  EnAprobacion: { label: 'En Aprobación', color: 'purple' },
  Aprobada: { label: 'Aprobada', color: 'cyan' },
  EnProceso: { label: 'En Proceso', color: 'indigo' },
  Completada: { label: 'Completada', color: 'green' },
  Cancelada: { label: 'Cancelada', color: 'red' },
  Activo: { label: 'Activo', color: 'green' },
  Inactivo: { label: 'Inactivo', color: 'red' },
  Pagada: { label: 'Pagada', color: 'green' },
  PagoPendiente: { label: 'Pago Pendiente', color: 'amber' },
};

export default function StatusBadge({ status, size = 'md' }) {
  const config = STATUS_CONFIG[status] || { label: status, color: 'blue' };
  return (
    <span className={`${styles.badge} ${styles[config.color]} ${styles[size]}`}>
      <span className={styles.dot}></span>
      {config.label}
    </span>
  );
}
