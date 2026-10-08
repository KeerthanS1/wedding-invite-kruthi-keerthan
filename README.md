# Kruthi & Keerthan: wedding invitation

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## Where things live

| What | Where |
| --- | --- |
| Names, dates, events, venue, all copy | `src/data/wedding.ts` |
| Photo configuration | `src/data/photos.ts` |
| Photos | `public/images/**` (see `public/images/README.md`) |
| Colour palette & fonts | `src/app/globals.css` (`@theme`) |
| Kolam, pillars, lamps, borders | `src/components/decorative/` |

## Adding photographs

Drop images into `public/images/pre-wedding/{traditional,street,lake,pottery}/`,
`public/images/wedding/` and (optionally) `public/images/hero/`. Name them `01.jpg`, `02.jpg` …
They are picked up automatically, in order. The first photo in each chapter is its large lead image.
Until real photos exist, soft placeholders are shown. For custom order, alt text or crop focus, list files in
`src/data/photos.ts`.

## Deployment

Not deployed yet. The app is a fully static Next.js site and runs on Vercel's free Hobby plan with no extra setup.
