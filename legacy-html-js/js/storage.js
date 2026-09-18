/**
 * ============================================================
 * FinanzApp - Capa de acceso a datos (storage.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Este modulo centraliza el acceso a los datos de usuarios.
 * Simula la tabla "usuarios" de la base de datos MySQL
 * (finanzapp_db) usando localStorage, para que el modulo de
 * front-end pueda evaluarse sin depender de un servidor.
 *
 * Estandar de codificacion:
 *  - camelCase para funciones y variables.
 *  - Una responsabilidad por funcion (principio SRP).
 *  - Comentarios JSDoc en cada funcion publica.
 * ============================================================
 */

'use strict';

/** Llave usada para persistir la "tabla" de usuarios en localStorage. */
const DB_KEY = 'finanzapp_db_usuarios';

/** Llave usada para persistir la sesion activa del usuario. */
const SESSION_KEY = 'finanzapp_sesion';

/**
 * Repositorio de usuarios.
 * Expone operaciones CRUD equivalentes a las requeridas por el
 * diagrama de casos de uso: registrar, consultar, editar y
 * eliminar usuarios.
 */
const UsuarioRepositorio = {

  /**
   * Inicializa la base de datos local con el usuario
   * administrador por defecto si aun no existe ningun registro.
   * Equivale al INSERT semilla del script SQL del proyecto.
   */
  inicializar() {
    const usuarios = this._leerTodos();
    if (usuarios.length === 0) {
      const admin = {
        id: 1,
        nombres: 'Administrador',
        apellidos: 'FinanzApp',
        cedula: '0000000000',
        email: 'admin@finanzapp.com',
        fechaNacimiento: '1990-01-01',
        password: 'admin123',
        rol: 'ADMIN',
        saldo: 0
      };
      this._guardarTodos([admin]);
    }
  },

  /**
   * Retorna una copia de todos los usuarios registrados.
   * @returns {Array<Object>} lista de usuarios
   */
  obtenerTodos() {
    return this._leerTodos();
  },

  /**
   * Busca un usuario por su correo electronico.
   * @param {string} email correo a buscar
   * @returns {Object|undefined} usuario encontrado o undefined
   */
  buscarPorEmail(email) {
    const correo = (email || '').trim().toLowerCase();
    return this._leerTodos().find((u) => u.email.toLowerCase() === correo);
  },

  /**
   * Busca un usuario por numero de cedula.
   * @param {string} cedula numero de documento
   * @returns {Object|undefined} usuario encontrado o undefined
   */
  buscarPorCedula(cedula) {
    const doc = (cedula || '').trim();
    return this._leerTodos().find((u) => u.cedula === doc);
  },

  /**
   * Busca un usuario por su identificador interno.
   * @param {number} id identificador del usuario
   * @returns {Object|undefined} usuario encontrado o undefined
   */
  buscarPorId(id) {
    return this._leerTodos().find((u) => u.id === Number(id));
  },

  /**
   * Inserta un nuevo usuario (caso de uso "Registrarse").
   * @param {Object} datosUsuario datos validados del formulario
   * @returns {Object} usuario creado, incluyendo su id
   */
  crear(datosUsuario) {
    const usuarios = this._leerTodos();
    const nuevoId = usuarios.length > 0
      ? Math.max(...usuarios.map((u) => u.id)) + 1
      : 1;

    const nuevoUsuario = {
      id: nuevoId,
      nombres: datosUsuario.nombres.trim(),
      apellidos: datosUsuario.apellidos.trim(),
      cedula: datosUsuario.cedula.trim(),
      email: datosUsuario.email.trim().toLowerCase(),
      fechaNacimiento: datosUsuario.fechaNacimiento,
      password: datosUsuario.password,
      rol: datosUsuario.rol || 'USER',
      saldo: 0
    };

    usuarios.push(nuevoUsuario);
    this._guardarTodos(usuarios);
    return nuevoUsuario;
  },

  /**
   * Actualiza los datos de un usuario existente
   * (caso de uso "Editar usuario" del panel administrativo).
   * @param {number} id identificador del usuario a modificar
   * @param {Object} cambios campos a actualizar
   * @returns {Object|null} usuario actualizado o null si no existe
   */
  actualizar(id, cambios) {
    const usuarios = this._leerTodos();
    const indice = usuarios.findIndex((u) => u.id === Number(id));
    if (indice === -1) return null;

    usuarios[indice] = { ...usuarios[indice], ...cambios };
    this._guardarTodos(usuarios);
    return usuarios[indice];
  },

  /**
   * Elimina un usuario por id (caso de uso "Eliminar usuario").
   * @param {number} id identificador del usuario a eliminar
   * @returns {boolean} true si se elimino, false si no existia
   */
  eliminar(id) {
    const usuarios = this._leerTodos();
    const restantes = usuarios.filter((u) => u.id !== Number(id));
    const seElimino = restantes.length !== usuarios.length;
    if (seElimino) this._guardarTodos(restantes);
    return seElimino;
  },

  /** Lee el arreglo completo de usuarios desde localStorage. */
  _leerTodos() {
    const crudo = localStorage.getItem(DB_KEY);
    return crudo ? JSON.parse(crudo) : [];
  },

  /** Persiste el arreglo completo de usuarios en localStorage. */
  _guardarTodos(usuarios) {
    localStorage.setItem(DB_KEY, JSON.stringify(usuarios));
  }
};

/**
 * Maneja la sesion activa (usuario autenticado en el navegador).
 */
const Sesion = {

  /**
   * Guarda el usuario autenticado como sesion activa.
   * No se persiste la contrasena por seguridad basica.
   * @param {Object} usuario usuario que inicio sesion
   */
  iniciar(usuario) {
    const { password, ...usuarioSinPassword } = usuario;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(usuarioSinPassword));
  },

  /**
   * Obtiene el usuario de la sesion activa.
   * @returns {Object|null} usuario en sesion o null si no hay sesion
   */
  obtener() {
    const crudo = sessionStorage.getItem(SESSION_KEY);
    return crudo ? JSON.parse(crudo) : null;
  },

  /** Cierra la sesion activa. */
  cerrar() {
    sessionStorage.removeItem(SESSION_KEY);
  }
};

// Se asegura de que exista el usuario administrador desde el
// primer momento en que se carga cualquier pagina del modulo.
UsuarioRepositorio.inicializar();
