#!/bin/sh
set -e

IMAGE="taniarascia/takenote"
GIT_VERSION=$(git describe --always --abbrev --tags --long)

docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${VERSION} ${IMAGE}:latest
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}