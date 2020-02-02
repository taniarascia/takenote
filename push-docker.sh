#!/bin/sh

docker build -t taniarascia/takenote .
export GIT_VERSION=$(git describe --abbrev --always --tags)
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push taniarascia/takenote:${GIT_VERSION}