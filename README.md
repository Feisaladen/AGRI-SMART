                         # Agri-Smart
### *Kilimo Chako. Soko Lako.*
#### *Your Farm. Your Market.*

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logoColor=white)](https://clerk.com/)
[![M-Pesa](https://img.shields.io/badge/Payments-M--Pesa-1FAF38?logoColor=white)](https://developer.safaricom.co.ke/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-F97316?logoColor=white)](https://openrouter.ai/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

Agri-Smart is a full-stack marketplace platform built to solve a real, local problem in Kenya: farmers often produce value but do not control the market. Middlemen distort prices, farmers lose margin, and buyers still pay more for less freshness. Agri-Smart closes that gap by connecting farmers directly to buyers, powering transactions with M-Pesa, and equipping farmers with an AI advisor for sales and financial guidance. This was built in 5 weeks by a solo developer, not as a classroom exercise, but as a production-minded product with a clear goal: deploy it, secure `agrismart.co.ke`, and onboard real Kenyan farmers.

## Live Demo
https://agri-smart-ken.vercel.app
## Core Features
### Farmer Side
- Role-based authentication with Clerk
- Farm profile setup with farm name, county, and crops
- Product listing with photo, price, quantity, unit, description, and status
- Product management: add, edit, pause, activate, and delete
- Order management: view incoming orders and update delivery status
- Payment history with M-Pesa transaction references
- Dashboard analytics: total products, total orders, total earnings
- AI Advisor chat for sales and financial guidance in English and Swahili

### Buyer Side
- Marketplace to browse fresh produce directly from farms
- Search and discover products from local farmers
- Cart with persistent global state via Context API
- Checkout flow powered by M-Pesa STK Push
- Order tracking from `pending` to `confirmed` to `delivered`

## Why This Product Exists
In Kenya, agriculture is not just an industry. It is livelihood, family stability, and food security. Yet smallholder farmers are often the least empowered actors in the value chain. Agri-Smart is designed as infrastructure for trust and visibility: a place where farmers can list produce on their own terms, buyers can access fresher goods, and payments happen in the financial language the market already uses every day: M-Pesa. This project is meant to become a real digital marketplace, not just a portfolio artifact.

## System Architecture
```text
                ┌──────────────────────────────┐
                │          Frontend            │
                │ React + Vite + Tailwind CSS  │
                │ React Router + Context API   │
                └──────────────┬───────────────┘
                               │ HTTP / JSON
                               ▼
                ┌──────────────────────────────┐
                │          Backend             │
                │   Node.js + Express (MVC)    │
                │  Routes -> Controllers -> DB │
                └───────┬──────────┬───────────┘
                        │          │
                        │          │
                        ▼          ▼
          ┌──────────────────┐   ┌────────────────────┐
          │  MongoDB Atlas    │   │ External Services   │
          │ User / Farm /     │   │ Clerk               │
          │ Product / Order / │   │ M-Pesa Daraja API   │
          │ Payment           │   │ OpenRouter API      │
          └──────────────────┘   └────────────────────┘
```

## Tech Stack
### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Rate Limit

### Authentication & Security
- Clerk
- Role-based routing
- Rate limiting on AI endpoints

### Payments & AI
- M-Pesa Daraja API
- OpenRouter API

### Deployment
- Vercel for frontend
- Render for backend
- MongoDB Atlas for database

## Getting Started
### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas cluster or local MongoDB instance
- Clerk account
- Safaricom Daraja developer credentials
- OpenRouter API key

### Clone the Repository
```bash
git clone https://github.com/Feisaladen/AGRI-SMART.git
cd AGRI-SMART
```

### Frontend Setup
```bash
cd agri-smart-client
npm install
```

Create `agri-smart-client/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend Setup
```bash
cd AGRI-smart-server
npm install
```

Create `AGRI-smart-server/src/.env`:
```env
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_mpesa_shortcode
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=your_public_callback_url
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Run the App
Frontend:
```bash
cd agri-smart-client
npm run dev
```

Backend:
```bash
cd AGRI-smart-server
npm run dev
```

Expected local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Environment Variables
### Frontend
| Variable | Description |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key used by the React app |

### Backend
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | API key for the AI advisor |
| `MPESA_CONSUMER_KEY` | Safaricom Daraja consumer key |
| `MPESA_CONSUMER_SECRET` | Safaricom Daraja consumer secret |
| `MPESA_SHORTCODE` | M-Pesa shortcode used for STK push |
| `MPESA_PASSKEY` | M-Pesa passkey used to generate STK password |
| `MPESA_CALLBACK_URL` | Public callback URL for Daraja payment confirmations |
| `CLERK_SECRET_KEY` | Clerk backend secret key |

## API Endpoints
### User Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/users/create` | Create user record after Clerk signup |
| `GET` | `/api/users/:clerkId` | Fetch user by Clerk ID |
| `POST` | `/users/create` | Alias route |
| `GET` | `/users/:clerkId` | Alias route |

### Farm Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/farms/create` | Create farm profile |

### Product Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/products/create` | Create a product for a farmer's farm |
| `GET` | `/api/products/farm/:clerkId` | Get products belonging to a farmer |
| `PATCH` | `/api/products/:productId` | Update a product |
| `DELETE` | `/api/products/:productId` | Delete a product |

### Order Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/orders/create` | Create buyer order |
| `GET` | `/api/orders/buyer/:clerkId` | Get all orders for a buyer |
| `GET` | `/api/orders/farm/:clerkId` | Get orders for a farmer's farm |
| `GET` | `/api/orders/farmer/:clerkId` | Alias for farmer orders |
| `PATCH` | `/api/orders/:orderId` | Update order status |

### Checkout Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/checkout` | Create an order via checkout flow |
| `GET` | `/api/checkout/:clerkId` | Fetch buyer orders via checkout route |

### Payment Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/payments/farmer/:clerkId` | Fetch completed/pending payments for farmer |
| `POST` | `/api/payments/stk-push` | Initiate M-Pesa STK push |
| `POST` | `/api/payments/callback` | Receive Daraja payment callback |

### Dashboard Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/dashboard/farmer/:clerkId` | Fetch farmer dashboard analytics |

### Marketplace Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/marketplace` | Public marketplace feed |

### AI Routes
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/ai/chat` | Ask the AI advisor a question |

## Database Schema Relationships
```text
User
 └── Farm
      └── Product
           └── Order
                └── Payment
```

### Relationship Breakdown
- A `User` is created after authentication with Clerk
- A farmer `User` owns one `Farm`
- A `Farm` owns many `Products`
- A buyer `User` places many `Orders`
- Each `Order` belongs to one `Product`
- Each `Payment` belongs to one `Order`

This relationship model makes the marketplace traceable end-to-end, from who grew the product to who bought it and how they paid.

## M-Pesa Integration Flow
```text
Buyer Checkout
   ↓
Frontend sends order data to backend
   ↓
Backend creates Order in MongoDB
   ↓
Backend calls Daraja STK Push endpoint
   ↓
Buyer receives prompt on phone
   ↓
Safaricom sends callback to backend
   ↓
Backend updates Payment + Order status
   ↓
Buyer sees updated order progress
```

### Payment Notes
- Phone numbers are normalized to Kenya format (`2547XXXXXXXX`)
- STK push uses Daraja sandbox or production credentials depending on deployment
- Callback handling updates payment status and links it to the order lifecycle

## AI Advisor
The AI Advisor is designed for more than novelty. It exists to reduce decision friction for farmers who need fast, useful help in the flow of work.

### What it helps with
- Sales strategy
- Pricing guidance
- Farm budgeting
- Financial planning
- English and Swahili interactions

### Technical implementation
- Frontend chat UI built in React
- Backend AI endpoint protected with rate limiting
- OpenRouter powers the language model response
- Designed to support practical farmer-facing guidance instead of generic chatbot chatter

## Deployment Guide
### Frontend on Vercel
1. Push the repository to GitHub
2. Import `agri-smart-client` into Vercel
3. Set `VITE_CLERK_PUBLISHABLE_KEY`
4. Deploy

### Backend on Render
1. Create a new Web Service from `AGRI-smart-server`
2. Set the start command:
```bash
npm run start
```
3. Add all backend environment variables
4. Ensure your callback URL points to the deployed backend domain

### Database on MongoDB Atlas
1. Create cluster
2. Add database user
3. Allow network access
4. Copy connection string into `MONGO_URI`

### Production Checklist
- Replace sandbox M-Pesa credentials with production credentials
- Configure real domain: `agrismart.co.ke`
- Set secure CORS policy
- Add monitoring and error logging
- Rotate secrets before production launch

## Roadmap
### V2 Features
- County-based filtering and richer marketplace discovery
- Farmer verification and onboarding workflow
- Inventory low-stock alerts
- Buyer reviews and farmer ratings
- SMS order notifications
- Admin panel for support and moderation
- Analytics for best-performing crops and products
- Multi-image product upload
- Payout reconciliation tools
- Offline-first mobile experience or PWA

## Why This Project Matters
Agri-Smart matters because it is designed around a local distribution problem with real human stakes. It is easy to build CRUD apps. It is much harder to build software that fits how people already live, pay, sell, and trust. This product chooses M-Pesa because that is how Kenyan commerce works. It chooses Swahili support because accessibility matters. It chooses direct farmer-to-buyer flows because better software should improve margin, dignity, and visibility for the people producing our food.

This project reflects product thinking as much as engineering:
- It starts with a market inefficiency, not a tech trend
- It uses tools already trusted by users
- It balances commercial utility with social impact
- It is structured for deployment, onboarding, and real-world usage

## Author
**Feisal Aden**

- LinkedIn: `[www.linkedin.com/in/feisal-yakub-b4775a2ab]`
- GitHub: [Feisaladen](https://github.com/Feisaladen)
- Vision: building digital infrastructure that solves practical African market problems

## License
This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
