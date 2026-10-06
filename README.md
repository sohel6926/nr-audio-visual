# NR Audio Visual – Official Website & Production System

Production-ready, multi-page website for **NR Audio Visual** (`nraudiovisual.in`), a professional audio-visual equipment rental company serving **Hyderabad**, **Bangalore (Bengaluru)**, and **Mumbai** from their respective City Centre dispatch hubs.

---

## 1. Project Overview & Design Identity

- **Design Aesthetic:** *"Stage & Studio, drawn by hand"* — an editorial gig-poster layout crossed with a clean technical rider sheet.
- **Visual Themes:**
  - **Paper (Light):** Warm ivory canvas (`#FAF7F2`), ink-black typography (`#151413`), vermilion hot accent (`#D43E1F`), and marigold gold (`#D97706`).
  - **Backstage (Dark):** Charcoal navy canvas (`#11141B`), clean slate text (`#F4F2EC`), warm stage coral (`#FF6138`), and warm tungsten amber (`#F59E0B`). *Zero cyan/purple/neon gradients.*
- **Typography:**
  - Display: **Bricolage Grotesque** & **Fraunces**
  - Body: **Plus Jakarta Sans**
  - Technical Specs / Rider: **JetBrains Mono**
- **Business Model:** 100% Quote-Only. **No prices are shown anywhere.** Every call to action routes to **"Request a Quote"** or **"+ Add to Quote"**.
- **Truthfulness Guarantee:** Zero invented statistics, zero fake client logos, zero fabricated testimonials, and zero fake years in business. All equipment photographed is accurately labeled with real models.

---

## 2. Directory & File Structure

```text
/
├── index.html               # Home: Hero, marquee, bento services, equipment preview, 4-step protocol, cities
├── services.html            # Detailed service breakdown (Sound, backline, RF, video, lighting, LED, crew)
├── products.html            # Equipment catalogue with category filters and persistent Quote List drawer
├── events.html              # Event type profiles (Weddings, corporate, worship, concerts, college, launches)
├── packages.html            # 3 Starter bundles by audience scale (Small, Medium, Large)
├── locations.html           # Multi-city hub directory
├── hyderabad.html           # Hyderabad hub page with Charminar skyline & local coverage
├── bangalore.html           # Bangalore hub page with Vidhana Soudha skyline & local coverage
├── mumbai.html              # Mumbai hub page with Gateway & Sea Link skyline & local coverage
├── gallery.html             # Masonry gear photo gallery with interactive lightbox
├── about.html               # Honest brand story & company specification sheet
├── faq.html                 # Accordion addressing lead time, operators, power, and cancellations
├── contact.html             # Quote form: inline validation, rider summary, WhatsApp formatting & mailto
├── privacy.html             # Privacy policy
├── terms.html               # Rental agreement terms, weather protection, and liabilities
├── 404.html                 # 404 Not Found error page with custom audio vector art
├── styles.css               # Bespoke editorial design system (Paper & Backstage CSS variables)
├── app.js                   # Theme toggle, quote list drawer, lightbox, accordion, WhatsApp formatter
├── config.js                # Central configuration containing all business data & placeholders
├── illustrations.js         # Original vector illustrations (soundwaves, faders, spotlights, skylines)
├── package.json             # NPM project configuration
├── vite.config.ts           # Multi-page Vite build configuration
├── public/
│   ├── robots.txt           # Search crawler directives
│   ├── sitemap.xml          # XML sitemap with all 15 canonical routes
│   └── assets/
│       └── photos/          # Client equipment photo assets
│           ├── yamaha-tf5-mixer.jpg
│           ├── shure-wireless-rack.jpg
│           ├── ld-systems-column-array.jpg
│           ├── alesis-drum-kit.jpg
│           ├── yamaha-psr-i500-keyboard.jpg
│           ├── bass-amp.jpg
│           └── camcorder-tripod.jpg
└── README.md                # Documentation and deployment guide
```

---

## 3. Equipment Asset Mapping

The verified equipment in the rental fleet maps directly to:

| File Name in `/assets/photos/` | Equipment Description | Photo Source |
| :--- | :--- | :--- |
| `yamaha-tf5-mixer.jpg` | Yamaha TF5 32-channel digital live mixing console in rugged flight case | Client Verified Gear |
| `shure-wireless-rack.jpg` | Rack-mounted Shure UHF wireless receivers + handheld wireless mics | Client Verified Gear |
| `ld-systems-column-array.jpg` | LD Systems vertical column line-array PA with powered sub on pole mount | Client Verified Gear |
| `yamaha-psr-i500-keyboard.jpg`| Yamaha PSR-I500 arranger synthesizer keyboard with double-X metal stand | Client Verified Gear |
| `alesis-drum-kit.jpg` | Alesis electronic drum kit with quiet mesh pads, rack, and padded throne | Client Verified Gear |
| `bass-amp.jpg` | Stage bass amplifier combo cabinet with active EQ and corner guards | Client Verified Gear |
| `camcorder-tripod.jpg` | Professional broadcast video camcorder on heavy-duty fluid-head tripod | Client Verified Gear |

