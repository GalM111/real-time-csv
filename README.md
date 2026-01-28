# Real Time CVS

## Overview
Real Time CVS is a React + Vite front-end for monitoring CSV ingestion jobs exposed by a backend queue. Users can upload CSV files, trigger server-side processing, and manually refresh job status (or enable short polling) to track success/failure metrics in near real time.

## Features
- Material UI dashboard highlighting total rows processed, success/failure counts, and job metadata.
- CSV upload form with optimistic toast feedback and graceful error handling.
- Jobs table with progress bars, expandable error details, and manual refresh controls.
- Optional auto-refresh by passing `{ pollMs }` to the `useJobs` hook for live updates without manual clicks.

## Tech Stack
- React 19 + TypeScript, bootstrapped with Vite 7.
- Material UI 7 for layout, theming, and icons.
- Fetch-based API client targeting `/api/jobs` endpoints defined by your backend.

## Getting Started
1. Install dependencies: `npm install`
2. Configure the API base URL in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:4000
   ```
3. Run the app locally: `npm run dev`
4. Build for production: `npm run build`
5. Preview the production bundle: `npm run preview`

## Expected API Contract
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobs` | GET | Returns an array of job records sorted by `createdAt`.
| `/api/jobs/:id` | GET | Returns a single job with detailed stats.
| `/api/jobs/upload` | POST | Accepts multipart form data (field name `file`) and schedules processing. Returns `{ jobId }`.
| `/api/jobs/:id/error-report` | GET | (Optional) Streams a downloadable error report blob.

Each job record should match `src/types/job.ts` and include progress counts plus an optional `errors` array. The frontend sorts jobs newest-first and determines “live” badges when any job status is `pending` or `processing`.

## Customization Tips
- Adjust poll frequency by editing `useJobs({ pollMs })` in `src/App.tsx` (disabled by default to avoid unnecessary backend load).
- Tailor Material UI theming or card layout via `src/App.css` and `src/components`.
- Extend `JobErrors` to show richer row-level context or link to downloadable reports.

## Folder Highlights
- `src/components/UploadForm.tsx`: handles client-side CSV selection and POST upload flow.
- `src/components/JobsTable.tsx`: renders progress bars, metrics, and expandable error stacks.
- `src/hooks/useJobs.ts`: encapsulates fetch, error, and polling logic.
- `src/api/*.ts`: thin wrappers around the backend REST contract.

## Future Enhancements
- Add websocket-based push updates instead of polling.
- Stream CSV validation feedback in real time while processing.
- Provide per-row error CSV export directly in the table.
