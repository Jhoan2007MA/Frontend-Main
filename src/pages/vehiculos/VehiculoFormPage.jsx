import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function VehiculoFormPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const { id } = useParams(); const isEdit = !!id;
  const [form, setForm] = useState({ marca: isEdit ? 'Toyota' : '', modelo: isEdit ? 'Corolla' : '', anio: isEdit ? '2023' : '', vin: isEdit ? '1HGBH41JXMN109186' : '', placa: isEdit ? 'ABC-123' : '', color: isEdit ? 'Blanco' : '', kilometraje: isEdit ? '25000' : '', propietarioId: isEdit ? '1' : '' });
  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success(isEdit ? 'Vehículo actualizado' : 'Vehículo creado'); navigate('/vehiculos'); };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/vehiculos')}><ArrowLeft size={16} /> Volver</button>
      <h1 className={styles.pageTitle}>{isEdit ? 'Editar Vehículo' : t('vehiculos.nuevo')}</h1>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.marca')}</label><input className={styles.input} value={form.marca} onChange={(e) => h('marca', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.modelo')}</label><input className={styles.input} value={form.modelo} onChange={(e) => h('modelo', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.anio')}</label><input className={styles.input} type="number" value={form.anio} onChange={(e) => h('anio', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.vin')}</label><input className={styles.input} value={form.vin} onChange={(e) => h('vin', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.placa')}</label><input className={styles.input} value={form.placa} onChange={(e) => h('placa', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.color')}</label><input className={styles.input} value={form.color} onChange={(e) => h('color', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.kilometraje')}</label><input className={styles.input} type="number" value={form.kilometraje} onChange={(e) => h('kilometraje', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>{t('vehiculos.propietario')}</label><select className={styles.select} value={form.propietarioId} onChange={(e) => h('propietarioId', e.target.value)} required><option value="">Seleccionar...</option><option value="1">Carlos Pérez</option><option value="2">María López</option><option value="3">Juan García</option></select></div>
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/vehiculos')}>{t('common.cancelar')}</Button>
          <Button type="submit" variant="primary" icon={Save}>{t('common.guardar')}</Button>
        </div>
      </form>
    </div>
  );
}
