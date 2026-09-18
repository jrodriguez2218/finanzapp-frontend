/**
 * ============================================================
 * Componente: CuentaCard
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Muestra la informacion de cada cuenta
 * registrada por el usuario, como saldo, tipo de cuenta y
 * estado." Es un componente reutilizable: en esta version del
 * proyecto cada usuario maneja una unica cuenta (su saldo
 * general), pero el componente esta preparado para recibir
 * distintos datos si en el futuro se manejan varias cuentas.
 * ============================================================
 */

'use strict';

/** Formatea un numero como moneda simple ($1,234). */
function formatearMoneda(valor) {
  return `$${Number(valor).toLocaleString('es-CO')}`;
}

/**
 * @param {Object} props
 * @param {string} props.titulo nombre de la cuenta (ej. "Saldo Disponible")
 * @param {number} props.saldo saldo actual de la cuenta
 */
function CuentaCard({ titulo, saldo }) {
  return (
    <section className="tarjeta-saldo">
      <p className="tarjeta-saldo__etiqueta">{titulo}</p>
      <p className="tarjeta-saldo__monto">{formatearMoneda(saldo)}</p>
    </section>
  );
}
