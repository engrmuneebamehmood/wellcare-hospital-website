# WellCare International Hospital — Official Website

A modern, responsive, static-build-compatible website for **WellCare International Hospital**, New Lari Ada, Near Attock Filling Station, Pindi Gheb, District Attock, Punjab, Pakistan.

- **Phone:** 0572-350500
- **Mobile / WhatsApp:** 0318-5588178 (`+923185588178`)
- **Email:** wellcarehospitalpakistan@gmail.com

---

## Features Included

- **Home & Highlights:** 24/7 Emergency Services, 24/7 Pharmacy, 60-bed capacity notice, quick Call Now, WhatsApp, and Book Appointment buttons.
- **About Us:** Hospital overview, mission, vision, and values.
- **16 Medical Departments:** Filterable department cards with direct appointment request buttons.
- **Our Doctors & Timings:** Searchable/filterable roster of 22 doctors and allied health specialists plus weekly OPD timings table.
- **Appointment Request System:** Form validation with formatted WhatsApp message handoff to `+923185588178` (no browser `localStorage` or database required).
- **Facilities & Gallery:** 9 hospital facilities and an interactive Lightbox image gallery using local bundled assets.
- **Contact & Map:** Click-to-call, WhatsApp enquiry form, clickable email, Google Maps directions link, and embedded OpenStreetMap view (no paid API key required).

---

## Beginner Guide: Running Locally

1. Install **Node.js** (LTS version 20 or newer) from [https://nodejs.org](https://nodejs.org).
2. Download or extract the project ZIP folder, then open a terminal inside the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local preview server:
   ```bash
   npm run dev
   ```
5. Build the production static files:
   ```bash
   npm run build
   ```
   The compiled static website is created in the `dist/` folder.

---

## Free Deployment on Cloudflare Pages

This project is 100% static-build compatible and requires **no paid database, no paid hosting, and no secret API keys**.

### Option A: Upload via Cloudflare Pages Direct Upload (Easiest)
1. Run `npm run build` on your computer to generate the `dist` folder.
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) (free account).
3. Go to **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
4. Name your project (for example, `wellcare-hospital-pindigheb`).
5. Upload the `dist` folder and click **Deploy site**.

### Option B: Automatic Deployment via GitHub
1. Push this project folder to a GitHub repository.
2. In Cloudflare Dashboard, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your repository and use these exact settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**.

---


