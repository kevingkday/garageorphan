# GarageOrphan.com

> **Drive Electric. No Garage Required.**  
> The premier survival resource, curated hardware guide, and legal Right-to-Charge action kit for the 40+ million urban and apartment EV drivers.

---

## ⚡ Overview

`garageorphan.com` is a high-conversion, zero-build single-page web portal engineered for rapid deployment to **Cloudflare Pages**. It is crafted with semantic HTML5, modern Tailwind CSS, and vanilla JavaScript with zero heavy framework overhead.

### Key Features
* **Top Notice & Acquisition Bar:** Category domain availability notice linked to a modal dialog for domain acquisition or strategic partnerships.
* **Hero Section:** High-impact technical slate aesthetic with electric emerald and cyan gradients, value proposition, and key urban EV statistics.
* **Curated Gear Grid (Affiliate Showcase):** 6 battle-tested product cards (NACS/CCS adapters, dual-voltage mobile EVSE, heavy-duty 10-AWG extension, plug security clamp, ADA sidewalk curb ramp, lockable weatherproof box) with FTC affiliate disclosures.
* **Interactive Lead Capture Form:** HOA & landlord Right-to-Charge proposal kit with client-side validation, loading spinner, and simulated or real webhook dispatch.
* **Quick-Reference FAQ Accordion:** ARIA-compliant expandable answers addressing garage orphan realities, Right-to-Charge laws, 120V trickle charging, and P2P driveway charging networks.
* **Security & Performance:** Native Cloudflare Pages `_headers` with strict security policies.

---

## 🚀 Cloudflare Pages Deployment

### Option 1: Direct Git Integration (Recommended)
1. Push this repository to your GitHub account.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set the build configuration:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `.` (root directory)
5. Click **Save and Deploy**. Your site will be live on a `*.pages.dev` subdomain and ready for custom domain setup to `garageorphan.com`.

### Option 2: Wrangler CLI Direct Upload
```bash
npx wrangler pages deploy . --project-name=garageorphan
```

---

## ⚙️ Configuration & Customization

### 1. Connecting Your Webhook
Open [`index.html`](./index.html) and locate line 504:
```javascript
const WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE";
```
Replace `"YOUR_WEBHOOK_URL_HERE"` with your Zapier, Make, Formspree, Discord, or Cloudflare Worker endpoint. If left as-is, the form gracefully falls back to a simulated demo submission so you can test user flows immediately.

### 2. Updating Affiliate Links
Search [`index.html`](./index.html) for `rel="sponsored noopener"` inside the `#gear` section to plug in your Amazon Associates, ShareASale, or direct manufacturer affiliate links.

### 3. Contact & Domain Inquiry
All contact email triggers are wired to `inquire@garageorphan.com`. Update this address as needed.
