import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, fecha: '2026-06-02 15:30', usuario: 'Admin', entidad: 'OrdenServicio', accion: 'Crear', detalle: 'Creó orden ORD-001' },
  { id: 2, fecha: '2026-06-02 15:35', usuario: 'Jefe de Taller', entidad: 'OrdenServicio', accion: 'Actualizar', detalle: 'Asignó mecánico Roberto Gómez a ORD-001' },
  { id: 3, fecha: '2026-06-02 16:00', usuario: 'Roberto Gómez', entidad: 'OrdenServicio', accion: 'Actualizar', detalle: 'Registró diagnóstico para ORD-001' },
  { id: 4, fecha: '2026-06-02 17:00', usuario: 'Admin', entidad: 'Repuesto', accion: 'Actualizar', detalle: 'Actualizó stock de REP-001 (25 → 24)' },
  { id: 5, fecha: '2026-06-02 17:30', usuario: 'Sandra Torres', entidad: 'Cliente', accion: 'Crear', detalle: 'Registró cliente Diego Ríos' },
  { id: 6, fecha: '2026-06-01 09:00', usuario: 'Admin', entidad: 'Usuario', accion: 'Actualizar', detalle: 'Desactivó usuario Carlos Ruiz' },
  { id: 7, fecha: '2026-06-01 10:00', usuario: 'Jefe de Taller', entidad: 'OrdenServicio', accion: 'Actualizar', detalle: 'Completó orden ORD-004' },
  { id: 8, fecha: '2026-06-01 10:30', usuario: 'Sistema', entidad: 'Factura', accion: 'Crear', detalle: 'Generó factura FAC-001 por $844,900' },
  { id: 9, fecha: '2026-06-01 11:00', usuario: 'Sandra Torres', entidad: 'Pago', accion: 'Crear', detalle: 'Registró pago PAG-001 por transferencia' },
  { id: 10, fecha: '2026-05-31 14:00', usuario: 'Patricia Restrepo', entidad: 'Repuesto', accion: 'Crear', detalle: 'Registró nuevo repuesto REP-010 Batería 12V' },
];

const ACTIONS_COLORS = { Crear: '#10B981', Actualizar: '#3B82F6', Eliminar: '#EF4444' };

export default function AuditoriasListPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const filtered = MOCK.filter((a) => a.detalle.toLowerCase().includes(search.toLowerCase()) || a.usuario.toLowerCase().includes(search.toLowerCase()) || a.entidad.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'fecha', label: t('auditorias.fecha'), render: (v) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{v}</span> },
    { key: 'usuario', label: t('auditorias.usuario'), render: (v) => <strong style={{ color: 'var(--text-primary)' }}>{v}</strong> },
    { key: 'entidad', label: t('auditorias.entidad') },
    { key: 'accion', label: t('auditorias.accion'), render: (v) => <span style={{ padding: '2px 10px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, background: `${ACTIONS_COLORS[v] || '#6366F1'}22`, color: ACTIONS_COLORS[v] || '#6366F1' }}>{v}</span> },
    { key: 'detalle', label: 'Detalle' },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('auditorias.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('auditorias.buscar')} emptyIcon={Shield} actions={[]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
