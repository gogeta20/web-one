#!/bin/bash

# Obtiene la dirección IP
IP=$(hostname -I | awk '{print $1}')

# Comprueba si host.docker.internal ya está en el archivo /etc/hosts
if ! grep -q "host.docker.internal" /etc/hosts ; then
    # Si no está en el archivo, añade la IP con el alias host.docker.internal
    echo "$IP host.docker.internal" | sudo tee -a /etc/hosts
else
    # Si la entrada ya existe, actualízala con la nueva IP
    sudo sed -i "/host.docker.internal/c\\$IP host.docker.internal" /etc/hosts
fi