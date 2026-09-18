/**
 * ============================================================
 * Componente: PerfilUsuario
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Permite consultar y actualizar la informacion personal
 * y los datos de acceso del usuario.
 * ============================================================
 */

'use strict';

function PerfilUsuario({ usuario, onActualizar }) {

  // Datos que se pueden modificar desde el perfil
  const [datos, setDatos] = React.useState({
  nombres: usuario.nombres || '',
  apellidos: usuario.apellidos || '',
  email: usuario.email || '',
  foto: usuario.foto || ''
});

  // Campo independiente para cambiar la contrasena
  const [passwordNueva, setPasswordNueva] = React.useState('');

  const [errores, setErrores] = React.useState({});
  const [exito, setExito] = React.useState('');

/**
 * Actualiza el valor de un campo del formulario.
 */
function manejarCambio(campo, valor) {
  setDatos((anterior) => ({
    ...anterior,
    [campo]: valor
  }));

  // Limpia el error del campo cuando el usuario vuelve a escribir.
  if (errores[campo]) {
    setErrores((anterior) => ({
      ...anterior,
      [campo]: ''
    }));
  }
}

/**
 * Permite seleccionar y guardar una imagen de perfil.
 */
function manejarFoto(evento) {
  const archivo = evento.target.files[0];

  if (!archivo) return;

  // Verifica que el archivo seleccionado sea una imagen.
  if (!archivo.type.startsWith('image/')) {
    setErrores({
      foto: 'Selecciona un archivo de imagen válido.'
    });
    return;
  }

  // Convierte la imagen a Base64 para poder almacenarla.
  const lector = new FileReader();

  lector.onload = function (e) {
    manejarCambio('foto', e.target.result);
  };

  lector.readAsDataURL(archivo);
}

/**
 * Guarda los cambios realizados en el perfil.
 */
function manejarSubmit(evento) {
    evento.preventDefault();

    setExito('');
    setErrores({});

    /*
     * Conservamos los datos originales de identificacion
     * para no eliminarlos del objeto del usuario.
     */
    const datosParaValidar = {
      ...usuario,
      ...datos,
      password: 'sin-cambios'
    };

    const erroresEncontrados =
      Validador.validarFormularioUsuario(
        datosParaValidar,
        usuario
      );

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    // Creamos el objeto con los cambios realizados.
    const cambios = {
      ...datos
    };

    // La contrasena solamente se actualiza si el usuario escribe una nueva.
    if (passwordNueva) {

      if (!Validador.esPasswordValida(passwordNueva)) {
        setErrores({
          password: 'La contrasena debe tener minimo 4 caracteres.'
        });
        return;
      }

      cambios.password = passwordNueva;
    }

    // Actualizamos el usuario en el repositorio.
    const usuarioActualizado =
      UsuarioRepositorio.actualizar(
        usuario.id,
        cambios
      );

    // Actualizamos la sesion con la informacion nueva.
    Sesion.iniciar(usuarioActualizado);

    // Informamos al componente padre que el usuario cambio.
    onActualizar(usuarioActualizado);

    // Limpiamos la contrasena del formulario.
    setPasswordNueva('');

    // Mostramos mensaje de confirmacion.
    setExito('Tus datos se actualizaron correctamente.');
  }

  return (
    <main className="perfil">

      {/* Encabezado del perfil */}
 <section className="perfil__encabezado">

  <div className="perfil__foto-contenedor">

    {datos.foto ? (
      <img
        src={datos.foto}
        alt="Foto de perfil"
        className="perfil__foto"
      />
    ) : (
      <div className="perfil__avatar">
        {datos.nombres
          ? datos.nombres.charAt(0).toUpperCase() +
            (datos.apellidos
              ? datos.apellidos.charAt(0).toUpperCase()
              : '')
          : 'U'}
      </div>
    )}

    <label
      htmlFor="foto-perfil"
      className="perfil__cambiar-foto"
    >
      Cambiar foto
    </label>

    <input
      id="foto-perfil"
      type="file"
      accept="image/*"
      onChange={manejarFoto}
      style={{ display: 'none' }}
    />

  </div>

  <div>
    <h1>Mi perfil</h1>

    <p>
      Actualiza tu informacion personal y protege
      el acceso a tu cuenta.
    </p>
  </div>

</section>

      {/* Mensajes del sistema */}
      {exito && (
        <div className="alerta alerta--exito">
          {exito}
        </div>
      )}

      {errores.password && (
        <div className="alerta alerta--error">
          {errores.password}
        </div>
      )}


      <form
        className="perfil__contenido"
        onSubmit={manejarSubmit}
        noValidate
      >

        {/* ==================================================
            INFORMACION PERSONAL
            ================================================== */}
        <section className="perfil__seccion">

          <div className="perfil__seccion-titulo">
            <h2>Informacion personal</h2>
            <p>
              Mantén actualizada la información de tu cuenta.
            </p>
          </div>


          {/* Nombres */}
          <div
            className={`campo ${
              errores.nombres ? 'campo--error' : ''
            }`}
          >
            <label htmlFor="perfil-nombres">
              Nombres
            </label>

            <input
              id="perfil-nombres"
              type="text"
              value={datos.nombres}
              onChange={(e) =>
                manejarCambio(
                  'nombres',
                  e.target.value
                )
              }
            />

            {errores.nombres && (
              <div className="campo__mensaje-error">
                {errores.nombres}
              </div>
            )}
          </div>


          {/* Apellidos */}
          <div
            className={`campo ${
              errores.apellidos ? 'campo--error' : ''
            }`}
          >
            <label htmlFor="perfil-apellidos">
              Apellidos
            </label>

            <input
              id="perfil-apellidos"
              type="text"
              value={datos.apellidos}
              onChange={(e) =>
                manejarCambio(
                  'apellidos',
                  e.target.value
                )
              }
            />

            {errores.apellidos && (
              <div className="campo__mensaje-error">
                {errores.apellidos}
              </div>
            )}
          </div>


          {/* Correo */}
          <div
            className={`campo ${
              errores.email ? 'campo--error' : ''
            }`}
          >
            <label htmlFor="perfil-email">
              Correo electrónico
            </label>

            <input
              id="perfil-email"
              type="email"
              value={datos.email}
              onChange={(e) =>
                manejarCambio(
                  'email',
                  e.target.value
                )
              }
            />

            {errores.email && (
              <div className="campo__mensaje-error">
                {errores.email}
              </div>
            )}
          </div>

        </section>


        {/* ==================================================
            SEGURIDAD
            ================================================== */}
        <section className="perfil__seccion">

          <div className="perfil__seccion-titulo">
            <h2>Seguridad</h2>
            <p>
              Cambia tu contrasena cuando lo necesites.
            </p>
          </div>

          <div className="campo">
            <label htmlFor="perfil-password">
              Nueva contrasena
            </label>

            <input
              id="perfil-password"
              type="password"
              value={passwordNueva}
              placeholder="Deja este campo vacio si no deseas cambiarla"
              onChange={(e) =>
                setPasswordNueva(e.target.value)
              }
            />

            <small>
              La contrasena debe tener minimo 4 caracteres.
            </small>
          </div>

        </section>


        {/* ==================================================
            BOTON DE GUARDAR
            ================================================== */}
        <div className="perfil__acciones">

          <button
            type="submit"
            className="boton"
          >
            Guardar cambios
          </button>

        </div>

      </form>

    </main>
  );
}