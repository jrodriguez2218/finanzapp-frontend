/**
 * ============================================================
 * FinanzApp - Recuperacion de contrasena (recuperar.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Implementa el caso de uso "Recuperar contrasena" en dos pasos:
 *   1) El usuario indica su correo electronico.
 *   2) Si el correo existe, se le permite definir una nueva
 *      contrasena y se actualiza en el repositorio de usuarios.
 *
 * NOTA PEDAGOGICA: en un entorno de produccion este flujo se
 * haria enviando un enlace o codigo de un solo uso al correo del
 * usuario (con expiracion), en vez de permitir el cambio directo.
 * Aqui se simplifica porque el modulo es front-end puro y no
 * cuenta con un servicio de correo real.
 * ============================================================
 */

'use strict';

const formBuscarCuenta = document.getElementById('formBuscarCuenta');
const formNuevaPassword = document.getElementById('formNuevaPassword');
const alertaError = document.getElementById('alertaError');
const alertaExito = document.getElementById('alertaExito');

/** Usuario encontrado en el paso 1, pendiente de actualizar su contrasena. */
let usuarioEnRecuperacion = null;

/** Oculta ambas alertas antes de una nueva validacion. */
function ocultarAlertas() {
  alertaError.classList.add('oculto');
  alertaExito.classList.add('oculto');
}

/* ------------------------------------------------------------
   Paso 1: localizar la cuenta por correo electronico
   ------------------------------------------------------------ */

formBuscarCuenta.addEventListener('submit', (evento) => {
  evento.preventDefault();
  ocultarAlertas();

  const campoEmail = document.getElementById('campoEmailBusqueda');
  campoEmail.classList.remove('campo--error');

  const email = document.getElementById('emailBusqueda').value.trim();

  if (!Validador.esEmailValido(email)) {
    campoEmail.classList.add('campo--error');
    campoEmail.querySelector('.campo__mensaje-error').textContent =
      'Ingresa un correo electronico valido.';
    return;
  }

  const usuario = UsuarioRepositorio.buscarPorEmail(email);

  if (!usuario) {
    alertaError.textContent = 'No encontramos ninguna cuenta con ese correo.';
    alertaError.classList.remove('oculto');
    return;
  }

  // Se guarda el usuario encontrado y se habilita el paso 2.
  usuarioEnRecuperacion = usuario;
  formBuscarCuenta.classList.add('oculto');
  formNuevaPassword.classList.remove('oculto');

  alertaExito.textContent = `Cuenta encontrada para ${usuario.nombres}. Define tu nueva contrasena.`;
  alertaExito.classList.remove('oculto');
});

/* ------------------------------------------------------------
   Paso 2: definir y guardar la nueva contrasena
   ------------------------------------------------------------ */

formNuevaPassword.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const campoNueva = document.getElementById('campoPasswordNueva');
  const campoConfirmar = document.getElementById('campoPasswordConfirmar');
  campoNueva.classList.remove('campo--error');
  campoConfirmar.classList.remove('campo--error');
  alertaError.classList.add('oculto');

  const passwordNueva = document.getElementById('passwordNueva').value;
  const passwordConfirmar = document.getElementById('passwordConfirmar').value;

  let tieneErrores = false;

  if (!Validador.esPasswordValida(passwordNueva)) {
    campoNueva.classList.add('campo--error');
    campoNueva.querySelector('.campo__mensaje-error').textContent =
      'La contrasena debe tener minimo 4 caracteres.';
    tieneErrores = true;
  }

  if (passwordNueva !== passwordConfirmar) {
    campoConfirmar.classList.add('campo--error');
    campoConfirmar.querySelector('.campo__mensaje-error').textContent =
      'Las contrasenas no coinciden.';
    tieneErrores = true;
  }

  if (tieneErrores) return;

  // Persiste la nueva contrasena para el usuario encontrado en el paso 1.
  UsuarioRepositorio.actualizar(usuarioEnRecuperacion.id, { password: passwordNueva });

  const correoCodificado = encodeURIComponent(usuarioEnRecuperacion.email);
  window.location.href = `index.html?claveRestablecida=1&email=${correoCodificado}`;
});
