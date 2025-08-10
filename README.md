# [StockWorld](https://stock-world-1.web.app/)

Inventory management for computer components/products with protected routes, authentication, and a modern React UI.

## Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS + DaisyUI
- React Router v6
- TanStack Query (React Query)
- Firebase Auth + react-firebase-hooks
- Axios, React Hook Form + Zod
- AOS animations, react-loader-spinner
- Carousel: react-slick (Embla included)

## Key Features
- Protected pages: `Manage Inventory`, `Add Product`, `My Products`
- Email/password and Google login via Firebase
- Lazy-loaded routes and dashboard views
- Responsive UI with animations

## Quick Start
1) Install dependencies
```bash
pnpm install
```

2) Create `.env.local` in the project root:
```bash
VITE_API_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3) Run the app
```bash
pnpm dev
```

## Scripts
- `pnpm dev`: start dev server
- `pnpm build`: type-check and build for production
- `pnpm preview`: preview production build
- `pnpm lint`: run ESLint
- `pnpm type-check`: run TypeScript checks

## Deployment
- Hosted on Firebase. For Vite builds, ensure hosting `public` points to `dist`.

Live: https://stock-world-1.web.app/
