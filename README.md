# FinanzApp — Módulo Front-End (React)

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo
**Proyecto:** FinanzApp (aplicación web para gestión financiera personal)
**Tecnología:** React (componentes funcionales + Hooks), sin herramientas de build (CDN)

## 1. Trazabilidad con los artefactos previos del ciclo de software

Esta evidencia se construye directamente sobre dos artefactos entregados antes:

- **EV01 — Taller sobre componentes front-end:** definió que el proyecto usaría
  **componentes funcionales de React con Hooks** (`useState`, `useEffect`), no
  componentes de clase, y los principales eventos (`onClick`, `onChange`,
  `onSubmit`) que se usan en todo este módulo.
- **EV02 — Verificación de componentes front-end:** definió la arquitectura
  exacta de componentes que debía tener el Software de Finanzas. Esta
  evidencia (EV03) **implementa cada uno de esos componentes**:

| Componente (definido en EV02) | Archivo | Estado |
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

**Extensiones justificadas** (no estaban en el EV02 pero son necesarias para
cubrir las historias de usuario del sistema de acceso):
- `Registro.jsx` y `Recuperar.jsx`: complementan a `Login` para las historias
  "crear una cuenta" y "recuperar contraseña".
- `AdminUsuarios.jsx`: cubre la historia "como administrador quiero
  gestionar las cuentas registradas".

El modelo de datos (`js/datos/storage.js`) respeta los mismos atributos de
la entidad `Usuario` usados en la primera versión del proyecto y en el
script `sql/finanzapp_db.sql`.

## 2. Estructura del proyecto

```
react-app/
├── index.html                     # Punto de entrada (monta <App />)
├── css/
│   └── styles.css
└── js/
    ├── App.jsx                    # Componente raiz / navegacion
    ├── datos/                     # Capa de datos (JS plano, sin JSX)
    │   ├── storage.js             # UsuarioRepositorio + Sesion
    │   ├── validaciones.js        # Reglas de validacion reutilizables
    │   ├── transacciones.js       # TransaccionRepositorio
    │   ├── presupuestos.js        # PresupuestoRepositorio
    │   └── metas.js               # MetaRepositorio
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
```

La carpeta `legacy-html-js/` conserva la primera iteración del proyecto
(HTML/CSS/JS puro), como evidencia del proceso iterativo de construcción.
**La entrega final que responde a la arquitectura del EV02 es `react-app/`.**

## 3. Cómo ejecutar el módulo

Abre `react-app/index.html` con la extensión **Live Server** de VS Code
(clic derecho → "Open with Live Server"). Necesitas conexión a internet la
primera vez, porque React y Babel se cargan desde un CDN (no se usa
`npm install`, para mantener el proyecto simple de evaluar).

**Usuario administrador de prueba** (ya viene precargado):
- Correo: `admin@finanzapp.com`
- Contraseña: `admin123`

## 4. Estándares de codificación aplicados

- Componentes funcionales de React con Hooks (`useState`, `useMemo`), sin
  clases, tal como concluye el EV01.
- Nombres de componentes en **PascalCase** (`Dashboard`, `CuentaCard`) y de
  funciones/variables en **camelCase**.
- Cada componente tiene un comentario de cabecera que cita textualmente su
  función descrita en el EV02.
- Separación de responsabilidades: `js/datos/` (estado y persistencia) vs.
  `js/componentes/` (interfaz).
- Un único punto de verdad para los datos (`localStorage`), con el saldo
  del usuario recalculado siempre desde el historial de transacciones.

## 5. Control de versiones

El proyecto se inicializó con Git (`git init`) desde su primera iteración,
y su historial de commits documenta tanto la versión inicial en HTML/CSS/JS
como la migración a React alineada con el EV02.

Para publicarlo en un repositorio remoto:

```bash
git remote add origin <URL_DE_TU_REPOSITORIO>
git branch -M main
git push -u origin main
```

El enlace del repositorio remoto debe registrarse en `ENLACE_REPOSITORIO.txt`
antes de comprimir la carpeta final de entrega.
