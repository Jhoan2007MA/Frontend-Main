import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, Wrench } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button/Button';
import LanguageToggle from '../../components/common/LanguageToggle/LanguageToggle';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError(t('errors.required')); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || t('errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.langCorner}><LanguageToggle /></div>

      <div className={styles.logoSection}>
        <div className={styles.logoIcon}><Wrench size={28} /></div>
        <h1 className={styles.title}>{t('app.title')}</h1>
        <p className={styles.subtitle}>{t('app.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Mail size={18} className={styles.inputIcon} />
          <input
            id="login-email"
            type="email"
            className={styles.input}
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <Lock size={18} className={styles.inputIcon} />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className={styles.input}
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
          {loading ? t('auth.loggingIn') : t('auth.loginButton')}
        </Button>

        <a href="#" className={styles.forgot}>{t('auth.forgotPassword')}</a>
      </form>
    </div>
  );
}
