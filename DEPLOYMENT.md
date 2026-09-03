# AWS Deployment

## Recommended architecture

- `frontend`: AWS Amplify Hosting (public Vite site)
- `dashboard`: a second AWS Amplify Hosting app (dashboard Vite site)
- `backend`: AWS App Runner (Express API)
- Database: MongoDB Atlas

Deploy the API first so its public URL is available to the two frontend builds.

## 1. Prepare MongoDB Atlas

1. Create a production database and user.
2. Allow network access from the backend deployment. For an initial deployment, Atlas can allow `0.0.0.0/0`; restrict this later when the App Runner egress strategy is finalized.
3. Keep the connection string private.

## 2. Deploy the backend to App Runner

Create an App Runner service from this repository with:

- Source directory: `backend`
- Runtime: Node.js
- Build command: `npm ci`
- Start command: `npm start`
- Port: `3002` (or the port configured by App Runner)
- Health check path: `/`

Set these App Runner environment variables or secrets:

```text
MONGO_URL=<MongoDB Atlas connection string>
JWT_SECRET=<long random production secret>
FRONTEND_URL=https://<frontend-domain>,https://<dashboard-domain>
```

App Runner supplies `PORT` automatically. The server already reads it.

After deployment, verify:

```text
https://<api-domain>/
```

It should return `Backend is working!`.

## 3. Deploy the public frontend to Amplify

Create an Amplify app connected to this repository and set:

- App root: `frontend`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

Set these build environment variables:

```text
VITE_API_URL=https://<api-domain>
VITE_DASHBOARD_URL=https://<dashboard-domain>
```

Add a rewrite for React Router so direct links such as `/login` work:

```text
Source: /<*>
Target: /index.html
Type: 200 (Rewrite)
```

Attach a custom domain such as `www.example.com` and use that final domain in `FRONTEND_URL`.

## 4. Deploy the dashboard to Amplify

Create a second Amplify app for the same repository:

- App root: `dashboard`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

Set these build environment variables:

```text
VITE_API_URL=https://<api-domain>
VITE_FRONTEND_URL=https://<frontend-domain>
```

Use the same React Router rewrite:

```text
Source: /<*>
Target: /index.html
Type: 200 (Rewrite)
```

Attach a custom domain such as `dashboard.example.com`, then update the backend `FRONTEND_URL` value if the domain changes.

## Local production checks

Run each project from its own directory:

```bash
cd frontend && npm ci && npm run build
cd ../dashboard && npm ci && npm run build
cd ../backend && npm ci && npm start
```

Copy the example environment files before local testing:

- `frontend/.env.example` -> `frontend/.env.local`
- `dashboard/.env.example` -> `dashboard/.env.local`
- `backend/.env.example` -> `backend/.env`

Never commit real `.env` files or production secrets. Rotate any credential that has been exposed outside your secret manager.
