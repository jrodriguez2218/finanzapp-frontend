/**
 * ============================================================
 * Componente: ListaTransacciones
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Presenta el historial de movimientos
 * financieros realizados en las cuentas del usuario. Facilita
 * la consulta y el seguimiento de todas las operaciones
 * registradas, brindando mayor control sobre las finanzas."
 * ============================================================
 */

'use strict';

/** Formatea un numero como moneda simple ($1,234). */
function formatearMonedaLista(valor) {
  return `$${Number(valor).toLocaleString('es-CO')}`;
}

/**
 * @param {Object} props
 * @param {Object} props.usuario usuario en sesion
 * @param {number} [props.limite] cantidad maxima de items a mostrar (opcional)
 * @param {number} props.version cambia para forzar el recalculo de la lista
 * @param {Function} [props.onEliminar] callback cuando se elimina una transaccion
 */
function ListaTransacciones({ usuario, limite, version, onEliminar }) {
  const transacciones = React.useMemo(() => {
    const todas = TransaccionRepositorio.obtenerPorUsuario(usuario.id);
    return limite ? todas.slice(0, limite) : todas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario.id, limite, version]);

  function manejarEliminar(id) {
    const confirmado = window.confirm('¿Eliminar este movimiento? Esto tambien ajustara tu saldo.');
    if (!confirmado) return;
    TransaccionRepositorio.eliminar(id);
    if (onEliminar) onEliminar();
  }

  if (transacciones.length === 0) {
    return <p className="lista-gastos__vacio">Aún no tienes movimientos registrados.</p>;
  }

  return (
    <ul className="lista-gastos">
      {transacciones.map((t) => (
        <li key={t.id} className={`lista-gastos__item ${t.tipo === 'INGRESO' ? 'movimiento--ingreso' : 'movimiento--gasto'}`}>
          <span>
            {t.descripcion}<br />
            <small>{t.categoria} · {t.fecha}</small>
          </span>
          <span className="lista-gastos__acciones">
            <strong>
              {t.tipo === 'INGRESO' ? '+' : '-'}{formatearMonedaLista(t.monto)}
            </strong>
            {onEliminar && (
              <button
                className="boton-chico boton-chico--eliminar"
                onClick={() => manejarEliminar(t.id)}
                title="Eliminar movimiento"
              >
                ✕
              </button>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Contenedor de la vista "Movimientos" del menu principal: mantiene
 * su propio contador de version para poder refrescarse a si mismo
 * cada vez que se elimina un movimiento.
 * @param {Object} props
 * @param {Object} props.usuario usuario en sesion
 */
function VistaTransacciones({ usuario }) {
  const [version, setVersion] = React.useState(0);

  return (
    <div>
      <h2>Todos mis movimientos</h2>
      <ListaTransacciones
        usuario={usuario}
        version={version}
        onEliminar={() => setVersion((v) => v + 1)}
      />
    </div>
  );
}
