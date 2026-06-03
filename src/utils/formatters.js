// ============================================================================
// AutoTallerManager - Formatting Utilities
// ============================================================================

/**
 * Format a number as Colombian Peso (COP) currency.
 *
 * @param {number|string} amount - The amount to format
 * @param {boolean} [showSymbol=true] - Whether to include the $ symbol
 * @returns {string} Formatted currency string, e.g. "$ 1.250.000"
 */
export function formatCurrency(amount, showSymbol = true) {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return showSymbol ? '$ 0' : '0';
  }

  const num = Number(amount);

  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);

  if (!showSymbol) {
    // Remove the currency symbol and any non-breaking spaces
    return formatted.replace(/[^0-9.,]/g, '').trim();
  }

  return formatted;
}

/**
 * Format a date as DD/MM/YYYY.
 *
 * @param {string|Date|number} date - Date input
 * @returns {string} Formatted date, e.g. "25/12/2025"
 */
export function formatDate(date) {
  if (!date) return '—';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '—';

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  } catch {
    return '—';
  }
}

/**
 * Format a date as DD/MM/YYYY HH:mm.
 *
 * @param {string|Date|number} date - Date input
 * @returns {string} Formatted datetime, e.g. "25/12/2025 14:30"
 */
export function formatDateTime(date) {
  if (!date) return '—';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '—';

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  } catch {
    return '—';
  }
}

/**
 * Format a date as a relative time string in Spanish.
 *
 * @param {string|Date|number} date - Date input
 * @returns {string} Relative time, e.g. "hace 5 min", "hace 2 horas", "hace 3 días"
 */
export function formatRelativeTime(date) {
  if (!date) return '—';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '—';

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Future dates
    if (diffMs < 0) {
      const absDiffMs = Math.abs(diffMs);
      const absDiffMinutes = Math.floor(absDiffMs / 60000);
      const absDiffHours = Math.floor(absDiffMinutes / 60);
      const absDiffDays = Math.floor(absDiffHours / 24);

      if (absDiffMinutes < 1) return 'en unos segundos';
      if (absDiffMinutes < 60) return `en ${absDiffMinutes} min`;
      if (absDiffHours < 24) return `en ${absDiffHours} hora${absDiffHours > 1 ? 's' : ''}`;
      return `en ${absDiffDays} día${absDiffDays > 1 ? 's' : ''}`;
    }

    // Past dates
    if (diffSeconds < 30) return 'justo ahora';
    if (diffSeconds < 60) return 'hace unos segundos';
    if (diffMinutes < 60) return `hace ${diffMinutes} min`;
    if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffWeeks < 4) return `hace ${diffWeeks} semana${diffWeeks > 1 ? 's' : ''}`;
    if (diffMonths < 12) return `hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    return `hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
  } catch {
    return '—';
  }
}

/**
 * Format a Colombian phone number.
 * Input: "3001234567" → Output: "300 123 4567"
 * Input: "6012345678" → Output: "(601) 234 5678"
 *
 * @param {string} phone - Phone number digits
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '—';

  // Strip non-digits
  const digits = String(phone).replace(/\D/g, '');

  // Colombian mobile: 10 digits starting with 3
  if (digits.length === 10 && digits.startsWith('3')) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // Colombian landline: 10 digits starting with 60x
  if (digits.length === 10 && digits.startsWith('60')) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // International format with country code +57
  if (digits.length === 12 && digits.startsWith('57')) {
    const national = digits.slice(2);
    return `+57 ${formatPhoneNumber(national)}`;
  }

  // Fallback: return as-is with basic grouping
  return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
}

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} str - Input string
 * @returns {string} String with first letter capitalized
 */
export function capitalizeFirst(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate text to a maximum length, appending "…" if truncated.
 *
 * @param {string} text - Input text
 * @param {number} [maxLength=100] - Maximum length before truncation
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Format a document number (cédula) with thousand separators.
 * Input: "1234567890" → Output: "1.234.567.890"
 *
 * @param {string|number} cedula - Document number
 * @returns {string} Formatted document number
 */
export function formatCedula(cedula) {
  if (!cedula) return '—';

  const digits = String(cedula).replace(/\D/g, '');
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format a vehicle license plate in Colombian format.
 * Input: "abc123" → Output: "ABC-123"
 *
 * @param {string} placa - License plate
 * @returns {string} Formatted plate
 */
export function formatPlaca(placa) {
  if (!placa) return '—';

  const clean = String(placa).replace(/[^A-Za-z0-9]/g, '').toUpperCase();

  if (clean.length === 6) {
    return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  }

  return clean;
}

/**
 * Format a file size in bytes to a human-readable string.
 *
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size, e.g. "1.5 MB"
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
