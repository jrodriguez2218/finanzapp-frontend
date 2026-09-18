-- ============================================================
-- Proyecto: FinanzApp
-- Evidencia: GA7-220501096-AA4-EV03
-- Script de base de datos - Modulo de Autenticacion y Usuarios
-- ------------------------------------------------------------
-- Este script recrea el modelo de datos definido en el diagrama
-- de clases del proyecto formativo para la entidad "Usuario".
-- Se usa como referencia de los tipos de dato que el modulo de
-- front-end debe respetar al construir el formulario y las
-- validaciones (registro, login y gestion de usuarios).
-- ============================================================

CREATE DATABASE IF NOT EXISTS finanzapp_db;
USE finanzapp_db;

-- Tabla principal de usuarios de la plataforma
CREATE TABLE IF NOT EXISTS usuarios (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    nombres           VARCHAR(80)  NOT NULL,
    apellidos         VARCHAR(80)  NOT NULL,
    cedula            VARCHAR(20)  NOT NULL UNIQUE,
    email             VARCHAR(120) NOT NULL UNIQUE,
    fecha_nacimiento  DATE         NOT NULL,
    password          VARCHAR(255) NOT NULL,
    rol               ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    saldo             DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    creado_en         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario administrador por defecto (coincide con el mostrado
-- en el prototipo funcional: admin@finanzapp.com)
INSERT INTO usuarios (nombres, apellidos, cedula, email, fecha_nacimiento, password, rol, saldo)
VALUES ('Administrador', 'FinanzApp', '0000000000', 'admin@finanzapp.com', '1990-01-01', 'admin123', 'ADMIN', 0.00)
ON DUPLICATE KEY UPDATE email = email;
