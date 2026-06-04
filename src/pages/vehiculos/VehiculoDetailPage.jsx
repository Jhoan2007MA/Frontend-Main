import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from '../CrudPage.module.css';

export default function VehiculoDetailPage() {
  const navigate = useNavigate(); const { id } = useParams();
  const v = { marca: 'Toyota', modelo: 'Corolla', anio: 2023, vin: '1HGBH41JXMN109186', placa: 'ABC-123', color: 'Blanco', km: '25,000', propietario: 'Carlos Pérez' };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/vehiculos')}><ArrowLeft size={16} /> Volver</button>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{v.marca} {v.modelo} {v.anio}</h1>
        <Button icon={Pencil} variant="secondary" onClick={() => navigate(`/vehiculos/${id}/editar`)}>Editar</Button>
      </div>
      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <h3 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: 20 }}>Información del Vehículo</h3>
          {[['Placa', v.placa], ['VIN', v.vin], ['Color', v.color], ['Kilometraje', v.km + ' km'], ['Propietario', v.propietario]].map(([l, val]) => (
            <div key={l} className={styles.detailItem}><div className={styles.detailLabel}>{l}</div><div className={styles.detailValue}>{val}</div></div>
          ))}
        </div>
        <Card title="Historial de Servicios" hoverable={false}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>El historial se mostrará cuando se conecte al backend.</p>
        </Card>
      </div>
    </div>
  );
}
