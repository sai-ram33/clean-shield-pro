# Clean Shield Pro - Node.js & Express.js Backend

REST API and backend server for **Clean Shield Pro** (Residential & Commercial Deep Cleaning and Safe Odorless Pest Control platform serving Rajamahendravaram and 15+ regional operational hubs).

---

## 🚀 Tech Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas (`clean_shield_pro`) via Mongoose ORM
- **Security:** bcryptjs password hashing, JSON Web Tokens (JWT)
- **Middleware:** CORS, Express JSON parser, Centralized Error Handler

---

## 📁 Directory Structure
```
backend/
├── server.js                      # Express app entrypoint & static frontend server
├── package.json                   # Dependencies and npm scripts
├── .env                           # MongoDB Atlas URI & Owner Credentials
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
└── src/
    ├── config/
    │   ├── db.js                  # MongoDB Atlas connection (Mongoose + DNS fix)
    │   └── businessConfig.js     # Company contacts, helplines & 15+ branches
    ├── controllers/
    │   ├── authController.js      # Owner admin login & auto-seeding
    │   ├── bookingsController.js  # Bookings & tracking logic (Dynamic MongoDB storage)
    │   ├── cronController.js      # Keep-alive, scheduled tasks & metrics audit
    │   ├── enquiriesController.js # Custom quote enquiries & leads
    │   ├── reviewsController.js   # Customer reviews & admin moderation
    │   └── servicesController.js  # Services catalog, pricing & config
    ├── middleware/
    │   └── errorHandler.js        # Centralized error handler
    ├── models/
    │   ├── Admin.js               # Owner Admin Mongoose Model (bcrypt hashing)
    │   ├── Booking.js             # Booking Mongoose Model
    │   ├── Enquiry.js             # Enquiry Mongoose Model
    │   ├── Review.js              # Review Mongoose Model
    │   └── Pricing.js             # Pricing Mongoose Model
    └── routes/
        ├── authRoutes.js          # /api/auth (Login & session verification)
        ├── bookingsRoutes.js      # /api/bookings routes
        ├── cronRoutes.js          # /api/cron routes (keep-alive, status, ping)
        ├── enquiriesRoutes.js     # /api/enquiries routes
        ├── reviewsRoutes.js       # /api/reviews routes
        └── servicesRoutes.js      # /api/services, /api/pricing, /api/config
```

---

## 🔐 Owner Admin Accounts
Pre-configured for Clean Shield Pro operations:
- **Primary Owner:** `madhuripaka756@gmail.com`
- **Secondary Owner:** `prasadanem777@gmail.com`
- **Default Password:** `CleanShieldPro@2026`
- **Admin Portal:** `http://localhost:5000/admin.html` (Password protected)

---

## 🍃 MongoDB Atlas Storage
- All customer bookings and quote requests are stored **dynamically** in MongoDB Atlas.
- The admin dashboard initializes **completely clean and empty** until real customer bookings or walk-ins are submitted.


---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
# Production mode
npm start

# Development with automatic restart
npm run dev
```

The server will launch at:
- **API Base:** `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/api/health`
- **Frontend Website:** `http://localhost:5000/`

---

## 📡 API Endpoints Reference

### 1. Bookings (`/api/bookings`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings (supports `?status=Confirmed` and `?search=query`) |
| `POST` | `/api/bookings` | Create new booking (returns formatted WhatsApp confirmation text) |
| `GET` | `/api/bookings/:id` | Get single booking details by ID |
| `GET` | `/api/bookings/track/:query` | Track booking by Booking ID (e.g. `CSP-84921`) or 10-digit phone |
| `PATCH` | `/api/bookings/:id/status` | Update booking status (`Pending`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`) |

#### Example Booking Request Body:
```json
{
  "customerName": "Ramesh Varma",
  "phone": "+91 90596 39955",
  "altPhone": "+91 88973 12523",
  "email": "ramesh@example.com",
  "locality": "Danavaipeta",
  "address": "D.No 4-1-12, Main Road, Danavaipeta",
  "service": "Full Home Deep Cleaning",
  "bhk": "2 BHK",
  "addons": ["Balcony Cleaning"],
  "amount": 5998,
  "date": "2026-10-15",
  "timeSlot": "08:30 AM - 12:30 PM",
  "paymentMethod": "Cash on Delivery (COD)"
}
```

---

### 2. Custom Quote Enquiries & Inbound Leads (`/api/enquiries`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/enquiries` | List all custom quote requests (supports `?search=query`) |
| `POST` | `/api/enquiries` | Submit new custom quote enquiry |
| `PATCH` | `/api/enquiries/:id/status` | Update enquiry status (`New`, `Contacted`, `Converted`) |

---

### 3. Customer Reviews (`/api/reviews`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reviews` | Get all approved customer reviews (pass `?all=true` for admin view) |
| `POST` | `/api/reviews` | Submit new verified customer review |
| `PATCH` | `/api/reviews/:id/toggle` | Toggle review visibility on website (Admin moderation) |

---

### 4. Services, Pricing & Configuration (`/api`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/services` | Complete catalog of 21 services across Cleaning & Pesticides (including Commercial, Industrial, and AMC) |
| `GET` | `/api/pricing` | Base pricing tiers for 1 BHK, 2 BHK, 3 BHK, 4 BHK+ |
| `PUT` | `/api/pricing` | Update base pricing tiers |
| `GET` | `/api/config` | Official contact info, helplines, WhatsApp & stats |
| `GET` | `/api/branches` | 15+ operational branches network across Andhra Pradesh |
| `GET` | `/api/health` | Server uptime and health check |

---

### 5. Cron Job & Scheduled Worker (`/api/cron`)
Designed for hosting keep-alive (e.g. Render, Koyeb, Glitch free tier 15-minute sleep prevention), MongoDB connection pool refresh, routine telemetry, and automated maintenance.

| Method | Endpoint | Description |
|---|---|---|
| `GET` / `POST` | `/api/cron` | Executes scheduled cron tasks: server keep-alive, MongoDB health & ping, and operational count snapshot |
| `GET` | `/api/cron/ping` | Ultra-fast lightweight ping to keep free hosting containers awake (`/api/cron/keep-alive` alias) |
| `GET` | `/api/cron/status` | Current cron telemetry (total executions, last run duration, uptime) |
| `GET` / `POST` | `/api/cron?cleanup=true` | Triggers routine maintenance & data cleanup checks |

#### Security & Authentication:
To prevent unauthorized execution in production, set `CRON_SECRET` in your `.env`. You can pass the key using any of:
1. **Query parameter:** `/api/cron?key=YOUR_CRON_SECRET`
2. **Bearer Token:** Header `Authorization: Bearer YOUR_CRON_SECRET`
3. **Custom Header:** Header `x-cron-secret: YOUR_CRON_SECRET`

*(Note: `/api/cron/ping` works publicly without a secret to easily support basic uptime monitors).*

#### How to Setup Scheduled Triggers:
- **Free Cron Services (e.g. cron-job.org):**
  - Set URL to: `https://your-api.onrender.com/api/cron?key=YOUR_CRON_SECRET` (every 10 or 14 minutes).
- **Uptime Monitors (e.g. UptimeRobot / Better Stack):**
  - Monitor URL: `https://your-api.onrender.com/api/cron/ping` (every 5 minutes).
- **cURL Trigger:**
  ```bash
  curl -X GET "http://localhost:5000/api/cron?key=clean_shield_pro_cron_secret_2026"
  ```
