import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import DashboardLayout from './ui/DashboardLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import EventosIndex from './pages/eventos/Index';
import EventosCreate from './pages/eventos/Create';
import EventosEdit from './pages/eventos/Edit';

export const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/eventos', element: <Home /> },

          {
            element: <AdminRoute />,
            children: [
              { path: '/admin/eventos', element: <EventosIndex /> },
              { path: '/admin/eventos/create', element: <EventosCreate /> },
              { path: '/admin/eventos/:id/edit', element: <EventosEdit /> },
            ],
          },
        ],
      },
    ],
  },
]);
