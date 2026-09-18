/**
 * ============================================================
 * Componente: Navbar
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Corresponde al menu principal de
 * navegacion de la aplicacion... facilita el acceso a los
 * diferentes modulos del sistema."
 * ============================================================
 */

'use strict';

const ELEMENTOS_MENU = [
  { vista: 'dashboard', etiqueta: 'Inicio' },
  { vista: 'transacciones', etiqueta: 'Movimientos' },
  { vista: 'presupuestos', etiqueta: 'Presupuestos' },
  { vista: 'metas', etiqueta: 'Metas' },
  { vista: 'reportes', etiqueta: 'Reportes' },
  { vista: 'perfil', etiqueta: 'Perfil' }
];

/**
 * @param {Object} props
 * @param {Object} props.usuario usuario en sesion
 * @param {string} props.vistaActual vista actualmente activa
 * @param {Function} props.onCambiarVista cambia la vista activa
 * @param {Function} props.onCerrarSesion cierra la sesion activa
 */
function Navbar({ usuario, vistaActual, onCambiarVista, onCerrarSesion }) {
  const elementos = usuario.rol === 'ADMIN'
    ? [...ELEMENTOS_MENU, { vista: 'admin', etiqueta: 'Usuarios' }]
    : ELEMENTOS_MENU;

  return (
    <nav className="navbar">
      <div className="navbar__marca">FinanzApp</div>
      <div className="navbar__enlaces">
        {elementos.map((item) => (
          <button
            key={item.vista}
            className={`navbar__enlace ${vistaActual === item.vista ? 'navbar__enlace--activo' : ''}`}
            onClick={() => onCambiarVista(item.vista)}
          >
            {item.etiqueta}
          </button>
        ))}
      </div>
      <button className="navbar__cerrar-sesion" onClick={onCerrarSesion}>Cerrar sesion</button>
    </nav>
  );
}
