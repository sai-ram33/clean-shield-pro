# Clean Shield Pro - Frontend Application

> **Clean Home • Healthy Life** | *"We Don't Just Clean, We Care."*  
> Serving 10,000+ Customers across Rajamahendravaram, East Godavari, West Godavari, Palakollu, Narasapuram, Jaggampeta & Andhra Pradesh

---

## 🌟 Overview

Clean Shield Pro is an end-to-end residential deep cleaning and pest control platform trusted by **10,000+ happy customers**. Headquartered in **Rajahmundry**, with active operational branches across **East Godavari, West Godavari, Palakollu, Narasapuram, Jaggampeta, Vijayawada, Kakinada, Tanuku, Tadepalligudem, Eluru, Amalapuram, Ravulapalem, Bhimavaram, Jangareddygudem, and Vizag**. It connects customers seeking high-quality hygiene services with the operations team managing dispatches, bookings, customer leads, and reviews.

This frontend application is built purely with **semantic HTML5**, **modern Vanilla CSS**, and **modular JavaScript**, with a shared local database state (`js/data.js`).

---

## 📁 Project Structure

```
frontend/
├── index.html            # Customer-facing website (matching wireframe design)
├── admin.html            # Business owner & staff operations console
├── css/
│   ├── style.css         # Customer site styles, design system & animations
│   └── admin.css         # Admin dashboard layout, tables, badges & modals
├── js/
│   ├── data.js           # Shared database state (localStorage), seed data & events
│   ├── app.js            # Customer website logic (modals, pricing, slider, tracking)
│   └── admin.js          # Admin dashboard logic (KPIs, lead alerts, dispatch, status)
└── images/               # High-resolution generated photography
    ├── hero_team.jpg           # Clean Shield Pro verified cleaning team
    ├── before_kitchen.jpg      # Before deep cleaning comparison image
    ├── after_kitchen.jpg       # After deep cleaning comparison image
    ├── service_deep_clean.jpg  # Home deep cleaning showcase
    ├── service_pest_control.jpg# Odorless pest control service
    ├── service_kitchen.jpg     # Kitchen & chimney degreasing
    ├── service_water_tank.jpg  # Water tank jet cleaning
    ├── service_sofa.jpg        # Sofa upholstery steam extraction
    └── service_bathroom.jpg    # Bathroom tile sanitization
```

---

## 🚀 How to Run Locally

You can open the HTML files directly in your web browser (e.g., double-click `index.html` or `admin.html`), or serve them with any static web server:

```powershell
# Using Python's built-in server (from the frontend directory):
python -m http.server 8080

# Or from workspace root:
python -m http.server 8080 --directory "frontend"
```

Then visit:
- **Customer Website:** `http://localhost:8080/index.html`
- **Admin Dashboard:** `http://localhost:8080/admin.html`

---

## 💎 Features Implemented

### 1. Customer Website (`index.html`)
- **Brand Aesthetic:** Dark Green (`#0D3B2E`), Light Sage Green (`#25A27A` / `#EAF6F1`), Subtle Gold (`#D4A359`), and crisp white.
- **Hero Section:**
  - Headline, subtitle, and trust badges ("Free quotation", "COD and UPI accepted", "Booking alerts on WhatsApp").
  - Gold primary CTA button: **"Book a Service"**.
  - Commercial hero photo of the Clean Shield Pro team in Rajamahendravaram.
