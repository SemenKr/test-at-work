# At Work Test Task

Frontend test assignment implemented with `React`, `TypeScript`, `Vite`, `React Router`, `React Query`, `React Hook Form`, `Zod`, `Zustand`, and `SCSS`.

## Demo

- Production: https://test-at-work-kijo1qgr0-semenkrs-projects.vercel.app/
- Repository: https://github.com/SemenKr/test-at-work

## Implemented

- users list loaded from `https://jsonplaceholder.typicode.com/users`
- active and archived sections on the main page
- actions for each user:
  - edit
  - archive
  - hide
  - restore from archive
- user edit page with validation
- success modal after save
- local persistence of edited user data through `zustand`
- responsive UI for desktop and mobile layouts
- skeleton loading states instead of plain text loading
- Vercel-ready SPA deploy configuration

## Main Stack

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `@tanstack/react-query`
- `react-hook-form`
- `zod`
- `zustand`
- `sass`

## Project Scripts

- `pnpm dev` - start local dev server
- `pnpm typecheck` - run TypeScript checks
- `pnpm lint` - run ESLint
- `pnpm build` - typecheck and build production bundle
- `pnpm check` - full validation (`lint + build`)
- `pnpm preview` - preview production build locally

## Local Run

```bash
pnpm install
pnpm dev
```

## Review Checklist

To quickly verify the assignment:

1. Open the main page and wait for skeletons to resolve into user cards.
2. Open card menu:
   - `Редактировать` opens edit page
   - `Архивировать` moves card to archive
   - `Скрыть` removes card from visible list
3. Archive section is hidden when empty.
4. On edit page:
   - form is prefilled from API/local state
   - validation works
   - save opens success modal
   - after closing modal or timeout, app returns to main page
5. Edited user data is reflected in:
   - main page cards
   - edit page
   - header avatar/name area

## Deploy Notes

The project is prepared for static SPA hosting.

- `vercel.json` is configured for Vercel rewrites
- `.vercelignore` excludes unnecessary files from deployment
- `netlify.toml` is also included, though the active deploy target is Vercel

Recommended pre-deploy check:

```bash
pnpm check
```
