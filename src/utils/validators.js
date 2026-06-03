// ============================================================================
// AutoTallerManager - Validation Utilities
// ============================================================================
// Every validator returns { isValid: boolean, error: string | null }
// This consistent shape makes it easy to integrate with form libraries.
// ============================================================================

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the value passed validation
 * @property {string|null} error - Human-readable error message (Spanish) or null
 */

/**
 * Validate an email address.
 *
 * @param {string} email
 * @returns {ValidationResult}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    return { isValid: false, error: 'El correo electrónico es obligatorio.' };
  }

  const trimmed = email.trim();
  // RFC 5322 simplified pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'El formato del correo electrónico no es válido.' };
  }

  // Basic domain check
  const domain = trimmed.split('@')[1];
  if (!domain || !domain.includes('.')) {
    return { isValid: false, error: 'El dominio del correo electrónico no es válido.' };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a password.
 * Requirements: min 8 characters, at least 1 uppercase, 1 lowercase, 1 number.
 *
 * @param {string} password
 * @returns {ValidationResult}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'La contraseña es obligatoria.' };
  }

  const errors = [];

  if (password.length < 8) {
    errors.push('al menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('una letra mayúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('una letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('un número');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      error: `La contraseña debe contener ${errors.join(', ')}.`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a password confirmation (matches original).
 *
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {ValidationResult}
 */
export function validatePasswordConfirm(password, confirmPassword) {
  if (!confirmPassword) {
    return { isValid: false, error: 'La confirmación de contraseña es obligatoria.' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Las contraseñas no coinciden.' };
  }
  return { isValid: true, error: null };
}

/**
 * Validate a Colombian cédula (documento de identidad).
 * Accepts 6 to 10 digit numbers.
 *
 * @param {string|number} cedula
 * @returns {ValidationResult}
 */
export function validateCedula(cedula) {
  if (!cedula) {
    return { isValid: false, error: 'El número de cédula es obligatorio.' };
  }

  const digits = String(cedula).replace(/\D/g, '');

  if (digits.length < 6 || digits.length > 10) {
    return { isValid: false, error: 'La cédula debe tener entre 6 y 10 dígitos.' };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a Colombian phone number.
 * Accepts 10-digit numbers starting with 3 (mobile) or 60 (landline).
 *
 * @param {string|number} phone
 * @returns {ValidationResult}
 */
export function validatePhone(phone) {
  if (!phone) {
    return { isValid: false, error: 'El número de teléfono es obligatorio.' };
  }

  const digits = String(phone).replace(/\D/g, '');

  // Remove country code if present
  const national = digits.startsWith('57') && digits.length === 12
    ? digits.slice(2)
    : digits;

  if (national.length !== 10) {
    return { isValid: false, error: 'El número de teléfono debe tener 10 dígitos.' };
  }

  if (!national.startsWith('3') && !national.startsWith('60')) {
    return {
      isValid: false,
      error: 'El número debe iniciar con 3 (celular) o 60 (fijo).',
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a Vehicle Identification Number (VIN).
 * Standard VIN is exactly 17 alphanumeric characters (no I, O, Q).
 *
 * @param {string} vin
 * @returns {ValidationResult}
 */
export function validateVIN(vin) {
  if (!vin || typeof vin !== 'string' || !vin.trim()) {
    return { isValid: false, error: 'El número VIN es obligatorio.' };
  }

  const clean = vin.trim().toUpperCase();

  if (clean.length !== 17) {
    return { isValid: false, error: 'El VIN debe tener exactamente 17 caracteres.' };
  }

  // VIN cannot contain I, O, Q
  if (/[IOQ]/.test(clean)) {
    return { isValid: false, error: 'El VIN no puede contener las letras I, O o Q.' };
  }

  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  if (!vinRegex.test(clean)) {
    return { isValid: false, error: 'El VIN contiene caracteres no válidos.' };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a Colombian vehicle license plate (placa).
 * Standard format: 3 letters + 3 digits (e.g. ABC123) or
 * motorcycle format: 3 letters + 2 digits + 1 letter (e.g. ABC12D).
 *
 * @param {string} placa
 * @returns {ValidationResult}
 */
export function validatePlaca(placa) {
  if (!placa || typeof placa !== 'string' || !placa.trim()) {
    return { isValid: false, error: 'La placa del vehículo es obligatoria.' };
  }

  const clean = placa.trim().replace(/[-\s]/g, '').toUpperCase();

  // Car: 3 letters + 3 digits
  const carRegex = /^[A-Z]{3}[0-9]{3}$/;
  // Motorcycle: 3 letters + 2 digits + 1 letter
  const motoRegex = /^[A-Z]{3}[0-9]{2}[A-Z]$/;

  if (!carRegex.test(clean) && !motoRegex.test(clean)) {
    return {
      isValid: false,
      error: 'La placa debe tener formato ABC123 (vehículo) o ABC12D (moto).',
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate that a required field has a value.
 *
 * @param {*} value - The value to check
 * @param {string} fieldName - Human-readable field name for the error message
 * @returns {ValidationResult}
 */
export function validateRequired(value, fieldName) {
  if (value === null || value === undefined) {
    return { isValid: false, error: `${fieldName} es obligatorio.` };
  }

  if (typeof value === 'string' && !value.trim()) {
    return { isValid: false, error: `${fieldName} es obligatorio.` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, error: `Debe seleccionar al menos un ${fieldName.toLowerCase()}.` };
  }

  return { isValid: true, error: null };
}

/**
 * Validate a numeric value within a range.
 *
 * @param {number|string} value - The value to validate
 * @param {string} fieldName - Human-readable field name
 * @param {Object} [options]
 * @param {number} [options.min] - Minimum allowed value
 * @param {number} [options.max] - Maximum allowed value
 * @param {boolean} [options.integer=false] - Whether the value must be an integer
 * @returns {ValidationResult}
 */
export function validateNumber(value, fieldName, options = {}) {
  const { min, max, integer = false } = options;

  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} es obligatorio.` };
  }

  const num = Number(value);

  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} debe ser un número válido.` };
  }

  if (integer && !Number.isInteger(num)) {
    return { isValid: false, error: `${fieldName} debe ser un número entero.` };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `${fieldName} debe ser mayor o igual a ${min}.` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `${fieldName} debe ser menor o igual a ${max}.` };
  }

  return { isValid: true, error: null };
}

/**
 * Run multiple validators on a form data object.
 *
 * @param {Object} data - Form data
 * @param {Object<string, function>} validationRules - Map of field names to validator functions
 * @returns {{ isValid: boolean, errors: Object<string, string> }}
 *
 * @example
 * const { isValid, errors } = validateForm(formData, {
 *   email: (v) => validateEmail(v),
 *   password: (v) => validatePassword(v),
 *   nombre: (v) => validateRequired(v, 'Nombre'),
 * });
 */
export function validateForm(data, validationRules) {
  const errors = {};
  let isValid = true;

  for (const [field, validator] of Object.entries(validationRules)) {
    const result = validator(data[field], data);
    if (!result.isValid) {
      isValid = false;
      errors[field] = result.error;
    }
  }

  return { isValid, errors };
}
