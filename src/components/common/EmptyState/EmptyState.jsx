import React from 'react';
import { Inbox } from 'lucide-react';
import Button from '../Button/Button';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon: Icon = Inbox, title = 'Sin resultados', description, actionLabel, onAction }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrap}><Icon size={48} /></div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
