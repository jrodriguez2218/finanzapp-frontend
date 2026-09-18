/**
 * ============================================================
 * Componente: App
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Es el componente principal de la
 * aplicacion. Desde este componente se organiza toda la
 * estructura del sistema y se controla la navegacion entre las
 * diferentes paginas."
 *
 * No se usa React Router (para mantener el proyecto sin
 * herramientas de build); la navegacion entre vistas se maneja
 * con un estado simple ("vista"), tal como recomienda el EV01
 * para componentes funcionales con Hooks.
 * ============================================================
 */

'use strict';

function App() {
  const [usuario, setUsuario] = React.useState(() => Sesion.obtener());
  const [vistaAuth, setVistaAuth] = React.useState('login');
  const [vista, setVista] = React.useState('dashboard');

  /** Se ejecuta cuando Login autentica correctamente a un usuario. */
  function manejarLogin(usuarioAutenticado) {
    setUsuario(usuarioAutenticado);
    setVista(usuarioAutenticado.rol === 'ADMIN' ? 'admin' : 'dashboard');
  }

  /** Cierra la sesion activa y regresa a la pantalla de Login. */
  function cerrarSesion() {
    Sesion.cerrar();
    setUsuario(null);
    setVistaAuth('login');
  }

  // ---- Usuario NO autenticado: Login / Registro / Recuperar ----
  if (!usuario) {
    if (vistaAuth === 'registro') {
      return (
        <Registro
          onRegistroExitoso={() => setVistaAuth('login')}
          onIrALogin={() => setVistaAuth('login')}
        />
      );
    }
    if (vistaAuth === 'recuperar') {
      return (
        <Recuperar
          onExito={() => setVistaAuth('login')}
          onIrALogin={() => setVistaAuth('login')}
        />
      );
    }
    return (
      <Login
        onLogin={manejarLogin}
        onIrARegistro={() => setVistaAuth('registro')}
        onIrARecuperar={() => setVistaAuth('recuperar')}
      />
    );
  }

  // ---- Usuario autenticado: Navbar + vista activa + Footer ----
  return (
    <div className="app-shell">
      <Navbar
        usuario={usuario}
        vistaActual={vista}
        onCambiarVista={setVista}
        onCerrarSesion={cerrarSesion}
      />

      <main className="app-contenido">
        {vista === 'dashboard' && <Dashboard usuario={usuario} />}
        {vista === 'transacciones' && <VistaTransacciones usuario={usuario} />}
        {vista === 'presupuestos' && <PresupuestoCard usuario={usuario} />}
        {vista === 'metas' && <MetaAhorroCard usuario={usuario} />}
        {vista === 'reportes' && <ReporteView usuario={usuario} />}
        {vista === 'perfil' && <PerfilUsuario usuario={usuario} onActualizar={setUsuario} />}
        {vista === 'admin' && usuario.rol === 'ADMIN' && <AdminUsuarios />}
      </main>

      <Footer />
    </div>
  );
}

// Punto de entrada: monta el componente App en el elemento #root.
const raizDom = ReactDOM.createRoot(document.getElementById('root'));
raizDom.render(<App />);
