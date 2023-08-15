#!/bin/bash
set -e

echo "Starting script..."

# This function will run when the script exits, regardless of why it exits.
cleanup() {
  echo "Shutting down containers..."
  docker-compose down
}

# Register the cleanup function for these signals
trap cleanup EXIT

echo "Starting docker-compose services..."
docker-compose up -d

echo "Waiting for the service on port 5433 to be up and running..."
until [ "$(docker-compose ps db | grep healthy)" ]; do
  echo "Waiting..."
  sleep 1
done

echo "Loading environment variables..."
dotenv -e .env.test -- bash -c "prisma migrate deploy"

echo "Running Jest tests..."
dotenv -e .env.test -- jest --coverage --detectOpenHandles --forceExit
