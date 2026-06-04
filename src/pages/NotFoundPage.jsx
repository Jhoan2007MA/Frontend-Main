import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.shapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.description}>La página que buscas no existe o fue movida.</p>
        <div className={styles.actions}>
          <Button icon={ArrowLeft} variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
          <Button icon={Home} variant="primary" onClick={() => navigate('/dashboard')}>Ir al inicio</Button>
        </div>
      </div>
    </div>
  );
}
