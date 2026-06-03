// ============================================================================
// AutoTallerManager - Repuesto (Spare Part) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.REPUESTOS;

export const repuestoService = {
  /**
   * Get all spare parts with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search by name, code, brand
   * @param {string} [params.categoria] - Filter by category
   * @param {boolean} [params.stockBajo] - Filter low-stock items
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
   * Get a single spare part by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new spare part.
   *
   * @param {Object} partData
   * @param {string} partData.nombre
   * @param {string} partData.codigo
   * @param {string} [partData.marca]
   * @param {string} [partData.categoria]
   * @param {number} partData.precio
   * @param {number} partData.stock
   * @param {number} [partData.stockMinimo]
   * @param {string} [partData.descripcion]
   * @returns {Promise<Object>}
   */
  async create(partData) {
    const { data } = await api.post(BASE_URL, partData);
    return data;
  },

  /**
   * Update an existing spare part.
   *
   * @param {string|number} id
   * @param {Object} partData
   * @returns {Promise<Object>}
   */
  async update(id, partData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, partData);
    return data;
  },

  /**
   * Delete a spare part by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Search spare parts by name, code, or brand.
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
   * Get all spare parts with low stock (below minimum threshold).
   *
   * @returns {Promise<Array>}
   */
  async getLowStock() {
    const { data } = await api.get(`${BASE_URL}/low-stock`);
    return data;
  },

  /**
   * Update the stock quantity for a spare part.
   *
   * @param {string|number} id
   * @param {Object} stockData
   * @param {number} stockData.cantidad - Quantity to add (positive) or subtract (negative)
   * @param {string} [stockData.motivo] - Reason for adjustment
   * @returns {Promise<Object>}
   */
  async updateStock(id, stockData) {
    const { data } = await api.patch(`${BASE_URL}/${id}/stock`, stockData);
    return data;
  },

  /**
   * Get available categories for spare parts.
   *
   * @returns {Promise<Array<string>>}
   */
  async getCategories() {
    const { data } = await api.get(`${BASE_URL}/categories`);
    return data;
  },
};

export default repuestoService;
