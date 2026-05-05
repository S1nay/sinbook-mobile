# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:

- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

React Native social media mobile app (Russian-language docs). Authoritative references:

- [ARCHITECTURE_RULES.md](./documentation/ARCHITECTURE_RULES.md) — mandatory rules for new code

## Tech Stack

- **React Native** 0.79.2 + **React** 19 + **TypeScript** 5 (strict)
- **State:** MobX 6 + MobX React Lite
- **DI:** Inversify 7 (decorators, reflect-metadata)
- **HTTP:** Axios 1.9 with interceptors
- **WebSocket:** Socket.IO Client 4.8
- **Forms:** React Hook Form + Zod
- **Storage:** React Native MMKV (encrypted, single-process)
- **Navigation:** React Navigation 7 (bottom-tabs, native-stack)
- **UI:** Reanimated 4, Gesture Handler, @gorhom/bottom-sheet, react-native-toast-message

## Commands

```bash
npm start              # Start Metro (with cache reset)
npm run android        # Run on Android
npm run ios            # Run on iOS (after npm run pod:install if native deps changed)
npm run lint           # ESLint
npm run tsc:check      # TypeScript type check
npm run gradlew:clean  # Clean Android build
npm run pod:install    # Install iOS CocoaPods
```

There are no npm test scripts (a `jest.config.js` exists but no runner is wired up). Don't fabricate a test command — confirm with the user before adding one.

## Architecture

Clean Architecture with strict layer rules. Dependencies point inward only:

```
Presentation  →  Domain  ←  Data
                    ↑
              Infrastructure
```

```
src/
├── core/           # DI container, interceptors, providers, hooks, helpers
├── domain/         # Models, DTOs, repository interfaces, use cases (framework-free)
├── data/           # API clients, repository implementations, MobX stores, storages
├── infrastructure/ # AxiosHttpClient, SocketManager, MMKVStorage, NavigationService
├── navigation/     # React Navigation setup, route name enums, param types
└── presentation/   # screens/ (view + view-model), components/, ui/, shared/, _layouts/
```

**Forbidden imports:** Domain → Data/Presentation/Infrastructure; Data → Presentation; Infrastructure → Data.

## Mandatory Rules (do not violate)

These are the rules most likely to be broken if you don't think about them up front. Full list in `ARCHITECTURE_RULES.md`.

### Interface-first

Every service, repository, store, API client, and ViewModel must have an interface defined before its implementation.

### DI identifiers — Symbols only, two patterns

1. **Domain interfaces** — symbol attached to a namespace named `$`:
   ```typescript
   interface IUserRepository { ... }
   namespace IUserRepository { export const $ = Symbol('IUserRepository'); }
   ```
   Inject as `@inject(IUserRepository.$)`.
2. **Infrastructure** without a namespace — exported constants in `src/core/di/identifiers.ts` (e.g. `SinbookHttpClient`, `MMKVStorage`).

Never use string identifiers. Don't change existing identifier symbols without coordinating — they're load-bearing across `container.ts`.

### Container registration (`src/core/di/container.ts`)

- All bindings are **singleton scope**.
- Order: API clients → Stores → MMKV Storage → HTTP Client → Internal Storages → Navigation Service → Socket Manager → Repositories → Use Cases.
- Use Cases registered via `combineUseCases(container)`, never inline.
- **ViewModels are bound in the screen's `index.tsx`** via a child container — never in the root container.

### Screen folder structure (MVVM, one per screen)

```
xxx-screen/
├── index.tsx                   # DI setup only — child container + bind VM
├── view/
│   ├── XxxView.tsx             # observer() React component, no business logic
│   └── styles.ts
├── view-model/
│   ├── IXxxViewModel.ts        # interface + $ symbol
│   └── XxxViewModel.ts         # @injectable() MobX class
└── components/                 # screen-specific components (optional)
```

