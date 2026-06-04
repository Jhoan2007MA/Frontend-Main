import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function RepuestoFormPage() {
  const navigate = useNavigate(); const { id } = useParams(); const isEdit = !!id;
  const [form, setForm] = useState({ codigo: isEdit ? 'REP-001' : '', nombre: isEdit ? 'Pastillas de freno' : '', descripcion: '', categoria: isEdit ? 'Frenos' : '', stock: isEdit ? '25' : '', stockMinimo: isEdit ? '10' : '', precioCompra: isEdit ? '65000' : '', precioVenta: isEdit ? '85000' : '' });
  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success(isEdit ? 'Repuesto actualizado' : 'Repuesto creado'); navigate('/repuestos'); };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/repuestos')}><ArrowLeft size={16} /> Volver</button>
      <h1 className={styles.pageTitle}>{isEdit ? 'Editar Repuesto' : 'Nuevo Repuesto'}</h1>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}><label className={styles.label}>Código</label><input className={styles.input} value={form.codigo} onChange={(e) => h('codigo', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Nombre</label><input className={styles.input} value={form.nombre} onChange={(e) => h('nombre', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Categoría</label><select className={styles.select} value={form.categoria} onChange={(e) => h('categoria', e.target.value)} required><option value="">Seleccionar...</option><option>Frenos</option><option>Filtros</option><option>Motor</option><option>Lubricantes</option><option>Suspensión</option><option>Eléctrico</option></select></div>
          <div className={styles.formGroup}><label className={styles.label}>Stock</label><input className={styles.input} type="number" value={form.stock} onChange={(e) => h('stock', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Stock Mínimo</label><input className={styles.input} type="number" value={form.stockMinimo} onChange={(e) => h('stockMinimo', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Precio Compra</label><input className={styles.input} type="number" value={form.precioCompra} onChange={(e) => h('precioCompra', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Precio Venta</label><input className={styles.input} type="number" value={form.precioVenta} onChange={(e) => h('precioVenta', e.target.value)} required /></div>
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}><label className={styles.label}>Descripción</label><textarea className={styles.textarea} value={form.descripcion} onChange={(e) => h('descripcion', e.target.value)} /></div>
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/repuestos')}>Cancelar</Button>
          <Button type="submit" variant="primary" icon={Save}>Guardar</Button>
        </div>
      </form>
    </div>
  );
}
