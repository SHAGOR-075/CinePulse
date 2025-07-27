import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Movies from './pages/Movies'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Layout from './components/Layout/Layout'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/movies" element={
              <ProtectedRoute>
                <Layout>
                  <Movies />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/movies/add" element={
              <ProtectedRoute>
                <Layout>
                  <AddMovie />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/movies/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <EditMovie />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
