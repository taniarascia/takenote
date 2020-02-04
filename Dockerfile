# Use small Alpine Linux image
FROM node:12-alpine

# Set environment variables
ENV PORT=5000

COPY . app/

WORKDIR app/

# Make sure dependencies exist for Webpack loaders
RUN apk add --no-cache \
  autoconf \
  automake \
  bash \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm 
RUN npm ci --only-production

# Build production client side React application
RUN npm run build

# Expose port for Node
EXPOSE $PORT

# Start Node server
ENTRYPOINT npm run start