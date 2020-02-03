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
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

# Login to DigitalOcean command line
doctl auth init -t "${DO_ACCESS_TOKEN}"

# Decode SSH key
echo ${DO_SSH_KEY} | base64 -d > deploy_key
chmod 600 deploy_key

# Log into Droplet, pull the latest container, and stop and start Docker
CONTAINER_ID=$(doctl compute ssh ${DROPLET} --ssh-key-path deploy_key --ssh-command 'docker ps | grep takenote | cut -d" " -f1')

echo "Stopping container ID ${CONTAINER_ID} and starting ${IMAGE}:${GIT_VERSION}"

doctl compute ssh ${DROPLET} --ssh-key-path deploy_key --ssh-command "docker pull ${IMAGE}:${GIT_VERSION} && 
docker stop ${CONTAINER_ID} && 
docker run -d -p 80:5000 ${IMAGE}:${GIT_VERSION}"