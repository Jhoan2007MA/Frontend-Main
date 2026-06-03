// ============================================================================
// AutoTallerManager - Vehículo (Vehicle) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.VEHICULOS;

export const vehiculoService = {
  /**
   * Get all vehicles with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search by placa, VIN, marca, modelo
   * @param {string} [params.clienteId] - Filter by client
   * @param {string} [params.sortBy]
   * @param {string} [params.sortOrder]
   * @returns {Promise<Object>}
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
   * Get a single vehicle by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new vehicle.
   *
   * @param {Object} vehicleData
   * @param {string} vehicleData.placa
   * @param {string} vehicleData.marca
   * @param {string} vehicleData.modelo
   * @param {number} vehicleData.año
   * @param {string} [vehicleData.vin]
   * @param {string} [vehicleData.color]
   * @param {number} [vehicleData.kilometraje]
   * @param {string} vehicleData.clienteId
   * @returns {Promise<Object>}
   */
  async create(vehicleData) {
    const { data } = await api.post(BASE_URL, vehicleData);
    return data;
  },

  /**
   * Update an existing vehicle.
   *
   * @param {string|number} id
   * @param {Object} vehicleData
   * @returns {Promise<Object>}
   */
  async update(id, vehicleData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, vehicleData);
    return data;
  },

  /**
   * Delete a vehicle by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Search vehicles by placa or VIN.
   *
   * @param {string} query
   * @param {number} [limit=10]
   * @returns {Promise<Array>}
   */
  async search(query, limit = 10) {
    const { data } = await api.get(`${BASE_URL}/search`, {
      params: { q: query, limit },
    });
    return data;
  },

  /**
   * Get the service/order history for a specific vehicle.
   *
   * @param {string|number} vehicleId
   * @param {Object} [params]
   * @returns {Promise<Object>}
   */
  async getHistorial(vehicleId, params = {}) {
    const queryParams = {
      pageNumber: params.pageNumber || PAGINATION_DEFAULTS.pageNumber,
      pageSize: params.pageSize || PAGINATION_DEFAULTS.pageSize,
      ...params,
    };

    const { data } = await api.get(`${BASE_URL}/${vehicleId}/historial`, {
      params: queryParams,
    });
    return data;
  },

  /**
   * Look up a vehicle by its license plate.
   *
   * @param {string} placa
   * @returns {Promise<Object|null>}
   */
  async getByPlaca(placa) {
    const { data } = await api.get(`${BASE_URL}/placa/${encodeURIComponent(placa)}`);
    return data;
  },
};

export default vehiculoService;
