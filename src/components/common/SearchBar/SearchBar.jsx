import React from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className={styles.wrap}>
      <Search size={18} className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
