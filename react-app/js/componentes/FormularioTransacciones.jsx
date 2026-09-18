/**
 * ============================================================
 * Componente: FormularioTransacciones
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Permite registrar ingresos, egresos y
 * transferencias realizadas por el usuario. Centraliza el
 * registro de movimientos financieros y valida la informacion
 * antes de almacenarla en el sistema."
 * ============================================================
 */

'use strict';

const CATEGORIAS_INGRESO = [
  'Salario', 'Honorarios', 'Ventas', 'Bonificaciones', 'Comisiones', 'Intereses', 'Inversiones', 'Otros ingresos'
];

const CATEGORIAS_GASTO = [
  'Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Otros'
];

/**
 * @param {Object} props
 * @param {number} props.usuarioId id del usuario que registra el movimiento
 * @param {Function} props.onGuardado callback ejecutado tras registrar la transaccion
 * @param {Function} props.onCancelar cierra el formulario sin guardar
 */
function FormularioTransacciones({ usuarioId, onGuardado, onCancelar }) {
  const [tipo, setTipo] = React.useState('GASTO');
  const [descripcion, setDescripcion] = React.useState('');
  const [monto, setMonto] = React.useState('');
  const categoriasDisponibles = tipo === 'INGRESO' ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO;
  const [categoria, setCategoria] = React.useState(categoriasDisponibles[0]);
  const [fecha, setFecha] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = React.useState('');

  /**
   * Cambia el tipo de movimiento y ajusta la categoria seleccionada
   * a la primera opcion valida para ese tipo (Ingreso o Gasto usan
   * catalogos de categorias distintos).
   * @param {string} nuevoTipo 'INGRESO' o 'GASTO'
   */
  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    const nuevasCategorias = nuevoTipo === 'INGRESO' ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO;
    setCategoria(nuevasCategorias[0]);
  }

  function manejarSubmit(evento) {
    evento.preventDefault();
    setError('');

    if (!Validador.esRequerido(descripcion) || Number(monto) <= 0) {
      setError('Escribe una descripcion y un monto mayor a cero.');
      return;
    }

    TransaccionRepositorio.crear({ usuarioId, tipo, descripcion, monto, categoria, fecha });
    onGuardado();
  }

  return (
    <div className="modal">
      <div className="modal__contenido">
        <h2>Nueva transaccion</h2>

        {error && <div className="alerta alerta--error">{error}</div>}

        <form onSubmit={manejarSubmit} noValidate>
          <div className="campo">
            <label>Tipo de movimiento</label>
            <div className="selector-tipo">
              <button
                type="button"
                className={`selector-tipo__opcion ${tipo === 'INGRESO' ? 'selector-tipo__opcion--activo' : ''}`}
                onClick={() => cambiarTipo('INGRESO')}
              >
                Ingreso (+)
              </button>
              <button
                type="button"
                className={`selector-tipo__opcion ${tipo === 'GASTO' ? 'selector-tipo__opcion--activo' : ''}`}
                onClick={() => cambiarTipo('GASTO')}
              >
                Gasto (-)
              </button>
            </div>
          </div>

          <div className="campo">
            <label>Descripcion</label>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Almuerzo con cliente"
            />
          </div>

          <div className="campo">
            <label>Monto</label>
            <input
              type="number"
              min="1"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej. 450"
            />
          </div>

          <div className="campo">
            <label>Categoria</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categoriasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="campo">
            <label>Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>

          <div className="panel-edicion__acciones">
            <button type="submit" className="boton">Confirmar Movimiento</button>
            <button type="button" className="boton boton--secundario" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