*Note: For stage lighting, projectors/screens, and modular LED video walls (where no client photos exist), custom hand-drawn inline SVG vector illustrations with soft twinkle effects are rendered instead of misleading stock photos.*

---

## 4. Central Configuration (`config.js`)

All contact coordinates and city details reside in `config.js`. Updating `config.js` updates global metadata across the entire application:

```javascript
export const siteConfig = {
  brandName: "NR Audio Visual",
  domain: "nraudiovisual.in",
  contact: {
    phone: "+91 91331 33003",
    whatsappUrl: "https://wa.me/919133133003",
    email: "ramavathn813@gmail.com",
  },
  // ... cities, catalogue, and package definitions
};
```

---

## 5. Checklist of `[CLIENT TO CONFIRM]` Placeholders

Review and update the following placeholders in `config.js` and page templates once verified with the client:

- [ ] **Hyderabad City Centre Address:** `[Hyderabad City Centre address, CLIENT TO CONFIRM]`
- [ ] **Bangalore City Centre Address:** `[Bangalore City Centre address, CLIENT TO CONFIRM]`
- [ ] **Mumbai City Centre Address:** `[Mumbai City Centre address, CLIENT TO CONFIRM]`
- [ ] **Founder / Managing Director Name:** `[Founder / Managing Director Name, CLIENT TO CONFIRM]`
- [ ] **Year Established:** `[Year Established, CLIENT TO CONFIRM]`
- [ ] **Instagram Profile Link:** `[Instagram URL, CLIENT TO CONFIRM]`
- [ ] **Facebook Profile Link:** `[Facebook URL, CLIENT TO CONFIRM]`
- [ ] **YouTube Channel Link:** `[YouTube Channel URL, CLIENT TO CONFIRM]`
- [ ] **Operating Hours:** `Monday to Sunday: 8:00 AM – 10:00 PM IST [CLIENT TO CONFIRM]`
- [ ] **Cancellation Deposit Refund Terms:** `[CLIENT TO CONFIRM: e.g. 50% deposit refundable if cancelled 7+ days prior]`
- [ ] **Booking Advance Percentage:** `[CLIENT TO CONFIRM: e.g. 50% advance to block equipment dates]`
- [ ] **Venue Power Specifications:** `[CLIENT TO CONFIRM: e.g. dedicated 32A 3-phase or silent DG generator]`
- [ ] **Overtime Rates:** `[CLIENT TO CONFIRM: hourly charge for events running past agreed midnight curtain]`
- [ ] **Small Hall Audience Guideline:** `Up to ~100 guests [CLIENT TO CONFIRM]`
- [ ] **Medium Event Audience Guideline:** `100 to ~400 guests [CLIENT TO CONFIRM]`
- [ ] **Large Stage Audience Guideline:** `400 to 1,500+ attendees [CLIENT TO CONFIRM]`

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Development
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (Vite on port 3000)
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Production Build & Preview
```bash
# Compile and bundle multi-page assets
npm run build

# Preview production build locally
npm run preview
```

---

## 7. How to Deploy

### Option A: Netlify (Recommended)
1. Push code to your GitHub/GitLab repository.
2. In Netlify, click **"Add new site"** > **"Import an existing project"**.
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. For native Netlify Forms, add `data-netlify="true"` to `<form id="quote-request-form">` in `contact.html`.

### Option B: Vercel
1. In Vercel, import your repository.
2. Select **Vite** preset.
3. Vercel automatically detects `npm run build` and output directory `dist`.
4. Click **Deploy**.

### Option C: GitHub Pages
1. In GitHub Repository Settings, navigate to **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** > **Vite**.
3. Commit to `main` branch to trigger automated deployment.

---

## 8. Anti-Slop & Truthfulness Compliance Audit

- **Palette:** Warm Paper Ivory + Charcoal Backstage Navy. **Zero neon cyan, purple, or fake gold glowing cards.**
- **Typography:** Real Google Fonts display and mono pairings. No generic Roboto/Inter defaults.
- **Copy:** 100% honest event copy with clearly tagged `[CLIENT TO CONFIRM]` markers.
- **Prices:** Strictly quote-only. **Zero prices displayed across all 15 pages.**
- **Forms:** Generates authentic WhatsApp and Email equipment riders with itemized lists from the persistent quote drawer.
