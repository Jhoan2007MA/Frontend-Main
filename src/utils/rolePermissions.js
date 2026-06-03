// ============================================================================
// AutoTallerManager - Role Permissions & Sidebar Configuration
// ============================================================================

import { ROLES } from './constants';

// ---------------------------------------------------------------------------
// Granular Permission Definitions per Role
// ---------------------------------------------------------------------------
// Each key maps to a feature area. Values can be:
//   - true/false  → full access / no access
//   - object      → granular { view, create, update, delete } control
// ---------------------------------------------------------------------------

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    dashboard: true,
    clientes: { view: true, create: true, update: true, delete: true },
    vehiculos: { view: true, create: true, update: true, delete: true },
    ordenes: { view: true, create: true, update: true, delete: true, approve: true, cancel: true, assign: true },
    repuestos: { view: true, create: true, update: true, delete: true },
    facturas: { view: true, create: true, update: true, delete: true, generate: true },
    pagos: { view: true, create: true, update: true, delete: true },
    usuarios: { view: true, create: true, update: true, delete: true, changeRole: true, toggleStatus: true },
    auditoria: { view: true },
    reportes: { view: true, export: true },
    configuracion: { view: true, update: true },
  },

  [ROLES.RECEPCIONISTA]: {
    dashboard: true,
    clientes: { view: true, create: true, update: true, delete: false },
    vehiculos: { view: true, create: true, update: true, delete: false },
    ordenes: { view: true, create: true, update: false, delete: false, approve: false, cancel: false, assign: false },
    repuestos: { view: true, create: false, update: false, delete: false },
    facturas: { view: true, create: true, update: false, delete: false, generate: true },
    pagos: { view: true, create: true, update: false, delete: false },
    usuarios: { view: false, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: false },
    reportes: { view: false, export: false },
    configuracion: { view: false, update: false },
  },

  [ROLES.MECANICO]: {
    dashboard: true,
    clientes: { view: true, create: false, update: false, delete: false },
    vehiculos: { view: true, create: false, update: false, delete: false },
    ordenes: { view: true, create: false, update: true, delete: false, approve: false, cancel: false, assign: false },
    repuestos: { view: true, create: false, update: false, delete: false },
    facturas: { view: false, create: false, update: false, delete: false, generate: false },
    pagos: { view: false, create: false, update: false, delete: false },
    usuarios: { view: false, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: false },
    reportes: { view: false, export: false },
    configuracion: { view: false, update: false },
  },

  [ROLES.JEFE_TALLER]: {
    dashboard: true,
    clientes: { view: true, create: false, update: false, delete: false },
    vehiculos: { view: true, create: false, update: false, delete: false },
    ordenes: { view: true, create: true, update: true, delete: false, approve: true, cancel: true, assign: true },
    repuestos: { view: true, create: false, update: false, delete: false },
    facturas: { view: true, create: false, update: false, delete: false, generate: false },
    pagos: { view: true, create: false, update: false, delete: false },
    usuarios: { view: true, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: true },
    reportes: { view: true, export: true },
    configuracion: { view: false, update: false },
  },

  [ROLES.JEFE_ALMACEN]: {
    dashboard: true,
    clientes: { view: false, create: false, update: false, delete: false },
    vehiculos: { view: false, create: false, update: false, delete: false },
    ordenes: { view: true, create: false, update: false, delete: false, approve: false, cancel: false, assign: false },
    repuestos: { view: true, create: true, update: true, delete: true },
    facturas: { view: true, create: false, update: false, delete: false, generate: false },
    pagos: { view: false, create: false, update: false, delete: false },
    usuarios: { view: false, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: false },
    reportes: { view: true, export: false },
    configuracion: { view: false, update: false },
  },

  [ROLES.JEFE_BODEGA]: {
    dashboard: true,
    clientes: { view: false, create: false, update: false, delete: false },
    vehiculos: { view: false, create: false, update: false, delete: false },
    ordenes: { view: true, create: false, update: false, delete: false, approve: false, cancel: false, assign: false },
    repuestos: { view: true, create: true, update: true, delete: false },
    facturas: { view: false, create: false, update: false, delete: false, generate: false },
    pagos: { view: false, create: false, update: false, delete: false },
    usuarios: { view: false, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: false },
    reportes: { view: true, export: false },
    configuracion: { view: false, update: false },
  },

  [ROLES.CLIENTE]: {
    dashboard: true,
    clientes: { view: false, create: false, update: false, delete: false },
    vehiculos: { view: true, create: false, update: false, delete: false },
    ordenes: { view: true, create: false, update: false, delete: false, approve: true, cancel: false, assign: false },
    repuestos: { view: false, create: false, update: false, delete: false },
    facturas: { view: true, create: false, update: false, delete: false, generate: false },
    pagos: { view: true, create: true, update: false, delete: false },
    usuarios: { view: false, create: false, update: false, delete: false, changeRole: false, toggleStatus: false },
    auditoria: { view: false },
    reportes: { view: false, export: false },
    configuracion: { view: false, update: false },
  },
};

