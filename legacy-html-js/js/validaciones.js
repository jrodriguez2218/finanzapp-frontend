/**
 * ============================================================
 * FinanzApp - Validaciones (validaciones.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Funciones puras de validacion, reutilizadas por el formulario
 * de registro, login y el panel de administracion. Mantenerlas
 * separadas de la manipulacion del DOM cumple con el estandar
 * de codificacion de responsabilidad unica (SRP).
 * ============================================================
 */

'use strict';

const Validador = {

  /**
   * Verifica que un texto no este vacio.
   * @param {string} valor texto a evaluar
   * @returns {boolean} true si tiene contenido
   */
  esRequerido(valor) {
    return typeof valor === 'string' && valor.trim().length > 0;
  },

  /**
   * Verifica que la cedula solo contenga digitos y tenga una
   * longitud razonable (entre 6 y 15 caracteres).
   * @param {string} cedula numero de documento
   * @returns {boolean} true si el formato es valido
   */
  esCedulaValida(cedula) {
    return /^[0-9]{6,15}$/.test((cedula || '').trim());
  },

  /**
   * Verifica el formato basico de un correo electronico.
   * @param {string} email correo a validar
   * @returns {boolean} true si el formato es valido
   */
  esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim());
  },

  /**
   * Verifica que la contrasena cumpla una longitud minima.
   * @param {string} password contrasena a validar
   * @param {number} [minimo=4] longitud minima aceptada
   * @returns {boolean} true si cumple la longitud minima
   */
  esPasswordValida(password, minimo = 4) {
    return typeof password === 'string' && password.length >= minimo;
  },

  /**
   * Verifica que la fecha de nacimiento sea una fecha real
   * y corresponda a una persona mayor de edad.
   * @param {string} fecha fecha en formato ISO (aaaa-mm-dd)
   * @returns {boolean} true si la fecha es valida y es mayor de edad
   */
  esFechaNacimientoValida(fecha) {
    if (!fecha) return false;
    const fechaNacimiento = new Date(fecha);
    if (Number.isNaN(fechaNacimiento.getTime())) return false;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const noHaCumplidoAnios =
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() &&
        hoy.getDate() < fechaNacimiento.getDate());
    if (noHaCumplidoAnios) edad -= 1;

    return edad >= 18;
  },

  /**
   * Valida el formulario completo de registro de usuario.
   * Revisa formato de cada campo y unicidad de cedula/email
   * contra los usuarios ya almacenados (regla vista en el
   * prototipo: "CEDULA YA REGISTRADA").
   *
   * @param {Object} datos datos del formulario de registro
   * @param {Object} [usuarioIgnorado] usuario que se excluye de la
   *        verificacion de duplicados (util al editar en el panel admin)
   * @returns {Object} mapa de errores por campo; vacio si es valido
   */
  validarFormularioUsuario(datos, usuarioIgnorado = null) {
    const errores = {};

    if (!this.esRequerido(datos.nombres)) {
      errores.nombres = 'El nombre es obligatorio.';
    }
    if (!this.esRequerido(datos.apellidos)) {
      errores.apellidos = 'El apellido es obligatorio.';
    }
    if (!this.esCedulaValida(datos.cedula)) {
      errores.cedula = 'La cedula debe tener entre 6 y 15 digitos.';
    }
    if (!this.esFechaNacimientoValida(datos.fechaNacimiento)) {
      errores.fechaNacimiento = 'Debes ser mayor de edad para registrarte.';
    }
    if (!this.esEmailValido(datos.email)) {
      errores.email = 'Ingresa un correo electronico valido.';
    }
    if (!usuarioIgnorado && !this.esPasswordValida(datos.password)) {
      errores.password = 'La contrasena debe tener minimo 4 caracteres.';
    }

    // Reglas de unicidad contra los registros existentes.
    const cedulaDuplicada = UsuarioRepositorio.buscarPorCedula(datos.cedula);
    if (
      !errores.cedula &&
      cedulaDuplicada &&
      (!usuarioIgnorado || cedulaDuplicada.id !== usuarioIgnorado.id)
    ) {
      errores.fechaNacimiento = '*CEDULA YA REGISTRADA';
      errores.cedula = 'CEDULA YA REGISTRADA';
    }

    const emailDuplicado = UsuarioRepositorio.buscarPorEmail(datos.email);
    if (
      !errores.email &&
      emailDuplicado &&
      (!usuarioIgnorado || emailDuplicado.id !== usuarioIgnorado.id)
    ) {
      errores.email = 'Este correo ya esta registrado.';
    }

    return errores;
  }
};
