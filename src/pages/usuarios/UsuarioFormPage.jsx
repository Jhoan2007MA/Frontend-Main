import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from '../CrudPage.module.css';

export default function UsuarioFormPage() {
  const navigate = useNavigate(); const { id } = useParams(); const isEdit = !!id;
  const [form, setForm] = useState({ nombre: isEdit ? 'Roberto Gómez' : '', correo: isEdit ? 'roberto.gomez@autotaller.com' : '', password: '', rol: isEdit ? 'Mecánico' : '', estado: isEdit ? 'Activo' : 'Activo' });
  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success(isEdit ? 'Usuario actualizado' : 'Usuario creado'); navigate('/usuarios'); };
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/usuarios')}><ArrowLeft size={16} /> Volver</button>
      <h1 className={styles.pageTitle}>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}><label className={styles.label}>Nombre</label><input className={styles.input} value={form.nombre} onChange={(e) => h('nombre', e.target.value)} required /></div>
          <div className={styles.formGroup}><label className={styles.label}>Correo</label><input className={styles.input} type="email" value={form.correo} onChange={(e) => h('correo', e.target.value)} required /></div>
          {!isEdit && <div className={styles.formGroup}><label className={styles.label}>Contraseña</label><input className={styles.input} type="password" value={form.password} onChange={(e) => h('password', e.target.value)} required /></div>}
          <div className={styles.formGroup}><label className={styles.label}>Rol</label><select className={styles.select} value={form.rol} onChange={(e) => h('rol', e.target.value)} required><option value="">Seleccionar...</option><option value="Admin">Administrador</option><option value="Recepcionista">Recepcionista</option><option value="Mecánico">Mecánico</option><option value="JefeTaller">Jefe de Taller</option><option value="JefeAlmacen">Jefe de Almacén</option><option value="JefeBodega">Jefe de Bodega</option><option value="Cliente">Cliente</option></select></div>
          <div className={styles.formGroup}><label className={styles.label}>Estado</label><select className={styles.select} value={form.estado} onChange={(e) => h('estado', e.target.value)}><option>Activo</option><option>Inactivo</option></select></div>
        </div>
        <div className={styles.formActions}>
          <Button variant="secondary" onClick={() => navigate('/usuarios')}>Cancelar</Button>
          <Button type="submit" variant="primary" icon={Save}>Guardar</Button>
        </div>
      </form>
    </div>
  );
}
