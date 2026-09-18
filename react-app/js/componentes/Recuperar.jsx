/**
 * ============================================================
 * Componente: Recuperar (recuperacion de contrasena)
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Extension del componente Login: flujo de dos pasos para que
 * el usuario recupere el acceso a su cuenta.
 * ============================================================
 */

'use strict';

function Recuperar({ onExito, onIrALogin }) {
  const [paso, setPaso] = React.useState(1);
  const [email, setEmail] = React.useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = React.useState(null);
  const [passwordNueva, setPasswordNueva] = React.useState('');
  const [passwordConfirmar, setPasswordConfirmar] = React.useState('');
  const [error, setError] = React.useState('');
  const [exito, setExito] = React.useState('');

  function buscarCuenta(evento) {
    evento.preventDefault();
    setError('');

    if (!Validador.esEmailValido(email)) {
      setError('Ingresa un correo electronico valido.');
      return;
    }

    const usuario = UsuarioRepositorio.buscarPorEmail(email.trim());
    if (!usuario) {
      setError('No encontramos ninguna cuenta con ese correo.');
      return;
    }

    setUsuarioEncontrado(usuario);
    setExito(`Cuenta encontrada para ${usuario.nombres}. Define tu nueva contrasena.`);
    setPaso(2);
  }

  function guardarNuevaPassword(evento) {
    evento.preventDefault();
    setError('');

    if (!Validador.esPasswordValida(passwordNueva)) {
      setError('La contrasena debe tener minimo 4 caracteres.');
      return;
    }
    if (passwordNueva !== passwordConfirmar) {
      setError('Las contrasenas no coinciden.');
      return;
    }

    UsuarioRepositorio.actualizar(usuarioEncontrado.id, { password: passwordNueva });
    onExito();
  }

  return (
    <main className="tarjeta-auth">
      <div className="tarjeta-auth__marca">FinanzApp</div>
      <h1>Recuperar contrasena</h1>

      {error && <div className="alerta alerta--error">{error}</div>}
      {exito && <div className="alerta alerta--exito">{exito}</div>}

      {paso === 1 && (
        <form onSubmit={buscarCuenta} noValidate>
          <div className="campo">
            <label>Correo electronico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="boton">Buscar mi cuenta</button>
        </form>
      )}

      {paso === 2 && (
        <form onSubmit={guardarNuevaPassword} noValidate>
          <div className="campo">
            <label>Nueva contrasena</label>
            <input
              type="password"
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Confirmar contrasena</label>
            <input
              type="password"
              value={passwordConfirmar}
              onChange={(e) => setPasswordConfirmar(e.target.value)}
            />
          </div>
          <button type="submit" className="boton">Guardar nueva contrasena</button>
        </form>
      )}

      <p className="enlace-auxiliar">
        <a href="#" onClick={(e) => { e.preventDefault(); onIrALogin(); }}>Volver a iniciar sesion</a>
      </p>
    </main>
  );
}
