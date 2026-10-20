# TODO — Holiday Villa Thassos

Списък с нещата, които трябва да се настроят, за да тръгне сайтът напълно (база данни, админ, Booking sync).

---

## 1. Supabase проект

- [ ] Създай проект в [Supabase](https://supabase.com/)
- [ ] Копирай `.env.example` → `.env`
- [ ] Попълни:
  - `DATABASE_URL` — Connection string (Transaction / pooler, порт 6543)
  - `DIRECT_URL` — Session mode (порт 5432), ако е нужен за миграции
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (само за сървър, не го качвай в Git)

```bash
cp .env.example .env
npx prisma db push
npx prisma generate
```

---

## 2. Админ панел

- [ ] В Supabase → **Authentication → Users → Add user**
- [ ] Създай потребител с email + парола (само за теб)
- [ ] Влез на `/admin/login`
- [ ] Провери списъка със запитвания на `/admin`

---

## 3. Booking.com → блокиране на дати (еднопосочно)

Резервация в Booking блокира датите в календара на сайта.  
**Обратното (сайт → Booking) не се прави.**

### Откъде се взема `BOOKING_ICAL_URLS`

1. Влез в [Booking Extranet](https://admin.booking.com/)
2. Отвори **Rates & Availability** (Цени и наличност)
3. Намери **Sync calendars** / **Синхронизиране на календари**
4. За всяка стая/тип избери **Export calendar** (експорт към друг сайт)
5. Копирай iCal URL адреса(ите)
6. В `.env`:

```bash
BOOKING_ICAL_URLS="https://URL-стая-1,https://URL-стая-2"
CRON_SECRET="дълъг-случаен-секрет"
```

Ако има няколко единици — сложи всички export URL-и, разделени със запетая.

### След като URL-ите са в `.env`

```bash
# синхронизация локално
curl "http://localhost:3001/api/cron/sync-booking?secret=ТВОЯТ_CRON_SECRET"
```

- [ ] Провери `/en/reservation` — заетите дати трябва да са сиви
- [ ] На Vercel cron-ът в `vercel.json` тегли календара всеки час (нужни са същите env vars + `CRON_SECRET`)

> Ако в Extranet няма „Sync calendars“, пиши на Booking Partner Support или провери дали акаунтът позволява iCal export.

---

## 4. Стартиране локално

```bash
npm install
npm run dev
```

- Публичен сайт: `http://localhost:3000/en` (или портът, който показва Next)
- Админ: `http://localhost:3000/admin`

---

## 5. Deploy (напр. Vercel)

- [ ] Свържи репото към Vercel
- [ ] Добави всички env vars от `.env` (без да commit-ваш `.env`)
- [ ] След deploy пусни веднъж sync:
  `https://ТВОЯТ-ДОМЕЙН/api/cron/sync-booking`  
  (Vercel Cron изпраща `Authorization: Bearer CRON_SECRET`)
- [ ] Провери reservation формата и admin login в production

---

## 6. По желание (по-късно)

- [ ] Channel manager (SiteMinder, Cloudbeds и т.н.), ако искаш **двупосочна** sync със Booking
- [ ] Email известие при ново запитване (Resend / Supabase)
- [ ] Реални цени в таблицата Season 2026 вместо „Ask for price“

---

## Бърза справка — env vars

| Променлива | За какво е |
|------------|------------|
| `DATABASE_URL` | Prisma → Postgres |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth + клиент |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth (публичен ключ) |
| `SUPABASE_SERVICE_ROLE_KEY` | Сървърни операции (тайна) |
| `BOOKING_ICAL_URLS` | Export iCal от Booking Extranet |
| `CRON_SECRET` | Защита на `/api/cron/sync-booking` |
