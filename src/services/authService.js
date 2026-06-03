// ============================================================================
// AutoTallerManager - Authentication Service
// ============================================================================

import api from './api';
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants';

// ---------------------------------------------------------------------------
// JWT Decode Helper (no external dependency)
// ---------------------------------------------------------------------------

/**
 * Decode a JWT token payload without verifying the signature.
 * This is safe for reading claims on the client side.
 *
 * @param {string} token - JWT string
 * @returns {Object|null} Decoded payload or null if invalid
 */
function decodeJWT(token) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Handle base64url → base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired.
 *
 * @param {string} token - JWT string
 * @returns {boolean} True if the token is expired or invalid
 */
function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  // Add a 30-second buffer to account for clock drift
  const expiresAt = decoded.exp * 1000;
  return Date.now() >= expiresAt - 30000;
}

// ---------------------------------------------------------------------------
// Auth Service
// ---------------------------------------------------------------------------

export const authService = {
  /**
   * Log in with email/username and password.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ user: Object, accessToken: string, refreshToken: string }>}
   */
  async login(credentials) {
    const { data } = await api.post(`${API_ENDPOINTS.AUTH}/login`, credentials);

    const { accessToken, token, refreshToken, user } = data;
    const finalToken = accessToken || token;

    // Persist tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, finalToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }

    // Persist user data (from response or decoded token)
    const userData = user || decodeJWT(finalToken);
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    }

    return { user: userData, accessToken: finalToken, refreshToken };
  },

  /**
   * Register a new user account.
   *
   * @param {{ nombre: string, email: string, password: string, cedula: string, telefono: string }} data
   * @returns {Promise<Object>}
   */
  async register(data) {
    const response = await api.post(`${API_ENDPOINTS.AUTH}/register`, data);
    return response.data;
  },

  /**
   * Refresh the access token using the stored refresh token.
   *
   * @returns {Promise<{ accessToken: string, refreshToken?: string }>}
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await api.post(`${API_ENDPOINTS.AUTH}/refresh`, { refreshToken });

    const newAccessToken = data.accessToken || data.token;
    const newRefreshToken = data.refreshToken;

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
    if (newRefreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
    }

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  /**
   * Log out the current user.
   * Clears all persisted auth state.
   *
   * @param {boolean} [callApi=true] - Whether to also call the logout API endpoint
   * @returns {Promise<void>}
   */
  async logout(callApi = true) {
    try {
      if (callApi) {
        await api.post(`${API_ENDPOINTS.AUTH}/logout`).catch(() => {
          // Silently ignore API errors during logout
        });
      }
    } finally {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  /**
   * Get the currently authenticated user's data.
   * First tries localStorage, then decodes the access token.
   *
   * @returns {Object|null} User data or null if not authenticated
   */
  getCurrentUser() {
    try {
      // Try stored user data first
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) {
        const user = JSON.parse(stored);
        // Verify the token is still valid
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && !isTokenExpired(token)) {
          return user;
        }
      }

      // Fallback: decode token
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (token && !isTokenExpired(token)) {
        return decodeJWT(token);
      }

      return null;
    } catch {
      return null;
    }
  },

  /**
   * Check if the user is currently authenticated (has a valid token).
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token && !isTokenExpired(token);
  },

  /**
   * Get the stored access token.
   *
   * @returns {string|null}
   */
  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Change the current user's password.
   *
   * @param {{ currentPassword: string, newPassword: string, confirmPassword: string }} data
   * @returns {Promise<Object>}
   */
  async changePassword(data) {
    const response = await api.put(`${API_ENDPOINTS.AUTH}/change-password`, data);
    return response.data;
  },

  /**
   * Request a password reset email.
   *
   * @param {{ email: string }} data
   * @returns {Promise<Object>}
   */
  async forgotPassword(data) {
    const response = await api.post(`${API_ENDPOINTS.AUTH}/forgot-password`, data);
    return response.data;
  },

  /**
   * Reset the password with a token received via email.
   *
   * @param {{ token: string, newPassword: string, confirmPassword: string }} data
   * @returns {Promise<Object>}
   */
  async resetPassword(data) {
    const response = await api.post(`${API_ENDPOINTS.AUTH}/reset-password`, data);
    return response.data;
  },

  /**
   * Decode a token without verification (client-side only).
   *
   * @param {string} token
   * @returns {Object|null}
   */
  decodeToken(token) {
    return decodeJWT(token);
  },

  /**
   * Check if a token is expired.
   *
   * @param {string} token
   * @returns {boolean}
   */
  isTokenExpired(token) {
    return isTokenExpired(token);
  },
};

export default authService;
