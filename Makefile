#!/bin/sh -l

# Define variables

IMAGE_PROD=izdrail/mobilamoldova.ro:latest
DOCKERFILE=Dockerfile
DOCKER_COMPOSE_FILE=docker-compose.yaml
DOCKER_COMPOSE_FILE_PROD=docker-compose.yaml
CODE=""

build:
	docker image rm -f $(IMAGE_PROD) || true
	docker buildx build \
		--platform linux/amd64 \
		-t $(IMAGE_PROD) \
		--no-cache \
		--progress=plain \
		--build-arg CACHEBUST=$$(date +%s) \
		-f $(DOCKERFILE) \
		.  # <-- Build Context Docker file is located at root

dev:
	docker-compose -f $(DOCKER_COMPOSE_FILE_PROD) up --remove-orphans
prod:
	docker-compose -f $(DOCKER_COMPOSE_FILE_PROD) up --remove-orphans

down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

ssh:
	docker exec -it app.mobilamoldova.ro /bin/bash

php:
	docker exec -it app.mobilamoldova.ro /bin/bash -c "php" $(CODE)


publish-prod:
	docker push $(IMAGE_PROD)


# Additional functionality
test:
	docker exec mobilamoldova.ro php artisan test


migrate:
	docker exec mobilamoldova.ro php artisan migrate --force

seed:
	docker exec mobilamoldova.ro php artisan db:seed --force

clean-queue:
	docker exec mobilamoldova.ro php artisan horizon:clear
lint:
	docker exec mobilamoldova.ro ./vendor/bin/phpcs --standard=PSR12 app/

fix-lint:
	docker exec mobilamoldova.ro ./vendor/bin/phpcbf --standard=PSR12 app/

prune:
	docker system prune -f --volumes

logs:
	docker logs -f mobilamoldova.ro

restart:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down
	docker-compose -f $(DOCKER_COMPOSE_FILE) up --remove-orphans -d

# Cleanup target
clean:
	-docker-compose -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans
	-docker system prune -f --volumes
