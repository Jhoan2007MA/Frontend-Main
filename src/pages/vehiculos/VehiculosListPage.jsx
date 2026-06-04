import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CarFront, Car, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable/DataTable';
import styles from '../CrudPage.module.css';

const MOCK = [
  { id: 1, placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', anio: 2023, color: 'Blanco', propietario: 'Carlos Pérez', km: '25,000 km' },
  { id: 2, placa: 'DEF-456', marca: 'Chevrolet', modelo: 'Spark', anio: 2022, color: 'Rojo', propietario: 'María López', km: '18,500 km' },
  { id: 3, placa: 'GHI-789', marca: 'Renault', modelo: 'Duster', anio: 2024, color: 'Gris', propietario: 'Juan García', km: '8,200 km' },
  { id: 4, placa: 'JKL-012', marca: 'Mazda', modelo: 'CX-5', anio: 2023, color: 'Azul', propietario: 'Ana Rodríguez', km: '32,100 km' },
  { id: 5, placa: 'MNO-345', marca: 'Kia', modelo: 'Sportage', anio: 2024, color: 'Negro', propietario: 'Pedro Martínez', km: '5,600 km' },
  { id: 6, placa: 'PQR-678', marca: 'Nissan', modelo: 'Kicks', anio: 2024, color: 'Plata', propietario: 'Diego Ríos', km: '12,300 km' },
  { id: 7, placa: 'STU-901', marca: 'Chevrolet', modelo: 'Tracker', anio: 2023, color: 'Blanco', propietario: 'Laura Díaz', km: '28,700 km' },
  { id: 8, placa: 'VWX-234', marca: 'Hyundai', modelo: 'Tucson', anio: 2023, color: 'Verde', propietario: 'Valentina Castro', km: '15,900 km' },
];

export default function VehiculosListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = MOCK.filter((v) => v.placa.toLowerCase().includes(search.toLowerCase()) || v.marca.toLowerCase().includes(search.toLowerCase()) || v.propietario.toLowerCase().includes(search.toLowerCase()));
  const columns = [
    { key: 'placa', label: t('vehiculos.placa'), render: (v) => <strong style={{ color: 'var(--color-primary-light)' }}>{v}</strong> },
    { key: 'marca', label: t('vehiculos.marca') },
    { key: 'modelo', label: t('vehiculos.modelo') },
    { key: 'anio', label: t('vehiculos.anio') },
    { key: 'color', label: t('vehiculos.color') },
    { key: 'km', label: t('vehiculos.kilometraje') },
    { key: 'propietario', label: t('vehiculos.propietario') },
  ];
  return (
    <div className={styles.page}>
      <DataTable title={t('vehiculos.titulo')} columns={columns} data={filtered} searchValue={search} onSearchChange={setSearch} searchPlaceholder={t('vehiculos.buscar')} headerAction={{ label: t('vehiculos.nuevo'), icon: CarFront, onClick: () => navigate('/vehiculos/nuevo') }} emptyMessage={t('vehiculos.sinVehiculos')} emptyIcon={Car} actions={[
        { key: 'view', icon: Eye, label: t('common.ver'), onClick: (r) => navigate(`/vehiculos/${r.id}`) },
        { key: 'edit', icon: Pencil, label: t('common.editar'), onClick: (r) => navigate(`/vehiculos/${r.id}/editar`) },
        { key: 'delete', icon: Trash2, label: t('common.eliminar'), onClick: () => {} },
      ]} pagination={{ currentPage: 1, totalPages: 1, totalCount: filtered.length, pageSize: 10, onPageChange: () => {} }} />
    </div>
  );
}
