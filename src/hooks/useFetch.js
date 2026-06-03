/**
 * @file useFetch.js
 * @description Hook personalizado para llamadas a la API.
 *
 * Uso básico:
 *   const { data, loading, error, refetch } = useFetch(() => vehicleService.getAll());
 *
 * Con paginación (el servicio devuelve { data, headers }):
 *   const { data, loading, error, totalCount, refetch } = useFetch(
 *     () => vehicleService.getAll({ page: 1, limit: 10 }),
 *     { extractTotal: true }
 *   );
 *
 * Con parámetros dependientes:
 *   const { data } = useFetch(
 *     () => vehicleService.getById(id),
 *     { deps: [id], enabled: !!id }
 *   );
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @param {Function} serviceFn
 *   A function that returns a Promise. It should resolve with the data directly
 *   or with an object shaped like { data, headers } for pagination.
 *
 * @param {object}  [options]
 * @param {Array}   [options.deps=[]]       - Dependency array; refetches when these change.
 * @param {boolean} [options.enabled=true]   - Set to false to skip the initial fetch.
 * @param {boolean} [options.extractTotal]   - If true, tries to read X-Total-Count header.
 * @param {*}       [options.initialData=null] - Value for `data` before the first fetch.
 * @param {boolean} [options.keepPreviousData=false] - Keep stale data while refetching.
 *
 * @returns {{
 *   data: any,
 *   loading: boolean,
 *   error: string | null,
 *   totalCount: number | null,
 *   refetch: () => Promise<void>,
 * }}
 */
export function useFetch(serviceFn, options = {}) {
  const {
    deps = [],
    enabled = true,
    extractTotal = false,
    initialData = null,
    keepPreviousData = false,
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  // Keep the latest serviceFn in a ref so the effect doesn't need it as a dep
  const serviceFnRef = useRef(serviceFn);
  serviceFnRef.current = serviceFn;

  // AbortController ref for cancellation
  const abortRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    if (!keepPreviousData) {
      setError(null);
    }

    try {
      const result = await serviceFnRef.current(controller.signal);

      // Don't update state if this request was cancelled
      if (controller.signal.aborted) return;

      // Handle responses that include both data and headers (Axios-style)
      if (result && typeof result === 'object' && 'data' in result && 'headers' in result) {
        setData(result.data);

        if (extractTotal) {
          const total =
            result.headers?.['x-total-count'] ??
            result.headers?.['X-Total-Count'] ??
            result.data?.totalCount ??
            result.data?.total ??
            null;

          setTotalCount(total !== null ? Number(total) : null);
        }
      } else {
        // Plain data
        setData(result);

        if (extractTotal && result && typeof result === 'object') {
          const total = result.totalCount ?? result.total ?? null;
          setTotalCount(total !== null ? Number(total) : null);
        }
      }

      setError(null);
    } catch (err) {
      // Ignore abort errors
      if (err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') return;

      if (!controller.signal.aborted) {
        const message =
          err.response?.data?.message ??
          err.message ??
          'Error al obtener los datos';
        setError(message);
        console.error('[useFetch] Error:', err);

        if (!keepPreviousData) {
          setData(initialData);
        }
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extractTotal, keepPreviousData, initialData]);

  /* ──── Auto-fetch on mount / deps change ──── */
  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    fetchData();

    return () => {
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, fetchData, ...deps]);

  return { data, loading, error, totalCount, refetch: fetchData };
}

export default useFetch;
