import React from 'react';
import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth pages
import LoginPage from './pages/auth/LoginPage';

// Dashboard pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import RecepcionistaDashboard from './pages/dashboard/RecepcionistaDashboard';
import MecanicoDashboard from './pages/dashboard/MecanicoDashboard';
import JefeTallerDashboard from './pages/dashboard/JefeTallerDashboard';
import JefeAlmacenDashboard from './pages/dashboard/JefeAlmacenDashboard';
import JefeBodegaDashboard from './pages/dashboard/JefeBodegaDashboard';
import ClienteDashboard from './pages/dashboard/ClienteDashboard';

// CRUD pages
import ClientesListPage from './pages/clientes/ClientesListPage';
import ClienteFormPage from './pages/clientes/ClienteFormPage';
import ClienteDetailPage from './pages/clientes/ClienteDetailPage';
import VehiculosListPage from './pages/vehiculos/VehiculosListPage';
import VehiculoFormPage from './pages/vehiculos/VehiculoFormPage';
import VehiculoDetailPage from './pages/vehiculos/VehiculoDetailPage';
import OrdenesListPage from './pages/ordenes/OrdenesListPage';
import OrdenFormPage from './pages/ordenes/OrdenFormPage';
import OrdenDetailPage from './pages/ordenes/OrdenDetailPage';
import RepuestosListPage from './pages/repuestos/RepuestosListPage';
import RepuestoFormPage from './pages/repuestos/RepuestoFormPage';
import FacturasListPage from './pages/facturas/FacturasListPage';
import FacturaDetailPage from './pages/facturas/FacturaDetailPage';
import PagosListPage from './pages/pagos/PagosListPage';
import PagoFormPage from './pages/pagos/PagoFormPage';
import UsuariosListPage from './pages/usuarios/UsuariosListPage';
import UsuarioFormPage from './pages/usuarios/UsuarioFormPage';
import AuditoriasListPage from './pages/auditorias/AuditoriasListPage';
import NotFoundPage from './pages/NotFoundPage';

/* ─── Protected Route ─── */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

/* ─── Role Guard ─── */
function RoleGuard({ roles, children }) {
  const { role } = useAuth();
  if (!roles.includes(role)) return <Navigate to="/dashboard" replace />;
  return children;
}

/* ─── Dashboard Redirect ─── */
const ROLE_DASHBOARD = {
  Admin: '/dashboard/admin',
  Recepcionista: '/dashboard/recepcionista',
  'Mecánico': '/dashboard/mecanico',
  JefeTaller: '/dashboard/jefe-taller',
  JefeAlmacen: '/dashboard/jefe-almacen',
  JefeBodega: '/dashboard/jefe-bodega',
  Cliente: '/dashboard/cliente',
};

function DashboardRedirect() {
  const { role } = useAuth();
  const target = ROLE_DASHBOARD[role] || '/dashboard/cliente';
  return <Navigate to={target} replace />;
}

