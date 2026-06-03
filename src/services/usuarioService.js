// ============================================================================
// AutoTallerManager - Usuario (User) Service
// ============================================================================

import api from './api';
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '../utils/constants';

const BASE_URL = API_ENDPOINTS.USUARIOS;

export const usuarioService = {
  /**
   * Get all users with pagination and optional filters.
   *
   * @param {Object} [params]
   * @param {number} [params.pageNumber]
   * @param {number} [params.pageSize]
   * @param {string} [params.search] - Search by name, email, cédula
   * @param {string} [params.role] - Filter by role
   * @param {boolean} [params.activo] - Filter by active status
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
   * Get a single user by ID.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const { data } = await api.get(`${BASE_URL}/${id}`);
    return data;
  },

  /**
   * Create a new user (admin action).
   *
   * @param {Object} userData
   * @param {string} userData.nombre
   * @param {string} userData.apellido
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} userData.cedula
   * @param {string} userData.telefono
   * @param {string} userData.role - One of ROLES values
   * @returns {Promise<Object>}
   */
  async create(userData) {
    const { data } = await api.post(BASE_URL, userData);
    return data;
  },

  /**
   * Update an existing user.
   *
   * @param {string|number} id
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async update(id, userData) {
    const { data } = await api.put(`${BASE_URL}/${id}`, userData);
    return data;
  },

  /**
   * Delete a user by ID.
   *
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Change a user's role.
   *
   * @param {string|number} id
   * @param {string} newRole - New role value (from ROLES constants)
   * @returns {Promise<Object>}
   */
  async changeRole(id, newRole) {
    const { data } = await api.patch(`${BASE_URL}/${id}/role`, { role: newRole });
    return data;
  },

  /**
   * Toggle a user's active/inactive status.
   *
   * @param {string|number} id
   * @returns {Promise<Object>} Updated user with new status
   */
  async toggleStatus(id) {
    const { data } = await api.patch(`${BASE_URL}/${id}/toggle-status`);
    return data;
  },

  /**
   * Get the current user's profile.
   *
   * @returns {Promise<Object>}
   */
  async getProfile() {
    const { data } = await api.get(`${BASE_URL}/profile`);
    return data;
  },

  /**
   * Update the current user's profile.
   *
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async updateProfile(profileData) {
    const { data } = await api.put(`${BASE_URL}/profile`, profileData);
    return data;
  },

  /**
   * Upload a profile avatar image.
   *
   * @param {File} file - Image file
   * @returns {Promise<Object>} Response with the avatar URL
   */
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await api.post(`${BASE_URL}/profile/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /**
   * Get users filtered by a specific role (convenience method).
   *
   * @param {string} role
   * @returns {Promise<Array>}
   */
  async getByRole(role) {
    const { data } = await api.get(BASE_URL, {
      params: { role, pageSize: 100 },
    });
    return data.data || data;
  },
};

export default usuarioService;
