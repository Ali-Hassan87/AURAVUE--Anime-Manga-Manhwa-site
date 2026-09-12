# AURAVUE — polished build

A premium Next.js App Router discovery site for anime, manga and manhwa.

## What was fixed
- Removed all `@/` aliases; project imports now use relative paths.
- Navbar/footer brand mark is the same SVG used as the favicon.
- Kitsu-backed anime catalogue/search.
- MangaDex-backed manga/manhwa catalogue, search and chapter discovery.
- Anime detail enrichment through Jikan: trailers, trailer embeds, screenshots, genres and MAL link when available.
- Persistent browser collection with a dedicated `/collection` page.
- Back/Home navigation on title dossiers and error states.
- Responsive mobile navigation, grids, dossier layouts, screenshots, trailer and chapter sections.
- Server-side API proxies keep provider URLs/keys out of client code.
- API failures are isolated so one provider failure does not blank the whole home page.

## Environment
Copy `.env.example` to `.env.local`:

```env
KITSU_API_URL=https://kitsu.io/api/edge
MANGADEX_API_URL=https://api.mangadex.org
TMDB_API_KEY=
```

TMDB remains available for future movie/TV expansion; this build's core anime/manga experience does not require a TMDB key.

## Run
```bash
npm install
npm run dev
```

Production verification:
```bash
npm run build
npm start
```

The app is a discovery/metadata interface. It does not host or re-distribute copyrighted anime or manga files.
