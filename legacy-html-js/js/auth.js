/**
 * ============================================================
 * FinanzApp - Autenticacion (auth.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Controla el comportamiento de las vistas de Registro
 * (registro.html) e Inicio de sesion (index.html). Se apoya en
 * UsuarioRepositorio (storage.js) y Validador (validaciones.js).
 * ============================================================
 */

'use strict';

/**
 * Muestra el mensaje de error de un campo especifico y le
 * agrega la clase visual de error.
 * @param {string} idCampo id del contenedor .campo
 * @param {string} mensaje texto del error a mostrar
 */
function marcarCampoConError(idCampo, mensaje) {
  const contenedor = document.getElementById(idCampo);
  if (!contenedor) return;
  contenedor.classList.add('campo--error');
  const mensajeEl = contenedor.querySelector('.campo__mensaje-error');
  if (mensajeEl) mensajeEl.textContent = mensaje;
}

/**
 * Limpia el estado visual de error de todos los campos de un
 * formulario antes de una nueva validacion.
 * @param {HTMLFormElement} formulario formulario a limpiar
 */
function limpiarErroresFormulario(formulario) {
  formulario.querySelectorAll('.campo--error').forEach((campo) => {
    campo.classList.remove('campo--error');
    const mensajeEl = campo.querySelector('.campo__mensaje-error');
    if (mensajeEl) mensajeEl.textContent = '';
  });
}

/* ------------------------------------------------------------
   Logica del formulario de Registro
   ------------------------------------------------------------ */

const formRegistro = document.getElementById('formRegistro');

if (formRegistro) {
  formRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const alertaError = document.getElementById('alertaError');
    limpiarErroresFormulario(formRegistro);
    alertaError.classList.add('oculto');

    const datosFormulario = {
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      cedula: document.getElementById('cedula').value,
      fechaNacimiento: document.getElementById('fechaNacimiento').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    const errores = Validador.validarFormularioUsuario(datosFormulario);

    if (Object.keys(errores).length > 0) {
      // Mapea cada error de negocio al id del contenedor visual.
      const mapaCampos = {
        nombres: 'campoNombres',
        apellidos: 'campoApellidos',
        cedula: 'campoCedula',
        fechaNacimiento: 'campoFechaNacimiento',
        email: 'campoEmail',
        password: 'campoPassword'
      };

      Object.entries(errores).forEach(([campo, mensaje]) => {
        marcarCampoConError(mapaCampos[campo], mensaje);
      });

      alertaError.classList.remove('oculto');
      return;
    }

    // Sin errores: se crea el usuario y se redirige al login.
    UsuarioRepositorio.crear(datosFormulario);

    // Se pasa el correo por la URL para precargarlo en el login,
    // igual que en el flujo mostrado en el prototipo funcional.
    const correoCodificado = encodeURIComponent(datosFormulario.email.trim());
    window.location.href = `index.html?registrado=1&email=${correoCodificado}`;
  });
}

/* ------------------------------------------------------------
   Logica del formulario de Inicio de sesion
   ------------------------------------------------------------ */

const formLogin = document.getElementById('formLogin');

if (formLogin) {
  // Si se viene de un registro exitoso, se muestra el aviso y se
  // precarga el correo electronico en el campo de usuario.
  const parametros = new URLSearchParams(window.location.search);
  const vieneDeRegistro = parametros.get('registrado') === '1';
  const vieneDeRecuperacion = parametros.get('claveRestablecida') === '1';

  if (vieneDeRegistro || vieneDeRecuperacion) {
    const alertaExito = document.getElementById('alertaExito');
    alertaExito.textContent = vieneDeRegistro
      ? 'Cuenta creada con exito. Ya puedes iniciar sesion.'
      : 'Tu contrasena se actualizo correctamente. Ya puedes iniciar sesion.';
    alertaExito.classList.remove('oculto');

    const correoPrecargado = parametros.get('email');
    if (correoPrecargado) {
      document.getElementById('email').value = decodeURIComponent(correoPrecargado);
    }
  }

  formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const alertaError = document.getElementById('alertaError');
    limpiarErroresFormulario(formLogin);
    alertaError.classList.add('oculto');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const usuario = UsuarioRepositorio.buscarPorEmail(email);
    const credencialesValidas = usuario && usuario.password === password;

    if (!credencialesValidas) {
      alertaError.textContent = 'Usuario o contrasena incorrectos.';
      alertaError.classList.remove('oculto');
      return;
    }

    // Inicia sesion y redirige segun el rol del usuario,
    // replicando el flujo del prototipo (ADMIN -> panel admin).
    Sesion.iniciar(usuario);
    window.location.href = usuario.rol === 'ADMIN' ? 'admin.html' : 'bienvenida.html';
  });
}