// ---------------------------------------------------------------------------
// Sidebar Items per Role
// ---------------------------------------------------------------------------
// Each item: { key, label, icon, path }
// Items are ordered for display priority.
// ---------------------------------------------------------------------------

const ALL_SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { key: 'clientes', label: 'Clientes', icon: 'Users', path: '/clientes' },
  { key: 'vehiculos', label: 'Vehículos', icon: 'Car', path: '/vehiculos' },
  { key: 'ordenes', label: 'Órdenes de Trabajo', icon: 'ClipboardList', path: '/ordenes' },
  { key: 'repuestos', label: 'Repuestos', icon: 'Package', path: '/repuestos' },
  { key: 'facturas', label: 'Facturación', icon: 'FileText', path: '/facturas' },
  { key: 'pagos', label: 'Pagos', icon: 'CreditCard', path: '/pagos' },
  { key: 'usuarios', label: 'Usuarios', icon: 'UserCog', path: '/usuarios' },
  { key: 'auditoria', label: 'Auditoría', icon: 'ShieldCheck', path: '/auditoria' },
  { key: 'reportes', label: 'Reportes', icon: 'BarChart3', path: '/reportes' },
  { key: 'configuracion', label: 'Configuración', icon: 'Settings', path: '/configuracion' },
];

/**
 * Returns the sidebar items available for a given role.
 * Items are filtered based on the role's permissions (must have at least `view` access).
 *
 * @param {string} role - One of the ROLES values
 * @returns {Array<{key: string, label: string, icon: string, path: string}>}
 */
export function getSidebarItems(role) {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return [];

  return ALL_SIDEBAR_ITEMS.filter((item) => {
    const perm = permissions[item.key];
    if (perm === true) return true;
    if (perm && typeof perm === 'object' && perm.view) return true;
    return false;
  });
}

// Pre-built sidebar maps for convenience (avoids re-computing on every render)
export const SIDEBAR_ITEMS = Object.values(ROLES).reduce((acc, role) => {
  acc[role] = getSidebarItems(role);
  return acc;
}, {});

// ---------------------------------------------------------------------------
// Permission Helpers
// ---------------------------------------------------------------------------

/**
 * Check if a role has a specific permission.
 *
 * @param {string} role       - User role
 * @param {string} feature    - Feature key (e.g. 'ordenes')
 * @param {string} [action]   - Optional granular action (e.g. 'create')
 * @returns {boolean}
 */
export function hasPermission(role, feature, action) {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;

  const perm = permissions[feature];

  // Boolean shorthand: full access or no access
  if (typeof perm === 'boolean') return perm;

  // Object with granular actions
  if (perm && typeof perm === 'object') {
    if (!action) return perm.view ?? false;
    return perm[action] ?? false;
  }

  return false;
}

/**
 * Check if a role can access a specific route path.
 *
 * @param {string} role - User role
 * @param {string} path - Route path (e.g. '/clientes')
 * @returns {boolean}
 */
export function canAccessRoute(role, path) {
  const sidebarItems = SIDEBAR_ITEMS[role] || [];
  return sidebarItems.some((item) => path.startsWith(item.path));
}
