/**
 * ============================================================
 * Componente: ReporteView
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Permite visualizar los reportes
 * financieros generados por el sistema mediante tablas o
 * graficos. Facilita el analisis de la informacion financiera y
 * apoya la toma de decisiones del usuario."
 * ============================================================
 */

'use strict';

function ReporteView({ usuario }) {
  const [desde, setDesde] = React.useState('');
  const [hasta, setHasta] = React.useState('');
  const [tipo, setTipo] = React.useState('TODOS');

  const transacciones = TransaccionRepositorio.obtenerPorUsuario(usuario.id);

  const filtradas = transacciones.filter((t) => {
    const fecha = new Date(t.fecha);
    if (desde && fecha < new Date(desde)) return false;
    if (hasta && fecha > new Date(hasta)) return false;
    if (tipo !== 'TODOS' && t.tipo !== tipo) return false;
    return true;
  });

  const totalIngresos = filtradas.filter((t) => t.tipo === 'INGRESO').reduce((acc, t) => acc + t.monto, 0);
  const totalGastos = filtradas.filter((t) => t.tipo === 'GASTO').reduce((acc, t) => acc + t.monto, 0);

  return (
    <div>
      <h2>Reportes financieros</h2>
      <p className="tarjeta-auth__subtitulo">
        Consulta y filtra tus movimientos por rango de fechas y tipo.
      </p>

      <form className="formulario-en-linea" onSubmit={(e) => e.preventDefault()}>
        <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="TODOS">Todos</option>
          <option value="INGRESO">Ingresos</option>
          <option value="GASTO">Gastos</option>
        </select>
      </form>

      <div className="dashboard__grid">
        <div className="tarjeta-saldo">
          <p className="tarjeta-saldo__etiqueta">Total ingresos</p>
          <p className="tarjeta-saldo__monto texto-exito">${totalIngresos.toLocaleString('es-CO')}</p>
        </div>
        <div className="tarjeta-saldo">
          <p className="tarjeta-saldo__etiqueta">Total gastos</p>
          <p className="tarjeta-saldo__monto texto-error">${totalGastos.toLocaleString('es-CO')}</p>
        </div>
      </div>

      <h3 className="dashboard__subtitulo">Movimientos filtrados ({filtradas.length})</h3>
      {filtradas.length === 0 && <p className="lista-gastos__vacio">No hay movimientos con estos filtros.</p>}
      <ul className="lista-gastos">
        {filtradas.map((t) => (
          <li key={t.id} className="lista-gastos__item">
            <span>{t.descripcion}<br /><small>{t.categoria} · {t.fecha}</small></span>
            <strong className={t.tipo === 'INGRESO' ? 'texto-exito' : 'texto-error'}>
              {t.tipo === 'INGRESO' ? '+' : '-'}${t.monto.toLocaleString('es-CO')}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
