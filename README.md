# Le Cadeau

Luxury florist e-commerce site: cinematic bouquets, hat boxes, candles, and indoor plants. Forest green and gold branding; Mother's Day seasonal theme; cart, checkout with Tap Payments, and post-payment webhooks (Formspree + Twilio WhatsApp).

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4, custom theme (brand-gold, Playfair/DM Sans)
- **Motion:** Framer Motion
- **Icons:** Lucide React
- **Payments:** Tap Payments (charge creation, redirect, webhook)
- **Integrations:** Formspree (order email), Twilio (WhatsApp order alert)

## Setup

```bash
# Install
npm install

# Run dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in the project root. Required for full functionality:

| Variable | Used by | Purpose |
|----------|---------|--------|
| `TAP_SECRET_KEY` | `/api/checkout`, `/api/tap/verify` | Tap Payments server API key |
| `FORMSPREE_ENDPOINT` | `/api/webhooks/tap` | Formspree form URL for order notification email |
| `TWILIO_ACCOUNT_SID` | `/api/webhooks/tap` | Twilio account |
| `TWILIO_AUTH_TOKEN` | `/api/webhooks/tap` | Twilio auth |
| `OWNER_PHONE_NUMBER` | `/api/webhooks/tap` | WhatsApp destination for order alerts |
| `TWILIO_WHATSAPP_FROM` | `/api/webhooks/tap` | Twilio WhatsApp sender (e.g. `whatsapp:+1234567890`) |

Without these, checkout creation and webhook actions (email/WhatsApp) will fail or be skipped.

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – ESLint

## Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) – structure, data flow, state, components
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) – current state, to-dos, technical debt