/* ─── Router ─── */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardRedirect /> },

      // Role-based dashboards
      { path: 'dashboard/admin', element: <RoleGuard roles={['Admin']}><AdminDashboard /></RoleGuard> },
      { path: 'dashboard/recepcionista', element: <RoleGuard roles={['Recepcionista']}><RecepcionistaDashboard /></RoleGuard> },
      { path: 'dashboard/mecanico', element: <RoleGuard roles={['Mecánico']}><MecanicoDashboard /></RoleGuard> },
      { path: 'dashboard/jefe-taller', element: <RoleGuard roles={['JefeTaller']}><JefeTallerDashboard /></RoleGuard> },
      { path: 'dashboard/jefe-almacen', element: <RoleGuard roles={['JefeAlmacen']}><JefeAlmacenDashboard /></RoleGuard> },
      { path: 'dashboard/jefe-bodega', element: <RoleGuard roles={['JefeBodega']}><JefeBodegaDashboard /></RoleGuard> },
      { path: 'dashboard/cliente', element: <RoleGuard roles={['Cliente']}><ClienteDashboard /></RoleGuard> },

      // Clientes
      { path: 'clientes', element: <RoleGuard roles={['Admin', 'Recepcionista']}><ClientesListPage /></RoleGuard> },
      { path: 'clientes/nuevo', element: <RoleGuard roles={['Admin', 'Recepcionista']}><ClienteFormPage /></RoleGuard> },
      { path: 'clientes/:id', element: <RoleGuard roles={['Admin', 'Recepcionista']}><ClienteDetailPage /></RoleGuard> },
      { path: 'clientes/:id/editar', element: <RoleGuard roles={['Admin', 'Recepcionista']}><ClienteFormPage /></RoleGuard> },

      // Vehículos
      { path: 'vehiculos', element: <RoleGuard roles={['Admin', 'Recepcionista', 'JefeTaller']}><VehiculosListPage /></RoleGuard> },
      { path: 'vehiculos/nuevo', element: <RoleGuard roles={['Admin', 'Recepcionista']}><VehiculoFormPage /></RoleGuard> },
      { path: 'vehiculos/:id', element: <RoleGuard roles={['Admin', 'Recepcionista', 'JefeTaller']}><VehiculoDetailPage /></RoleGuard> },
      { path: 'vehiculos/:id/editar', element: <RoleGuard roles={['Admin', 'Recepcionista']}><VehiculoFormPage /></RoleGuard> },

      // Órdenes
      { path: 'ordenes', element: <RoleGuard roles={['Admin', 'Recepcionista', 'JefeTaller', 'Mecánico', 'Cliente']}><OrdenesListPage /></RoleGuard> },
      { path: 'ordenes/nueva', element: <RoleGuard roles={['Admin', 'JefeTaller']}><OrdenFormPage /></RoleGuard> },
      { path: 'ordenes/:id', element: <RoleGuard roles={['Admin', 'JefeTaller', 'Mecánico', 'Cliente']}><OrdenDetailPage /></RoleGuard> },

      // Repuestos
      { path: 'repuestos', element: <RoleGuard roles={['Admin', 'JefeAlmacen', 'JefeBodega', 'JefeTaller']}><RepuestosListPage /></RoleGuard> },
      { path: 'repuestos/nuevo', element: <RoleGuard roles={['Admin', 'JefeBodega']}><RepuestoFormPage /></RoleGuard> },
      { path: 'repuestos/:id/editar', element: <RoleGuard roles={['Admin', 'JefeBodega']}><RepuestoFormPage /></RoleGuard> },

      // Facturas
      { path: 'facturas', element: <RoleGuard roles={['Admin', 'Recepcionista', 'Cliente']}><FacturasListPage /></RoleGuard> },
      { path: 'facturas/:id', element: <RoleGuard roles={['Admin', 'Recepcionista', 'Cliente']}><FacturaDetailPage /></RoleGuard> },

      // Pagos
      { path: 'pagos', element: <RoleGuard roles={['Admin', 'Recepcionista']}><PagosListPage /></RoleGuard> },
      { path: 'pagos/nuevo', element: <RoleGuard roles={['Admin', 'Recepcionista', 'Cliente']}><PagoFormPage /></RoleGuard> },

      // Usuarios
      { path: 'usuarios', element: <RoleGuard roles={['Admin']}><UsuariosListPage /></RoleGuard> },
      { path: 'usuarios/nuevo', element: <RoleGuard roles={['Admin']}><UsuarioFormPage /></RoleGuard> },
      { path: 'usuarios/:id/editar', element: <RoleGuard roles={['Admin']}><UsuarioFormPage /></RoleGuard> },

      // Auditorías
      { path: 'auditorias', element: <RoleGuard roles={['Admin']}><AuditoriasListPage /></RoleGuard> },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
