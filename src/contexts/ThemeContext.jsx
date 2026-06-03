/**
 * @file ThemeContext.jsx
 * @description Context de tema para AutoTallerManager.
 *
 * - Almacena el tema actual ('dark' | 'light') en localStorage.
 * - Tema por defecto: 'dark'.
 * - Sincroniza el atributo `data-theme` en <html>.
 * - Expone `theme` y `toggleTheme()`.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

/* ───────────────────────── constants ───────────────────────── */

const STORAGE_KEY = 'att_theme';
const VALID_THEMES = ['dark', 'light'];
const DEFAULT_THEME = 'dark';

/**
 * Read stored theme or fall back to the default.
 * Also respects `prefers-color-scheme` if no preference has been saved yet.
 */
function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored)) return stored;

    // Check OS preference
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // localStorage may be unavailable (SSR, privacy settings, etc.)
  }

  return DEFAULT_THEME;
}

/* ───────────────────────── context ──────────────────────── */

const ThemeContext = createContext(null);

/**
 * ThemeProvider – manages the active color theme.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  /* ──── Sync <html data-theme="…"> whenever theme changes ──── */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Also add/remove a class for convenience (some libs use .dark / .light)
    root.classList.remove('dark', 'light');
    root.classList.add(theme);

    // Update meta theme-color for mobile browsers
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        theme === 'dark' ? '#0a0a0f' : '#f4f6f9'
      );
    }

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  /* ──── Toggle between dark ↔ light ──── */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  /* ──── Set a specific theme ──── */
  const setThemeValue = useCallback((newTheme) => {
    if (VALID_THEMES.includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.warn(`[ThemeContext] Tema inválido: "${newTheme}". Use 'dark' o 'light'.`);
    }
  }, []);

  /* ──── Derived helpers ──── */
  const isDark = theme === 'dark';

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setTheme: setThemeValue,
    }),
    [theme, isDark, toggleTheme, setThemeValue]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * useTheme – consume the ThemeContext.
 *
 * @returns {{
 *   theme: 'dark' | 'light',
 *   isDark: boolean,
 *   toggleTheme: () => void,
 *   setTheme: (theme: 'dark' | 'light') => void,
 * }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme debe ser utilizado dentro de un <ThemeProvider>. ' +
        'Asegúrate de envolver tu aplicación con <ThemeProvider>.'
    );
  }

  return context;
}

export default ThemeContext;
