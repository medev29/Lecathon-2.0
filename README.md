# Lecathon 2.0

Landing page and CMS for the Robotics Club of Lumbini Engineering Management & Science College hackathon at LEMSC.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. In [Neon](https://neon.tech), create a database and run `db/schema.sql` in the SQL editor.

4. Set in `.env.local`:

- `DATABASE_URL` — Neon connection string
- `ADMIN_PASSWORD` — password for `/admin`

Optional — **registration email** (works on Vercel **without a custom domain**):

Use a **Gmail App Password** (recommended for hackathon clubs):

1. Turn on [2-Step Verification](https://myaccount.google.com/security) for the club Gmail.
2. Create an [App password](https://myaccount.google.com/apppasswords) (Mail).
3. Add to `.env.local` (and Vercel → Settings → Environment Variables):

```env
SMTP_USER=yourclub@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=Lecathon <yourclub@gmail.com>
ADMIN_NOTIFICATION_EMAIL=yourclub@gmail.com
```

- Organizers get an email on each registration.
- The team leader gets a confirmation email.
- `SEND_REGISTRATION_CONFIRMATION=false` disables the leader email.

**Deploy on Vercel:** push to GitHub, import the repo, add the same env vars, use the free `*.vercel.app` URL — no domain purchase required.

Alternative: [Resend](https://resend.com) with `RESEND_API_KEY` — needs a verified domain to email participants; test mode only sends to your own Resend email.

5. Start the dev server:

```bash
npm run dev
```

6. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login), sign in, then click **Seed default content** on the overview page (first time only).

## Admin CMS

| URL | Purpose |
|-----|---------|
| `/admin` | Dashboard overview |
| `/admin/registrations` | View teams, download CSV |
| `/admin/sponsors` | Add / delete sponsors |
| `/admin/themes` | Problem themes |
| `/admin/schedule` | Lecaweek & hackathon schedule |
| `/admin/faqs` | FAQ entries |
| `/admin/settings` | Event date, venue, registration controls, social links, email test |

Public site at `/` reads content from the database when CMS tables are populated.

### Registration controls (Admin → Site Settings)

- **Registration open** — toggle sign-ups on/off
- **Deadline** — auto-close after an ISO date/time
- **Max teams** — cap registrations (`0` = unlimited)
- **Closed message** — shown on the site when registration is closed

Duplicate team names and emails are blocked automatically.

### After first deploy

1. Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL (for SEO / share previews).
2. Run the new `security_events` section in `db/schema.sql` in Neon (rate limiting).
3. In admin settings, add social links and test email.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
- `npm test` — registration validation tests
