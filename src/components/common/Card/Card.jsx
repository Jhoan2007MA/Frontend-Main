import React from 'react';
import styles from './Card.module.css';

export default function Card({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  className = '',
  hoverable = true,
  padding = true,
}) {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}>
      {(title || action) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {Icon && (
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      <div className={`${styles.body} ${padding ? styles.padded : ''}`}>
        {children}
      </div>
    </div>
  );
}
