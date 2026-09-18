/**
 * ============================================================
 * FinanzApp - Panel administrativo (admin.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Implementa el caso de uso "Gestionar usuarios": listar,
 * editar y eliminar las cuentas registradas. Solo es accesible
 * para usuarios con rol ADMIN (proteccion de ruta en cliente).
 * ============================================================
 */

'use strict';

const cuerpoTablaUsuarios = document.getElementById('cuerpoTablaUsuarios');
const panelEdicion = document.getElementById('panelEdicion');
const formEdicion = document.getElementById('formEdicion');

/**
 * Verifica que exista una sesion activa con rol ADMIN.
 * Si no la hay, redirige al login. Se ejecuta al cargar la
 * pagina para proteger la ruta del panel administrativo.
 */
function protegerRutaAdmin() {
  const usuario = Sesion.obtener();
  if (!usuario || usuario.rol !== 'ADMIN') {
    window.location.href = 'index.html';
    return null;
  }
  document.getElementById('nombreSesion').textContent =
    `${usuario.nombres} ${usuario.apellidos}`;
  return usuario;
}

/**
 * Dibuja una fila de la tabla por cada usuario almacenado.
 * Se vuelve a llamar despues de cada operacion de edicion o
 * eliminacion para mantener la tabla sincronizada con los datos.
 */
function renderizarTablaUsuarios() {
  const usuarios = UsuarioRepositorio.obtenerTodos();

  cuerpoTablaUsuarios.innerHTML = usuarios.map((usuario) => `
    <tr>
      <td>${usuario.nombres} ${usuario.apellidos}</td>
      <td>${usuario.cedula}</td>
      <td>${usuario.email}</td>
      <td><span class="insignia-rol insignia-rol--${usuario.rol}">${usuario.rol}</span></td>
      <td>$${Number(usuario.saldo).toFixed(2)}</td>
      <td>
        <div class="acciones-fila">
          <button class="boton-chico boton-chico--editar" data-accion="editar" data-id="${usuario.id}">
            Editar
          </button>
          <button class="boton-chico boton-chico--eliminar" data-accion="eliminar" data-id="${usuario.id}">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Abre el panel de edicion con los datos del usuario indicado.
 * @param {number} id identificador del usuario a editar
 */
function abrirPanelEdicion(id) {
  const usuario = UsuarioRepositorio.buscarPorId(id);
  if (!usuario) return;

  document.getElementById('tituloEdicion').textContent = `Editando: ${usuario.nombres} ${usuario.apellidos}`;
  document.getElementById('editId').value = usuario.id;
  document.getElementById('editNombres').value = usuario.nombres;
  document.getElementById('editApellidos').value = usuario.apellidos;
  document.getElementById('editCedula').value = usuario.cedula;
  document.getElementById('editFechaNacimiento').value = usuario.fechaNacimiento;
  document.getElementById('editEmail').value = usuario.email;
  document.getElementById('editRol').value = usuario.rol;

  panelEdicion.classList.remove('oculto');
  panelEdicion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/** Cierra y limpia el panel de edicion. */
function cerrarPanelEdicion() {
  formEdicion.reset();
  formEdicion.querySelectorAll('.campo--error').forEach((campo) =>
    campo.classList.remove('campo--error')
  );
  panelEdicion.classList.add('oculto');
}

/**
 * Elimina un usuario previa confirmacion del administrador.
 * @param {number} id identificador del usuario a eliminar
 */
function eliminarUsuario(id) {
  const usuario = UsuarioRepositorio.buscarPorId(id);
  if (!usuario) return;

  const confirmado = window.confirm(
    `¿Seguro que deseas eliminar a ${usuario.nombres} ${usuario.apellidos}?`
  );
  if (!confirmado) return;

  UsuarioRepositorio.eliminar(id);
  renderizarTablaUsuarios();
}

// Delegacion de eventos: un unico listener maneja Editar y Eliminar
// para cualquier fila, incluso las que se generan dinamicamente.
cuerpoTablaUsuarios.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return;

  const id = Number(boton.dataset.id);
  if (boton.dataset.accion === 'editar') abrirPanelEdicion(id);
  if (boton.dataset.accion === 'eliminar') eliminarUsuario(id);
});

document.getElementById('botonCancelarEdicion').addEventListener('click', cerrarPanelEdicion);

formEdicion.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const id = Number(document.getElementById('editId').value);
  const usuarioOriginal = UsuarioRepositorio.buscarPorId(id);

  const datosEditados = {
    nombres: document.getElementById('editNombres').value,
    apellidos: document.getElementById('editApellidos').value,
    cedula: document.getElementById('editCedula').value,
    fechaNacimiento: document.getElementById('editFechaNacimiento').value,
    email: document.getElementById('editEmail').value,
    rol: document.getElementById('editRol').value
  };

  // Se ignoran errores de contrasena porque este formulario no la modifica.
  const errores = Validador.validarFormularioUsuario(datosEditados, usuarioOriginal);
  delete errores.password;

  formEdicion.querySelectorAll('.campo--error').forEach((campo) =>
    campo.classList.remove('campo--error')
  );

  if (Object.keys(errores).length > 0) {
    const mapaCampos = {
      nombres: 'campoEditNombres',
      apellidos: 'campoEditApellidos',
      cedula: 'campoEditCedula',
      fechaNacimiento: 'campoEditFechaNacimiento',
      email: 'campoEditEmail'
    };
    Object.entries(errores).forEach(([campo, mensaje]) => {
      const contenedor = document.getElementById(mapaCampos[campo]);
      if (contenedor) contenedor.classList.add('campo--error');
      console.warn(mensaje);
    });
    window.alert('Revisa los campos marcados antes de guardar.');
    return;
  }

  UsuarioRepositorio.actualizar(id, datosEditados);
  cerrarPanelEdicion();
  renderizarTablaUsuarios();
});

document.getElementById('botonCerrarSesion').addEventListener('click', () => {
  Sesion.cerrar();
  window.location.href = 'index.html';
});

// Punto de entrada de la pagina: protege la ruta y pinta la tabla.
if (protegerRutaAdmin()) {
  renderizarTablaUsuarios();
}
