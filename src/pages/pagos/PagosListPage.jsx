import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, CreditCard, Eye } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, referencia: 'PAG-001', factura: 'FAC-001', metodo: 'Transferencia', monto: '$844,900', fecha: '2026-06-01', estado: 'Completada' },
  { id: 2, referencia: 'PAG-002', factura: 'FAC-004', metodo: 'Efectivo', monto: '$1,118,600', fecha: '2026-05-30', estado: 'Completada' },
  { id: 3, referencia: 'PAG-003', factura: 'FAC-002', metodo: 'Tarjeta', monto: '$380,800', fecha: '2026-06-02', estado: 'Pendiente' },
];

export default function PagosListPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [search, setSearch] = useState('');
  const filtered = MOCK.filter((p) => p.referencia.toLowerCase().includes(search.toLowerCase()) || p.factura.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'referencia', label: t('pagos.referencia'), render: (v) => <strong style={{ color: 'var(--color-primary-light)' }}>{v}</strong> },
    { key: 'factura', label: 'Factura' },
    { key: 'metodo', label: t('pagos.metodo') },
    { key: 'monto', label: t('pagos.monto'), render: (v) => <strong>{v}</strong> },
    { key: 'fecha', label: t('pagos.fecha') },
    { key: 'estado', label: t('pagos.estado'), render: (v) => <StatusBadge status={v} size="sm" /> },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('pagos.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('pagos.buscar')} headerAction={{ label: t('pagos.nuevo'), icon: Plus, onClick: () => navigate('/pagos/nuevo') }} emptyIcon={CreditCard} actions={[
        { key: 'view', icon: Eye, label: t('common.ver'), onClick: () => {} },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
