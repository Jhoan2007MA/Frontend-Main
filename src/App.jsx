import React from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRouter from './router/AppRouter'

/**
 * App — Root component.
 *
 * Provider hierarchy (outermost → innermost):
 *   LanguageProvider  →  ThemeProvider  →  AuthProvider  →  AppRouter
 *
 * LanguageProvider sits at the top so every child (including auth
 * error messages) can access translated strings.
 */
export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />

          {/* Global toast container — dark‑mode styling */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                color: '#f1f5f9',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontFamily: "'Inter', sans-serif",
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              },
              success: {
                iconTheme: { primary: '#22c55e', secondary: '#0f172a' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#0f172a' },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
