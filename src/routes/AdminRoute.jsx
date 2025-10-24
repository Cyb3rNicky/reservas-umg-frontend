import { Navigate, Outlet } from 'react-router-dom';
import { getUser, getToken } from '../services/auth';

export default function AdminRoute() {
  const token = getToken();
  const user = getUser();
  const allowed = token && user && user.rol === 'admin';
  return allowed ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
