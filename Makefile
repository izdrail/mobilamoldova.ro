#!/bin/sh
.PHONY: build dev down ssh publish

build:
	docker image rm -f izdrail/mobilamoldova.ro:latest && docker --debug build -t izdrail/mobilamoldova.ro:latest --no-cache --progress=plain . --build-arg CACHEBUST=$(date +%s)
dev:
	docker-compose -f docker-compose.yml up  --remove-orphans
down:
	docker-compose down
ssh:
	docker exec -it mobilamoldova.ro /bin/bash
publish:
	docker push izdrail/mobilamoldova.ro:latest
