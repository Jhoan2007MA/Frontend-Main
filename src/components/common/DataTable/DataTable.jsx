import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Button/Button';
import styles from './DataTable.module.css';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No hay registros',
  emptyIcon,
  onRowClick,
  actions = [],
  pagination,
  searchValue = '',
  onSearchChange,
  searchPlaceholder,
  headerAction,
  title,
}) {
  const defaultActions = [
    { key: 'view', icon: Eye, label: 'Ver', variant: 'ghost' },
    { key: 'edit', icon: Pencil, label: 'Editar', variant: 'ghost' },
    { key: 'delete', icon: Trash2, label: 'Eliminar', variant: 'ghost' },
  ];
  const resolvedActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={styles.container}>
      {/* Header */}
      {(title || onSearchChange || headerAction) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
          <div className={styles.headerRight}>
            {onSearchChange && (
              <SearchBar value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
            )}
            {headerAction && (
              <Button variant="primary" icon={headerAction.icon} onClick={headerAction.onClick}>
                {headerAction.label}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.th} style={col.width ? { width: col.width } : {}}>
                  {col.label}
                </th>
              ))}
              {resolvedActions.length > 0 && <th className={styles.th} style={{ width: '120px' }}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`skel-${i}`} className={styles.tr}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      <div className={styles.skeleton}></div>
                    </td>
                  ))}
                  {resolvedActions.length > 0 && (
                    <td className={styles.td}><div className={styles.skeleton}></div></td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (resolvedActions.length > 0 ? 1 : 0)}>
                  <EmptyState title={emptyMessage} icon={emptyIcon} />
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className={`${styles.tr} ${onRowClick ? styles.clickable : ''}`}
                  onClick={() => onRowClick?.(row)}
                  style={{ animationDelay: `${rowIdx * 30}ms` }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {resolvedActions.length > 0 && (
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        {resolvedActions.map((action) => {
                          if (action.show && !action.show(row)) return null;
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={action.key || action.label}
                              className={`${styles.actionBtn} ${action.key === 'delete' ? styles.deleteBtn : ''}`}
                              onClick={(e) => { e.stopPropagation(); action.onClick?.(row); }}
                              title={action.label}
                            >
                              <ActionIcon size={16} />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.footer}>
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
}
