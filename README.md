# Agri-Smart

Agri-Smart is a full-stack marketplace platform that connects Kenyan farmers directly with buyers. Farmers can manage products, orders, farm profiles, and dashboards, while buyers can browse produce, add items to cart, and place orders.

## Current Status

This project is about 90% complete.

- Core farmer and buyer flows are largely built.
- AI advisor features are included in the project.
- M-Pesa integration is still being fixed and is not fully complete yet.
- Deployment is also being fixed at the moment, so there is no stable live production link yet.

## Features Available

- User authentication with Clerk
- Farmer dashboard and farm profile management
- Product creation and product listing management
- Buyer marketplace and cart flow
- Order management for farmers and buyers
- AI advisor support

## In Progress

- M-Pesa payment integration
- Deployment and production hosting setup

## Project Structure

```text
AGRI-SMART/
|- agri-smart-client/
|- AGRI-smart-server/
|- README.md
```

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

### Integrations

- Clerk
- OpenRouter
- M-Pesa Daraja API

## Local Setup

### Frontend

```bash
cd agri-smart-client
npm install
npm run dev
```

### Backend

```bash
cd AGRI-smart-server
npm install
node src/server.js
```

## Environment Notes

The project uses environment variables for services like Clerk, MongoDB, OpenRouter, and M-Pesa. Keep local `.env` files private and do not commit them.

## Deployment Note

Deployment is currently being fixed. If you clone the repo, please expect to run it locally until the hosted version is stabilized.

## Payment Note

M-Pesa integration is currently under repair and may not work correctly until the remaining fixes are completed.

## Author

- GitHub: [Feisaladen](https://github.com/Feisaladen)

