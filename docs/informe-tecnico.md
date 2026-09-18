# Informe técnico — Componente Front-End de FinanzApp

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo y proyectos de clase.

**Proyecto:** FinanzApp — Aplicación web para gestión financiera personal.

**Aprendices:**

- Johan Camilo Rodríguez Bautista
- Juan David Salamanca Cristancho
- Santiago Cepeda Fonseca

**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)

**Ficha:** 3186635

---

## 1. Objetivo

Desarrollar y codificar el componente Front-End de FinanzApp aplicando los conocimientos relacionados con React, JSX, componentes funcionales, Hooks, eventos, validaciones y organización modular del código.

El desarrollo busca proporcionar una interfaz web funcional que permita al usuario interactuar con las diferentes funcionalidades de gestión financiera personal.

---

## 2. Trazabilidad con las evidencias anteriores

El desarrollo de esta evidencia toma como referencia los conocimientos y definiciones establecidos previamente en el proceso de formación.

### EV01 — Taller sobre componentes front-end

En esta evidencia se estudiaron los conceptos fundamentales de React y JSX, incluyendo:

- Componentes.
- JSX.
- Props.
- State.
- Hooks.
- Eventos.
- Reutilización de componentes.

A partir de estos conceptos se implementaron componentes funcionales de React para el desarrollo de FinanzApp.

Entre los eventos utilizados se encuentran:

- `onClick`
- `onChange`
- `onSubmit`
- `onMouseEnter`
- `onMouseLeave`

### EV02 — Verificación de componentes front-end

La arquitectura definida previamente contempla los siguientes componentes:

| Componente | Archivo |
|---|---|
| App | `js/App.jsx` |
| Login | `js/componentes/Login.jsx` |
| Navbar | `js/componentes/Navbar.jsx` |
| Dashboard | `js/componentes/Dashboard.jsx` |
| CuentaCard | `js/componentes/CuentaCard.jsx` |
| FormularioTransacciones | `js/componentes/FormularioTransacciones.jsx` |
| ListaTransacciones | `js/componentes/ListaTransacciones.jsx` |
| PresupuestoCard | `js/componentes/PresupuestoCard.jsx` |
| MetaAhorroCard | `js/componentes/MetaAhorroCard.jsx` |
| ReporteView | `js/componentes/ReporteView.jsx` |
| PerfilUsuario | `js/componentes/PerfilUsuario.jsx` |
| Footer | `js/componentes/Footer.jsx` |

También se implementaron componentes complementarios:

- `Registro.jsx`
- `Recuperar.jsx`
- `AdminUsuarios.jsx`

Estos componentes permiten ampliar las funcionalidades de acceso y administración del sistema.

---

## 3. Arquitectura del Front-End

El proyecto se organiza en componentes React y módulos JavaScript separados según su responsabilidad.

### Componentes

Los componentes de interfaz se encuentran en:

```text
react-app/js/componentes/