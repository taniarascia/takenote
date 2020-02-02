#!/bin/sh
set -e

# Docker Image
IMAGE="taniarascia/takenote"

# Git Version with git hash and tags, if they exist
GIT_VERSION=$(git describe --always --abbrev --tags --long)

# Build and tag Docker image and push up to Dockerhub
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}