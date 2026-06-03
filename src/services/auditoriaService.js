// ============================================================================
// AutoTallerManager - Auditoría (Audit Log) Service
// ============================================================================
// Read-only service — audit logs are system-generated and cannot be
// created, updated, or deleted by users.
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.AUDITORIA;

export const auditoriaService = {
  /**
   * Get all audit log entries with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search in descriptions or details
   * @param {string} [params.usuarioId] - Filter by user who performed the action
   * @param {string} [params.accion] - Filter by action type (e.g. 'CREATE', 'UPDATE', 'DELETE', 'LOGIN')
   * @param {string} [params.entidad] - Filter by entity type (e.g. 'Orden', 'Cliente', 'Vehiculo')
   * @param {string} [params.entidadId] - Filter by specific entity ID
   * @param {string} [params.fechaDesde] - From date (ISO string)
   * @param {string} [params.fechaHasta] - To date (ISO string)
   * @param {string} [params.sortBy] - Sort field (default: 'fecha')
   * @param {string} [params.sortOrder] - 'asc' | 'desc' (default: 'desc')
   * @returns {Promise<{
   *   data: Array<{
   *     id: string,
   *     fecha: string,
   *     usuario: { id: string, nombre: string, email: string },
   *     accion: string,
   *     entidad: string,
   *     entidadId: string,
   *     descripcion: string,
   *     detalles: Object,
   *     ip: string
   *   }>,
   *   totalCount: number,
   *   pageNumber: number,
   *   pageSize: number,
   *   totalPages: number
   * }>}
   */
  async getAll(params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      sortBy: params.sortBy || 'fecha',
      sortOrder: params.sortOrder || 'desc',
      ...params,
    };

    const { data } = await api.get(BASE_URL, { params: queryParams });
    return data;
  },

  /**
   * Get a single audit log entry by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Get audit logs for a specific entity (e.g. all changes to a particular order).
   *
   * @param {string} entidad - Entity type (e.g. 'Orden', 'Cliente')
   * @param {string|number} entidadId - Entity ID
   * @param {Object} [params] - Pagination params
   * @returns {Promise<Object>}
   */
  async getByEntity(entidad, entidadId, params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      entidad,
      entidadId,
      sortOrder: 'desc',
      ...params,
    };

    const { data } = await api.get(BASE_URL, { params: queryParams });
    return data;
  },

  /**
   * Get audit logs for a specific user.
   *
   * @param {string|number} usuarioId
   * @param {Object} [params] - Pagination params
   * @returns {Promise<Object>}
   */
  async getByUser(usuarioId, params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      usuarioId,
      sortOrder: 'desc',
      ...params,
    };

    const { data } = await api.get(BASE_URL, { params: queryParams });
    return data;
  },

  /**
   * Get the list of distinct action types for filtering.
   *
   * @returns {Promise<Array<string>>}
   */
  async getActionTypes() {
    const { data } = await api.get(`${BASE_URL}/action-types`);
    return data;
  },

  /**
   * Get the list of distinct entity types for filtering.
   *
   * @returns {Promise<Array<string>>}
   */
  async getEntityTypes() {
    const { data } = await api.get(`${BASE_URL}/entity-types`);
    return data;
  },

  /**
   * Export audit logs to a downloadable file (CSV or Excel).
   *
   * @param {Object} [params] - Same filter params as getAll
   * @param {'csv'|'xlsx'} [format='csv'] - Export format
   * @returns {Promise<Blob>}
   */
  async export(params = {}, format = 'csv') {
    const response = await api.get(`${BASE_URL}/export`, {
      params: { ...params, format },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default auditoriaService;
