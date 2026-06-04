import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function ClienteFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    nombre: isEdit ? 'Carlos Andrés Pérez' : '',
    cedula: isEdit ? '1.023.456.789' : '',
    telefono: isEdit ? '310-555-1234' : '',
    correo: isEdit ? 'carlos.perez@email.com' : '',
    password: '',
  });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(isEdit ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente');
    navigate('/clientes');
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/clientes')}>
        <ArrowLeft size={16} /> Volver a clientes
      </button>
      <h1 className={styles.pageTitle}>{isEdit ? 'Editar Cliente' : t('clientes.nuevo')}</h1>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('clientes.nombre')}</label>
            <input className={styles.input} value={form.nombre} onChange={(e) => handleChange('nombre', e.target.value)} placeholder="Nombre completo" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('clientes.cedula')}</label>
            <input className={styles.input} value={form.cedula} onChange={(e) => handleChange('cedula', e.target.value)} placeholder="1.234.567.890" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('clientes.telefono')}</label>
            <input className={styles.input} value={form.telefono} onChange={(e) => handleChange('telefono', e.target.value)} placeholder="310-555-1234" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('clientes.correo')}</label>
            <input className={styles.input} type="email" value={form.correo} onChange={(e) => handleChange('correo', e.target.value)} placeholder="correo@email.com" required />
          </div>
          {!isEdit && (
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('auth.password')}</label>
              <input className={styles.input} type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="••••••••" required />
            </div>
          )}
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/clientes')}>{t('common.cancelar')}</Button>
          <Button type="submit" variant="primary" icon={Save}>{t('common.guardar')}</Button>
        </div>
      </form>
    </div>
  );
}
