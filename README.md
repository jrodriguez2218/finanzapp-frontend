# FinanzApp — Módulo Front-End (React)

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo y proyectos de clase.

**Proyecto:** FinanzApp — Aplicación web para gestión financiera personal.

**Aprendices:**

- Johan Camilo Rodríguez Bautista
- Juan David Salamanca Cristancho
- Santiago Cepeda Fonseca

**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)

**Ficha:** 3186635

---

## Descripción

FinanzApp es una aplicación web orientada a la gestión de finanzas personales.

Para esta evidencia se desarrolló el componente **Front-End utilizando React**, aplicando componentes funcionales, JSX, Hooks, eventos, validaciones y almacenamiento local.

La aplicación permite gestionar diferentes aspectos de las finanzas personales mediante una interfaz web organizada e interactiva.

---

## Tecnologías

- HTML5
- CSS3
- JavaScript
- React 18
- JSX
- ReactDOM
- Babel
- LocalStorage
- SessionStorage
- Git
- GitHub
- Visual Studio Code

---

## Estructura principal

```text
react-app/
│
├── index.html
├── css/
│   └── styles.css
│
└── js/
    ├── App.jsx
    │
    ├── componentes/
    │   ├── Login.jsx
    │   ├── Registro.jsx
    │   ├── Recuperar.jsx
    │   ├── Navbar.jsx
    │   ├── Dashboard.jsx
    │   ├── CuentaCard.jsx
    │   ├── FormularioTransacciones.jsx
    │   ├── ListaTransacciones.jsx
    │   ├── PresupuestoCard.jsx
    │   ├── MetaAhorroCard.jsx
    │   ├── ReporteView.jsx
    │   ├── PerfilUsuario.jsx
    │   ├── AdminUsuarios.jsx
    │   └── Footer.jsx
    │
    └── datos/
        ├── storage.js
        ├── validaciones.js
        ├── transacciones.js
        ├── presupuestos.js
        └── metas.js
```

La carpeta `legacy-html-js/` conserva la primera versión del proyecto desarrollada con HTML, CSS y JavaScript.

La implementación principal de esta evidencia se encuentra en:

```text
react-app/
```

---

## Componentes principales

El proyecto utiliza componentes funcionales de React para dividir la aplicación en módulos reutilizables.

Entre los principales componentes se encuentran:

- **Login:** permite iniciar sesión.
- **Registro:** permite crear nuevos usuarios.
- **Recuperar:** permite gestionar la recuperación de contraseña.
- **Navbar:** contiene la navegación principal.
- **Dashboard:** presenta el resumen financiero del usuario.
- **CuentaCard:** muestra información del saldo disponible.
- **FormularioTransacciones:** permite registrar ingresos y gastos.
- **ListaTransacciones:** presenta el historial de movimientos.
- **PresupuestoCard:** permite visualizar información de los presupuestos.
- **MetaAhorroCard:** permite visualizar las metas de ahorro.
- **ReporteView:** presenta información de los reportes financieros.
- **PerfilUsuario:** permite consultar y actualizar la información del perfil.
- **AdminUsuarios:** permite gestionar las cuentas registradas.
- **Footer:** contiene información complementaria de la aplicación.

---

## Funcionalidades

La aplicación permite:

1. Registrar usuarios.
2. Iniciar sesión.
3. Recuperar contraseña.
4. Consultar el dashboard.
5. Consultar el saldo disponible.
6. Consultar ingresos y gastos.
7. Registrar ingresos.
8. Registrar gastos.
9. Consultar el historial de movimientos.
10. Gestionar presupuestos.
11. Gestionar metas de ahorro.
12. Consultar reportes financieros.
13. Actualizar la información del perfil.
14. Cambiar la fotografía de perfil.
15. Gestionar usuarios desde el módulo administrativo.
16. Cerrar sesión.

---

## Gestión de datos

El proyecto utiliza mecanismos de almacenamiento proporcionados por el navegador para gestionar la información del prototipo.

### LocalStorage

Se utiliza para conservar información que debe permanecer disponible después de actualizar o cerrar el navegador.

Entre la información gestionada se encuentran los usuarios y las transacciones.

### SessionStorage

Se utiliza para manejar información relacionada con la sesión activa del usuario.

Los módulos relacionados con la gestión de datos se encuentran en:

```text
react-app/js/datos/
```

Entre ellos:

- `storage.js`
- `validaciones.js`
- `transacciones.js`
- `presupuestos.js`
- `metas.js`

---

## Eventos e interacción

La aplicación utiliza eventos para responder a las acciones realizadas por el usuario.

