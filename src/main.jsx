import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Principal */}
        <Route path="/" element={<Login />} />
        {/* Registro */}
        <Route path="/register" element={<Register />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Cualquier otra ruta → redirige a login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
