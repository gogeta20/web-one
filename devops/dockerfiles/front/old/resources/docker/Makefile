current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
LOGS = /var/www/configuredPaths/logs/xorfor
DEFAULT_GOAL := help
DOCKER=docker
DOCKER_COMPOSE_BIN=docker-compose
DOCKER_COMPOSE_DIR=.
DOCKER_COMPOSE_FILE=$(DOCKER_COMPOSE_DIR)/docker-compose.yml

NAME=xorfor3
folder := $(notdir $(patsubst %/,%,$(dir $(current-dir))))

ifeq ($(OS),Windows_NT)
    SHELL := powershell.exe
	SO=win
	IP4=  $$((Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'vEthernet (WSL)').IPv4Address -replace '\s' -replace "`0") #'"`
	IP="${IP4}"
	#IP=host.docker.internal
	TODAY =$$(Get-Date -UFormat "%Y%m%d")
    FORCE_DELETE= $(del .\env)
	FORCE_COPY=$(copy .\.env.win .\.env)
else
    #SHELL := pwsh
    SHELL := /bin/sh
	SO=linux
	TODAY =$(shell date '+%Y%m%d')
	#IP=0.0.0.0
	IP="$(IP)"
	DOCKER=sudo /usr/bin/docker
	DOCKER_COMPOSE_BIN=sudo /usr/bin/docker-compose
endif

CONTAINER =$(NAME)
DEFAULT_CONTAINER=$(CONTAINER)
DOCKER_COMPOSE=$(DOCKER_COMPOSE_BIN) -f $(DOCKER_COMPOSE_FILE) --project-name $(NAME)

.PHONY:
help: ## 💡 Ayuda: make help

ifneq ($(OS),Windows_NT)
	@awk 'BEGIN {FS = ":.*##"; printf "\nUso:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
else
	@echo ""
	@echo "Resumen comandos"
	@echo ""
	@echo "make help                      	Ayuda"
	@echo "make .env 			Genera el fichero .env a partir del .env.win o .env.linux en funcion de si se usa Windows o Linux"
	@echo "make back 		 	Entrar al contenedor backend"
	@echo "make front  		 	Entrar al contenedor frontend"
	@echo "make clear 		 	Purgar la cache y logs de aplicacion dentro del contenedor backend"
	@echo "make fix 		 	Ajusta los permisos en los contenedores"
	@echo "make libs 		 	Muestra el listado de modulos activos en php"
	@echo "make versions 			Muestra la version en uso de php"
	@echo "make start 		 	Inicia los contenedores de Docker"
	@echo "make stop	 	 	Finaliza los contenedores de Docker"
	@echo "make restart	 	 	Reinicia los contenedores de Docker"
	@echo "make destroy	 	 	Destruye los contenedores de Docker"
	@echo "make rebuild	 	 	Reconstruye los contenedores de Docker"
	@echo "make docker-init		Check de verificacion de que existe el ficheo .env"
	@echo "make docker-prune		Purgar contenedores no usados de Docker"
	@echo "make docker-up			Iniciar contenedor forzando recreacion"
	@echo "make refresh			Crear las imagenes de Docker sin cache y forzando la recreacion del contenedor"
	@echo ""
	@echo "make deps 			Instala las dependencias de los contenedores back y frontend"
	@echo "make dev 			Compila el entorno dev"
	@echo "make tns			Copia tnsnames.ora de /var/www/tns a /usr/local/instantclient_21_5/network/admin"
	@echo "make xdebug ip={}		Actualizamos la ip de escucha de xdebug por {}"
	@echo "make autoload 			Regenera el autoloader del contenedor backend"
	@echo "make router 			Visualiza las rutas y controladores asociados en el contenedor de backend"
	@echo "make traducciones		Actualiza los ficheros de traducciones del backend. Limpia la cache para reflejar la actualizacion"
	@echo "make behat 			Lanza los test de behat"
	@echo "make phpunit 			Ejecuta la suite de test completa de phpunit"
	@echo "make list-unit 			Lista las suites de test disponibles de phpunit"
	@echo "make unit s={} 			Ejecuta la unidad de test de phpunit {}"
	@echo "make unit-coverage 		Lanza los test de phpunit generando el coverage en formato html"
	@echo ""
	@echo "make front-start 		Lanza el servidor de frontend en contorno dev"
	@echo "make front-dev 			Compila el entorno dev"
	@echo ""
endif

######################################### GENÉRICAS #########################################

.PHONY: ip
ip: ## 📶 Obtiene la ip ethernet
	@echo  "$(IP)"
	