- ViewModel: always `makeAutoObservable(this, {}, { autoBind: true })` in the constructor; private fields exposed via getters; **inject use cases only** (never repositories or APIs).
- View: wrapped in `observer()`; gets VM via `useDIContainer().get<I>(I.$)`; no state, no business logic.

### Repositories

- Inject store + storage + API.
- **Always** wrap API calls with `getDataFromHttpResponse` / `getErrorFromHttpResponse` helpers (`src/core/helpers`).
- No business logic; no caching decisions (those belong to use cases).

### Use cases

- One class = one operation, with an `execute(params)` method.
- Inject repositories only — never API clients or stores directly.
- Caching strategy lives here: in-memory store → MMKV storage → API; for paginated lists merge with `mergeArraysWithoutDuplicates`; `isRefetching: true` skips cache.
- Group and register via `combineUseCases.ts`.

### Stores

- Dumb in-memory containers — getter + setter only, no async, no injection.
- Session state only (resets on app restart). Persistent state belongs in MMKV via storage classes.

### API clients

- Thin wrappers, one method per endpoint.
- Return raw `Promise<IHttpResponse<T>>` — never unwrap or handle errors.
- Inject `SinbookHttpClient` (the identifier), not Axios directly.
- Use relative paths (`/auth/sign-in`) — never hardcode the host.

### Error handling chain

API → raw `IHttpResponse<T>` → Repository wraps with `getDataFromHttpResponse` / `getErrorFromHttpResponse` → Use case may rethrow/transform → ViewModel catches and surfaces via `Toast.show()`. Never silently swallow errors.

### Naming

`IXxx` interfaces; `IXxx.$` DI symbols; `XxxUseCase`, `XxxViewModel`, `XxxRepository`, `XxxApi`, `XxxStore`; screen folders `kebab-case` ending in `-screen`.

### Imports

Always use path aliases between layers — never relative paths across layer boundaries.

Aliases (from `tsconfig.json`): `@core`, `@domain`, `@data`, `@infrastructure`, `@shared` (= `presentation/shared`), `@ui` (= `presentation/ui`), `@components`, `@screens`, `@layouts`.

### Code style

- 100-char line limit; ESLint + Prettier enforce import ordering.
- TypeScript strict — avoid `any` and `!` non-null assertions.
- No `console.log` — only `console.warn` / `console.error`.
- Async ViewModel methods must manage `_isLoading` (typically in a `try`/`finally`).
- Styles live in a sibling `styles.ts` via `StyleSheet.create()`.

## Runtime configuration

- HTTP base URL and storage keys come from `react-native-config` via `src/core/di/implementations.ts` (`EnvConfig.API_URL`, `EnvConfig.STORAGE_ID`, `EnvConfig.STORAGE_ENCRYPTION_KEY`). Configure environments through `.env` — never commit secrets.
- Auth tokens (`ACCESS_TOKEN` / `REFRESH_TOKEN`) live in MMKV. The Axios response interceptor handles 401 → refresh → retry; on refresh failure it clears tokens and navigates to Auth.
- Three Socket.IO connections registered at app start: `CHAT`, `CHATS`, `NOTIFICATIONS` (via `SocketManager`).
- File uploads use `multipart/form-data` (see `src/data/api/file/FileApi.ts`).

## Adding a new feature — quick checklist

- **New API endpoint:** add a method to the relevant `XxxApi` (or create one in `src/data/api/xxx/`), export from `src/data/api/index.ts`, bind in `container.ts` if new, expose via the repository.
- **New repository method:** update interface in `src/domain/repositories/`, implement in `src/data/repositories/`, wrap API calls with the response helpers.
- **New use case:** create in `src/domain/use-cases/<group>/`, register in `combineUseCases.ts` under the matching `XxxUseCases.$Foo` symbol.
- **New screen:** follow the screen folder structure above; bind the ViewModel in the screen's `index.tsx` child container; add the route name enum and `ParamList` typing under `src/navigation/`.
