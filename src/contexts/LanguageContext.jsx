/**
 * @file LanguageContext.jsx
 * @description Context de idioma para AutoTallerManager.
 *
 * - Almacena el idioma actual ('es' | 'en') en localStorage.
 * - Idioma por defecto: 'es' (Español).
 * - Se integra con i18next para cambiar la traducción activa.
 * - Expone `language` y `toggleLanguage()`.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import i18n from '../config/i18n';

/* ───────────────────────── constants ───────────────────────── */

const STORAGE_KEY = 'att_language';
const VALID_LANGUAGES = ['es', 'en'];
const DEFAULT_LANGUAGE = 'es';

const LANGUAGE_LABELS = {
  es: 'Español',
  en: 'English',
};

/**
 * Read stored language or fall back to the default.
 */
function getInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGUAGES.includes(stored)) return stored;

    // Check browser language
    const browserLang = navigator.language?.slice(0, 2);
    if (browserLang && VALID_LANGUAGES.includes(browserLang)) return browserLang;
  } catch {
    // ignore
  }

  return DEFAULT_LANGUAGE;
}

/* ───────────────────────── context ──────────────────────── */

const LanguageContext = createContext(null);

/**
 * LanguageProvider – manages the active UI language.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  /* ──── Sync i18next & persist whenever language changes ──── */
  useEffect(() => {
    // Change i18next language (no-op if already set)
    if (i18n.language !== language) {
      i18n.changeLanguage(language).catch((err) => {
        console.error('[LanguageContext] i18n.changeLanguage failed:', err);
      });
    }

    // Update <html lang="…">
    document.documentElement.setAttribute('lang', language);

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  /* ──── Toggle between es ↔ en ──── */
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  /* ──── Set a specific language ──── */
  const setLanguage = useCallback((lang) => {
    if (VALID_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    } else {
      console.warn(
        `[LanguageContext] Idioma inválido: "${lang}". Use 'es' o 'en'.`
      );
    }
  }, []);

  /* ──── Derived helpers ──── */
  const languageLabel = LANGUAGE_LABELS[language] ?? language;
  const isSpanish = language === 'es';

  const value = useMemo(
    () => ({
      language,
      languageLabel,
      isSpanish,
      toggleLanguage,
      setLanguage,
      availableLanguages: VALID_LANGUAGES,
      languageLabels: LANGUAGE_LABELS,
    }),
    [language, languageLabel, isSpanish, toggleLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage – consume the LanguageContext.
 *
 * @returns {{
 *   language: 'es' | 'en',
 *   languageLabel: string,
 *   isSpanish: boolean,
 *   toggleLanguage: () => void,
 *   setLanguage: (lang: 'es' | 'en') => void,
 *   availableLanguages: string[],
 *   languageLabels: Record<string, string>,
 * }}
 */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage debe ser utilizado dentro de un <LanguageProvider>. ' +
        'Asegúrate de envolver tu aplicación con <LanguageProvider>.'
    );
  }

  return context;
}

export default LanguageContext;
