# FinanzApp — Módulo Front-End (React)

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo y proyectos de clase.

**Proyecto:** FinanzApp (aplicación web para gestión financiera personal)

**Aprendices:** - Johan Camilo Rodríguez Bautista 
                - Juan David Salamanca Cristancho - 
                - Santiago Cepeda Fonseca

**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)

**Ficha:** 3186635

**Tecnología:** React 18 (componentes funcionales + Hooks), JSX, JavaScript, HTML5 y CSS3.

---

## 1. Trazabilidad con los artefactos previos del ciclo de software

Esta evidencia se construye directamente sobre los artefactos entregados previamente durante el desarrollo del proyecto.

### EV01 — Taller sobre componentes front-end

En esta evidencia se estudiaron los conceptos relacionados con React, JSX, componentes, propiedades, estados, Hooks y eventos.

A partir de estos conceptos se definió el uso de **componentes funcionales de React con Hooks**, utilizando elementos como `useState` y `useEffect`, además de eventos como `onClick`, `onChange` y `onSubmit`.

### EV02 — Verificación de componentes front-end

La arquitectura del proyecto contempla los siguientes componentes principales:

| Componente | Archivo | Estado |
|---|---|---|
| App | `js/App.jsx` | ✅ Implementado |
| Login | `js/componentes/Login.jsx` | ✅ Implementado |
| Navbar | `js/componentes/Navbar.jsx` | ✅ Implementado |
| Dashboard | `js/componentes/Dashboard.jsx` | ✅ Implementado |
| CuentaCard | `js/componentes/CuentaCard.jsx` | ✅ Implementado |
| FormularioTransacciones | `js/componentes/FormularioTransacciones.jsx` | ✅ Implementado |
| ListaTransacciones | `js/componentes/ListaTransacciones.jsx` | ✅ Implementado |
| PresupuestoCard | `js/componentes/PresupuestoCard.jsx` | ✅ Implementado |
| MetaAhorroCard | `js/componentes/MetaAhorroCard.jsx` | ✅ Implementado |
| ReporteView | `js/componentes/ReporteView.jsx` | ✅ Implementado |
| PerfilUsuario | `js/componentes/PerfilUsuario.jsx` | ✅ Implementado |
| Footer | `js/componentes/Footer.jsx` | ✅ Implementado |

### Extensiones del proyecto

También se incorporaron componentes adicionales para complementar las funcionalidades del sistema:

- `Registro.jsx`: permite crear una cuenta de usuario.
- `Recuperar.jsx`: permite gestionar la recuperación de contraseña.
- `AdminUsuarios.jsx`: permite gestionar las cuentas registradas.

La carpeta `js/datos/` contiene los módulos encargados de la gestión de información, validaciones y almacenamiento utilizado por el prototipo.

---

## 2. Estructura del proyecto

```text
react-app/

├── index.html
│
├── css/
│   └── styles.css
│
└── js/
    │
    ├── App.jsx
    │
    ├── datos/
    │   ├── storage.js
    │   ├── validaciones.js
    │   ├── transacciones.js
    │   ├── presupuestos.js
    │   └── metas.js
    │
    └── componentes/
        ├── Login.jsx
        ├── Registro.jsx
        ├── Recuperar.jsx
        ├── Navbar.jsx
        ├── Dashboard.jsx
        ├── CuentaCard.jsx
        ├── FormularioTransacciones.jsx
        ├── ListaTransacciones.jsx
        ├── PresupuestoCard.jsx
        ├── MetaAhorroCard.jsx
        ├── ReporteView.jsx
        ├── PerfilUsuario.jsx
        ├── AdminUsuarios.jsx
        └── Footer.jsx