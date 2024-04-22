USE articuloDualDB;
INSERT INTO tbl_imagen (uuid, url, titulo, descripcion, fecha_subida)
VALUES (UUID(), 'https://example.com/image.jpg', 'Titulo de Ejemplo', 'Descripcion de ejemplo', NOW());