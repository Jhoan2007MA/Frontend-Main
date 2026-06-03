/**
 * @file usePagination.js
 * @description Hook de paginación para AutoTallerManager.
 *
 * Uso:
 *   const {
 *     currentPage, totalPages, goToPage,
 *     nextPage, prevPage, hasNext, hasPrev,
 *   } = usePagination({ totalCount: 120, pageSize: 10 });
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * @param {object} options
 * @param {number} options.totalCount   - Total number of items.
 * @param {number} [options.pageSize=10] - Items per page.
 * @param {number} [options.initialPage=1] - Starting page (1-indexed).
 *
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   pageSize: number,
 *   startIndex: number,
 *   endIndex: number,
 *   goToPage: (page: number) => void,
 *   nextPage: () => void,
 *   prevPage: () => void,
 *   firstPage: () => void,
 *   lastPage: () => void,
 *   hasNext: boolean,
 *   hasPrev: boolean,
 *   setPageSize: (size: number) => void,
 * }}
 */
export function usePagination({
  totalCount = 0,
  pageSize: defaultPageSize = 10,
  initialPage = 1,
} = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(defaultPageSize);

  /* ──── Derived values ──── */

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / pageSize)),
    [totalCount, pageSize]
  );

  // Clamp currentPage if totalPages shrinks (e.g. after filtering)
  const safePage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (safePage !== currentPage) {
    // Sync in the same render pass (no infinite loop — value will match next time)
    setCurrentPage(safePage);
  }

  const hasNext = safePage < totalPages;
  const hasPrev = safePage > 1;

  // 0-indexed start / end useful for slicing local arrays
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalCount - 1);

  /* ──── Navigation helpers ──── */

  const goToPage = useCallback(
    (page) => {
      const target = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(target);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  /* ──── Page size change (resets to page 1) ──── */

  const setPageSize = useCallback((size) => {
    const newSize = Math.max(1, Number(size) || 10);
    setPageSizeState(newSize);
    setCurrentPage(1);
  }, []);

  return {
    currentPage: safePage,
    totalPages,
    pageSize,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    hasNext,
    hasPrev,
    setPageSize,
  };
}

export default usePagination;
