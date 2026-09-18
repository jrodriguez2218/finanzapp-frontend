/**
 * ============================================================
 * Componente: MetaAhorroCard
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Muestra la informacion relacionada con
 * las metas de ahorro establecidas por el usuario y su progreso.
 * Ayuda al usuario a realizar seguimiento de sus objetivos
 * financieros."
 * ============================================================
 */

'use strict';

function MetaAhorroCard({ usuario }) {
  const [version, setVersion] = React.useState(0);
  const [nombre, setNombre] = React.useState('');
  const [montoObjetivo, setMontoObjetivo] = React.useState('');

  const metas = React.useMemo(
    () => MetaRepositorio.obtenerPorUsuario(usuario.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usuario.id, version]
  );

  function crearMeta(evento) {
    evento.preventDefault();
    if (!Validador.esRequerido(nombre) || Number(montoObjetivo) <= 0) return;
    MetaRepositorio.crear({ usuarioId: usuario.id, nombre, montoObjetivo });
    setNombre('');
    setMontoObjetivo('');
    setVersion((v) => v + 1);
  }

  function abonar(id) {
    const monto = window.prompt('¿Cuanto quieres abonar a esta meta?', '50000');
    if (!monto || Number(monto) <= 0) return;
    MetaRepositorio.abonar(id, monto);
    setVersion((v) => v + 1);
  }

  function eliminar(id) {
    MetaRepositorio.eliminar(id);
    setVersion((v) => v + 1);
  }

  return (
    <div>
      <h2>Metas de ahorro</h2>
      <p className="tarjeta-auth__subtitulo">
        Define un objetivo de ahorro y registra tus abonos para ver tu progreso.
      </p>

      <form onSubmit={crearMeta} className="formulario-en-linea">
        <input placeholder="Ej. Vacaciones" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input
          type="number"
          min="1"
          placeholder="Monto objetivo"
          value={montoObjetivo}
          onChange={(e) => setMontoObjetivo(e.target.value)}
        />
        <button type="submit" className="boton boton--chico">Crear meta</button>
      </form>

      <div className="lista-tarjetas">
        {metas.length === 0 && <p className="lista-gastos__vacio">Aun no has creado metas de ahorro.</p>}

        {metas.map((m) => {
          const porcentaje = Math.round((m.montoActual / m.montoObjetivo) * 100);
          return (
            <div key={m.id} className="tarjeta-presupuesto">
              <div className="tarjeta-presupuesto__cabecera">
                <strong>{m.nombre}</strong>
                <button className="boton-chico boton-chico--eliminar" onClick={() => eliminar(m.id)}>✕</button>
              </div>
              <div className="barra-progreso">
                <div className="barra-progreso__relleno" style={{ width: `${porcentaje}%` }} />
              </div>
              <p className="tarjeta-presupuesto__detalle">
                ${m.montoActual.toLocaleString('es-CO')} de ${m.montoObjetivo.toLocaleString('es-CO')} ({porcentaje}%)
              </p>
              <button className="boton-chico" onClick={() => abonar(m.id)}>Abonar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
