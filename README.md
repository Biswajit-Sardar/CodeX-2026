# ResQ360 — AI-Powered Disaster Management & Emergency Response Platform

Smart India Hackathon 2026 · Problem Statement ID **26206** (AICTE — Student Innovation, Disaster Management)

A working front-end prototype matching the "Technical Feasibility – React Based" diagram: React.js
app with live geolocation SOS, a map, shelter/hospital lookup, a rescue-team directory, and a
damage-report + recovery tracker — structured around the **Before / During / After** disaster
timeline used across your idea slides.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
resq360/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                # React entry point, router + AreaProvider setup
│   ├── App.jsx                  # Layout shell: sidebar + routed pages + SOS button
│   ├── index.css                # Design tokens (colors, type) + all shared styles
│   ├── context/
│   │   └── AreaContext.jsx      # "My area" state, persisted to localStorage
│   ├── data/
│   │   └── mockData.js          # Stand-ins for SOS feed / shelters / rescue teams
│   ├── utils/
│   │   ├── geocode.js           # Free place search via OpenStreetMap Nominatim
│   │   └── mockArea.js          # Deterministic mock risk/weather snapshot per place name
│   ├── components/
│   │   ├── Sidebar.jsx          # Left navigation
│   │   ├── HomeAreaWeather.jsx  # "My area" weather widget in the sidebar
│   │   ├── AreaSearch.jsx       # Reusable place-search input (map, dashboard, sidebar)
│   │   └── SOSButton.jsx        # Floating SOS trigger, uses browser Geolocation API
│   └── pages/
│       ├── Dashboard.jsx        # Risk/weather for your area, or any searched/clicked area
│       ├── LiveMap.jsx          # Leaflet map, your location + area search + SOS markers
│       ├── Shelters.jsx         # Nearby shelters & hospitals list
│       ├── RescueTeams.jsx      # Government / NGO / volunteer directory
│       └── ReportRecovery.jsx   # Damage report form + recent reports list
```

## New in this version

- **Search any area on the map** — the "Jump to an area" box on the Live Map page
  flies the map to any place you search (OpenStreetMap Nominatim, no API key needed).
- **"My area" weather in the sidebar** — always visible, click the pencil icon to
  change your home area. Saved in the browser (`localStorage`) so it's remembered
  next time you open the app.
- **Search any area from the Dashboard** — the "Check another area" box takes you to
  `/area/<place name>`, which shows the same dashboard layout but with that place's
  own (deterministically mocked) risk score, weather, and matching SOS signals.
- **Click through from the Live SOS feed** — clicking a location in the SOS table
  (e.g. "Nimpura, Kharagpur") opens that area's dashboard directly.
- **Visual refresh** — sidebar gradient + accent nav states, top-accent stat cards,
  a single pulsing motion on the SOS button, hover elevation on interactive cards/rows,
  and a shared design-token system across every page.

## What's real vs. mocked (be upfront about this to judges)

| Feature | This prototype | Production plan |
|---|---|---|
| Your live location | **Real** — browser Geolocation API | same |
| Map rendering | **Real** — OpenStreetMap via Leaflet (no key needed) | Google Maps API for richer places data |
| Risk prediction / weather | Mocked in `src/data/mockData.js` | Disaster Data API + Weather API (functions are already shaped like `fetch()` calls — swap the body) |
| SOS feed / rescue dispatch | Mocked, static list | Backend + DB + notification service (websocket for live updates) |
| Damage reports | Stored in React state only, resets on reload | POST to backend, persisted in DB |

## Swapping in real APIs later

Every function in `src/data/mockData.js` has a comment showing the equivalent real endpoint,
e.g.:

```js
// Real version: fetch(`${WEATHER_API_BASE}/alerts?lat=..&lng=..`)
export function getWeatherAlerts() { ... }
```

Create a `.env` file (already gitignored) with your keys, e.g.:

```
VITE_WEATHER_API_KEY=...
VITE_GOOGLE_MAPS_API_KEY=...
VITE_DISASTER_DATA_API_KEY=...
```

and read them in code via `import.meta.env.VITE_WEATHER_API_KEY`.

## Suggested demo flow for judges

1. **Dashboard** — show the AI risk score + weather alerts (BEFORE phase).
2. Click the floating **SOS** button — shows real geolocation being captured (DURING phase).
3. **Live Map** — your location plotted alongside active SOS signals nearby.
4. **Shelters & Hospitals** — nearest safe points with live "get directions" links.
5. **Rescue Teams** — who's being coordinated and how to reach them.
6. **Report & Recovery** — file a damage report, show the AFTER-phase recovery list.
