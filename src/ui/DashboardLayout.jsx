import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/auth';
import Logo from '../../public/logo_umg.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout() {
  const user = getUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = user?.rol === 'admin';

  // Navegación dinámica según rol
  const navigation = [
    { name: 'Eventos', href: '/eventos' },
    { name: 'Mis Reservas', href: '/reservas' },
    { name: 'Mis Boletos', href: '/boletos' },
    ...(isAdmin ? [{ name: 'Administrar Eventos', href: '/admin/eventos' }] : []),
  ];

  const userNavigation = [
    // Puedes agregar "Perfil", "Ajustes", etc. aquí si luego los implementas
    { name: 'Cerrar sesión', onClick: handleLogout },
  ];

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  // Título simple según ruta (opcional: puedes refinarlo si más adelante quieres títulos por página)
  const pageTitle =
    pathname.startsWith('/admin/eventos') ? 'Administración de Eventos' : 'Eventos';

  return (
    <div className="min-h-full">
      <div className="relative bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-white/10">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                {/* Branding + Nav */}
                <div className="flex items-center">
                  <div className="shrink-0">
                    <img
                      alt="Reservas UMG"
                      src={Logo}
                      className="size-8"
                    />
                  </div>

                  {/* Desktop nav */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop actions */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Notificaciones (placeholder) */}
                    {/* <button
                      type="button"
                      className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                      title="Notificaciones"
                    >
                      <span className="absolute -inset-1.5" />
                      <BellIcon aria-hidden="true" className="size-6" />
                    </button> */}

                    {/* Menú de usuario */}
                    <Menu as="div" className="relative ml-3">
                      <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Abrir menú de usuario</span>
                        <img
                          alt={user?.email || ''}
                          src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                            user?.email || 'user'
                          )}`}
                          className="size-8 rounded-full outline -outline-offset-1 outline-white/10 bg-white"
                        />
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        {/* Nombre / correo (deshabilitado visualmente) */}
                        <div className="px-4 py-2 text-xs text-gray-400">
                          {user?.email} <span className="ml-1">({user?.rol})</span>
                        </div>

                        <div className="my-1 h-px bg-gray-100" />

                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            {({ focus }) => (
                              <button
                                onClick={item.onClick}
                                className={classNames(
                                  'block w-full text-left px-4 py-2 text-sm',
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                )}
                              >
                                {item.name}
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                </div>

                {/* Mobile button */}
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Abrir menú</span>
                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <DisclosurePanel className="border-b border-white/10 md:hidden">
            <div className="space-y-1 px-2 py-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                      user?.email || 'user'
                    )}`}
                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10 bg-white"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user?.email?.split('@')[0] || 'Usuario'}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user?.email} — {user?.rol}
                  </div>
                </div>
                {/* <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                  title="Notificaciones"
                >
                  <span className="absolute -inset-1.5" />
                  <BellIcon aria-hidden="true" className="size-6" />
                </button> */}
              </div>

              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="button"
                  onClick={handleLogout}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Cerrar sesión
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Header */}
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">{pageTitle}</h1>
          </div>
        </header>
      </div>

      {/* Content */}
      <main className="relative -mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6">
            {/* Your content */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
