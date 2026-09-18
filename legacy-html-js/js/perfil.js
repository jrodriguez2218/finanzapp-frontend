/**
 * ============================================================
 * FinanzApp - Mi perfil (perfil.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Permite que el usuario autenticado (rol USER o ADMIN) edite
 * sus propios datos personales, a diferencia de admin.js que
 * permite al administrador editar los datos de CUALQUIER usuario.
 * ============================================================
 */

'use strict';

const formPerfil = document.getElementById('formPerfil');
const alertaErrorPerfil = document.getElementById('alertaError');
const alertaExitoPerfil = document.getElementById('alertaExito');

/**
 * Verifica que haya una sesion activa; si no la hay, redirige
 * al login. Retorna el usuario en sesion para su uso posterior.
 * @returns {Object|null} usuario en sesion, o null si no hay sesion
 */
function protegerRutaPerfil() {
  const usuario = Sesion.obtener();
  if (!usuario) {
    window.location.href = 'index.html';
    return null;
  }
  return usuario;
}

/**
 * Precarga el formulario con los datos actuales del usuario.
 * @param {Object} usuario usuario en sesion
 */
function precargarFormulario(usuario) {
  document.getElementById('nombres').value = usuario.nombres;
  document.getElementById('apellidos').value = usuario.apellidos;
  document.getElementById('cedula').value = usuario.cedula;
  document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;
  document.getElementById('email').value = usuario.email;

  // El enlace "Volver" regresa al lugar que corresponde segun el rol.
  const destinoVolver = usuario.rol === 'ADMIN' ? 'admin.html' : 'bienvenida.html';
  document.getElementById('enlaceVolver').setAttribute('href', destinoVolver);
}

/** Limpia el estado visual de error de todos los campos del formulario. */
function limpiarErroresPerfil() {
  formPerfil.querySelectorAll('.campo--error').forEach((campo) => {
    campo.classList.remove('campo--error');
    const mensajeEl = campo.querySelector('.campo__mensaje-error');
    if (mensajeEl) mensajeEl.textContent = '';
  });
  alertaErrorPerfil.classList.add('oculto');
}

const usuarioActual = protegerRutaPerfil();

if (usuarioActual) {
  precargarFormulario(usuarioActual);

  formPerfil.addEventListener('submit', (evento) => {
    evento.preventDefault();
    limpiarErroresPerfil();

    const datosEditados = {
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      cedula: document.getElementById('cedula').value,
      fechaNacimiento: document.getElementById('fechaNacimiento').value,
      email: document.getElementById('email').value
    };
    const passwordNueva = document.getElementById('passwordNueva').value;

    // Se excluye al propio usuario de la verificacion de cedula/email
    // duplicados, y se omite la validacion de password (es opcional aqui).
    const errores = Validador.validarFormularioUsuario(
      { ...datosEditados, password: 'sin-cambios' },
      usuarioActual
    );

    if (Object.keys(errores).length > 0) {
      const mapaCampos = {
        nombres: 'campoNombres',
        apellidos: 'campoApellidos',
        cedula: 'campoCedula',
        fechaNacimiento: 'campoFechaNacimiento',
        email: 'campoEmail'
      };
      Object.entries(errores).forEach(([campo, mensaje]) => {
        const contenedor = document.getElementById(mapaCampos[campo]);
        if (!contenedor) return;
        contenedor.classList.add('campo--error');
        contenedor.querySelector('.campo__mensaje-error').textContent = mensaje;
      });
      alertaErrorPerfil.classList.remove('oculto');
      return;
    }

    if (passwordNueva && !Validador.esPasswordValida(passwordNueva)) {
      const campoPassword = document.getElementById('campoPasswordNueva');
      campoPassword.classList.add('campo--error');
      campoPassword.querySelector('.campo__mensaje-error').textContent =
        'La contrasena debe tener minimo 4 caracteres.';
      return;
    }

    if (passwordNueva) {
      datosEditados.password = passwordNueva;
    }

    const usuarioActualizado = UsuarioRepositorio.actualizar(usuarioActual.id, datosEditados);

    // Se refresca la sesion para que refleje los datos mas recientes
    // (por ejemplo, si el usuario cambio su nombre o correo).
    Sesion.iniciar(usuarioActualizado);

    document.getElementById('passwordNueva').value = '';
    alertaExitoPerfil.textContent = 'Tus datos se actualizaron correctamente.';
    alertaExitoPerfil.classList.remove('oculto');
  });
}
