/**
 * ============================================================
 * Componente: Registro
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Extension del componente Login definido en el EV02: cubre la
 * historia de usuario "Como visitante, quiero crear una cuenta
 * para usar la plataforma", necesaria para que exista un usuario
 * antes de poder autenticarse.
 * ============================================================
 */

'use strict';

const ESTADO_INICIAL_REGISTRO = {
  nombres: '',
  apellidos: '',
  cedula: '',
  fechaNacimiento: '',
  email: '',
  password: ''
};

/**
 * @param {Object} props
 * @param {Function} props.onRegistroExitoso callback tras crear la cuenta
 * @param {Function} props.onIrALogin cambia la vista a Login
 */
function Registro({ onRegistroExitoso, onIrALogin }) {
  const [datos, setDatos] = React.useState(ESTADO_INICIAL_REGISTRO);
  const [errores, setErrores] = React.useState({});

  /** Actualiza un campo del formulario de forma controlada. */
  function manejarCambio(campo, valor) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
  }

  function manejarSubmit(evento) {
    evento.preventDefault();

    const erroresEncontrados = Validador.validarFormularioUsuario(datos);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) return;

    UsuarioRepositorio.crear(datos);
    onRegistroExitoso(datos.email);
  }

  return (
    <main className="tarjeta-auth">
      <h1>Registro</h1>
      <p className="tarjeta-auth__subtitulo">
        Crea tu cuenta para empezar a gestionar tus finanzas.
      </p>

      {Object.keys(errores).length > 0 && (
        <div className="alerta alerta--error">
          <strong>Error:</strong> Revisa los datos marcados.
        </div>
      )}

      <form onSubmit={manejarSubmit} noValidate>
        <div className={`campo ${errores.nombres ? 'campo--error' : ''}`}>
          <label>Nombres</label>
          <input value={datos.nombres} onChange={(e) => manejarCambio('nombres', e.target.value)} />
          {errores.nombres && <div className="campo__mensaje-error">{errores.nombres}</div>}
        </div>

        <div className={`campo ${errores.apellidos ? 'campo--error' : ''}`}>
          <label>Apellidos</label>
          <input value={datos.apellidos} onChange={(e) => manejarCambio('apellidos', e.target.value)} />
          {errores.apellidos && <div className="campo__mensaje-error">{errores.apellidos}</div>}
        </div>

        <div className={`campo ${errores.cedula ? 'campo--error' : ''}`}>
          <label>Cedula</label>
          <input value={datos.cedula} onChange={(e) => manejarCambio('cedula', e.target.value)} />
          {errores.cedula && <div className="campo__mensaje-error">{errores.cedula}</div>}
        </div>

        <div className={`campo ${errores.fechaNacimiento ? 'campo--error' : ''}`}>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={datos.fechaNacimiento}
            onChange={(e) => manejarCambio('fechaNacimiento', e.target.value)}
          />
          {errores.fechaNacimiento && <div className="campo__mensaje-error">{errores.fechaNacimiento}</div>}
        </div>

        <div className={`campo ${errores.email ? 'campo--error' : ''}`}>
          <label>Email</label>
          <input type="email" value={datos.email} onChange={(e) => manejarCambio('email', e.target.value)} />
          {errores.email && <div className="campo__mensaje-error">{errores.email}</div>}
        </div>

        <div className={`campo ${errores.password ? 'campo--error' : ''}`}>
          <label>Contrasena</label>
          <input
            type="password"
            value={datos.password}
            onChange={(e) => manejarCambio('password', e.target.value)}
          />
          {errores.password && <div className="campo__mensaje-error">{errores.password}</div>}
        </div>

        <button type="submit" className="boton">Crear cuenta</button>
      </form>

      <p className="enlace-auxiliar">
        ¿Ya tienes cuenta?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onIrALogin(); }}>Inicia sesion aqui</a>
      </p>
    </main>
  );
}
