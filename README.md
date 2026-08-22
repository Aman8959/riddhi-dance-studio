# Riddhi Dance Studio

Riddhi Dance Studio is a responsive dance academy website for students and parents in Satna, Madhya Pradesh. It supports class discovery, timetable and pricing views, trial bookings, registrations, enquiries, reviews, media galleries, and WhatsApp contact flows.

## Features

- Home page with studio highlights, classes, styles, trainers, batches, events, pricing, and testimonials
- Responsive navigation with mobile menu and trial call to action
- Searchable and level-filtered classes page
- Timetable, events, pricing, gallery, videos, FAQ, trainers, and about pages
- Trial booking and registration forms with validation and required Terms/Privacy consent
- Contact form with phone, email, WhatsApp, and map links
- Privacy Policy and Terms of Service pages
- Admin login backed by Google Apps Script
- Admin submission search and status updates
- Admin management for classes, membership plans, events, and timetable batches
- Admin media publishing for images, posters, YouTube videos, and uploaded video files
- Public gallery and video pages that load backend media when configured

## Tech Stack

- React 19 and TypeScript
- Vite and TanStack Start
- TanStack Router
- Tailwind CSS v4
- Radix UI primitives
- Zod validation
- Google Apps Script, Google Sheets, and Google Drive for the optional backend

## Project Structure

```text
src/
  assets/                 Images and media assets
  components/             Shared site and UI components
  config/                 Studio and navigation configuration
  data/                   Default classes, styles, trainers, events, and media
  hooks/                  Shared React hooks
  lib/                    Backend submission and utility clients
  routes/                 TanStack file-based routes
backend/
  google-apps-script/     Google Apps Script web app backend
public/                   Robots and sitemap files
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Available scripts:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create the production build
npm run preview   # Preview the production server output
npm run lint      # Run ESLint
npm run format    # Format the project with Prettier
```

## Backend Configuration

The forms and managed content use the URL in `.env`:

```env
VITE_FORMS_API_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Deploy [Code.gs](backend/google-apps-script/Code.gs) as a Google Apps Script Web App with:

- Execute as: the deployment owner
- Who has access: anyone who can access the site

Configure these Script Properties in Apps Script:

- `SHEET_ID`: Google Spreadsheet ID
- `MEDIA_FOLDER_ID`: Google Drive folder ID for uploaded media
- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD`: admin login password

After backend changes, deploy a new Web App version. The backend creates these sheets when needed:

- `Submissions`
- `Media`
- `Content_classes`
- `Content_plans`
- `Content_events`
- `Content_batches`

Run `authorizeServices` once from the Apps Script editor to grant Spreadsheet and Drive permissions.

## Admin Dashboard

Open `/admin` and sign in with the configured admin credentials. The dashboard can:

- Search submissions and change their status
- Add, edit, and delete classes, plans, events, and timetable batches
- Upload images and posters
- Publish YouTube links or uploaded video files
- Delete published media

Admin credentials and backend secrets must remain in Apps Script properties. They should not be committed to the frontend repository.

## Content Notes

Default content lives in [src/data/studio.ts](src/data/studio.ts). Backend-managed content overrides the defaults when a configured API returns data. Replace the seeded video IDs in that file with the studio's real YouTube IDs before publishing the default video catalogue; the current IDs are sample placeholders.

The configured studio address and SEO metadata use Satna, Madhya Pradesh. Update [src/config/site.ts](src/config/site.ts) when the studio's phone, address, hours, social links, or other business details change.

## Routes

`/`, `/about`, `/classes`, `/styles`, `/trainers`, `/timetable`, `/pricing`, `/events`, `/gallery`, `/videos`, `/testimonials`, `/faq`, `/contact`, `/trial`, `/register`, `/privacy-policy`, `/terms`, and `/admin`.
