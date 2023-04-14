.PHONY: build start stop

build:
	docker-compose up --build -V

start:
	docker-compose up -d

stop:
	docker-compose down

img:
	docker build -t orders -f ./servers/apps/orders/Dockerfile.production ./servers
	docker build -t bills -f ./servers/apps/billings/Dockerfile.production ./servers

runcont:
	docker run -p 3000:3000 --name orders_c -t -d orders
	docker run -p 3001:3001 --name bills_c -t -d bills

stopcont:
	docker rm orders_c -f
	docker rm bills_c -f