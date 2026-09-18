/**
 * ============================================================
 * Componente: AdminUsuarios
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Extension del catalogo de componentes del EV02: cubre la
 * historia de usuario "Como administrador, quiero ver, editar
 * y eliminar las cuentas registradas para mantener la
 * informacion de los usuarios al dia." Reutiliza el mismo
 * patron de tarjeta/tabla que PresupuestoCard y MetaAhorroCard.
 * ============================================================
 */

'use strict';

function AdminUsuarios() {
  const [version, setVersion] = React.useState(0);
  const [editandoId, setEditandoId] = React.useState(null);
  const [datosEdicion, setDatosEdicion] = React.useState(null);

  const usuarios = React.useMemo(
    () => UsuarioRepositorio.obtenerTodos(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  function iniciarEdicion(usuario) {
    setEditandoId(usuario.id);
    setDatosEdicion({ ...usuario });
  }

  function guardarEdicion(evento) {
    evento.preventDefault();
    UsuarioRepositorio.actualizar(editandoId, datosEdicion);
    setEditandoId(null);
    setVersion((v) => v + 1);
  }

  function eliminarUsuario(usuario) {
    const confirmado = window.confirm(`¿Seguro que deseas eliminar a ${usuario.nombres} ${usuario.apellidos}?`);
    if (!confirmado) return;
    UsuarioRepositorio.eliminar(usuario.id);
    setVersion((v) => v + 1);
  }

  return (
    <div>
      <h1>Gestion de usuarios</h1>
      <p className="tarjeta-auth__subtitulo">Consulta, edita o elimina las cuentas registradas en FinanzApp.</p>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th><th>Cedula</th><th>Email</th><th>Rol</th><th>Saldo</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombres} {u.apellidos}</td>
              <td>{u.cedula}</td>
              <td>{u.email}</td>
              <td><span className={`insignia-rol insignia-rol--${u.rol}`}>{u.rol}</span></td>
              <td>${Number(u.saldo).toLocaleString('es-CO')}</td>
              <td className="acciones-fila">
                <button className="boton-chico boton-chico--editar" onClick={() => iniciarEdicion(u)}>Editar</button>
                <button className="boton-chico boton-chico--eliminar" onClick={() => eliminarUsuario(u)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editandoId && (
        <section className="panel-edicion">
          <h2>Editando: {datosEdicion.nombres} {datosEdicion.apellidos}</h2>
          <form onSubmit={guardarEdicion}>
            <div className="panel-edicion__grid">
              <div className="campo">
                <label>Nombres</label>
                <input
                  value={datosEdicion.nombres}
                  onChange={(e) => setDatosEdicion({ ...datosEdicion, nombres: e.target.value })}
                />
              </div>
              <div className="campo">
                <label>Apellidos</label>
                <input
                  value={datosEdicion.apellidos}
                  onChange={(e) => setDatosEdicion({ ...datosEdicion, apellidos: e.target.value })}
                />
              </div>
              <div className="campo">
                <label>Email</label>
                <input
                  value={datosEdicion.email}
                  onChange={(e) => setDatosEdicion({ ...datosEdicion, email: e.target.value })}
                />
              </div>
              <div className="campo">
                <label>Rol</label>
                <select
                  value={datosEdicion.rol}
                  onChange={(e) => setDatosEdicion({ ...datosEdicion, rol: e.target.value })}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>
            <div className="panel-edicion__acciones">
              <button type="submit" className="boton">Guardar cambios</button>
              <button type="button" className="boton boton--secundario" onClick={() => setEditandoId(null)}>Cancelar</button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