.PHONY: php-version
php-version: ## 📶 Obtiene la version de php ejecutada en el servidor
	${DOCKER} exec $(CONTAINER)-backend php --version

.PHONY: .env
.env: ## Genera el fichero .env
ifeq ($(OS),Windows_NT)
	@Copy-Item ".\.env.win" -Destination ".\.env"  -Force
else
	@if [  -f .env ]; then rm -f .env; fi
	@cp -f .env.linux .env
endif


.PHONY: back
back:   ## 🧠 Entrar en el contenedor de backend
	@echo "Entrando en la shell del contenedor backend de Docker"
	@${DOCKER} exec -it $(CONTAINER)-backend bash

.PHONY: front
front: ## 😎 Entrar en el contenedor de frontend
	@echo "Entrando en la shell del contenedor backend de Docker"
	@${DOCKER} exec -it $(CONTAINER)-frontend sh


.PHONY: clear
clear: ## 🧹 Purgar la cache y logs de aplicacion dentro del contenedor 
	@echo "Limpiando cache de contenedores Docker"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "find /var/www/html/var -type f -delete"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "php bin/console cache:clear"

.PHONY: fix
fix: # 🛠 Ajusta los permisos en el contenedor de back y frontend
	@echo "Fix permisos"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "find /var/www/html/ -type f -exec chown 1000:1000 {} \;"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "find /var/www/html/ -type d  -exec chown 1000:1000 {} \;"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "find /var/www/html/var/cache -type f -exec chmod 666 {} \;"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "find /var/www/html/var -type d  -exec chmod 777 {} \;"
	@${DOCKER} exec $(CONTAINER)-frontend sh -c "find /app/ -type f -exec chown node:node {} \;"
	@${DOCKER} exec $(CONTAINER)-frontend sh -c "find /app/ -type d  -exec chown node:node {} \;"

.PHONY:
libs: libs ## Listado de módulos activos de php
	@${DOCKER} exec $(CONTAINER)-backend  sh -c "/usr/local/bin/php -m"

.PHONY:  versions
versions: ## ℹ Muestra la versión en uso de php y node
	@echo ""
	@echo "PHP"
	@${DOCKER} exec $(CONTAINER)-backend sh -c "/usr/local/bin/php -v"
	@echo ""
	@echo "NODE"
	@${DOCKER} exec $(CONTAINER)-frontend sh -c "/usr/local/bin/node -v"

# Docker Compose
start: CMD=up -d
stop: CMD=stop
restart: CMD=restart
destroy: CMD=down
rebuild: CMD=build

.PHONY: doco
doco start stop destroy rebuild restart: .env ## Compatibilidad con zsh doco. Operaciones básicas de docker: make doco {start|stop|restart|destroy|build}
	@echo "${DOCKER} $(CMD)"
	@$(DOCKER_COMPOSE) $(CMD)
	@echo "FIN $(CMD)"

.PHONY: docker-init
docker-init: .env ## Check de verificacion de que existe el ficheo .env

.PHONY: docker-build
docker-build: docker-init ## Build all docker images. Build a specific image by providing the service name via: make docker-build CONTAINER=<service>
	@$(DOCKER_COMPOSE) build --parallel
	@$(DOCKER_COMPOSE) up -d --force-recreate

.PHONY: docker-prune
docker-prune: ## Purgar contenedores no usados de Docker
	@${DOCKER} system prune -a -f --volumes

.PHONY: docker-up
docker-up: docker-init ## Iniciar contenedor forzando recreaciÃ³n
	@$(DOCKER_COMPOSE) up -d --force-recreate


.PHONY: refresh
refresh: docker-init ## 🆕 Crear las imagenes de Docker sin cache y forzando la recreaciÃ³n del contenedor
	@${DOCKER} rm -f $(CONTAINER)-backend
	@${DOCKER} rm -f $(CONTAINER)-frontend
	$(DOCKER_COMPOSE) build --pull --no-cache --parallel
	$(DOCKER_COMPOSE) up -d --force-recreate

.PHONY: deps
deps: ## 🧰 Instalar dependencias de back y frontend
	${DOCKER} exec $(CONTAINER)-frontend npm install
	${DOCKER} exec $(CONTAINER)-backend composer install
	
.PHONY: yarn-deps
yarn-deps: ## 🧰 Instalar dependencias de back y frontend
	${DOCKER} exec $(CONTAINER)-frontend yarn
	${DOCKER} exec $(CONTAINER)-backend composer install

.PHONY: dev
dev: ## 🧾 Compilación de entorno dev
	${DOCKER} exec $(CONTAINER)-frontend npm run build
	${DOCKER} exec $(CONTAINER)-backend composer update --dev
	

