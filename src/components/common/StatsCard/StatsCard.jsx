import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './StatsCard.module.css';

export default function StatsCard({ title, value, icon: Icon, trend, trendDirection = 'up', color = 'blue', subtitle }) {
  const colorMap = {
    blue: { bg: 'rgba(37,99,235,0.15)', text: '#3B82F6' },
    green: { bg: 'rgba(16,185,129,0.15)', text: '#10B981' },
    amber: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
    red: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
    purple: { bg: 'rgba(139,92,246,0.15)', text: '#8B5CF6' },
    cyan: { bg: 'rgba(14,165,233,0.15)', text: '#0EA5E9' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.value}>{value}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        <div className={styles.iconWrap} style={{ background: c.bg, color: c.text }}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
      {trend !== undefined && (
        <div className={styles.trend}>
          {trendDirection === 'up' ? (
            <TrendingUp size={14} className={styles.trendUp} />
          ) : (
            <TrendingDown size={14} className={styles.trendDown} />
          )}
          <span className={trendDirection === 'up' ? styles.trendUp : styles.trendDown}>
            {trend}%
          </span>
          <span className={styles.trendLabel}>vs mes anterior</span>
        </div>
      )}
    </div>
  );
}
