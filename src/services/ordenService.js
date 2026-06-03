// ============================================================================
// AutoTallerManager - Orden de Trabajo (Work Order) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.ORDENES;

export const ordenService = {
  /**
   * Get all work orders with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search]
   * @param {string} [params.status] - Filter by order status
   * @param {string} [params.mecanicoId] - Filter by assigned mechanic
   * @param {string} [params.clienteId] - Filter by client
   * @param {string} [params.fechaDesde] - Filter from date (ISO)
   * @param {string} [params.fechaHasta] - Filter to date (ISO)
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
   * Get a single work order by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new work order.
   *
   * @param {Object} orderData
   * @param {string} orderData.vehiculoId
   * @param {string} orderData.clienteId
   * @param {string} [orderData.descripcion]
   * @param {string} [orderData.observaciones]
   * @param {number} [orderData.kilometrajeEntrada]
   * @returns {Promise<Object>}
   */
  async create(orderData) {
    const { data } = await api.post(BASE_URL, orderData);
    return data;
  },

  /**
   * Update an existing work order.
   *
   * @param {string|number} id
   * @param {Object} orderData
   * @returns {Promise<Object>}
   */
  async update(id, orderData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, orderData);
    return data;
  },

  /**
   * Delete a work order by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  // -------------------------------------------------------------------------
  // Workflow Actions
  // -------------------------------------------------------------------------

  /**
   * Approve a work order (transition to Aprobada).
   *
   * @param {string|number} id
   * @param {Object} [approvalData] - Optional approval notes
   * @returns {Promise<Object>}
   */
  async approve(id, approvalData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/approve`, approvalData);
    return data;
  },

  /**
   * Cancel a work order.
   *
   * @param {string|number} id
   * @param {Object} [cancellationData]
   * @param {string} [cancellationData.motivo] - Cancellation reason
   * @returns {Promise<Object>}
   */
  async cancel(id, cancellationData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/cancel`, cancellationData);
    return data;
  },

  /**
   * Close / complete a work order.
   *
   * @param {string|number} id
   * @param {Object} [closeData]
   * @param {string} [closeData.observaciones] - Closing notes
   * @param {number} [closeData.kilometrajeSalida]
   * @returns {Promise<Object>}
   */
  async close(id, closeData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/close`, closeData);
    return data;
  },

  /**
   * Assign a mechanic to a work order.
   *
   * @param {string|number} orderId
   * @param {string|number} mecanicoId
   * @returns {Promise<Object>}
   */
  async assignMechanic(orderId, mecanicoId) {
    const { data } = await api.post(`${BASE_URL}/${orderId}/assign`, { mecanicoId });
    return data;
  },

  /**
   * Register a diagnostic for a work order.
   *
   * @param {string|number} orderId
   * @param {Object} diagnosticData
   * @param {string} diagnosticData.descripcion - Diagnostic description
   * @param {Array}  [diagnosticData.repuestos] - Required spare parts
   * @param {number} [diagnosticData.costoEstimado] - Estimated cost
   * @param {number} [diagnosticData.tiempoEstimado] - Estimated time in hours
   * @returns {Promise<Object>}
   */
  async registerDiagnostic(orderId, diagnosticData) {
    const { data } = await api.post(`${BASE_URL}/${orderId}/diagnostic`, diagnosticData);
    return data;
  },

  /**
   * Update the status of a work order.
   *
   * @param {string|number} id
   * @param {string} status - New status value
   * @param {Object} [statusData] - Additional data for the status change
   * @returns {Promise<Object>}
   */
  async updateStatus(id, status, statusData = {}) {
    const { data } = await api.patch(`${BASE_URL}/${id}/status`, {
      status,
      ...statusData,
    });
    return data;
  },

  /**
   * Get available mechanics for assignment.
   *
   * @returns {Promise<Array>}
   */
  async getAvailableMechanics() {
    const { data } = await api.get(`${BASE_URL}/mechanics/available`);
    return data;
  },

  /**
   * Add a note/comment to a work order.
   *
   * @param {string|number} orderId
   * @param {Object} noteData
   * @param {string} noteData.contenido - Note content
   * @returns {Promise<Object>}
   */
  async addNote(orderId, noteData) {
    const { data } = await api.post(`${BASE_URL}/${orderId}/notes`, noteData);
    return data;
  },

  /**
   * Get the timeline/history of a work order.
   *
   * @param {string|number} orderId
   * @returns {Promise<Array>}
   */
  async getTimeline(orderId) {
    const { data } = await api.get(`${BASE_URL}/${orderId}/timeline`);
    return data;
  },
};

export default ordenService;
