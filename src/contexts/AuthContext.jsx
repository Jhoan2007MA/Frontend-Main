/**
 * @file AuthContext.jsx
 * @description Context de autenticación para AutoTallerManager.
 *
 * Responsabilidades:
 *  - Almacenar tokens (access / refresh) en localStorage.
 *  - Decodificar el JWT para exponer datos del usuario (userId, email, role, name).
 *  - Proveer helpers: login, logout, refreshAuth.
 *  - Exponer estados: isAuthenticated, user, role, loading.
 *
 * Roles soportados:
 *   Admin | Recepcionista | Mecánico | JefeTaller | JefeAlmacen | JefeBodega | Cliente
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import authService from '../services/authService';

/* ───────────────────────── helpers ───────────────────────── */

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'att_access_token',
  REFRESH_TOKEN: 'att_refresh_token',
};

/**
 * Decode a JWT payload without external dependencies.
 * Handles URL-safe base-64 characters (+/-).
 *
 * @param {string} token - A signed JWT string.
 * @returns {object|null} Decoded payload or null on failure.
 */
function decodeJwt(token) {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Replace URL-safe chars and pad with '='
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) base64 += '='.repeat(4 - pad);

    const decoded = atob(base64);
    const payload = JSON.parse(
      decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );

    return payload;
  } catch {
    console.error('[AuthContext] Failed to decode JWT');
    return null;
  }
}

/**
 * Extract normalized user data from a JWT payload.
 *
 * The mapping is flexible — it checks multiple common claim names so it works
 * regardless of whether the backend uses "sub", "userId", "user_id", etc.
 */
function extractUserFromPayload(payload) {
  if (!payload) return null;

  return {
    userId:
      payload.userId ??
      payload.user_id ??
      payload.sub ??
      payload.id ??
      null,
    email:
      payload.email ??
      payload.correo ??
      payload.mail ??
      null,
    role:
      payload.role ??
      payload.rol ??
      payload.roles?.[0] ??
      null,
    name:
      payload.name ??
      payload.nombre ??
      payload.fullName ??
      payload.full_name ??
      [payload.firstName, payload.lastName].filter(Boolean).join(' ') ||
      null,
  };
}

/**
 * Check whether a JWT expiry timestamp is still in the future.
 * Adds a 30-second buffer to avoid edge cases.
 */
function isTokenValid(payload) {
  if (!payload?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now + 30; // 30 s buffer
}

/* ───────────────────────── context ──────────────────────── */

const AuthContext = createContext(null);

/**
 * AuthProvider – wraps the app and provides authentication state + helpers.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true); // true while rehydrating

  /* ──── Persist / clear tokens ──── */

  const persistTokens = useCallback((access, refresh) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    if (refresh) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
    }
  }, []);

  const clearTokens = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }, []);

  /* ──── Process tokens → derive user ──── */

  const processTokens = useCallback((access, refresh) => {
    const payload = decodeJwt(access);

    if (!payload || !isTokenValid(payload)) {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      return false;
    }

    const userData = extractUserFromPayload(payload);
    setUser(userData);
    setAccessToken(access);
    setRefreshToken(refresh ?? null);
    return true;
  }, []);

  /* ──── Rehydrate on mount ──── */

  useEffect(() => {
    const init = async () => {
      try {
        const storedAccess = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (!storedAccess) return;

        const payload = decodeJwt(storedAccess);

        if (payload && isTokenValid(payload)) {
          processTokens(storedAccess, storedRefresh);
          return;
        }

        // Access expired — attempt refresh
        if (storedRefresh) {
          try {
            const res = await authService.refreshToken(storedRefresh);
            const newAccess = res.accessToken ?? res.access_token ?? res.token;
            const newRefresh =
              res.refreshToken ?? res.refresh_token ?? storedRefresh;

            if (newAccess && processTokens(newAccess, newRefresh)) {
              persistTokens(newAccess, newRefresh);
              return;
            }
          } catch {
            console.warn('[AuthContext] Token refresh failed during init');
          }
        }

        // Nothing worked — clean up
        clearTokens();
      } catch (err) {
        console.error('[AuthContext] Init error:', err);
        clearTokens();
      } finally {
        setLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ──── login ──── */

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const res = await authService.login({ email, password });

        const access = res.accessToken ?? res.access_token ?? res.token;
        const refresh =
          res.refreshToken ?? res.refresh_token ?? null;

        if (!access) {
          throw new Error('No se recibió token de acceso');
        }

        const ok = processTokens(access, refresh);

        if (!ok) {
          throw new Error('Token inválido recibido del servidor');
        }

        persistTokens(access, refresh);
        return { success: true };
      } catch (err) {
        console.error('[AuthContext] Login failed:', err);
        return {
          success: false,
          error:
            err.response?.data?.message ??
            err.message ??
            'Error al iniciar sesión',
        };
      } finally {
        setLoading(false);
      }
    },
    [processTokens, persistTokens]
  );

  /* ──── logout ──── */

  const logout = useCallback(async () => {
    try {
      // Best-effort server-side logout
      if (accessToken) {
        await authService.logout?.().catch(() => {});
      }
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      clearTokens();

      // Navigate to login
      window.location.href = '/login';
    }
  }, [accessToken, clearTokens]);

  /* ──── refreshAuth ──── */

  const refreshAuth = useCallback(async () => {
    const currentRefresh =
      refreshToken ?? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!currentRefresh) {
      logout();
      return false;
    }

    try {
      const res = await authService.refreshToken(currentRefresh);
      const newAccess = res.accessToken ?? res.access_token ?? res.token;
      const newRefresh =
        res.refreshToken ?? res.refresh_token ?? currentRefresh;

      if (!newAccess) {
        throw new Error('No access token in refresh response');
      }

      const ok = processTokens(newAccess, newRefresh);
      if (ok) {
        persistTokens(newAccess, newRefresh);
        return true;
      }

      throw new Error('Refreshed token is invalid');
    } catch (err) {
      console.error('[AuthContext] Refresh failed:', err);
      logout();
      return false;
    }
  }, [refreshToken, processTokens, persistTokens, logout]);

  /* ──── Derived values ──── */

  const isAuthenticated = Boolean(user && accessToken);
  const role = user?.role ?? null;

  /* ──── Memoized context value ──── */

  const value = useMemo(
    () => ({
      // State
      user,
      role,
      accessToken,
      refreshToken,
      isAuthenticated,
      loading,

      // Actions
      login,
      logout,
      refreshAuth,
    }),
    [
      user,
      role,
      accessToken,
      refreshToken,
      isAuthenticated,
      loading,
      login,
      logout,
      refreshAuth,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth – consume the AuthContext anywhere inside the provider tree.
 *
 * @returns {{
 *   user: { userId: string, email: string, role: string, name: string } | null,
 *   role: string | null,
 *   accessToken: string | null,
 *   refreshToken: string | null,
 *   isAuthenticated: boolean,
 *   loading: boolean,
 *   login: (email: string, password: string) => Promise<{ success: boolean, error?: string }>,
 *   logout: () => Promise<void>,
 *   refreshAuth: () => Promise<boolean>,
 * }}
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth debe ser utilizado dentro de un <AuthProvider>. ' +
        'Asegúrate de envolver tu aplicación con <AuthProvider>.'
    );
  }

  return context;
}

export default AuthContext;
