import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

export default function FacturaDetailPage() {
  const navigate = useNavigate();
  const invoice = { numero: 'FAC-001', orden: 'ORD-004', fecha: '2026-06-01', cliente: 'Ana Rodríguez', vehiculo: 'Mazda CX-5 2023', manoObra: 350000, items: [{ desc: 'Pastillas de freno', cant: 1, precio: 85000, subtotal: 85000 }, { desc: 'Discos de freno', cant: 2, precio: 120000, subtotal: 240000 }, { desc: 'Líquido DOT 4', cant: 1, precio: 35000, subtotal: 35000 }], impuestos: 134900, total: 844900, estadoPago: 'Pagada' };
  const totalRepuestos = invoice.items.reduce((s, i) => s + i.subtotal, 0);
  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/facturas')}><ArrowLeft size={16} /> Volver</button>
      <div className={styles.pageHeader}>
        <div><h1 className={styles.pageTitle}>{invoice.numero}</h1><div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}><StatusBadge status={invoice.estadoPago} /><span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{invoice.fecha}</span></div></div>
        <Button icon={Printer} variant="secondary">Imprimir</Button>
      </div>
      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 20px' }}>Información</h3>
          {[['Cliente', invoice.cliente], ['Vehículo', invoice.vehiculo], ['Orden', invoice.orden]].map(([l, v]) => <div key={l} className={styles.detailItem}><div className={styles.detailLabel}>{l}</div><div className={styles.detailValue}>{v}</div></div>)}
        </div>
        <div className={styles.detailCard}>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 20px' }}>Resumen</h3>
          {[['Mano de Obra', `$${invoice.manoObra.toLocaleString('es-CO')}`], ['Total Repuestos', `$${totalRepuestos.toLocaleString('es-CO')}`], ['Impuestos (IVA 19%)', `$${invoice.impuestos.toLocaleString('es-CO')}`]].map(([l, v]) => <div key={l} className={styles.detailItem}><div className={styles.detailLabel}>{l}</div><div className={styles.detailValue}>{v}</div></div>)}
          <div style={{ borderTop: '2px solid var(--color-primary)', paddingTop: 12, marginTop: 12 }}>
            <div className={styles.detailLabel}>TOTAL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>${invoice.total.toLocaleString('es-CO')}</div>
          </div>
        </div>
      </div>
      <Card title="Detalle de Repuestos" hoverable={false} padding={false}>
        <div style={{ overflowX: 'auto', padding: '0 24px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Descripción', 'Cantidad', 'Precio Unit.', 'Subtotal'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-color)' }}>{h}</th>)}</tr></thead>
            <tbody>{invoice.items.map((r, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: 12, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{r.desc}</td><td style={{ padding: 12 }}>{r.cant}</td><td style={{ padding: 12 }}>${r.precio.toLocaleString('es-CO')}</td><td style={{ padding: 12, fontWeight: 600 }}>${r.subtotal.toLocaleString('es-CO')}</td></tr>)}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
