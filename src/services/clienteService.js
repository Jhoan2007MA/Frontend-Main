// ============================================================================
// AutoTallerManager - Cliente (Client) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.CLIENTES;

export const clienteService = {
  /**
   * Get all clients with pagination and optional search/filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search by name, email, or cédula
   * @param {string} [params.sortBy]
   * @param {string} [params.sortOrder] - 'asc' | 'desc'
   * @returns {Promise<{ data: Array, totalCount: number, pageNumber: number, pageSize: number, totalPages: number }>}
   */
  async getAll(params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      ...params,
    };

    const { data } = await api.get(BASE_URL, { params: queryParams });
    return data;
  },

  /**
   * Get a single client by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new client.
   *
   * @param {Object} clientData
   * @param {string} clientData.nombre
   * @param {string} clientData.apellido
   * @param {string} clientData.cedula
   * @param {string} clientData.email
   * @param {string} clientData.telefono
   * @param {string} [clientData.direccion]
   * @returns {Promise<Object>} Created client
   */
  async create(clientData) {
    const { data } = await api.post(BASE_URL, clientData);
    return data;
  },

  /**
   * Update an existing client.
   *
   * @param {string|number} id
   * @param {Object} clientData - Partial or full client data
   * @returns {Promise<Object>} Updated client
   */
  async update(id, clientData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, clientData);
    return data;
  },

  /**
   * Delete a client by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Search clients by a query string (name, cédula, email).
   *
   * @param {string} query
   * @param {number} [limit=10] - Max results
   * @returns {Promise<Array>}
   */
  async search(query, limit = 10) {
    const { data } = await api.get(`${BASE_URL}/search`, {
      params: { q: query, limit },
    });
    return data;
  },

  /**
   * Get all vehicles belonging to a specific client.
   *
   * @param {string|number} clientId
   * @returns {Promise<Array>}
   */
  async getVehiculos(clientId) {
    const { data } = await api.get(`${BASE_URL}/${clientId}/vehiculos`);
    return data;
  },

  /**
   * Get the order history for a specific client.
   *
   * @param {string|number} clientId
   * @param {Object} [params] - Pagination params
   * @returns {Promise<Object>}
   */
  async getOrdenes(clientId, params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      ...params,
    };

    const { data } = await api.get(`${BASE_URL}/${clientId}/ordenes`, {
      params: queryParams,
    });
    return data;
  },
};

export default clienteService;
