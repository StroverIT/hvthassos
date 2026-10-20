# Holiday Villa Thassos

Next.js redesign of [hvthassos.com](https://www.hvthassos.com/) — multilingual marketing site, lazy-loaded 3D tour, calendar inquiry form, and an admin panel for inquiries (Supabase Auth + Prisma).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- next-intl — EN / BG / GR / RU
- Supabase PostgreSQL + Prisma
- Supabase Auth for `/admin`
- react-day-picker for reservation dates
- Embedded 3D tour from [be-there.eu](https://be-there.eu/index.php/vr/holiday-villa-thasos/fullscreen-nobrand/?embedded) (click-to-start + IntersectionObserver)

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env` and fill in values from your Supabase project:

```bash
cp .env.example .env
```

| Variable | Where to find it |
|----------|------------------|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string (Transaction / pooler, port 6543) |
| `DIRECT_URL` | Same, Session mode (port 5432) — optional for migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role (keep secret) |
| `BOOKING_ICAL_URLS` | Booking Extranet → Rates & Availability → Sync calendars → export URL(s), comma-separated |
| `CRON_SECRET` | Shared secret for `/api/cron/sync-booking` (Vercel Cron uses `Authorization: Bearer …`) |

Also set `DATABASE_URL` in `prisma7.config.ts` via `.env` (already wired).

### Booking.com → site (one-way)

Reservations made on Booking.com block those dates on `/reservation`. Nothing is pushed back to Booking.

1. In Booking Extranet open **Rates & Availability → Sync calendars** and copy each room’s **export** iCal URL.
2. Put them in `BOOKING_ICAL_URLS` (comma-separated).
3. Run sync:

```bash
curl "http://localhost:3000/api/cron/sync-booking?secret=$CRON_SECRET"
```

On Vercel, `vercel.json` runs this hourly. After `prisma db push`, blocked nights appear grey in the inquiry calendar.

### 3. Database

```bash
npx prisma generate
npx prisma db push
```

Or with migrations:

```bash
npx prisma migrate dev --name init
```

### 4. Admin user

In Supabase Dashboard → Authentication → Users → Add user:

- Email + password for yourself
- Confirm the user

Sign in at `/admin/login`.

### 5. Run

```bash
npm run dev
```

- Site: [http://localhost:3000/en](http://localhost:3000/en)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Routes

| Path | Description |
|------|-------------|
| `/[locale]` | Home |
| `/[locale]/accommodation` | Studios & apartments |
| `/[locale]/services` | Services |
| `/[locale]/reservation` | Prices + inquiry calendar |
| `/[locale]/villa-policy` | Villa policy |
| `/[locale]/gallery` | Photo gallery |
| `/[locale]/virtual-tour` | Lazy 3D tour |
| `/[locale]/thassos` | Island info |
| `/[locale]/location` | How to find us |
| `/[locale]/contact` | Contact form |
| `/admin` | Inquiries list (auth) |
| `/admin/inquiries/[id]` | Full inquiry detail |

Locales: `en`, `bg`, `gr`, `ru`.

## Images

Photos are stored under `public/images/` (downloaded from the live site). Hero, gallery, and accommodation folders.

## Notes

- Inquiries are requests only — no online payment.
- Season 2026 price cells show “Ask for price” as on the current site.
- The 3D iframe loads only after the section is in view and the user clicks **Start tour**.
