import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Package, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, codigo: 'REP-001', nombre: 'Pastillas de freno delanteras', categoria: 'Frenos', stock: 25, stockMinimo: 10, precioCompra: '$65,000', precioVenta: '$85,000' },
  { id: 2, codigo: 'REP-002', nombre: 'Discos de freno delanteros', categoria: 'Frenos', stock: 8, stockMinimo: 5, precioCompra: '$95,000', precioVenta: '$120,000' },
  { id: 3, codigo: 'REP-003', nombre: 'Filtro de aceite', categoria: 'Filtros', stock: 45, stockMinimo: 20, precioCompra: '$12,000', precioVenta: '$18,000' },
  { id: 4, codigo: 'REP-004', nombre: 'Filtro de aire', categoria: 'Filtros', stock: 3, stockMinimo: 15, precioCompra: '$15,000', precioVenta: '$22,000' },
  { id: 5, codigo: 'REP-005', nombre: 'Aceite motor 10W-40', categoria: 'Lubricantes', stock: 30, stockMinimo: 10, precioCompra: '$28,000', precioVenta: '$38,000' },
  { id: 6, codigo: 'REP-006', nombre: 'Bujías de encendido', categoria: 'Motor', stock: 2, stockMinimo: 8, precioCompra: '$18,000', precioVenta: '$25,000' },
  { id: 7, codigo: 'REP-007', nombre: 'Correa de distribución', categoria: 'Motor', stock: 12, stockMinimo: 5, precioCompra: '$45,000', precioVenta: '$65,000' },
  { id: 8, codigo: 'REP-008', nombre: 'Amortiguadores delanteros', categoria: 'Suspensión', stock: 6, stockMinimo: 4, precioCompra: '$110,000', precioVenta: '$145,000' },
  { id: 9, codigo: 'REP-009', nombre: 'Líquido de frenos DOT 4', categoria: 'Lubricantes', stock: 20, stockMinimo: 8, precioCompra: '$22,000', precioVenta: '$35,000' },
  { id: 10, codigo: 'REP-010', nombre: 'Batería 12V 60Ah', categoria: 'Eléctrico', stock: 1, stockMinimo: 3, precioCompra: '$180,000', precioVenta: '$250,000' },
];

export default function RepuestosListPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [search, setSearch] = useState('');
  const filtered = MOCK.filter((r) => r.nombre.toLowerCase().includes(search.toLowerCase()) || r.codigo.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'codigo', label: t('repuestos.codigo'), render: (v) => <strong style={{ color: 'var(--color-primary-light)' }}>{v}</strong> },
    { key: 'nombre', label: t('repuestos.nombre') },
    { key: 'categoria', label: t('repuestos.categoria') },
    { key: 'stock', label: t('repuestos.stock'), render: (v, row) => <span className={v < row.stockMinimo ? styles.lowStock : ''}>{v}</span> },
    { key: 'stockMinimo', label: t('repuestos.stockMinimo') },
    { key: 'precioCompra', label: t('repuestos.precioCompra') },
    { key: 'precioVenta', label: t('repuestos.precioVenta') },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('repuestos.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('repuestos.buscar')} headerAction={{ label: t('repuestos.nuevo'), icon: Plus, onClick: () => navigate('/repuestos/nuevo') }} emptyIcon={Package} actions={[
        { key: 'edit', icon: Pencil, label: t('common.editar'), onClick: (r) => navigate(`/repuestos/${r.id}/editar`) },
        { key: 'delete', icon: Trash2, label: t('common.eliminar'), onClick: () => {} },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
