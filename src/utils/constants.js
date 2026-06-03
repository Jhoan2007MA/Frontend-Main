// ============================================================================
// AutoTallerManager - Application Constants
// ============================================================================

// ---------------------------------------------------------------------------
// User Roles
// ---------------------------------------------------------------------------
export const ROLES = {
  ADMIN: 'Admin',
  RECEPCIONISTA: 'Recepcionista',
  MECANICO: 'Mecánico',
  JEFE_TALLER: 'JefeTaller',
  JEFE_ALMACEN: 'JefeAlmacen',
  JEFE_BODEGA: 'JefeBodega',
  CLIENTE: 'Cliente',
};

// ---------------------------------------------------------------------------
// Order Statuses
// ---------------------------------------------------------------------------
export const ORDER_STATUS = {
  PENDIENTE: 'Pendiente',
  DIAGNOSTICO: 'Diagnóstico',
  EN_APROBACION: 'EnAprobacion',
  APROBADA: 'Aprobada',
  EN_PROCESO: 'EnProceso',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
};

// ---------------------------------------------------------------------------
// Order Status Config (label, color, icon)
// ---------------------------------------------------------------------------
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDIENTE]: {
    label: 'Pendiente',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    icon: 'clock',
  },
  [ORDER_STATUS.DIAGNOSTICO]: {
    label: 'Diagnóstico',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    icon: 'search',
  },
  [ORDER_STATUS.EN_APROBACION]: {
    label: 'En Aprobación',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    icon: 'clipboard-check',
  },
  [ORDER_STATUS.APROBADA]: {
    label: 'Aprobada',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    icon: 'check-circle',
  },
  [ORDER_STATUS.EN_PROCESO]: {
    label: 'En Proceso',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    icon: 'wrench',
  },
  [ORDER_STATUS.COMPLETADA]: {
    label: 'Completada',
    color: '#22C55E',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    icon: 'check-double',
  },
  [ORDER_STATUS.CANCELADA]: {
    label: 'Cancelada',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    icon: 'x-circle',
  },
};

// ---------------------------------------------------------------------------
// Payment Methods
// ---------------------------------------------------------------------------
export const PAYMENT_METHODS = {
  EFECTIVO: 'Efectivo',
  TARJETA_CREDITO: 'TarjetaCredito',
  TARJETA_DEBITO: 'TarjetaDebito',
  TRANSFERENCIA: 'Transferencia',
  NEQUI: 'Nequi',
  DAVIPLATA: 'Daviplata',
};

export const PAYMENT_METHODS_CONFIG = {
  [PAYMENT_METHODS.EFECTIVO]: {
    label: 'Efectivo',
    icon: 'banknotes',
  },
  [PAYMENT_METHODS.TARJETA_CREDITO]: {
    label: 'Tarjeta de Crédito',
    icon: 'credit-card',
  },
  [PAYMENT_METHODS.TARJETA_DEBITO]: {
    label: 'Tarjeta de Débito',
    icon: 'credit-card',
  },
  [PAYMENT_METHODS.TRANSFERENCIA]: {
    label: 'Transferencia Bancaria',
    icon: 'building-library',
  },
  [PAYMENT_METHODS.NEQUI]: {
    label: 'Nequi',
    icon: 'device-phone-mobile',
  },
  [PAYMENT_METHODS.DAVIPLATA]: {
    label: 'Daviplata',
    icon: 'device-phone-mobile',
  },
};

// ---------------------------------------------------------------------------
// Payment Statuses
// ---------------------------------------------------------------------------
export const PAYMENT_STATUS = {
  PENDIENTE: 'Pendiente',
  PARCIAL: 'Parcial',
  PAGADO: 'Pagado',
  REEMBOLSADO: 'Reembolsado',
  ANULADO: 'Anulado',
};

export const PAYMENT_STATUS_CONFIG = {
  [PAYMENT_STATUS.PENDIENTE]: {
    label: 'Pendiente',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
  [PAYMENT_STATUS.PARCIAL]: {
    label: 'Parcial',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
  },
  [PAYMENT_STATUS.PAGADO]: {
    label: 'Pagado',
    color: '#22C55E',
    bgColor: 'rgba(34, 197, 94, 0.15)',
  },
  [PAYMENT_STATUS.REEMBOLSADO]: {
    label: 'Reembolsado',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
  },
  [PAYMENT_STATUS.ANULADO]: {
    label: 'Anulado',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
  },
};

// ---------------------------------------------------------------------------
// Invoice Statuses
// ---------------------------------------------------------------------------
export const INVOICE_STATUS = {
  BORRADOR: 'Borrador',
  EMITIDA: 'Emitida',
  PAGADA: 'Pagada',
  VENCIDA: 'Vencida',
  ANULADA: 'Anulada',
};

export const INVOICE_STATUS_CONFIG = {
  [INVOICE_STATUS.BORRADOR]: {
    label: 'Borrador',
    color: '#94A3B8',
    bgColor: 'rgba(148, 163, 184, 0.15)',
    icon: 'pencil',
  },
  [INVOICE_STATUS.EMITIDA]: {
    label: 'Emitida',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    icon: 'paper-airplane',
  },
  [INVOICE_STATUS.PAGADA]: {
    label: 'Pagada',
    color: '#22C55E',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    icon: 'check-circle',
  },
  [INVOICE_STATUS.VENCIDA]: {
    label: 'Vencida',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    icon: 'exclamation-triangle',
  },
  [INVOICE_STATUS.ANULADA]: {
    label: 'Anulada',
    color: '#6B7280',
    bgColor: 'rgba(107, 114, 128, 0.15)',
    icon: 'x-circle',
  },
};

// ---------------------------------------------------------------------------
// Pagination Defaults
// ---------------------------------------------------------------------------
export const PAGINATION_DEFAULTS = {
  pageNumber: 1,
  pageSize: 10,
};

// ---------------------------------------------------------------------------
// API Endpoints (base paths)
// ---------------------------------------------------------------------------
export const API_ENDPOINTS = {
  AUTH: '/auth',
  CLIENTES: '/clientes',
  VEHICULOS: '/vehiculos',
  ORDENES: '/ordenes',
  REPUESTOS: '/repuestos',
  FACTURAS: '/facturas',
  PAGOS: '/pagos',
  USUARIOS: '/usuarios',
  AUDITORIA: '/auditoria',
};

// ---------------------------------------------------------------------------
// Local Storage Keys
// ---------------------------------------------------------------------------
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
};

// ---------------------------------------------------------------------------
// Toast Notification Durations (ms)
// ---------------------------------------------------------------------------
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};
