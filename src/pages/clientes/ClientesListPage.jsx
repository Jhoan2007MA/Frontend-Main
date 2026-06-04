import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Users, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const MOCK_CLIENTS = [
  { id: 1, nombre: 'Carlos Andrés Pérez', cedula: '1.023.456.789', telefono: '310-555-1234', correo: 'carlos.perez@email.com', estado: 'Activo', vehiculos: 2 },
  { id: 2, nombre: 'María Fernanda López', cedula: '1.034.567.890', telefono: '315-555-2345', correo: 'maria.lopez@email.com', estado: 'Activo', vehiculos: 1 },
  { id: 3, nombre: 'Juan David García', cedula: '1.045.678.901', telefono: '320-555-3456', correo: 'juan.garcia@email.com', estado: 'Activo', vehiculos: 3 },
  { id: 4, nombre: 'Ana María Rodríguez', cedula: '1.056.789.012', telefono: '318-555-4567', correo: 'ana.rodriguez@email.com', estado: 'Inactivo', vehiculos: 1 },
  { id: 5, nombre: 'Pedro José Martínez', cedula: '1.067.890.123', telefono: '312-555-5678', correo: 'pedro.martinez@email.com', estado: 'Activo', vehiculos: 2 },
  { id: 6, nombre: 'Laura Sofía Díaz', cedula: '1.078.901.234', telefono: '316-555-6789', correo: 'laura.diaz@email.com', estado: 'Activo', vehiculos: 1 },
  { id: 7, nombre: 'Diego Alejandro Ríos', cedula: '1.089.012.345', telefono: '311-555-7890', correo: 'diego.rios@email.com', estado: 'Activo', vehiculos: 2 },
  { id: 8, nombre: 'Valentina Castro', cedula: '1.090.123.456', telefono: '314-555-8901', correo: 'valentina.castro@email.com', estado: 'Activo', vehiculos: 1 },
];

export default function ClientesListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);

  const filtered = MOCK_CLIENTS.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.cedula.includes(search) ||
    c.correo.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'nombre', label: t('clientes.nombre') },
    { key: 'cedula', label: t('clientes.cedula') },
    { key: 'telefono', label: t('clientes.telefono') },
    { key: 'correo', label: t('clientes.correo') },
    { key: 'vehiculos', label: t('clientes.vehiculos'), render: (v) => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'estado', label: t('clientes.estado'), render: (v) => <StatusBadge status={v} size="sm" /> },
  ];

  return (
    <div className={styles.page}>
      <DataTable
        title={t('clientes.titulo')}
        columns={columns}
        data={filtered}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={t('clientes.buscar')}
        headerAction={{ label: t('clientes.nuevo'), icon: UserPlus, onClick: () => navigate('/clientes/nuevo') }}
        emptyMessage={t('clientes.sinClientes')}
        emptyIcon={Users}
        actions={[
          { key: 'view', icon: Eye, label: t('common.ver'), onClick: (row) => navigate(`/clientes/${row.id}`) },
          { key: 'edit', icon: Pencil, label: t('common.editar'), onClick: (row) => navigate(`/clientes/${row.id}/editar`) },
          { key: 'delete', icon: Trash2, label: t('common.eliminar'), onClick: (row) => setDeleteModal(row) },
        ]}
        pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }}
      />

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title={t('common.confirmar')} size="sm">
        <p className={styles.confirmText}>{t('clientes.confirmarEliminar')}</p>
        <div className={styles.confirmActions}>
          <Button variant="secondary" onClick={() => setDeleteModal(null)}>{t('common.cancelar')}</Button>
          <Button variant="danger" onClick={() => setDeleteModal(null)}>{t('common.eliminar')}</Button>
        </div>
      </Modal>
    </div>
  );
}
