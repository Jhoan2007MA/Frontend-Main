import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, ClipboardList, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import Card from '../../components/common/Card/Card';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import styles from './AdminDashboard.module.css';

const ordersByStatus = [
  { name: 'Pendiente', value: 12, fill: '#F59E0B' },
  { name: 'Diagnóstico', value: 8, fill: '#3B82F6' },
  { name: 'En Proceso', value: 15, fill: '#6366F1' },
  { name: 'Completada', value: 23, fill: '#10B981' },
  { name: 'Cancelada', value: 3, fill: '#EF4444' },
];

const revenueData = [
  { month: 'Ene', ingresos: 4200000 }, { month: 'Feb', ingresos: 3800000 },
  { month: 'Mar', ingresos: 5100000 }, { month: 'Abr', ingresos: 4700000 },
  { month: 'May', ingresos: 5500000 }, { month: 'Jun', ingresos: 6200000 },
];

const recentOrders = [
  { id: 1, numero: 'ORD-001', vehiculo: 'Toyota Corolla 2023', cliente: 'Carlos Pérez', estado: 'EnProceso', fecha: '2026-06-02' },
  { id: 2, numero: 'ORD-002', vehiculo: 'Chevrolet Spark 2022', cliente: 'María López', estado: 'Pendiente', fecha: '2026-06-02' },
  { id: 3, numero: 'ORD-003', vehiculo: 'Renault Duster 2024', cliente: 'Juan García', estado: 'Diagnóstico', fecha: '2026-06-01' },
  { id: 4, numero: 'ORD-004', vehiculo: 'Mazda CX-5 2023', cliente: 'Ana Rodríguez', estado: 'Completada', fecha: '2026-06-01' },
  { id: 5, numero: 'ORD-005', vehiculo: 'Kia Sportage 2024', cliente: 'Pedro Martínez', estado: 'Aprobada', fecha: '2026-05-31' },
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <h1 className={styles.greeting}>
          {t('dashboard.bienvenido')}, <span className={styles.name}>{user?.name || 'Admin'}</span> 👋
        </h1>
        <p className={styles.date}>{new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatsCard title={t('dashboard.totalClientes')} value="248" icon={Users} trend={12} trendDirection="up" color="blue" />
        <StatsCard title={t('dashboard.ordenesActivas')} value="35" icon={ClipboardList} trend={8} trendDirection="up" color="amber" />
        <StatsCard title={t('dashboard.ingresosMes')} value="$6.2M" icon={DollarSign} trend={15} trendDirection="up" color="green" />
        <StatsCard title={t('dashboard.repuestosBajoStock')} value="7" icon={AlertTriangle} trend={3} trendDirection="down" color="red" />
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        <Card title="Órdenes por Estado" hoverable={false}>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ordersByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#F8FAFC' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {ordersByStatus.map((entry, i) => (
                    <Bar key={i} dataKey="value" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('dashboard.resumenMensual')} hoverable={false}>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 8, color: '#F8FAFC' }} formatter={(v) => [`$${(v).toLocaleString('es-CO')}`, 'Ingresos']} />
                <Area type="monotone" dataKey="ingresos" stroke="#2563EB" fill="url(#colorIngresos)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card
        title={t('dashboard.ordenesRecientes')}
        hoverable={false}
        action={
          <button className={styles.viewAll} onClick={() => navigate('/ordenes')}>
            Ver todas <ArrowRight size={14} />
          </button>
        }
      >
        <div className={styles.ordersList}>
          <table className={styles.miniTable}>
            <thead>
              <tr>
                <th>N° Orden</th>
                <th>Vehículo</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className={styles.orderRow} onClick={() => navigate(`/ordenes/${order.id}`)}>
                  <td className={styles.orderNum}>{order.numero}</td>
                  <td>{order.vehiculo}</td>
                  <td>{order.cliente}</td>
                  <td><StatusBadge status={order.estado} size="sm" /></td>
                  <td className={styles.dateCell}>{order.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
