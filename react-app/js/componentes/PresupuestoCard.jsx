/**
 * ============================================================
 * Componente: PresupuestoCard
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Muestra los presupuestos creados por el
 * usuario y el monto disponible para cada uno. Permite controlar
 * los gastos y hacer seguimiento al cumplimiento de los
 * presupuestos establecidos."
 * ============================================================
 */

'use strict';

const CATEGORIAS_PRESUPUESTO = ['Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación'];

function PresupuestoCard({ usuario }) {
  const [version, setVersion] = React.useState(0);
  const [categoria, setCategoria] = React.useState(CATEGORIAS_PRESUPUESTO[0]);
  const [limite, setLimite] = React.useState('');

  const presupuestos = React.useMemo(
    () => PresupuestoRepositorio.obtenerPorUsuario(usuario.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usuario.id, version]
  );

  function manejarSubmit(evento) {
    evento.preventDefault();
    if (Number(limite) <= 0) return;
    PresupuestoRepositorio.crear({ usuarioId: usuario.id, categoria, limiteMensual: limite });
    setLimite('');
    setVersion((v) => v + 1);
  }

  function eliminar(id) {
    PresupuestoRepositorio.eliminar(id);
    setVersion((v) => v + 1);
  }

  return (
    <div>
      <h2>Presupuestos</h2>
      <p className="tarjeta-auth__subtitulo">
        Define un limite mensual por categoria y monitorea que tan cerca estas de alcanzarlo.
      </p>

      <form onSubmit={manejarSubmit} className="formulario-en-linea">
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {CATEGORIAS_PRESUPUESTO.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          min="1"
          placeholder="Limite mensual"
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
        />
        <button type="submit" className="boton boton--chico">Guardar</button>
      </form>

      <div className="lista-tarjetas">
        {presupuestos.length === 0 && <p className="lista-gastos__vacio">Aun no has definido presupuestos.</p>}

        {presupuestos.map((p) => {
          const gastado = TransaccionRepositorio.gastadoPorCategoriaEsteMes(usuario.id, p.categoria);
          const porcentaje = Math.min(100, Math.round((gastado / p.limiteMensual) * 100));
          const enAlerta = porcentaje >= 85;

          return (
            <div key={p.id} className="tarjeta-presupuesto">
              <div className="tarjeta-presupuesto__cabecera">
                <strong>{p.categoria}</strong>
                <button className="boton-chico boton-chico--eliminar" onClick={() => eliminar(p.id)}>✕</button>
              </div>
              <div className="barra-progreso">
                <div
                  className={`barra-progreso__relleno ${enAlerta ? 'barra-progreso__relleno--alerta' : ''}`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className="tarjeta-presupuesto__detalle">
                ${gastado.toLocaleString('es-CO')} de ${p.limiteMensual.toLocaleString('es-CO')} ({porcentaje}%)
              </p>
              {enAlerta && <p className="texto-error">⚠ Estas cerca de tu limite mensual.</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