- **Our Services Grid & Expanded Catalog:**
  - **Home & Commercial Cleaning (11 Services):** Full Home Deep Cleaning (Starting at ₹3,499), Bathroom & Toilet (Starting at ₹599 to ₹749, 30-60 mins), Kitchen & Chimney (Starting at ₹1,499), Water Tank Jet Wash (Starting at ₹1,199), Balcony Cleaning (Starting at ₹699), Sofa & Upholstery (Starting at ₹1,199), Floor Scrubbing (Starting at ₹1,999), Move-in / Vacant Flat (Starting at ₹2,999, Duplex Starting at ₹7,999), Commercial Deep Cleaning (Custom Quote), Industrial Cleaning (Custom Quote), and AMC Annual Maintenance Contracts (Custom Quote).
  - **Pest Control Solutions (10 Services):** Odorless Cockroach Control (Starting at ₹1,199), Anti-Termite 6mm-8mm Drill Treatment (Starting at ₹2,999, 3-Year Warranty), Bed Bug Eradication (Starting at ₹1,199), Mosquito & Drain Fly Fogging (Starting at ₹1,299), Ants Perimeter Barrier (Starting at ₹1,499), Rodent Proofing (Starting at ₹1,699), Full House Pest Shield Combo (Starting at ₹2,499), Commercial Pest Control (Custom Quote, B2B), Industrial Pest Control & Fumigation (Custom Quote, Heavy-Duty), and Pest Control AMC (Annual Maintenance Contracts / Charges, Custom Quote).
- **Interactive Before & After Comparison Slider:**
  - Drag the gold circular handle left and right to inspect the transformation of dirty vs. deep-cleaned kitchen surfaces.
- **What Customers Say (Reviews):**
  - 5-star verified reviews from Rajamahendravaram residents (Danavaipeta, Prakash Nagar, Morampudi).
  - **Share your experience card** with "Write a review", quick "Call" and "WA" (WhatsApp) buttons.
- **Service Area & Google Maps:**
  - Embedded Google Map of Rajamahendravaram.
  - Locality tags: Danavaipeta, Prakash Nagar, Morampudi, Lalacheruvu, Dowleswaram, Diwancheruvu, Aryapuram, Innespeta, Katheru, Kambala Cheruvu.
- **Interactive Modals:**
  - **Booking Modal:** Real-time BHK selector and price calculator, optional add-ons (Balcony, Fridge, Chimney), date & time picker, payment options (Cash on Delivery, PhonePe, Paytm, Dynamic UPI QR code), instant booking confirmation, and 1-click WhatsApp booking alert!
  - **Custom Quote Modal:** Quick enquiry form for custom services with instant WhatsApp follow-up.
  - **Track Booking Modal:** Check real-time dispatch status (Received &rarr; Confirmed &rarr; Assigned &rarr; En Route &rarr; Completed).
  - **Write Review Modal:** Interactive 5-star rating picker and customer feedback submission.

### 2. Admin Operations Console (`admin.html`)
- **Real-Time Cross-Tab Lead Alerts:**
  - When a customer submits a booking or enquiry on `index.html`, the Admin Dashboard in another tab immediately chimes an audio alert, increments the notification bell counter, and displays a prominent **Live Lead Alert Banner** with direct WhatsApp contact.
- **KPI Metrics:**
  - Total Bookings, Gross Revenue (₹ INR), Active Enquiries, Average Customer Rating.
- **Bookings Management:**
  - Search and filter by status (Pending, Confirmed, In Progress, Completed, Cancelled).
  - Quick status dropdown to update orders in real-time.
  - One-click **WhatsApp Customer** button with pre-filled status update message.
  - View full booking details modal.
- **Custom Quote Enquiries:**
  - Track leads for price-on-request services.
  - Status tracking (New, Contacted, Converted) and WhatsApp quick response.
- **Customer Directory:**
  - Aggregated database of customer contacts, total orders, and lifetime spend in Rajamahendravaram.
- **Reviews Moderation:**
  - Toggle reviews between "Visible on Website" and "Hidden".
- **Service Pricing Configuration:**
  - Modify base pricing for 1 BHK, 2 BHK, 3 BHK, 4 BHK+ for deep cleaning and pest control. Updates dynamically synchronize with the customer website!
- **Official WhatsApp Dispatch Templates:**
  - Ready-to-copy standard messages for Booking Confirmation, Mobile Van Dispatch, Completion Receipt, and Review Requests.
