import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange, totalCount, pageSize }) {
  if (totalPages <= 1) return null;
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);
    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className={styles.container}>
      <span className={styles.info}>Mostrando {start}-{end} de {totalCount}</span>
      <div className={styles.buttons}>
        <button className={styles.btn} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft size={16} />
        </button>
        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className={styles.ellipsis}>...</span>
          ) : (
            <button key={p} className={`${styles.btn} ${p === currentPage ? styles.active : ''}`} onClick={() => onPageChange(p)}>
              {p}
            </button>
          )
        )}
        <button className={styles.btn} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
