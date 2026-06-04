import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Eye } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, numero: 'FAC-001', orden: 'ORD-004', manoObra: '$350,000', totalRepuestos: '$360,000', impuestos: '$134,900', total: '$844,900', estadoPago: 'Pagada' },
  { id: 2, numero: 'FAC-002', orden: 'ORD-001', manoObra: '$280,000', totalRepuestos: '$360,000', impuestos: '$121,600', total: '$761,600', estadoPago: 'PagoPendiente' },
  { id: 3, numero: 'FAC-003', orden: 'ORD-007', manoObra: '$150,000', totalRepuestos: '$180,000', impuestos: '$62,700', total: '$392,700', estadoPago: 'PagoPendiente' },
  { id: 4, numero: 'FAC-004', orden: 'ORD-010', manoObra: '$420,000', totalRepuestos: '$520,000', impuestos: '$178,600', total: '$1,118,600', estadoPago: 'Pagada' },
];

export default function FacturasListPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [search, setSearch] = useState('');
  const filtered = MOCK.filter((f) => f.numero.toLowerCase().includes(search.toLowerCase()) || f.orden.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'numero', label: t('facturas.numero'), render: (v) => <strong style={{ color: 'var(--color-primary-light)' }}>{v}</strong> },
    { key: 'orden', label: t('facturas.orden') },
    { key: 'manoObra', label: t('facturas.manoObra') },
    { key: 'totalRepuestos', label: t('facturas.totalRepuestos') },
    { key: 'impuestos', label: t('facturas.impuestos') },
    { key: 'total', label: t('facturas.total'), render: (v) => <strong>{v}</strong> },
    { key: 'estadoPago', label: t('facturas.estadoPago'), render: (v) => <StatusBadge status={v} size="sm" /> },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('facturas.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('facturas.buscar')} emptyIcon={FileText} actions={[
        { key: 'view', icon: Eye, label: t('common.ver'), onClick: (r) => navigate(`/facturas/${r.id}`) },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