######################################### BACKEND #########################################


.PHONY: tns
tns: ## Copia tnsnames.ora de /var/www/TNS a /usr/local/instantclient_21_5/network/admin
	${DOCKER} exec $(CONTAINER)-backend sh -c "cp -av /var/www/TNS/tnsnames.ora /usr/local/instantclient_21_5/network/admin/"


 ip: CMD=$(ip)
.PHONY: xdebug
xdebug: ## 🆘⛑ Actualizamos la ip de escucha de xdebug. ip={}
	${DOCKER} exec $(CONTAINER)-backend sh -c "sed -i 's|xdebug.client_host =.*|xdebug.client_host =$(ip)|g' /usr/local/etc/php/conf.d/xdebug.ini"
	 @$(DOCKER_COMPOSE) restart

.PHONY: autoload
autoload: ## Regenerar vendor_autoload
#${DOCKER} exec $(CONTAINER)-backend --user $(id -u):$(id -g) composer dumpautoload
	${DOCKER} exec $(CONTAINER)-backend composer dumpautoload
	
# Composer
composer-env-file:
	@if [ ! -f .env.local ]; then echo '' > .env.local; fi
	
.PHONY: composer-install
composer-install: CMD=install  ## Instala dependencias de composer

.PHONY: composer-update
composer-update: CMD=update ## Actualiza dependencias de composer

.PHONY: composer-require
composer-require: CMD=require ## Requiere dependencias de composer
composer-require: INTERACTIVE=-ti --interactive

.PHONY: composer-require-module ## Instala módulo de composer
composer-require-module: CMD=require $(module)
composer-require-module: INTERACTIVE=-ti --interactive

.PHONY: composer
composer composer-install composer-update composer-require composer-require-module: composer-env-file
	${DOCKER} exec $(CONTAINER)-backend composer $(CMD) \
			--ignore-platform-reqs \
			--no-ansi

.PHONY: router
router: ## 🗺 Visualiza las rutas y controladores asociados en el contenedor de backend
	${DOCKER} exec $(CONTAINER)-backend  php bin/console debug:router --show-controllers

.PHONY: traducciones
traducciones: ## 🉐Actualiza los ficheros de traducciones del backend. Limpia la caché para reflejar la actualización
	${DOCKER} exec $(CONTAINER)-backend  php bin/console translation:extract --format=yaml --force gl
	${DOCKER} exec $(CONTAINER)-backend  php bin/console translation:extract --format=yaml --force es
	${DOCKER} exec $(CONTAINER)-backend  php bin/console cache:clear

.PHONY: behat
behat: ## Ejecuta test behat
	${DOCKER} exec $(CONTAINER)-backend  vendor/bin/behat
	
.PHONY: phpunit
phpunit: ## Ejecuta todos los test de phpunit
	${DOCKER} exec $(CONTAINER)-backend  php bin/console cache:clear
	${DOCKER} exec $(CONTAINER)-backend vendor/bin/phpunit
	
.PHONY: list-unit
list-unit: ## Lista todas las testsuites de phpunit
	${DOCKER} exec $(CONTAINER)-backend vendor/bin/phpunit --list-suite

suite: CMD=$(s)
.PHONY: unit
unit: ## Ejecuta la suite. make unit s=SUITE
	${DOCKER} exec $(CONTAINER)-backend vendor/bin/phpunit --testsuite $(s)
	
suite: CMD=$(s)
.PHONY: unit-coverage
unit-coverage: ## Lanza los test de phpunit generando el coverage en formato coverage-html 
	${DOCKER} exec $(CONTAINER)-backend php -n -dzend_extension=xdebug -dxdebug.mode=coverage ./vendor/bin/phpunit --testsuite All --log-junit ./sonar.xml  --coverage-html /var/www/configuredPaths/coverage --stderr -c ./phpunit.xml



######################################### FRONTEND #########################################
.PHONY: front-start 
front-start: start ## 🧳 Lanzar servidor frontend
	${DOCKER} exec $(CONTAINER)-frontend npm run dev

.PHONY: front-dev
front-dev: ## Compilación de entorno dev
	${DOCKER} exec $(CONTAINER)-frontend npm run build

.PHONY: compilado-front
compilado-front: ## 🧾 Compilación de entorno dev
	${DOCKER} exec $(CONTAINER)-frontend yarn
	${DOCKER} exec $(CONTAINER)-frontend yarn run build
	
.PHONY: yarn
yarn: ## 🧾 Compilación de entorno dev
#	${DOCKER} exec $(CONTAINER)-frontend npm install --global yarn
	${DOCKER} exec $(CONTAINER)-frontend yarn