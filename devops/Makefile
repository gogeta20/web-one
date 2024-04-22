USER=1000



#========================================
.PHONY: help
help: ## Muestra la ayuda de los objetivos disponibles
	@echo "Uso: make [objetivo]"
	@echo ""
	@echo "Objetivos disponibles:"
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		print " - " substr($$1, 0, length($$1)-1) \
	} /^## / { \
		print "    " substr($$0, 5) \
	} ' $(MAKEFILE_LIST)

up:
	docker compose up -d

down: # Para eliminar los contenedores, redes, volumenes y imágenes
	docker compose down

stop:
	docker compose stop

restart:
	docker compose restart

build:
	docker compose build

restart-docker:
	sudo service docker restart

#========================================
.PHONY: enter-php-container
back:
	docker exec -it backend /bin/bash

user-back:
	docker exec -u $(USER) -it backend /bin/bash

cache:
	docker exec backend sh -c "php bin/console cache:clear"

router:
	docker exec backend sh -c "php bin/console debug:router"

log-back:
	docker logs backend

restart-apache:
	docker exec backend sh -c "service apache2 restart"

chown-config: #make chown-config file=doctrine.yaml
	docker exec backend sh -c "chown -R www-data:www-data /var/www/html/$(file)"

#========================================
phpmyadmin:
	docker exec -it phpmyadmin /bin/bash

log-phpmyadmin:
	docker logs phpmyadmin

#========================================
frontend:
	docker exec -it frontend sh

packages-front:
	@docker-compose exec frontend sh -c "chown -R node:node node_modules/"

user-front:
	docker exec -u node -it frontend sh

log-front:
	docker logs frontend

# front-dev:
# 	docker exec frontend sh -c "npm run dev"

#========================================
db:
	docker exec -it db /bin/bash

f ?= default
.PHONY: db-update

db-update: #make db-update f=mySql
	docker exec db sh -c 'mysql -u root -ptest -e "SOURCE /var/www/html/sql/$(f).sql"'

#========================================
