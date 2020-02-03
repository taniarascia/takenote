#!/bin/sh
set -e

# Docker Image
IMAGE="taniarascia/takenote"

# Git Version with git hash and tags, if they exist
GIT_VERSION=$(git describe --always --abbrev --tags --long)

# Build and tag Docker image and push up to Dockerhub
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Login to Dockerhub and push newest build
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

# Login to DigitalOcean command line
doctl auth init -t "$DO_ACCESS_TOKEN" 

# Log into Droplet, pull the latest container, and stop and start Docker
doctl compute ssh "$DROPLET" --ssh-command docker pull ${IMAGE}:${GIT_VERSION} && 
export CURRENT_CONTAINER=$(docker ps | grep takenote | awk '{print $1}') && 
docker stop CURRENT_CONTAINER && 
docker start ${IMAGE}:${GIT_VERSION}