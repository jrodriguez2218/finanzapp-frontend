/**
 * ============================================================
 * FinanzApp - Metas de ahorro (metas.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Capa de datos para las metas de ahorro definidas por el
 * usuario. Usada por el componente MetaAhorroCard.
 * ============================================================
 */

'use strict';

const METAS_KEY = 'finanzapp_db_metas';

const MetaRepositorio = {

  _leerTodas() {
    const crudo = localStorage.getItem(METAS_KEY);
    return crudo ? JSON.parse(crudo) : [];
  },

  _guardarTodas(metas) {
    localStorage.setItem(METAS_KEY, JSON.stringify(metas));
  },

  /**
   * Obtiene las metas de ahorro de un usuario.
   * @param {number} usuarioId id del usuario
   * @returns {Array<Object>} metas del usuario
   */
  obtenerPorUsuario(usuarioId) {
    return this._leerTodas().filter((m) => m.usuarioId === Number(usuarioId));
  },

  /**
   * Crea una nueva meta de ahorro.
   * @param {Object} datos { usuarioId, nombre, montoObjetivo }
   * @returns {Object} meta creada
   */
  crear(datos) {
    const metas = this._leerTodas();
    const nuevaMeta = {
      id: Date.now(),
      usuarioId: Number(datos.usuarioId),
      nombre: datos.nombre.trim(),
      montoObjetivo: Number(datos.montoObjetivo),
      montoActual: 0
    };
    metas.push(nuevaMeta);
    this._guardarTodas(metas);
    return nuevaMeta;
  },

  /**
   * Registra un abono (aporte) a una meta existente.
   * @param {number} id identificador de la meta
   * @param {number} monto monto a abonar
   * @returns {Object|null} meta actualizada
   */
  abonar(id, monto) {
    const metas = this._leerTodas();
    const meta = metas.find((m) => m.id === id);
    if (!meta) return null;

    meta.montoActual = Math.min(meta.montoObjetivo, meta.montoActual + Number(monto));
    this._guardarTodas(metas);
    return meta;
  },

  /**
   * Elimina una meta de ahorro por id.
   * @param {number} id identificador de la meta
   */
  eliminar(id) {
    const restantes = this._leerTodas().filter((m) => m.id !== id);
    this._guardarTodas(restantes);
  }
};
