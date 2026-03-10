# Architecture

Technical reference for folder structure, data flow, state, and how major pieces interact. Optimized for LLM-assisted edits.

## Folder structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home
│   ├── layout.tsx          # Root layout (nav, footer, providers)
│   ├── globals.css         # Tailwind + CSS variables
│   ├── about/ …            # Content pages (about, atelier, bespoke, care-guide, delivery, faq, etc.)
│   ├── bouquets/           # Category: page.tsx + bouquets-client.tsx
│   ├── hat-boxes/          # Category: page.tsx + hat-boxes-client.tsx
│   ├── candles-gifts/      # Category: page.tsx + candles-gifts-client.tsx
│   ├── indoor-plants/      # Category: page.tsx + indoor-plants-client.tsx
│   ├── checkout/           # Checkout form + order summary
│   ├── payment-status/     # Post-Tap redirect; verifies tap_id
│   ├── success/            # Post-checkout thank-you
│   ├── product/[id]/       # Product detail + related products
│   └── api/
│       ├── checkout/       # POST: create Tap charge, return redirect URL
│       ├── tap/verify/      # GET: verify charge by tap_id
│       └── webhooks/tap/    # POST: Tap webhook (mark paid stub, Formspree, Twilio)
├── components/
│   ├── cart-context.tsx    # Cart state + localStorage persistence
│   ├── cart-provider.tsx   # CartProvider + CartDrawer wrapper
│   ├── cart-drawer.tsx     # Slide-out cart UI
│   ├── main-nav.tsx        # Header, mega menu, mobile menu, cart badge, Mother's Day toggle
│   ├── site-footer.tsx     # Footer links (server component)
│   ├── product-card.tsx    # Card with SafeImage, price, Add to Cart
│   ├── product-slider.tsx  # Horizontal ProductCard carousel
│   ├── safe-image.tsx      # next/image wrapper with normalizeImageSrc + fallback
│   ├── fleur-de-lis.tsx    # Logo/icon component
│   └── seasonal-theme-context.tsx  # Mother's Day theme state + localStorage
├── lib/
│   ├── products.ts         # getAllProducts, getProductById, getRelatedProducts
│   └── images.ts           # normalizeImageSrc, blur placeholder
└── data/
    └── products.json       # Source: bouquets, hatBoxes, candles, plants
