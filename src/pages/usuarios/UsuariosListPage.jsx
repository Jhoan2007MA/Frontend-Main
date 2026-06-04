import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, UserCog, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, nombre: 'Admin Principal', correo: 'admin@autotaller.com', rol: 'Admin', estado: 'Activo' },
  { id: 2, nombre: 'Sandra Milena Torres', correo: 'sandra.torres@autotaller.com', rol: 'Recepcionista', estado: 'Activo' },
  { id: 3, nombre: 'Roberto Gómez', correo: 'roberto.gomez@autotaller.com', rol: 'Mecánico', estado: 'Activo' },
  { id: 4, nombre: 'Andrés Felipe Silva', correo: 'andres.silva@autotaller.com', rol: 'Mecánico', estado: 'Activo' },
  { id: 5, nombre: 'Carlos Ruiz Herrera', correo: 'carlos.ruiz@autotaller.com', rol: 'Mecánico', estado: 'Inactivo' },
  { id: 6, nombre: 'Martha Lucía Vargas', correo: 'martha.vargas@autotaller.com', rol: 'JefeTaller', estado: 'Activo' },
  { id: 7, nombre: 'Felipe Morales', correo: 'felipe.morales@autotaller.com', rol: 'JefeAlmacen', estado: 'Activo' },
  { id: 8, nombre: 'Patricia Restrepo', correo: 'patricia.restrepo@autotaller.com', rol: 'JefeBodega', estado: 'Activo' },
];

const ROLE_COLORS = { Admin: '#EF4444', Recepcionista: '#3B82F6', 'Mecánico': '#F59E0B', JefeTaller: '#8B5CF6', JefeAlmacen: '#0EA5E9', JefeBodega: '#10B981' };

export default function UsuariosListPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [search, setSearch] = useState('');
  const filtered = MOCK.filter((u) => u.nombre.toLowerCase().includes(search.toLowerCase()) || u.correo.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'nombre', label: t('usuarios.nombre') },
    { key: 'correo', label: t('usuarios.correo') },
    { key: 'rol', label: t('usuarios.rol'), render: (v) => <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: `${ROLE_COLORS[v] || '#6366F1'}22`, color: ROLE_COLORS[v] || '#6366F1' }}>{t(`usuarios.roles.${v}`) || v}</span> },
    { key: 'estado', label: t('usuarios.estado'), render: (v) => <StatusBadge status={v} size="sm" /> },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('usuarios.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('usuarios.buscar')} headerAction={{ label: t('usuarios.nuevo'), icon: Plus, onClick: () => navigate('/usuarios/nuevo') }} emptyIcon={UserCog} actions={[
        { key: 'edit', icon: Pencil, label: t('common.editar'), onClick: (r) => navigate(`/usuarios/${r.id}/editar`) },
        { key: 'delete', icon: Trash2, label: t('common.eliminar'), onClick: () => {} },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