Entre los principales eventos utilizados se encuentran:

- `onClick`
- `onChange`
- `onSubmit`
- `onMouseEnter`
- `onMouseLeave`

Estos eventos permiten gestionar formularios, botones, navegación y diferentes interacciones dentro de la aplicación.

---

## Manejo del estado

El proyecto utiliza componentes funcionales de React y Hooks para manejar el estado de la aplicación.

Entre los Hooks utilizados se encuentran:

```javascript
React.useState()
```

y:

```javascript
React.useMemo()
```

Estos permiten manejar estados, actualizaciones de información y valores derivados utilizados por los componentes.

---

## Validaciones

El proyecto cuenta con funciones de validación para controlar la información ingresada por el usuario.

Las reglas de validación se encuentran organizadas en:

```text
react-app/js/datos/validaciones.js
```

Esto permite separar la lógica de validación de los componentes visuales y reutilizar las reglas en diferentes formularios.

---

## Estándares de codificación

Durante el desarrollo del Front-End se aplicaron los siguientes criterios:

- Componentes React utilizando nombres en `PascalCase`.
- Variables y funciones utilizando `camelCase`.
- Nombres descriptivos para variables, funciones y componentes.
- Uso de componentes funcionales.
- Uso de Hooks para el manejo del estado.
- Separación de responsabilidades entre componentes y módulos de datos.
- Organización de archivos por funcionalidad.
- Reutilización de componentes.
- Código comentado.
- Validación de la información ingresada por el usuario.
- Formato y sangría consistentes.
- Separación de la lógica de datos y la interfaz.

---

## Ejecución

El proyecto utiliza React y Babel mediante CDN, por lo que no requiere Vite ni la instalación de dependencias mediante `npm install`.

Para ejecutar el proyecto:

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Ingresar a la carpeta `react-app`.
3. Abrir el archivo `index.html`.
4. Hacer clic derecho sobre el archivo.
5. Seleccionar **Open with Live Server**.
6. Abrir la aplicación en el navegador.

Se requiere conexión a internet para cargar React, ReactDOM y Babel desde el CDN.

### Usuario administrador de prueba

El proyecto cuenta con un usuario administrador precargado para realizar pruebas:

```text
Correo: admin@finanzapp.com
Contraseña: admin123
```

---

## Pruebas realizadas

Durante el desarrollo se realizaron pruebas de las principales funcionalidades del Front-End:

- Registro de usuario.
- Inicio de sesión.
- Recuperación de contraseña.
- Navegación entre módulos.
- Registro de ingresos.
- Registro de gastos.
- Visualización de movimientos.
- Actualización del saldo.
- Gestión de presupuestos.
- Gestión de metas de ahorro.
- Visualización de reportes.
- Actualización del perfil.
- Cambio de fotografía de perfil.
- Validación de formularios.
- Cierre de sesión.

Las pruebas permitieron verificar la interacción entre los diferentes componentes y el funcionamiento de la interfaz.

---

## Control de versiones

El proyecto utiliza **Git** como sistema de control de versiones y **GitHub** como repositorio remoto.

Para esta evidencia se creó un repositorio independiente para mantener organizado el código correspondiente al componente Front-End.

Los principales comandos utilizados durante el proceso fueron:

```bash
git init
git add .
git commit -m "Codificación inicial FinanzApp Front-End"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

El repositorio permite conservar el código fuente y realizar el seguimiento de las modificaciones realizadas al proyecto.

---

## Repositorio GitHub

El código fuente correspondiente a esta evidencia se encuentra disponible en:

**https://github.com/jrodriguez2218/finanzapp-frontend**

---

## Evidencia GA7-220501096-AA4-EV03

Este repositorio contiene los archivos correspondientes a la evidencia:

**GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo y proyectos de clase.**

Debido a que el espacio de entrega de la plataforma no permite adjuntar directamente el proyecto comprimido en formato ZIP o RAR, se presenta el enlace al repositorio de GitHub como medio para consultar y verificar el código fuente desarrollado.

---

## Conclusiones

El desarrollo del componente Front-End de FinanzApp permitió aplicar los conocimientos relacionados con React, JSX, componentes funcionales, Hooks, eventos, validaciones y organización del código.

La implementación de componentes reutilizables permitió estructurar la aplicación en diferentes módulos y facilitar la interacción del usuario con las funcionalidades de gestión financiera.

La utilización de Git y GitHub permite conservar el código fuente del proyecto, realizar seguimiento de las modificaciones y disponer de un repositorio para la consulta y verificación de la evidencia.