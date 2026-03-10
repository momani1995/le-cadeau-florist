# Project context

Current state, known gaps, and technical debt. Use this when planning features or fixes so AI-generated changes stay consistent and don’t assume non-existent pieces.

## Current state

- **Product catalog:** Static JSON (`src/data/products.json`). Categories: bouquets, hatBoxes, candles, plants. Each item has `id`, `name`, `category`, `subCategory`, `price`, `imageSrc`, `description`, `featured`, `isMothersDay`. No CMS or database.
- **Cart:** Client-only; persisted in localStorage. No server-side cart or session.
- **Checkout:** Form collects delivery info, gift message, delivery date. Only `amount`, `currency`, and `customer` are sent to `/api/checkout`. Tap charge is created and user is redirected to Tap; no order record is stored in a DB. “Complete Order” (non–Pay Now) currently redirects to `/success` after a timeout without creating an order or calling the backend.
- **Post-payment:** Tap redirects to `/payment-status?tap_id=...`. Page verifies via `/api/tap/verify`. Webhook runs on CAPTURED: placeholder `markOrderPaid`, Formspree email, Twilio WhatsApp. No persistence of order details (items, delivery date, gift message) in the codebase.
- **Env:** No `.env.example`. Required vars are documented in README.md; all are server-side (`TAP_SECRET_KEY`, `FORMSPREE_ENDPOINT`, `TWILIO_*`, `OWNER_PHONE_NUMBER`).

## To-do and known technical debt

1. **Order persistence**
   - `markOrderPaid(orderId)` in `api/webhooks/tap/route.ts` is a stub (logs only). Replace with real DB/API (e.g. `db.order.update(...)` or external service).
   - Checkout API does not accept or store `items`, `deliveryDate`, `giftMessage`, or `includeMothersDayCard`. Webhook has no access to these unless you add an orders store and pass an order id through Tap metadata.

2. **Tap webhook verification**
   - `verifyTapSignature(request)` in `api/webhooks/tap/route.ts` is unimplemented (TODO); it always returns `true`. Implement HMAC/signature check using Tap’s webhook secret before processing.

3. **Checkout flow**
   - “Complete Order” (non–Pay Now) does not create an order or call the backend; it only redirects to `/success` after a delay. Decide whether to remove it, or implement a “pay later”/COD path with order creation.

4. **Home page product data**
   - Bestsellers (or similar) include entries not in `products.json` (e.g. `marble-petal-vase`, `midnight-bloom-diffuser`) with placeholder `imageSrc` and no `id`, so Add to Cart is disabled on those cards. Either add real products to `products.json` or remove/replace placeholders.

5. **Footer**
   - Two privacy links: “Privacy Policy” (`/privacy`) and “Privacy Policy (Full)” (`/privacy-policy`). Consider consolidating or clarifying labels.

6. **Types**
   - No central `types/` directory; types live in context files, `lib/products.ts`, and inline in API routes. Optional: extract shared types (e.g. `Product`, `CartItem`) for consistency.

## When adding features or fixing bugs

- **New pages/routes:** Prefer App Router under `src/app/`. Use kebab-case for route folders and `*-client.tsx` when a page needs `useSearchParams` or other client-only hooks.
- **New components:** Kebab-case files; named exports; add `"use client"` only if the component uses hooks or browser APIs. Prefer `SafeImage` and `normalizeImageSrc` for product/hero images.
- **New API routes:** Keep secrets in server env (no `NEXT_PUBLIC_*`). Document new env vars in README.md and, if you add it, `.env.example`.
- **Styling:** Use existing Tailwind theme (brand-gold, font-heading, font-body) and globals.css variables; match patterns in ARCHITECTURE.md (radial gradients, rounded-3xl, gold borders, Framer Motion fadeUp).
- **Cart/checkout:** Cart remains client + localStorage unless you introduce a backend; any “order creation” should be explicit (new API + optional DB) and linked to Tap via metadata if you want webhook to update orders.
