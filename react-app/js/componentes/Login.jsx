/**
 * ============================================================
 * Componente: Login
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el informe de verificacion de componentes (EV02):
 * "Permite que los usuarios ingresen al sistema mediante su
 * correo electronico y contrasena."
 *
 * Componente funcional con Hooks (useState), tal como se
 * concluyo en el taller de fundamentos de React (EV01).
 * ============================================================
 */

'use strict';

/**
 * @param {Object} props
 * @param {Function} props.onLogin callback ejecutado con el usuario autenticado
 * @param {Function} props.onIrARegistro cambia la vista a Registro
 * @param {Function} props.onIrARecuperar cambia la vista a Recuperar contrasena
 */
function Login({ onLogin, onIrARegistro, onIrARecuperar }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  /** Maneja el envio del formulario de inicio de sesion. */
  function manejarSubmit(evento) {
    evento.preventDefault();
    setError('');

    const usuario = UsuarioRepositorio.buscarPorEmail(email.trim());
    const credencialesValidas = usuario && usuario.password === password;

    if (!credencialesValidas) {
      setError('Usuario o contrasena incorrectos.');
      return;
    }

    Sesion.iniciar(usuario);
    onLogin(usuario);
  }

  return (
    <main className="tarjeta-auth">
      <div className="tarjeta-auth__marca">FinanzApp</div>
      <h1>Inicia sesion</h1>
      <p className="tarjeta-auth__subtitulo">
        Bienvenido de nuevo, gestiona tus finanzas facilmente.
      </p>

      {error && <div className="alerta alerta--error">{error}</div>}

      <form onSubmit={manejarSubmit} noValidate>
        <div className="campo">
          <label htmlFor="email">Usuario (email):</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="password">Contrasena:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="boton">Iniciar Sesion &rarr;</button>
      </form>

      <p className="enlace-auxiliar">
        ¿No tiene una cuenta?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onIrARegistro(); }}>Registrese</a>
      </p>
      <p className="enlace-auxiliar">
        <a href="#" onClick={(e) => { e.preventDefault(); onIrARecuperar(); }}>Olvido la contrasena</a>
      </p>
    </main>
  );
}
