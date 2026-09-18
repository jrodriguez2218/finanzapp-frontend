/**
 * ============================================================
 * Componente: Footer
 * Evidencia GA7-220501096-AA4-EV03
 * ------------------------------------------------------------
 * Definido en el EV02: "Corresponde al pie de pagina de la
 * aplicacion, donde se muestra informacion institucional o de
 * contacto. Mantiene una estructura uniforme en todas las
 * paginas."
 * ============================================================
 */

'use strict';

function Footer() {
  return (
    <footer className="footer">
      <span>FinanzApp &copy; {new Date().getFullYear()}</span>
      <span>Proyecto formativo SENA · Tecnologia en Analisis y Desarrollo de Software</span>
    </footer>
  );
}
