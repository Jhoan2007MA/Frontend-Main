// ============================================================================
// AutoTallerManager - Factura (Invoice) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.FACTURAS;

export const facturaService = {
  /**
   * Get all invoices with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search by invoice number or client
   * @param {string} [params.status] - Filter by invoice status
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
   * Get a single invoice by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new invoice.
   *
   * @param {Object} invoiceData
   * @param {string} invoiceData.ordenId - Related work order
   * @param {string} invoiceData.clienteId
   * @param {Array}  [invoiceData.items] - Invoice line items
   * @param {number} [invoiceData.descuento] - Discount amount
   * @param {string} [invoiceData.observaciones]
   * @returns {Promise<Object>}
   */
  async create(invoiceData) {
    const { data } = await api.post(BASE_URL, invoiceData);
    return data;
  },

  /**
   * Update an existing invoice.
   *
   * @param {string|number} id
   * @param {Object} invoiceData
   * @returns {Promise<Object>}
   */
  async update(id, invoiceData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, invoiceData);
    return data;
  },

  /**
   * Delete an invoice by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Generate an invoice from a completed work order.
   * This creates the invoice automatically based on the order's services and parts.
   *
   * @param {string|number} ordenId - Work order ID to generate invoice from
   * @param {Object} [options]
   * @param {number} [options.descuento] - Optional discount
   * @param {string} [options.observaciones]
   * @returns {Promise<Object>} Generated invoice
   */
  async generate(ordenId, options = {}) {
    const { data } = await api.post(`${BASE_URL}/generate`, {
      ordenId,
      ...options,
    });
    return data;
  },

  /**
   * Download an invoice as PDF.
   *
   * @param {string|number} id
   * @returns {Promise<Blob>} PDF blob
   */
  async downloadPDF(id) {
    const response = await api.get(`${BASE_URL}/${id}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Send an invoice via email to the client.
   *
   * @param {string|number} id
   * @param {Object} [emailData]
   * @param {string} [emailData.email] - Override client email
   * @param {string} [emailData.mensaje] - Custom email message
   * @returns {Promise<Object>}
   */
  async sendByEmail(id, emailData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/send`, emailData);
    return data;
  },

  /**
   * Void / annul an invoice.
   *
   * @param {string|number} id
   * @param {Object} [anulacionData]
   * @param {string} [anulacionData.motivo] - Reason for annulment
   * @returns {Promise<Object>}
   */
  async annul(id, anulacionData = {}) {
    const { data } = await api.post(`${BASE_URL}/${id}/annul`, anulacionData);
    return data;
  },
};

export default facturaService;
