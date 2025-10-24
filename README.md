# 🎨 Reservas UMG – Frontend

Interfaz web construida con **React + Vite + TailwindCSS** que permite a los usuarios visualizar eventos, realizar reservas y administrar boletos.

---

## 🚀 Tecnologías

- **React 18 + Vite**
- **TailwindCSS**
- **Axios**
- **React Router**
- **JWT localStorage**
- **Heroicons / Lucide**
- **ShadCN UI** (opcional)

---

## ⚙️ Instalación y configuración

1. **Clonar el proyecto**

   ```bash
   git clone https://github.com/tuusuario/reservas-umg-frontend.git
   cd reservas-umg-frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env`:

   ```env
   VITE_API_URL=https://reservas-umg-api.onrender.com/api
   ```

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

   Acceder en [http://localhost:5173](http://localhost:5173)

---

## 🧩 Estructura del proyecto

```
src/
├─ components/
│  ├─ forms/EventForm.jsx
│  ├─ layout/
│  └─ ui/
├─ pages/
│  ├─ Login.jsx
│  ├─ DashboardHome.jsx
│  ├─ Eventos.jsx
│  └─ Reservas.jsx
├─ services/
│  ├─ api.js
│  └─ auth.js
├─ hooks/
│  └─ useAuth.js
└─ main.jsx
```

---

## 📦 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Modo desarrollo |
| `npm run build` | Construye para producción |
| `npm run preview` | Previsualiza build |
| `npm run lint` | Analiza errores |

---

## 🧭 Navegación principal

- `/login` → Inicio de sesión  
- `/eventos` → Listado de eventos  
- `/reservas` → Historial de reservas  
- `/admin/eventos` → Administración (solo Admin)

---

## 🖼️ Componentes destacados

### `EventForm.jsx`
Formulario reutilizable para crear y editar eventos con estilos uniformes.

### `Eventos.jsx`
Listado principal tipo blog con imágenes y botón **“Reservar”**.

---

## 🌐 Despliegue en Netlify

1. Crear un nuevo sitio desde el repositorio.
2. Variable de entorno:
   ```
   VITE_API_URL=https://reservas-umg-api.onrender.com/api
   ```
3. Comando de build: `npm run build`  
4. Carpeta de publicación: `dist`

---

## 🧩 Integración completa

Frontend → Backend:

```
https://reservas-umg-api.onrender.com/api
```

Boletos con QR:

```
https://reservas-umg.netlify.app/boletos/:codigo
```

---

## 🧰 Licencia

MIT © 2025 Universidad Mariano Gálvez – Proyecto académico de gestión de reservas.
