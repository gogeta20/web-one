#!/bin/bash
# Script para importar un dump SQL

# Variables
DB_USER="root"
DB_NAME="dbname"
DB_PASSWORD="test"
SQL_FILE_PATH="/home/mau/projects/personal/store/database/ini.sql"

# Comando para importar el dump SQL
mysql -u $DB_USER -p $DB_PASSWORD $DB_NAME < $SQL_FILE_PATH

echo "Importación de la base de datos completada."