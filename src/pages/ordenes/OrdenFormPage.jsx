import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function OrdenFormPage() {
  const { t } = useTranslation(); const navigate = useNavigate();
  const [form, setForm] = useState({ vehiculoId: '', mecanicoId: '', fechaEstimada: '', observaciones: '' });
  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success('Orden creada exitosamente'); navigate('/ordenes'); };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/ordenes')}><ArrowLeft size={16} /> Volver</button>
      <h1 className={styles.pageTitle}>{t('ordenes.nueva')}</h1>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('ordenes.vehiculo')}</label>
            <select className={styles.select} value={form.vehiculoId} onChange={(e) => h('vehiculoId', e.target.value)} required>
              <option value="">Seleccionar vehículo...</option>
              <option value="1">ABC-123 - Toyota Corolla 2023 (Carlos Pérez)</option>
              <option value="2">DEF-456 - Chevrolet Spark 2022 (María López)</option>
              <option value="3">GHI-789 - Renault Duster 2024 (Juan García)</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('ordenes.mecanico')}</label>
            <select className={styles.select} value={form.mecanicoId} onChange={(e) => h('mecanicoId', e.target.value)}>
              <option value="">Sin asignar</option>
              <option value="1">Roberto Gómez</option>
              <option value="2">Andrés Silva</option>
              <option value="3">Carlos Ruiz</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('ordenes.fechaEstimada')}</label>
            <input className={styles.input} type="date" value={form.fechaEstimada} onChange={(e) => h('fechaEstimada', e.target.value)} required />
          </div>
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.label}>{t('ordenes.observaciones')}</label>
            <textarea className={styles.textarea} value={form.observaciones} onChange={(e) => h('observaciones', e.target.value)} placeholder="Observaciones sobre el vehículo..." />
          </div>
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/ordenes')}>{t('common.cancelar')}</Button>
          <Button type="submit" variant="primary" icon={Save}>{t('common.guardar')}</Button>
        </div>
      </form>
    </div>
  );
}
