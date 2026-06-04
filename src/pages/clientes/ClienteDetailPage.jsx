import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Pencil, Car } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

export default function ClienteDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const client = {
    id, nombre: 'Carlos Andrés Pérez', cedula: '1.023.456.789', telefono: '310-555-1234',
    correo: 'carlos.perez@email.com', estado: 'Activo', fechaRegistro: '2025-03-15',
    vehiculos: [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2023, placa: 'ABC-123', color: 'Blanco' },
      { id: 2, marca: 'Chevrolet', modelo: 'Spark', anio: 2022, placa: 'DEF-456', color: 'Rojo' },
    ],
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/clientes')}>
        <ArrowLeft size={16} /> Volver a clientes
      </button>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{client.nombre}</h1>
        <Button icon={Pencil} variant="secondary" onClick={() => navigate(`/clientes/${id}/editar`)}>{t('common.editar')}</Button>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <h3 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: 20 }}>Información Personal</h3>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>{t('clientes.cedula')}</div>
            <div className={styles.detailValue}>{client.cedula}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>{t('clientes.telefono')}</div>
            <div className={styles.detailValue}>{client.telefono}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>{t('clientes.correo')}</div>
            <div className={styles.detailValue}>{client.correo}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>{t('clientes.estado')}</div>
            <StatusBadge status={client.estado} />
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>{t('clientes.fechaRegistro')}</div>
            <div className={styles.detailValue}>{client.fechaRegistro}</div>
          </div>
        </div>

        <Card title={`${t('clientes.vehiculos')} (${client.vehiculos.length})`} icon={Car} hoverable={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {client.vehiculos.map((v) => (
              <div key={v.id} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => navigate(`/vehiculos/${v.id}`)}>
                <strong style={{ color: 'var(--text-primary)' }}>{v.marca} {v.modelo} {v.anio}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{v.placa} · {v.color}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
