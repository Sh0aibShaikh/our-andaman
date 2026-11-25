# Our Andaman

Calm offline honeymoon companion for one iPhone: what to do today, what to carry, and ferry warnings for Port Blair → Havelock → Neil (30 Dec 2026 – 5 Jan 2027).

No backend, login, analytics, maps, or weather. Everything is bundled and saved in `localStorage`.

**Rename the app** by editing `TRIP.name` / `TRIP.shortName` in `src/data/tripData.js`, plus the matching strings in `vite.config.js` and `index.html`.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL in a browser (Chrome or Safari).

## Build & preview (offline check)

```bash
npm run build
npm run preview
```

1. Load the preview URL once online.
2. Open DevTools → Network → Offline (or enable airplane mode on the phone).
3. Reload and walk through all five tabs. The app should keep working.

## Tests

```bash
npm test
```

Reminder rules (ferry nights/mornings, Baratang, scuba, etc.) are covered in `src/lib/reminders.test.js`.

## Deploy on Vercel (static Vite)

1. Push this repo to GitHub (or import the folder in Vercel).
2. New Project → Framework Preset **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

No serverless functions are required.

## Install on iPhone

1. Open the deployed site in **Safari** (not Chrome).
2. Tap **Share** → **Add to Home Screen**.
3. Open from the home screen (standalone). Safe-area padding respects the notch/home indicator.

## Test date switch

Tap the **Andaman Trip** title five times to open a date picker. Use it to preview every day from ~1 Dec 2026 to 10 Jan 2027. **Use real date** clears the override.

## Edit trip content

All copy, days, checklist, verify items, activities, contacts, and default times live in:

`src/data/tripData.js`

## Backup

**More → Export backup** downloads JSON of all `andaman:` localStorage keys. Import restores them. Do not store Aadhaar numbers, ID scans, or bank details in notes.
