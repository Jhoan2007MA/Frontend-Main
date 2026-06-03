// ============================================================================
// AutoTallerManager - Axios API Instance
// ============================================================================
// Central Axios instance with interceptors for:
//   - JWT Bearer token injection
//   - Automatic token refresh on 401
//   - Rate-limit handling (429)
//   - Global error toast notifications
// ============================================================================

import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

// ---------------------------------------------------------------------------
// Create Axios Instance
// ---------------------------------------------------------------------------

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// ---------------------------------------------------------------------------
// Token Refresh State
// ---------------------------------------------------------------------------

let isRefreshing = false;
let failedRequestQueue = [];

/**
 * Process all queued requests once the token has been refreshed.
 */
function processQueue(error, token = null) {
  failedRequestQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedRequestQueue = [];
}

// ---------------------------------------------------------------------------
// Request Interceptor — inject Authorization header
// ---------------------------------------------------------------------------

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Response Interceptor — handle errors globally
// ---------------------------------------------------------------------------

api.interceptors.response.use(
  // Successful responses pass through
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // -----------------------------------------------------------------------
    // 401 Unauthorized — attempt token refresh
    // -----------------------------------------------------------------------
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we are already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        const newAccessToken = data.accessToken || data.token;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
        }

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Clear auth state and redirect to login
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        // Emit a custom event so the auth context can react
        window.dispatchEvent(new CustomEvent('auth:session-expired'));

        // Only redirect if not already on login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // -----------------------------------------------------------------------
    // 429 Too Many Requests — rate limit
    // -----------------------------------------------------------------------
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const message = retryAfter
        ? `Demasiadas solicitudes. Intente de nuevo en ${retryAfter} segundos.`
        : 'Demasiadas solicitudes. Por favor, espere un momento.';

      showToast(message, 'warning');
      return Promise.reject(error);
    }

    // -----------------------------------------------------------------------
    // 403 Forbidden
    // -----------------------------------------------------------------------
    if (error.response?.status === 403) {
      showToast('No tiene permisos para realizar esta acción.', 'error');
      return Promise.reject(error);
    }

    // -----------------------------------------------------------------------
    // 500+ Server Errors
    // -----------------------------------------------------------------------
    if (error.response?.status >= 500) {
      showToast('Error interno del servidor. Intente de nuevo más tarde.', 'error');
      return Promise.reject(error);
    }

    // -----------------------------------------------------------------------
    // Network / timeout errors
    // -----------------------------------------------------------------------
    if (!error.response) {
      showToast('Error de conexión. Verifique su conexión a internet.', 'error');
      return Promise.reject(error);
    }

    // -----------------------------------------------------------------------
    // Other errors — extract message from response body
    // -----------------------------------------------------------------------
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.response?.data?.error ||
      'Ha ocurrido un error inesperado.';

    showToast(serverMessage, 'error');

    return Promise.reject(error);
  },
);

// ---------------------------------------------------------------------------
// Toast Helper
// ---------------------------------------------------------------------------
// This is a lightweight abstraction so the API layer can trigger UI toasts
// without a hard dependency on any toast library. The app should register a
// handler via `setToastHandler`. If none is registered, it falls back to
// dispatching a custom DOM event that a toast provider can listen for.
// ---------------------------------------------------------------------------

let toastHandler = null;

/**
 * Register a global toast handler.
 * Typically called once from the app's toast provider.
 *
 * @param {function({ message: string, type: string }): void} handler
 */
export function setToastHandler(handler) {
  toastHandler = handler;
}

/**
 * Show a toast notification.
 *
 * @param {string} message - The message to display
 * @param {'success'|'error'|'warning'|'info'} type - Toast type
 */
function showToast(message, type = 'error') {
  if (typeof toastHandler === 'function') {
    toastHandler({ message, type });
    return;
  }

  // Fallback: dispatch a custom event
  window.dispatchEvent(
    new CustomEvent('app:toast', {
      detail: { message, type },
    }),
  );
}

export default api;