```

Public assets: `public/assets/` (hero/tableau images), `public/products/` (product images).

## Data flow

### Product data

- **Source:** `src/data/products.json` (categories: `bouquets`, `hatBoxes`, `candles`, `plants`). Fields include `id`, `name`, `category`, `subCategory`, `price`, `imageSrc`, `description`, `featured`, `isMothersDay`.
- **Access:** `src/lib/products.ts` imports the JSON and exposes:
  - `getAllProducts()` – all products
  - `getProductById(id)` – single product
  - `getRelatedProducts(category, excludeId, limit)` – for “You May Also Like”
- No server fetch; data is bundled. Category pages filter by `category` and optional `type` (maps to `subCategory`) from `useSearchParams("type")` in `*-client.tsx`.

### Cart state

- **Context:** `cart-context.tsx` holds `CartItem[]`, `totalQuantity`, `totalPrice`, `isOpen`, `giftMessage`, and methods (`addItem`, `updateQuantity`, `removeItem`, `clearCart`, `openCart`/`closeCart`/`toggleCart`, `setGiftMessage`).
- **Persistence:** `localStorage` keys `le-cadeau-cart-v1` and `le-cadeau-cart-gift-message-v1`.
- **Provider:** `cart-provider.tsx` wraps the app with `CartProvider` and renders `CartDrawer`. Used in root `layout.tsx` as `CartProviderWithDrawer`. Any client component can `useCart()`.

### Seasonal theme (Mother's Day)

- **Context:** `seasonal-theme-context.tsx` – `isMothersDay`, `toggleMothersDay`, `setMothersDay`; persisted in `localStorage` under `le-cadeau-seasonal-theme`.
- Wraps the app in root layout (outside cart). MainNav shows a Mother's Day toggle; product data can use `isMothersDay` for filtering/badges.

### Checkout and payment flow

1. **Checkout page** (`/checkout`): User fills delivery details, gift message, delivery date. “Pay Now” sends `POST /api/checkout` with `{ amount, currency: "JOD", customer: { name, email } }`. API creates a Tap charge and returns `{ url }`; client redirects to Tap.
2. **Tap** redirects back to `/payment-status?tap_id=...`. Client calls `GET /api/tap/verify?tap_id=...` and shows success/failure.
3. **Webhook** `POST /api/webhooks/tap`: On `status === "CAPTURED"`, runs `markOrderPaid(orderId)` (stub), sends Formspree notification, and Twilio WhatsApp to owner. Checkout API does **not** persist line items, delivery date, or gift message; webhook has no access to them unless you add a backend store.

## Component interaction

- **Root layout:** `SeasonalThemeProvider` → `CartProviderWithDrawer` → `MainNav` + `main` + `SiteFooter`.
- **MainNav:** Uses `useCart()` (badge, open drawer) and `useSeasonalTheme()` (Mother's Day toggle). Desktop: mega menu by category; mobile: hamburger + slide-out. Logo: `FleurDeLis`.
- **SiteFooter:** Server component. FleurDeLis + link groups (The House, Customer Care, Legal). No hooks.
- **ProductCard:** Uses `useCart().addItem`, `normalizeImageSrc` from `lib/images`. Renders `SafeImage`, category, name, price, “Add to Cart” (disabled when no `id`). Links to `/product/[id]` when `id` present. Optional “Limited Edition” for `isMothersDay`.
- **ProductSlider:** Receives `productData` and renders a row of ProductCards; section title; scroll-snap; chevrons; uses `scrollbar-hide`.
- **SafeImage:** Wraps `next/image`; uses `normalizeImageSrc`; on error shows placeholder (icon + “Image”). Used for hero, grids, cart thumbnails, checkout line items.
- **CartDrawer:** Reads cart and gift message from `useCart()`, shows thumbnails (SafeImage), quantities, link to `/checkout`.
- **Category pages:** Server `page.tsx` renders hero (SafeImage) and client wrapper that uses `useSearchParams("type")` and filters products by `subCategory`; grid of ProductCards.
- **Product detail:** `product/[id]/page.tsx` – SafeImage, FleurDeLis, “You May Also Like” via `getRelatedProducts`.

## API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/checkout` | POST | Create Tap charge; body: `amount`, `currency`, `customer.name`, `customer.email`; returns `{ url }`. |
| `/api/tap/verify` | GET | Verify charge with Tap by `tap_id`; returns charge status. |
| `/api/webhooks/tap` | POST | Tap webhook; on CAPTURED: stub `markOrderPaid`, Formspree email, Twilio WhatsApp. |

All use server-side `process.env` (no `NEXT_PUBLIC_*` for secrets).

## Routing summary

- **Static content:** `/`, `/about`, `/atelier`, `/bespoke`, `/care-guide`, `/delivery`, `/faq`, `/privacy`, `/privacy-policy`, `/refund-policy`, `/terms`, `/checkout`, `/success`.
- **Dynamic:** `/product/[id]` (param), `/payment-status` (query `tap_id`), category pages (optional query `type`). Category pages use `force-dynamic` or client `useSearchParams` for `type` filtering.

## Styling and theming

- **Tailwind:** Content in `./src/**/*.{js,ts,jsx,tsx,mdx}`. Custom: color `brand-gold`, font families `heading` (Playfair), `body` (DM Sans).
- **globals.css:** `@import "tailwindcss"`. CSS variables: `--background`, `--foreground`, `--accent-forest`, `--accent-cream`, `--accent-gold`, etc.; `@theme inline` maps them. Body: radial gradient background. Utilities: `.font-heading`, `.font-body`, `.scrollbar-hide`.
- **Visual patterns:** Radial gradients for full-page blur; cards/sections `rounded-3xl`/`rounded-2xl`, `border border-brand-gold/20`; panels `bg-[color:rgba(5,16,11,0.95)]`; Framer Motion fadeUp; gold gradient buttons.
