import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function PagoFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ facturaId: '', metodo: '', monto: '', referencia: '' });
  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success('Pago registrado exitosamente'); navigate('/pagos'); };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/pagos')}><ArrowLeft size={16} /> Volver</button>
      <h1 className={styles.pageTitle}>Registrar Pago</h1>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}><label className={styles.label}>Factura</label><select className={styles.select} value={form.facturaId} onChange={(e) => h('facturaId', e.target.value)} required><option value="">Seleccionar...</option><option value="2">FAC-002 - $761,600 (Pendiente)</option><option value="3">FAC-003 - $392,700 (Pendiente)</option></select></div>
          <div className={styles.formGroup}><label className={styles.label}>Método de Pago</label><select className={styles.select} value={form.metodo} onChange={(e) => h('metodo', e.target.value)} required><option value="">Seleccionar...</option><option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option><option>Pago en Línea</option></select></div>
          <div className={styles.formGroup}><label className={styles.label}>Monto</label><input className={styles.input} type="number" value={form.monto} onChange={(e) => h('monto', e.target.value)} placeholder="0" required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Referencia</label><input className={styles.input} value={form.referencia} onChange={(e) => h('referencia', e.target.value)} placeholder="N° de referencia" /></div>
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/pagos')}>Cancelar</Button>
          <Button type="submit" variant="primary" icon={Save}>Registrar Pago</Button>
        </div>
      </form>
    </div>
  );
}
