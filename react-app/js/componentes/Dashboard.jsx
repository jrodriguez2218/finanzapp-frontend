/**
 * ============================================================
 * Componente: Dashboard
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Pantalla principal de FinanzApp.
 * Presenta el resumen financiero del usuario, sus movimientos,
 * estadísticas y gráfico mensual.
 * ============================================================
 */

'use strict';

function Dashboard({ usuario }) {

  const [mostrarFormulario, setMostrarFormulario] = React.useState(false);
  const [version, setVersion] = React.useState(0);

  /**
   * Obtiene nuevamente la información del usuario.
   * Esto permite actualizar el saldo después de registrar
   * una nueva transacción.
   */
  const usuarioActualizado = React.useMemo(
    () => UsuarioRepositorio.buscarPorId(usuario.id),
    [usuario.id, version]
  );

  /**
   * Obtiene el resumen financiero de los últimos meses.
   */
  const resumenMensual = React.useMemo(
    () => TransaccionRepositorio.obtenerResumenMensual(usuario.id),
    [usuario.id, version]
  );

  /**
   * Obtiene todas las transacciones del usuario.
   */
  const transacciones = React.useMemo(
    () => TransaccionRepositorio.obtenerPorUsuario(usuario.id),
    [usuario.id, version]
  );

  /**
   * Calcula el total de ingresos.
   */
  const totalIngresos = React.useMemo(
    () =>
      transacciones
        .filter((t) => t.tipo === 'INGRESO')
        .reduce((total, t) => total + Number(t.monto || t.amount || 0), 0),
    [transacciones]
  );

  /**
   * Calcula el total de gastos.
   */
  const totalGastos = React.useMemo(
    () =>
      transacciones
        .filter((t) => t.tipo === 'GASTO')
        .reduce((total, t) => total + Number(t.monto || t.amount || 0), 0),
    [transacciones]
  );

  /**
   * Cantidad total de movimientos registrados.
   */
  const totalMovimientos = transacciones.length;

  /**
   * Máximo utilizado para calcular proporcionalmente
   * la altura de las barras del gráfico.
   */
  const maximoMensual = Math.max(
    ...resumenMensual.map((r) => r.total),
    1
  );

  /**
   * Formatea los valores monetarios.
   */
  function formatearMoneda(valor) {
    return Number(valor || 0).toLocaleString('es-CO', {
      maximumFractionDigits: 0
    });
  }

  /**
   * Se ejecuta cuando se guarda una transacción.
   */
  function refrescar() {
    setVersion((v) => v + 1);
    setMostrarFormulario(false);
  }

  return (
    <div className="dashboard">

      {/* ======================================================
          ENCABEZADO
          ====================================================== */}

      <header className="dashboard__saludo">

        <div className="dashboard__usuario">

          {usuarioActualizado.foto ? (
            <img
              src={usuarioActualizado.foto}
              alt="Foto de perfil"
              className="dashboard__avatar"
            />
          ) : (
            <div className="avatar">
              {usuarioActualizado.nombres
                ? usuarioActualizado.nombres.charAt(0).toUpperCase() +
                  (usuarioActualizado.apellidos
                    ? usuarioActualizado.apellidos.charAt(0).toUpperCase()
                    : '')
                : 'U'}
            </div>
          )}

          <div>
            <p className="dashboard__hola">
              ¡Hola {usuarioActualizado.nombres}, bienvenido!
            </p>

            <span className="dashboard__mensaje">
              Aquí tienes el resumen de tus finanzas.
            </span>
          </div>

        </div>

      </header>


      {/* ======================================================
          TARJETA DE SALDO
          ====================================================== */}

      <section className="tarjeta-saldo">

        <p className="tarjeta-saldo__etiqueta">
          Saldo Disponible
        </p>

        <h1 className="tarjeta-saldo__monto">
          ${formatearMoneda(usuarioActualizado.saldo)}
        </h1>

        <span className="tarjeta-saldo__detalle">
          Disponible actualmente
        </span>

      </section>


      {/* ======================================================
          RESUMEN FINANCIERO
          ====================================================== */}

      <section className="dashboard__resumen">

        {/* INGRESOS */}
        <article className="dashboard__estadistica dashboard__estadistica--ingreso">

          <div className="dashboard__estadistica-icono">
            ↑
          </div>

          <div>
            <span>Ingresos</span>

            <strong>
              +${formatearMoneda(totalIngresos)}
            </strong>
          </div>

        </article>


        {/* GASTOS */}
        <article className="dashboard__estadistica dashboard__estadistica--gasto">

          <div className="dashboard__estadistica-icono">
            ↓
          </div>

          <div>
            <span>Gastos</span>

            <strong>
              -${formatearMoneda(totalGastos)}
            </strong>
          </div>

        </article>


        {/* MOVIMIENTOS */}
        <article className="dashboard__estadistica">

          <div className="dashboard__estadistica-icono">
            #
          </div>

          <div>
            <span>Movimientos</span>

            <strong>
              {totalMovimientos}
            </strong>
          </div>

        </article>

      </section>


      {/* ======================================================
          HISTORIAL + GRÁFICO
          ====================================================== */}

      <div className="dashboard__grid">

        {/* HISTORIAL */}
        <section className="dashboard__panel">

          <div className="dashboard__panel-cabecera">
            <div>
              <h3 className="dashboard__subtitulo">
                Historial de Movimientos
              </h3>

              <p>
                Tus últimos movimientos registrados
              </p>
            </div>
          </div>

          <ListaTransacciones
            usuario={usuarioActualizado}
            limite={5}
            version={version}
          />

        </section>


        {/* GRÁFICO */}
        <section className="dashboard__panel">

          <div className="dashboard__panel-cabecera">

            <div>
              <h3 className="dashboard__subtitulo">
                Resumen mensual
              </h3>

              <p>
                Gastos registrados por mes
              </p>
            </div>

          </div>

          <div className="grafico-barras">

            {resumenMensual.map((r) => (

              <div
                key={r.etiqueta + r.anio}
                className="grafico-barras__columna"
              >

                <strong className="grafico-barras__valor">
                  ${formatearMoneda(r.total)}
                </strong>

                <div
                  className="grafico-barras__barra"
                  style={{
                    height: `${(r.total / maximoMensual) * 100}%`
                  }}
                />

                <span>
                  {r.etiqueta}
                </span>

              </div>

            ))}

          </div>

        </section>

      </div>


      {/* ======================================================
          CONSEJO FINANCIERO
          ====================================================== */}

      <section className="dashboard__consejo">

        <div className="dashboard__consejo-icono">
          💡
        </div>

        <div>
          <strong>
            Consejo financiero
          </strong>

          <p>
            Llevar un registro de tus ingresos y gastos
            te ayuda a conocer mejor el comportamiento
            de tus finanzas.
          </p>
        </div>

      </section>


      {/* ======================================================
          BOTÓN NUEVA TRANSACCIÓN
          ====================================================== */}

      <button
        type="button"
        className="boton dashboard__boton-transaccion"
        onClick={() => setMostrarFormulario(true)}
      >
        <span>＋</span>
        Añadir Transacción
      </button>


      {/* ======================================================
          FORMULARIO DE TRANSACCIÓN
          ====================================================== */}

      {mostrarFormulario && (
        <FormularioTransacciones
          usuarioId={usuario.id}
          onGuardado={refrescar}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}

    </div>
  );
}