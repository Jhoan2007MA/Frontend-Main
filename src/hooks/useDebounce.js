/**
 * @file useDebounce.js
 * @description Hook de debounce para inputs de búsqueda en AutoTallerManager.
 *
 * Uso:
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 300);
 *
 *   useEffect(() => {
 *     // Este efecto solo se ejecuta 300ms después de que el usuario deja de escribir
 *     fetchResults(debouncedSearch);
 *   }, [debouncedSearch]);
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value.
 *
 * @param {*}      value  - The rapidly-changing value to debounce.
 * @param {number} [delay=300] - Debounce delay in milliseconds.
 * @returns {*} The debounced value (updates only after `delay` ms of inactivity).
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the debounce timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear on cleanup (value or delay changed before timer fired)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function.
 *
 * Useful when you need to debounce an action (e.g. API call) rather than a value.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number}   [delay=300] - Debounce delay in milliseconds.
 * @returns {Function} A debounced version of the callback.
 */
export function useDebounceCallback(callback, delay = 300) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  // Always keep the latest callback
  callbackRef.current = callback;

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedFn;
}

export default useDebounce;
