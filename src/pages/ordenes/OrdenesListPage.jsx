import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, ClipboardList, Eye, Pencil } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, numero: 'ORD-001', vehiculo: 'Toyota Corolla 2023', cliente: 'Carlos Pérez', mecanico: 'Roberto Gómez', estado: 'EnProceso', fecha: '2026-06-02', fechaEstimada: '2026-06-05' },
  { id: 2, numero: 'ORD-002', vehiculo: 'Chevrolet Spark 2022', cliente: 'María López', mecanico: '-', estado: 'Pendiente', fecha: '2026-06-02', fechaEstimada: '2026-06-06' },
  { id: 3, numero: 'ORD-003', vehiculo: 'Renault Duster 2024', cliente: 'Juan García', mecanico: 'Andrés Silva', estado: 'Diagnóstico', fecha: '2026-06-01', fechaEstimada: '2026-06-04' },
  { id: 4, numero: 'ORD-004', vehiculo: 'Mazda CX-5 2023', cliente: 'Ana Rodríguez', mecanico: 'Roberto Gómez', estado: 'Completada', fecha: '2026-06-01', fechaEstimada: '2026-06-03' },
  { id: 5, numero: 'ORD-005', vehiculo: 'Kia Sportage 2024', cliente: 'Pedro Martínez', mecanico: 'Carlos Ruiz', estado: 'Aprobada', fecha: '2026-05-31', fechaEstimada: '2026-06-04' },
  { id: 6, numero: 'ORD-006', vehiculo: 'Nissan Kicks 2024', cliente: 'Diego Ríos', mecanico: '-', estado: 'EnAprobacion', fecha: '2026-05-30', fechaEstimada: '2026-06-03' },
  { id: 7, numero: 'ORD-007', vehiculo: 'Chevrolet Tracker 2023', cliente: 'Laura Díaz', mecanico: 'Andrés Silva', estado: 'EnProceso', fecha: '2026-05-29', fechaEstimada: '2026-06-02' },
  { id: 8, numero: 'ORD-008', vehiculo: 'Hyundai Tucson 2023', cliente: 'Valentina Castro', mecanico: '-', estado: 'Cancelada', fecha: '2026-05-28', fechaEstimada: '2026-06-01' },
];

const STATUSES = ['Todas', 'Pendiente', 'Diagnóstico', 'EnAprobacion', 'Aprobada', 'EnProceso', 'Completada', 'Cancelada'];

export default function OrdenesListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todas');

  const filtered = MOCK.filter((o) => {
    const matchSearch = o.numero.toLowerCase().includes(search.toLowerCase()) || o.cliente.toLowerCase().includes(search.toLowerCase()) || o.vehiculo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'Todas' || o.estado === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: 'numero', label: t('ordenes.numero'), render: (v) => <strong style={{ color: 'var(--color-primary-light)' }}>{v}</strong> },
    { key: 'vehiculo', label: t('ordenes.vehiculo') },
    { key: 'cliente', label: t('ordenes.cliente') },
    { key: 'mecanico', label: t('ordenes.mecanico') },
    { key: 'estado', label: t('ordenes.estado'), render: (v) => <StatusBadge status={v} size="sm" /> },
    { key: 'fecha', label: t('ordenes.fechaIngreso') },
  ];

  return (
    <div className={styles.page}>
      {/* Status filter tabs */}
      <div className={styles.filterTabs}>
        {STATUSES.map((s) => (
          <button key={s} className={`${styles.filterTab} ${statusFilter === s ? styles.filterTabActive : ''}`} onClick={() => setStatusFilter(s)}>
            {s === 'Todas' ? t('common.todos') : s}
          </button>
        ))}
      </div>

      <DataTable title={t('ordenes.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('ordenes.buscar')} headerAction={{ label: t('ordenes.nueva'), icon: Plus, onClick: () => navigate('/ordenes/nueva') }} emptyMessage={t('ordenes.sinOrdenes')} emptyIcon={ClipboardList} actions={[
        { key: 'view', icon: Eye, label: t('common.ver'), onClick: (r) => navigate(`/ordenes/${r.id}`) },
        { key: 'edit', icon: Pencil, label: t('common.editar'), onClick: (r) => navigate(`/ordenes/${r.id}`) },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
