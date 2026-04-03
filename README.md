# At Work

Frontend test app built with `React`, `TypeScript`, `Vite`, `React Router`, `React Query`, `React Hook Form`, `Zod`, and `Zustand`.

## Scripts

- `pnpm dev` - run local development server
- `pnpm typecheck` - run TypeScript checks
- `pnpm lint` - run ESLint
- `pnpm build` - typecheck and build production bundle
- `pnpm check` - full validation before deploy
- `pnpm preview` - preview production bundle locally

## Local Run

```bash
pnpm install
pnpm dev
```

## Deploy

The project is prepared for static deployment with SPA route rewrites.

- `Netlify`: `netlify.toml` is included
- `Vercel`: `vercel.json` is included

Recommended pre-deploy check:

```bash
pnpm check
```

Production output is generated into `dist/`.
