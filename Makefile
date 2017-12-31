BASE_DIR:=`pwd`
IMG_TAG=frontend:1.0
PORT:=3000
CONTAINER_NAME:=running-frontend
DOCKER_RUN:=docker run --name $(CONTAINER_NAME) -v $(BASE_DIR) --rm -p $(PORT):3000 $(IMG_TAG)

.PHONEY: all
all: stop remove build run

.PHONEY: build
build:
	docker build -t $(IMG_TAG) $(BASE_DIR)

.PHONEY: run
run:
	$(DOCKER_RUN)

.PHONEY: stop
stop:
	docker stop $(CONTAINER_NAME)

.PHONEY: remove
remove:
	docker rm -f $(CONTAINER_NAME)
