# GrokBot Automation Guide (`news.json` & `products.json`)

This repository (`garageorphan.com`) uses the exact same zero-build JSON feed architecture as `CanadianCaptive-Cloudflare`.
The landing page (`index.html`) dynamically fetches:
1. **`news.json`** — Renders the **Garage Orphan News & Policy Updates** section (`#news`).
2. **`products.json`** — Renders **The Street & Apartment Charging Kit** product grid (`#gear`).

---

## 1. GrokBot Instructions for Updating News (`news.json`)

### Prompt to Give GrokBot (News Updates)

```text
Update `news.json` in the `kevingkday/garageorphan` repository with the 6 most relevant, current news articles for "garage orphans" (EV owners and buyers who live in apartments, condos, townhomes, or houses with street parking only).

Focus on:
- State and municipal Right-to-Charge laws (HOA/landlord EV charging mandates)
- Curbside, lamppost, and street-parking EV charging deployments
- Apartment / multi-unit dwelling (MUD) charging grants, rebates, and smart-outlet rollouts
- Public fast-charging network expansions (NACS / J3400 access, reliability, pricing)
- Peer-to-peer (P2P) driveway sharing and practical urban EV ownership studies

Requirements:
1. Update `"lastUpdated"` to today's date in `YYYY-MM-DD` format.
2. Provide 6 verified articles in the `"articles"` array, sorted newest first.
3. Each article object must use this exact schema:
   {
     "title": "Headline of the article",
     "date": "YYYY-MM-DD",
     "source": "Publication Name (e.g., Electrek, InsideEVs, Plug In America, DOE)",
     "category": "Short 2-3 word category (e.g., Right-to-Charge Laws, Curbside Charging, Apartment Charging, Charging Networks)",
     "summary": "2-sentence plain-English summary explaining why this matters to apartment or street-parked EV drivers.",
     "url": "https://direct-url-to-article"
   }
4. Commit and open a PR or push directly to `news.json`.
```

---

## 2. GrokBot Instructions for Expanding Amazon Products (`products.json`)

### How Affiliate Links Work with GrokBot
- When GrokBot adds new products to `products.json`, it sets `"affiliateUrl": ""` (empty string) and populates `"amazonUrl"` (plus `"asin"` when available).
- `index.html` automatically uses `affiliateUrl` whenever you have added one, and falls back to `amazonUrl` (or an Amazon search link) until you paste in your `https://link.amazon/...` affiliate shortlink.
- **Crucial rule for GrokBot:** Never delete or overwrite existing products' `"affiliateUrl"` values in `products.json`.

### Prompt to Give GrokBot (Amazon Product Additions)

```text
Expand `products.json` in the `kevingkday/garageorphan` repository by adding new, high-utility Amazon products for "garage orphans" (EV drivers who charge outdoors, on the street, in apartment/condo parking lots, or at public chargers).

Product ideas to look for on Amazon:
- J1772 to Tesla (NACS) or Tesla (NACS) to J1772 Level 2 destination charger adapters
- Weatherproof EV charger port snow/rain magnetic covers (for cars parked on the street in winter)
- Heavy-duty cable organizer bags / trunk frunk storage cases for mobile EVSE & 50-ft extension cords
- NEMA 14-50 / 10-30 / 5-20 splitter or smart EV outlet adapters for shared dryer/garage outlets
- Portable 12V lithium jump starters (essential for street-parked EVs if the 12V auxiliary battery dies)
- Cord overhead suspension arms or weighted sidewalk cable mats

Requirements:
1. Read the existing `products.json` first and preserve all existing entries (especially their `"affiliateUrl"` values).
2. Update `"lastUpdated"` to today's date in `YYYY-MM-DD` format.
3. Append new product objects to the `"products"` array using this exact schema:
   {
     "id": "kebab-case-unique-slug",
     "title": "Clear Product Name",
     "badge": "Emoji + 2-3 word callout (e.g., ❄️ Winter Essential, 🔌 Destination Adapter, 🧰 Trunk Organizer)",
     "badgeStyle": "amber | brand | emerald | rose | blue | purple | slate",
     "spec": "Short spec tag (e.g., J1772 / NACS, Waterproof, 12V Emergency)",
     "icon": "adapter | charger | cord | lock | ramp | cover | shield | battery",
     "summary": "2-sentence plain-English explanation of how this solves a real street or apartment charging problem.",
     "features": [
       "First short practical benefit",
       "Second short practical benefit"
     ],
     "asin": "B0XXXXXXXX (if known, otherwise empty string)",
     "amazonUrl": "https://www.amazon.com/dp/B0XXXXXXXX or https://www.amazon.com/s?k=Product+Search+Terms",
     "affiliateUrl": "",
     "dateAdded": "YYYY-MM-DD"
   }
4. Leave `"affiliateUrl": ""` on newly added products so the site owner can easily paste in their Amazon Associate link.
```

---

## 3. How to Add Your Amazon Affiliate Links

1. Open [`products.json`](./products.json).
2. Search for `"affiliateUrl": ""`.
3. Click the product's `"amazonUrl"` to open the item on Amazon and generate your SiteStripe / `link.amazon` shortlink.
4. Paste your link into `"affiliateUrl"` and save/commit `products.json`. The live site updates automatically without touching `index.html`.

