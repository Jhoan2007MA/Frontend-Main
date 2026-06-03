// ============================================================================
// AutoTallerManager - Pago (Payment) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.PAGOS;

export const pagoService = {
  /**
   * Get all payments with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search]
   * @param {string} [params.status] - Payment status filter
   * @param {string} [params.metodoPago] - Payment method filter
   * @param {string} [params.facturaId]
   * @param {string} [params.clienteId]
   * @param {string} [params.fechaDesde]
   * @param {string} [params.fechaHasta]
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
   * Get a single payment by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new payment record.
   *
   * @param {Object} paymentData
   * @param {string} paymentData.facturaId
   * @param {number} paymentData.monto
   * @param {string} paymentData.metodoPago - One of PAYMENT_METHODS values
   * @param {string} [paymentData.referencia] - Transaction reference
   * @param {string} [paymentData.observaciones]
   * @returns {Promise<Object>}
   */
  async create(paymentData) {
    const { data } = await api.post(BASE_URL, paymentData);
    return data;
  },

  /**
   * Update an existing payment.
   *
   * @param {string|number} id
   * @param {Object} paymentData
   * @returns {Promise<Object>}
   */
  async update(id, paymentData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, paymentData);
    return data;
  },

  /**
   * Delete a payment by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Register a payment against an invoice.
   * This is the primary payment flow — creates the payment and updates
   * the invoice's payment status (Parcial or Pagado).
   *
   * @param {Object} paymentData
   * @param {string} paymentData.facturaId
   * @param {number} paymentData.monto
   * @param {string} paymentData.metodoPago
   * @param {string} [paymentData.referencia]
   * @param {string} [paymentData.observaciones]
   * @returns {Promise<Object>} The registered payment with updated invoice status
   */
  async registerPayment(paymentData) {
    const { data } = await api.post(`${BASE_URL}/register`, paymentData);
    return data;
  },

  /**
   * Get all payments associated with a specific invoice.
   *
   * @param {string|number} facturaId
   * @returns {Promise<Array>}
   */
  async getByFactura(facturaId) {
    const { data } = await api.get(`${BASE_URL}/factura/${facturaId}`);
    return data;
  },

  /**
   * Request a refund for a payment.
   *
   * @param {string|number} id
   * @param {Object} [refundData]
   * @param {number} [refundData.monto] - Partial refund amount (omit for full refund)
   * @param {string} [refundData.motivo]
   * @returns {Promise<Object>}
   */
  async refund(id, refundData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/refund`, refundData);
    return data;
  },

  /**
   * Download a payment receipt as PDF.
   *
   * @param {string|number} id
   * @returns {Promise<Blob>}
   */
  async downloadReceipt(id) {
    const response = await api.get(`${BASE_URL}/${id}/receipt`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default pagoService;
