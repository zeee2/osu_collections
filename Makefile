# Makefile for managing the Docker environment

.PHONY: help up down logs build ps shell clean

# Default command: Display help
.DEFAULT_GOAL := help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  up      - Start all services in detached mode (builds if necessary)"
	@echo "  down    - Stop and remove all services and containers"
	@echo "  logs    - Follow logs of all running services"
	@echo "  build   - Force build or rebuild of services to create 'jahkon_col:latest' image"
	@echo "  ps      - List running containers for this project"
	@echo "  shell   - Access the shell of the 'app' container"
	@echo "  clean   - Stop services and remove containers, volumes, and orphans"
	@echo ""

up:
	@echo "Starting all services in detached mode..."
	docker-compose up --build -d

down:
	@echo "Stopping all services..."
	docker-compose down

logs:
	@echo "Following logs... (Press Ctrl+C to exit)"
	docker-compose logs -f

build:
	@echo "Building services... The app image will be tagged as 'jahkon_col:latest' as defined in docker-compose.yml"
	docker-compose build

ps:
	docker-compose ps

shell:
	@echo "Accessing shell inside the 'app' container..."
	docker-compose exec app sh

clean:
	@echo "WARNING: This will stop all services and delete all data volumes."
	docker-compose down --volumes --remove-orphans
