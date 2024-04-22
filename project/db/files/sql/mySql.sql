SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- CREATE USER 'itachi'@'localhost' IDENTIFIED BY 'gbcv123M';
CREATE USER 'itachi'@'%' IDENTIFIED BY 'gbcv123M';

DROP DATABASE IF EXISTS articuloDualDB;
CREATE DATABASE articuloDualDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON articuloDualDB.* TO 'itachi'@'%';
FLUSH PRIVILEGES;

USE articuloDualDB;

CREATE TABLE tbl_imagen (
    id INT AUTO_INCREMENT,
    uuid CHAR(36) NOT NULL DEFAULT (UUID()),
    url VARCHAR(255) NOT NULL,
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_imagen (id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_imagen(uuid);

CREATE TABLE tbl_autor (
   id INT AUTO_INCREMENT,
   uuid CHAR(36) NOT NULL DEFAULT (UUID()),
   nombre VARCHAR(100) NOT NULL,
   apellido VARCHAR(100) NOT NULL,
   biografia TEXT,
   email VARCHAR(255),
   foto INT,
   twitter VARCHAR(255),
   facebook VARCHAR(255),
   instagram VARCHAR(255),
   linkedin VARCHAR(255),
   PRIMARY KEY pk_autor (id),
   FOREIGN KEY fk_autor_imagen_id (foto) REFERENCES tbl_imagen(id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_autor(uuid);

CREATE TABLE tbl_categoria (
   id INT AUTO_INCREMENT,
   uuid CHAR(36) NOT NULL DEFAULT (UUID()),
   nombre VARCHAR(255) NOT NULL,
   descripcion TEXT,
   categoria_padre_id INT,
   PRIMARY KEY pk_categoria (id),
   FOREIGN KEY fk_categoria_padre_id (categoria_padre_id) REFERENCES tbl_categoria(id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_categoria(uuid);

CREATE TABLE tbl_articulo (
  id INT AUTO_INCREMENT,
  uuid CHAR(36) NOT NULL DEFAULT (UUID()),
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT NOT NULL,
  autor_id INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  imagen INT,
  activo BOOLEAN DEFAULT TRUE,
  PRIMARY KEY pk_articulo (id),
  FOREIGN KEY fk_articulo_autor_id (autor_id) REFERENCES tbl_autor(id),
  FOREIGN KEY fk_articulo_imagen_id (imagen) REFERENCES tbl_imagen(id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_articulo(uuid);

CREATE TABLE tbl_articulo_categoria (
    articulo_id INT,
    categoria_id INT,
    PRIMARY KEY pk_articulo_categoria (articulo_id, categoria_id),
    FOREIGN KEY fk_articulo_categoria_articulo_id (articulo_id) REFERENCES tbl_articulo(id),
    FOREIGN KEY fk_articulo_categoria_categoria_id (categoria_id) REFERENCES tbl_categoria(id)
);

CREATE TABLE tbl_usuario (
 id INT(20) AUTO_INCREMENT,
 uuid CHAR(36) NOT NULL DEFAULT (UUID()),
 usuario_login VARCHAR(60) NOT NULL,
 contrasenha VARCHAR(255) NOT NULL,
 nombre_usuario_nicename VARCHAR(50) NOT NULL,
 usuario_email VARCHAR(100) NOT NULL,
 usuario_url VARCHAR(100),
 usuario_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 usuario_status INT(11) NOT NULL DEFAULT '0',
 display_name VARCHAR(250) NOT NULL,
 PRIMARY KEY pk_usuario (id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_usuario(uuid);

CREATE TABLE tbl_etiqueta (
    id INT AUTO_INCREMENT,
    uuid CHAR(36) NOT NULL DEFAULT (UUID()),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY pk_etiqueta (id)
);

CREATE UNIQUE INDEX uuid_index ON tbl_etiqueta(uuid);

CREATE TABLE tbl_articulo_etiqueta (
   articulo_id INT,
   etiqueta_id INT,
   PRIMARY KEY pk_articulo_etiqueta (articulo_id, etiqueta_id),
   FOREIGN KEY fk_articulo_etiqueta_articulo_id (articulo_id) REFERENCES tbl_articulo(id),
   FOREIGN KEY fk_articulo_etiqueta_etiqueta_id (etiqueta_id) REFERENCES tbl_etiqueta(id)
);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;