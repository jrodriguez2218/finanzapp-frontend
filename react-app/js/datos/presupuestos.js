/**
 * ============================================================
 * FinanzApp - Presupuestos (presupuestos.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Capa de datos para los presupuestos por categoria definidos
 * por el usuario. Usada por el componente PresupuestoCard.
 * ============================================================
 */

'use strict';

const PRESUPUESTOS_KEY = 'finanzapp_db_presupuestos';

const PresupuestoRepositorio = {

  _leerTodos() {
    const crudo = localStorage.getItem(PRESUPUESTOS_KEY);
    return crudo ? JSON.parse(crudo) : [];
  },

  _guardarTodos(presupuestos) {
    localStorage.setItem(PRESUPUESTOS_KEY, JSON.stringify(presupuestos));
  },

  /**
   * Obtiene los presupuestos definidos por un usuario.
   * @param {number} usuarioId id del usuario
   * @returns {Array<Object>} presupuestos del usuario
   */
  obtenerPorUsuario(usuarioId) {
    return this._leerTodos().filter((p) => p.usuarioId === Number(usuarioId));
  },

  /**
   * Crea (o actualiza si ya existe) el presupuesto de una categoria.
   * @param {Object} datos { usuarioId, categoria, limiteMensual }
   * @returns {Object} presupuesto creado o actualizado
   */
  crear(datos) {
    const presupuestos = this._leerTodos();
    const existente = presupuestos.find(
      (p) => p.usuarioId === Number(datos.usuarioId) && p.categoria === datos.categoria
    );

    if (existente) {
      existente.limiteMensual = Number(datos.limiteMensual);
      this._guardarTodos(presupuestos);
      return existente;
    }

    const nuevoPresupuesto = {
      id: Date.now(),
      usuarioId: Number(datos.usuarioId),
      categoria: datos.categoria,
      limiteMensual: Number(datos.limiteMensual)
    };
    presupuestos.push(nuevoPresupuesto);
    this._guardarTodos(presupuestos);
    return nuevoPresupuesto;
  },

  /**
   * Elimina un presupuesto por id.
   * @param {number} id identificador del presupuesto
   */
  eliminar(id) {
    const restantes = this._leerTodos().filter((p) => p.id !== id);
    this._guardarTodos(restantes);
  }
};
