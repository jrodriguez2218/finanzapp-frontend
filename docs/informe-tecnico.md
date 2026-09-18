# Informe técnico — Construcción del módulo de Autenticación y Usuarios

**Evidencia:** GA7-220501096-AA4-EV03
**Proyecto:** FinanzApp

## Objetivo del módulo

Codificar la funcionalidad de acceso a la plataforma (registro e inicio de
sesión) y la administración de las cuentas de usuario, siguiendo el diseño
y el modelo de datos ya definidos en las etapas previas del ciclo de vida
del software del proyecto formativo.

## Tecnologías seleccionadas

| Capa            | Tecnología                          | Justificación |
|-----------------|--------------------------------------|----------------|
| Estructura      | HTML5 semántico                      | Estándar, accesible, sin dependencias |
| Presentación    | CSS3 (variables custom)              | Reutiliza la paleta del prototipo, sin frameworks pesados |
| Comportamiento  | JavaScript (ES6+), sin frameworks    | Alcance del módulo no requiere un framework SPA |
| Persistencia    | `localStorage` / `sessionStorage`    | Permite evaluar el front-end de forma autónoma; estructura de datos idéntica a la tabla `usuarios` de MySQL para facilitar una futura integración con backend |

## Plan de trabajo seguido

1. Modelado de la entidad `Usuario` en `storage.js`, replicando las
   columnas definidas en el diagrama de clases / script SQL del proyecto.
2. Definición de las reglas de validación (`validaciones.js`): campos
   obligatorios, formato de cédula y correo, mayoría de edad, unicidad de
   cédula y correo.
3. Construcción de la vista de Registro y su lógica de envío, incluyendo
   el manejo de errores por campo y la alerta general de error.
4. Construcción de la vista de Login, con redirección según el rol del
   usuario autenticado (ADMIN → panel administrativo, USER → bienvenida).
5. Construcción del panel administrativo con listado, edición y
   eliminación de usuarios (CRUD), protegido por verificación de sesión
   y rol en el cliente.
6. Documentación del proyecto y versionamiento con Git.

## Pruebas funcionales realizadas

- Registro con campos vacíos → se marcan los campos en rojo y aparece la
  alerta general de error.
- Registro con una cédula ya existente → mensaje "CEDULA YA REGISTRADA".
- Registro exitoso → redirección al login con mensaje de confirmación y
  correo precargado.
- Login con credenciales inválidas → mensaje de error genérico (no se
  revela si el correo existe, por buena práctica de seguridad).
- Login con el usuario administrador → acceso al panel de gestión de
  usuarios.
- Edición de un usuario existente → los cambios se reflejan de inmediato
  en la tabla.
- Eliminación de un usuario → se solicita confirmación antes de eliminar.

## Recomendaciones para una siguiente iteración

- Sustituir `localStorage` por llamadas HTTP a una API real conectada a
  `finanzapp_db` (MySQL), conservando el mismo contrato de datos.
- Aplicar cifrado (hash) de contraseñas antes de persistirlas.
- Agregar paginación a la tabla de usuarios cuando el volumen de datos
  crezca.
