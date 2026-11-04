# Milanmela

Live site: [https://milanmela-frontend.vercel.app](https://milanmela-frontend.vercel.app)

Milanmela helps people in Bangladesh discover and organize local community
service events.

## Features

- Browse upcoming community events and view event details without signing in.
- Create an event with a future date, event type, location, and cover image.
- Join events using a signed-in account and view your joined event list.
- Manage events you created, including updating and deleting your own events.
- Filter events by service type, including Cleanup, Plantation, and Donation.
- Sign in with email and password or Google using Better Auth.
- Protect API actions with Better Auth JWT verification.
- Switch between light and dark themes and use responsive pages on mobile.

## Run locally

Install dependencies in both package folders:

```bash
cd client-server
npm install
cd ../backend-server
npm install
```

Configure the client and backend with the same `MONGODB_URI`,
`BETTER_AUTH_URL`, and `BETTER_AUTH_SECRET`. Set `NEXT_PUBLIC_API_URL` in the
client to the backend URL. The client also needs `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` if Google sign-in is enabled.

For production, set `BETTER_AUTH_URL` in both deployments to the frontend's
public origin (for example, `https://milanmela-frontend.vercel.app`), and use
the same `BETTER_AUTH_SECRET` and `MONGODB_URI` in both. Set the frontend's
`NEXT_PUBLIC_API_URL` to the backend's public origin (for example,
`https://milanmela-backend.vercel.app`). Redeploy both projects after changing
these variables, then sign in again.

Start the backend with `node index.js`, then start the client with
`npm run dev` from `client-server`.
