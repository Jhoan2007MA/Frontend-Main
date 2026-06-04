import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Clock, User, Car, Wrench, FileText, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const STEPS = [
  { key: 'Pendiente', label: 'Pendiente', icon: Clock },
  { key: 'Diagnóstico', label: 'Diagnóstico', icon: Wrench },
  { key: 'EnAprobacion', label: 'Aprobación', icon: FileText },
  { key: 'Aprobada', label: 'Aprobada', icon: Check },
  { key: 'EnProceso', label: 'En Proceso', icon: Wrench },
  { key: 'Completada', label: 'Completada', icon: CheckCircle },
];

const ORDER = {
  numero: 'ORD-001', estado: 'EnProceso', fechaIngreso: '2026-06-02', fechaEstimada: '2026-06-05',
  vehiculo: { marca: 'Toyota', modelo: 'Corolla', anio: 2023, placa: 'ABC-123', color: 'Blanco' },
  cliente: { nombre: 'Carlos Andrés Pérez', cedula: '1.023.456.789', telefono: '310-555-1234' },
  mecanico: { nombre: 'Roberto Gómez', especialidad: 'Mecánica General' },
  diagnostico: { problema: 'Falla en sistema de frenos delanteros. Desgaste excesivo de pastillas y discos.', propuesta: 'Cambio completo de pastillas y discos delanteros. Verificación de sistema hidráulico.', fecha: '2026-06-02' },
  repuestos: [
    { nombre: 'Pastillas de freno delanteras', cantidad: 1, precio: 85000, subtotal: 85000 },
    { nombre: 'Discos de freno delanteros', cantidad: 2, precio: 120000, subtotal: 240000 },
    { nombre: 'Líquido de frenos DOT 4', cantidad: 1, precio: 35000, subtotal: 35000 },
  ],
  timeline: [
    { fecha: '2026-06-02 08:30', accion: 'Orden creada', usuario: 'Admin' },
    { fecha: '2026-06-02 09:00', accion: 'Mecánico asignado: Roberto Gómez', usuario: 'Jefe de Taller' },
    { fecha: '2026-06-02 11:30', accion: 'Diagnóstico registrado', usuario: 'Roberto Gómez' },
    { fecha: '2026-06-02 14:00', accion: 'Diagnóstico aprobado por Jefe de Taller', usuario: 'Jefe de Taller' },
    { fecha: '2026-06-02 14:30', accion: 'Cliente aprobó la reparación', usuario: 'Carlos Pérez' },
    { fecha: '2026-06-02 15:00', accion: 'Reparación en proceso', usuario: 'Roberto Gómez' },
  ],
};

export default function OrdenDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentStepIdx = STEPS.findIndex((s) => s.key === ORDER.estado);

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/ordenes')}><ArrowLeft size={16} /> Volver a órdenes</button>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{ORDER.numero}</h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: 8 }}>
            <StatusBadge status={ORDER.estado} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Ingreso: {ORDER.fechaIngreso}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Estimada: {ORDER.fechaEstimada}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" icon={CheckCircle}>Completar</Button>
          <Button variant="danger" icon={XCircle}>Cancelar</Button>
        </div>
      </div>

      {/* Workflow Stepper */}
      <Card hoverable={false}>
        <div className={styles.stepper}>
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            const isCompleted = i < currentStepIdx;
            const isActive = i === currentStepIdx;
            return (
              <div key={step.key} className={styles.stepperItem}>
                {i > 0 && <div className={`${styles.stepperLine} ${isCompleted ? styles.stepperLineCompleted : isActive ? styles.stepperLineActive : ''}`} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className={`${styles.stepperDot} ${isCompleted ? styles.stepperDotCompleted : isActive ? styles.stepperDotActive : ''}`}>
                    {isCompleted ? <Check size={14} /> : <StepIcon size={14} />}
                  </div>
                  <span className={`${styles.stepperLabel} ${isActive ? styles.stepperLabelActive : ''}`}>{step.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Info Grid */}
      <div className={styles.detailGrid}>
        {/* Vehicle */}
        <Card title="Vehículo" icon={Car} hoverable={false}>
          {[['Marca/Modelo', `${ORDER.vehiculo.marca} ${ORDER.vehiculo.modelo} ${ORDER.vehiculo.anio}`], ['Placa', ORDER.vehiculo.placa], ['Color', ORDER.vehiculo.color]].map(([l, v]) => (
            <div key={l} className={styles.detailItem}><div className={styles.detailLabel}>{l}</div><div className={styles.detailValue}>{v}</div></div>
          ))}
        </Card>

        {/* Client */}
        <Card title="Cliente" icon={User} hoverable={false}>
          {[['Nombre', ORDER.cliente.nombre], ['Cédula', ORDER.cliente.cedula], ['Teléfono', ORDER.cliente.telefono]].map(([l, v]) => (
            <div key={l} className={styles.detailItem}><div className={styles.detailLabel}>{l}</div><div className={styles.detailValue}>{v}</div></div>
          ))}
        </Card>
      </div>

      {/* Diagnosis */}
      <Card title="Diagnóstico" icon={Wrench} hoverable={false}>
        <div className={styles.detailItem}><div className={styles.detailLabel}>Problema Detectado</div><div className={styles.detailValue}>{ORDER.diagnostico.problema}</div></div>
        <div className={styles.detailItem}><div className={styles.detailLabel}>Propuesta de Reparación</div><div className={styles.detailValue}>{ORDER.diagnostico.propuesta}</div></div>
      </Card>

      {/* Parts Used */}
      <Card title="Repuestos Utilizados" icon={FileText} hoverable={false} padding={false}>
        <div style={{ overflowX: 'auto', padding: '0 24px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Repuesto', 'Cantidad', 'Precio Unit.', 'Subtotal'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-color)' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {ORDER.repuestos.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{r.nombre}</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{r.cantidad}</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>${r.precio.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>${r.subtotal.toLocaleString('es-CO')}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Repuestos:</td>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-primary-light)', fontSize: '1rem' }}>${ORDER.repuestos.reduce((s, r) => s + r.subtotal, 0).toLocaleString('es-CO')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Timeline */}
      <Card title="Actividad" hoverable={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ORDER.timeline.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: i < ORDER.timeline.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', marginTop: 6, flexShrink: 0 }}></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.accion}</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.usuario} — {item.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
