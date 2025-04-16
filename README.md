# Microservices Sales System

This project is a simple sales management system built using a **Microservices architecture**. It demonstrates the interaction between multiple services through REST APIs and asynchronous messaging with RabbitMQ, containerized using Docker and Docker Compose.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the System](#running-the-system)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Fault Tolerance](#fault-tolerance)
- [Directory Structure](#directory-structure)
- [Future Improvements](#future-improvements)

## Overview
The system is designed to manage a sales process with separate microservices for handling products, orders, customers, payments, inventory, and shipping. Each service has its own PostgreSQL database, adhering to the **Database per Service** principle. An **API Gateway** acts as a single entry point for clients, and **RabbitMQ** is used for asynchronous communication between services.

## Architecture
The system follows a Microservices architecture with the following components:
- **API Gateway**: Routes client requests to appropriate services.
- **Product Service**: Manages product information (name, price, description, stock).
- **Order Service**: Handles order creation and management.
- **Customer Service**: Manages customer details (name, address, contact).
- **Payment Service**: Processes payment transactions (confirmation, refunds).
- **Inventory Service**: Updates product stock levels.
- **Shipping Service**: Manages shipping status (pending, shipped).
- **RabbitMQ**: Message broker for asynchronous communication (e.g., updating inventory and shipping when an order is created).
- **PostgreSQL**: Each service has its own database.

### Interaction Flow
1. Clients send HTTP requests to the API Gateway (`http://localhost:8080`).
2. API Gateway forwards requests to the respective services via REST APIs.
3. When an order is created, Order Service publishes messages to RabbitMQ queues (`inventory_queue`, `shipping_queue`).
4. Inventory Service consumes messages to update stock.
5. Shipping Service consumes messages to create shipping records.

## Services
| Service          | Port  | Database         | Description                              |
|------------------|-------|------------------|------------------------------------------|
| Product Service  | 8001  | products_db      | Manages product CRUD operations          |
| Order Service    | 8002  | orders_db        | Manages order creation and updates       |
| Customer Service | 8003  | customers_db     | Manages customer information             |
| Payment Service  | 8004  | payments_db      | Handles payment transactions             |
| Inventory Service| 8005  | inventory_db     | Updates product stock                    |
| Shipping Service | 8006  | shipping_db      | Manages shipping status                  |
| API Gateway      | 8080  | -                | Routes client requests to services       |
| RabbitMQ         | 5672, 15672 | -             | Message broker for async communication   |

## Technologies
- **Node.js**: Backend runtime for all services.
- **Express**: Web framework for creating REST APIs.
- **PostgreSQL**: Database for each service.
- **RabbitMQ**: Message broker for asynchronous communication.
- **Docker & Docker Compose**: Containerization and orchestration.
- **Axios**: HTTP client for API Gateway.
- **Fault Tolerance**: Circuit Breaker, Retry, Rate Limiter, Time Limiter (implemented in API Gateway).

## Prerequisites
- **Docker**: Ensure Docker and Docker Compose are installed.
- **Node.js**: Optional, only if you want to run services locally without Docker.
- **curl** or **Postman**: For testing APIs.

## Setup and Installation
1. Clone the repository:
   git clone (https://github.com/new-dai1009/KTPM_10_04.git)
   cd microservices-sales
   2. Install dependencies using npm or yarn:
   npm install or yarn install
   3. Create a `.env` file in the root directory with environment variables (e.g
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=postgres
   RABBITMQ_HOST=localhost
   RABBITMQ_PORT=5672
   4. Run Docker Compose to start all services:
   docker-compose up -d
    