/**
 * ============================================================
 * FinanzApp - Transacciones (transacciones.js)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Capa de datos para ingresos y gastos. El saldo del usuario
 * SIEMPRE se recalcula a partir del historial de transacciones,
 * nunca se edita manualmente, para evitar que quede desincronizado.
 * Usada por los componentes CuentaCard, FormularioTransacciones,
 * ListaTransacciones y ReporteView.
 * ============================================================
 */

'use strict';

const TRANSACCIONES_KEY = 'finanzapp_db_transacciones';

const TransaccionRepositorio = {

  /** Lee todas las transacciones de todos los usuarios. */
  _leerTodas() {
    const crudo = localStorage.getItem(TRANSACCIONES_KEY);
    return crudo ? JSON.parse(crudo) : [];
  },

  /** Persiste el arreglo completo de transacciones. */
  _guardarTodas(transacciones) {
    localStorage.setItem(TRANSACCIONES_KEY, JSON.stringify(transacciones));
  },

  /**
   * Obtiene las transacciones de un usuario, mas recientes primero.
   * @param {number} usuarioId id del usuario
   * @returns {Array<Object>} transacciones del usuario
   */
  obtenerPorUsuario(usuarioId) {
    return this._leerTodas()
      .filter((t) => t.usuarioId === Number(usuarioId))
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  },

  /**
   * Registra una nueva transaccion y actualiza el saldo del usuario
   * (caso de uso "Registrar ingreso/gasto").
   * @param {Object} datos { usuarioId, tipo, descripcion, monto, categoria, fecha }
   * @returns {Object} transaccion creada
   */
  crear(datos) {
    const transacciones = this._leerTodas();
    const nuevaTransaccion = {
      id: Date.now(),
      usuarioId: Number(datos.usuarioId),
      tipo: datos.tipo,
      descripcion: datos.descripcion.trim(),
      monto: Math.abs(Number(datos.monto)),
      categoria: datos.categoria,
      fecha: datos.fecha
    };

    transacciones.push(nuevaTransaccion);
    this._guardarTodas(transacciones);

    const usuario = UsuarioRepositorio.buscarPorId(datos.usuarioId);
    const signo = nuevaTransaccion.tipo === 'INGRESO' ? 1 : -1;
    const nuevoSaldo = Number(usuario.saldo) + signo * nuevaTransaccion.monto;
    UsuarioRepositorio.actualizar(usuario.id, { saldo: nuevoSaldo });

    return nuevaTransaccion;
  },

  /**
   * Elimina una transaccion y revierte su efecto sobre el saldo
   * del usuario, manteniendo la coherencia de los datos.
   * @param {number} id identificador de la transaccion
   * @returns {boolean} true si se elimino
   */
  eliminar(id) {
    const transacciones = this._leerTodas();
    const transaccion = transacciones.find((t) => t.id === id);
    if (!transaccion) return false;

    const restantes = transacciones.filter((t) => t.id !== id);
    this._guardarTodas(restantes);

    const usuario = UsuarioRepositorio.buscarPorId(transaccion.usuarioId);
    const signo = transaccion.tipo === 'INGRESO' ? -1 : 1;
    const nuevoSaldo = Number(usuario.saldo) + signo * transaccion.monto;
    UsuarioRepositorio.actualizar(usuario.id, { saldo: nuevoSaldo });

    return true;
  },

  /**
   * Calcula el total de gastos por mes de los ultimos 6 meses,
   * para alimentar el grafico del Dashboard.
   * @param {number} usuarioId id del usuario
   * @returns {Array<{etiqueta: string, total: number}>}
   */
  obtenerResumenMensual(usuarioId) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const hoy = new Date();
    const resumen = [];

    for (let i = 5; i >= 0; i -= 1) {
      const fechaMes = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      resumen.push({ anio: fechaMes.getFullYear(), mes: fechaMes.getMonth(), etiqueta: meses[fechaMes.getMonth()], total: 0 });
    }

    this.obtenerPorUsuario(usuarioId)
      .filter((t) => t.tipo === 'GASTO')
      .forEach((t) => {
        const fecha = new Date(t.fecha);
        const bucket = resumen.find((r) => r.anio === fecha.getFullYear() && r.mes === fecha.getMonth());
        if (bucket) bucket.total += t.monto;
      });

    return resumen;
  },

  /**
   * Calcula el total gastado por una categoria en el mes actual.
   * Usada por PresupuestoCard para comparar contra el limite.
   * @param {number} usuarioId id del usuario
   * @param {string} categoria categoria a evaluar
   * @returns {number} total gastado en la categoria este mes
   */
  gastadoPorCategoriaEsteMes(usuarioId, categoria) {
    const hoy = new Date();
    return this.obtenerPorUsuario(usuarioId)
      .filter((t) => {
        const fecha = new Date(t.fecha);
        return (
          t.tipo === 'GASTO' &&
          t.categoria === categoria &&
          fecha.getMonth() === hoy.getMonth() &&
          fecha.getFullYear() === hoy.getFullYear()
        );
      })
      .reduce((total, t) => total + t.monto, 0);
  }
};
