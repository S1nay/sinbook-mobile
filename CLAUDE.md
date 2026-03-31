# sinbook-mobile

React Native social media mobile app.

## Tech Stack

- **React Native** 0.79.2 + **React** 19 + **TypeScript** 5 (strict)
- **State:** MobX 6 + MobX React Lite
- **DI:** Inversify 7 (decorators, reflect-metadata)
- **HTTP:** Axios 1.9 with interceptors
- **WebSocket:** Socket.IO Client 4.8
- **Forms:** React Hook Form + Zod
- **Storage:** React Native MMKV (encrypted)
- **Navigation:** React Navigation 7 (bottom-tabs, native-stack)
- **UI:** Reanimated 4, Gesture Handler, @gorhom/bottom-sheet, react-native-toast-message

## Commands

```bash
npm start              # Start Metro (with cache reset)
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run lint           # ESLint
npm run tsc:check      # TypeScript type check
npm run gradlew:clean  # Clean Android build
npm run pod:install    # Install iOS CocoaPods
```

## Architecture

Clean Architecture with 4 layers:

```
src/
├── core/           # DI container, helpers, interceptors, providers
├── data/           # API clients, repository implementations, MobX stores
├── domain/         # Models, DTOs, repository interfaces, use cases
├── infrastructure/ # AxiosHttpClient, SocketManager, MMKVStorage, NavigationService
├── navigation/     # React Navigation setup, route names/params
└── presentation/   # Screens, components, UI config
```

### Key Patterns

- **DI (Inversify):** All services registered in `src/core/di/container.ts`, identified by symbols in `identifiers.ts`
- **Repository Pattern:** Interfaces in `domain/repositories/`, implementations in `data/repositories/`
- **Use Cases:** Business logic in `domain/use-cases/`, registered via `combineUseCases.ts`
- **Screens:** Each screen has `view/` (React component) + `view-model/` (MobX ViewModel)
- **Stores:** `data/store/` — UserStore, PostStore (MobX observables)
- **Interceptors:** `core/interceptors/` — auth token injection, 401 handling, error normalization

### Path Aliases (tsconfig)

`@data`, `@domain`, `@infrastructure`, `@core`, `@shared`, `@ui`, `@components`, `@screens`, `@layouts`

## Code Style

- ESLint + Prettier, 100-char line limit
- No `console.log` (only `warn`/`error`)
- Import ordering enforced
- TypeScript strict mode
