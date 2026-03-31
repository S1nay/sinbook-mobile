# sinbook-mobile

React Native приложение социальной сети, построенное на Clean Architecture, MobX и Inversify DI.

---

## Содержание

- [Технологический стек](#технологический-стек)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Архитектура](#архитектура)
  - [Слои Clean Architecture](#слои-clean-architecture)
  - [Dependency Injection](#dependency-injection)
  - [Паттерн Repository](#паттерн-repository)
  - [Use Cases](#use-cases)
  - [MVVM (экраны)](#mvvm-экраны)
  - [MobX-сторы](#mobx-сторы)
- [Навигация](#навигация)
- [HTTP-клиент и интерцепторы](#http-клиент-и-интерцепторы)
- [Хранилище](#хранилище)
- [WebSocket](#websocket)
- [UI-библиотека](#ui-библиотека)
- [Path Aliases](#path-aliases)

---

## Технологический стек

| Категория       | Технология                                      |
|-----------------|-------------------------------------------------|
| Фреймворк       | React Native 0.79.2 + React 19                  |
| Язык            | TypeScript 5 (strict mode)                      |
| Состояние       | MobX 6 + MobX React Lite 4                      |
| DI              | Inversify 7 (декораторы + reflect-metadata)     |
| HTTP            | Axios 1.9 с интерцепторами запросов/ответов     |
| WebSocket       | Socket.IO Client 4.8                            |
| Формы           | React Hook Form + Zod                           |
| Хранилище       | React Native MMKV (зашифрованное, нативное)     |
| Навигация       | React Navigation 7 (native-stack + bottom-tabs) |
| Анимации        | Reanimated 4 + Gesture Handler                  |
| Bottom Sheets   | @gorhom/bottom-sheet                            |
| Уведомления     | react-native-toast-message                      |

---

## Быстрый старт

```bash
npm install              # Установить зависимости
npm start                # Запустить Metro bundler (со сбросом кэша)
npm run android          # Запустить на Android-эмуляторе/устройстве
npm run ios              # Запустить на iOS-симуляторе/устройстве
npm run lint             # Запустить ESLint
npm run tsc:check        # Проверить типы TypeScript
npm run gradlew:clean    # Очистить артефакты Android-сборки
npm run pod:install      # Установить iOS CocoaPods
```

---

## Структура проекта

```
src/
├── core/                   # Инициализация приложения
│   ├── di/                 # Inversify-контейнер + идентификаторы
│   ├── interceptors/       # Axios-интерцепторы запросов/ответов
│   ├── providers/          # React Context провайдеры (DI, Auth)
│   ├── hooks/              # Общие хуки (useDIContainer, useAuth, usePagination)
│   ├── helpers/            # Хелперы HTTP-ответов, извлечение ошибок
│   └── interfaces/         # Общие интерфейсы ядра
│
├── domain/                 # Бизнес-логика (независима от фреймворка)
│   ├── models/             # Интерфейсы сущностей (IUser, IPost, IPagination…)
│   ├── dto/                # Data Transfer Objects для API
│   ├── repositories/       # Интерфейсы репозиториев (IUserRepository, IPostRepository…)
│   └── use-cases/          # Классы бизнес-операций (Login, GetUser, GetPosts…)
│
├── data/                   # Реализации слоя данных
│   ├── api/                # API-клиенты на Axios (UserApi, PostApi, AuthApi)
│   ├── repositories/       # Реализации репозиториев
│   ├── store/              # MobX-сторы (UserStore, PostStore)
│   └── storages/           # Реализации хранилищ (UserStorage, AuthStorage)
│
├── infrastructure/         # Адаптеры внешних сервисов
│   ├── http/               # AxiosHttpClient (реализация IHttpClient)
│   ├── socket/             # SocketManager (Socket.IO-соединения)
│   ├── storage/            # MMKVStorage (реализация IStorage)
│   └── navigation/         # NavigationService (императивная навигация)
│
├── navigation/             # Конфигурация React Navigation
│   ├── navigators/         # Определения stack + tab навигаторов
│   ├── route-names/        # Enum'ы имён маршрутов
│   └── params/             # Типы параметров экранов
│
└── presentation/           # UI-слой
    ├── screens/            # Экраны (view + view-model на каждый)
    ├── components/         # Общие составные компоненты (PostCard, Header…)
    ├── ui/                 # Базовые UI-примитивы (Button, Input, Avatar, Toast…)
    ├── shared/             # Дизайн-токены (Colors)
    └── _layouts/           # Обёртки макетов страниц (_app, _auth)
```

---

## Архитектура

Проект следует **Clean Architecture** со строгим разделением слоёв. Зависимости указывают только внутрь — Presentation зависит от Domain, Data зависит от Domain, ничто не зависит от Presentation.

```
┌─────────────────────────────────────┐
│           Presentation              │  Views (React) + ViewModels (MobX)
├─────────────────────────────────────┤
│               Data                  │  API-клиенты, Репозитории, Сторы
├─────────────────────────────────────┤
│              Domain                 │  Модели, DTOs, Интерфейсы репозиториев, Use Cases
├─────────────────────────────────────┤
│          Infrastructure             │  HTTP, Storage, WebSocket, Navigation
└─────────────────────────────────────┘
```

### Слои Clean Architecture

#### Domain (внутренний слой)

Чистый TypeScript — никаких зависимостей от фреймворков. Определяет, что приложение _умеет делать_:

- **Модели** — интерфейсы сущностей (`IUser`, `IPost`, `IPagination<T>`)
- **DTO** — формы запросов/ответов (`ILoginRequestDTO`, `IPatchUserRequestDto`)
- **Интерфейсы репозиториев** — контракты доступа к данным (`IUserRepository`, `IPostRepository`)
- **Use Cases** — инжектируемые классы, реализующие одну бизнес-операцию каждый

#### Data

Реализует доменные интерфейсы с использованием реальной инфраструктуры:

- **API-клиенты** — тонкие обёртки Axios, один метод на эндпоинт
- **Репозитории** — координируют API-вызовы, MobX-сторы (кэш в памяти) и MMKV storage (постоянный кэш)
- **Сторы** — MobX-контейнеры состояния сессии в памяти

#### Infrastructure

Адаптеры фреймворков:

- `AxiosHttpClient` — реализует `IHttpClient`, оборачивает Axios
- `MMKVStorage` — реализует `IStorage`, оборачивает MMKV
- `SocketManager` — управляет именованными Socket.IO-соединениями
- `NavigationService` — императивная навигация через `createNavigationContainerRef`

#### Presentation

MVVM на каждый экран — каждая папка экрана содержит:

```
profile-details-screen/
├── index.tsx                    ← настройка DI (привязка дочернего контейнера)
├── view/
│   ├── ProfileDetailsView.tsx   ← observer() React-компонент
│   └── styles.ts
├── view-model/
│   ├── IProfileDetailsViewModel.ts
│   └── ProfileDetailsViewModel.ts  ← @injectable() MobX-класс
└── components/                  ← компоненты, специфичные для экрана
```

---

### Dependency Injection

Inversify используется для всего графа сервисов. Все привязки регистрируются в `src/core/di/container.ts` как синглтоны.

**Идентификаторы** двух видов:

1. **Статический символ на интерфейсе** — для именованных интерфейсов:
   ```typescript
   // domain/repositories/IUserRepository.ts
   interface IUserRepository { ... }
   namespace IUserRepository {
     export const $ = Symbol('IUserRepository');
   }
   ```

2. **Явная константа идентификатора** — для инфраструктурных сервисов:
   ```typescript
   // core/di/identifiers.ts
   export const SinbookHttpClient = Symbol('SinbookHttpClient');
   export const MMKVStorage = Symbol('MMKVStorage');
   ```

**Порядок регистрации в контейнере** (`container.ts`):
```
API clients → Stores → MMKV Storage → HTTP Client
→ Internal Storages → Navigation Service → Socket Manager
→ Repositories → Use Cases
```

**DI на уровне экрана**: `index.tsx` каждого экрана создаёт дочерний контейнер и привязывает ViewModel локально, так что каждый экземпляр экрана получает собственный ViewModel:

```typescript
const container = useDIContainer();
const childContainer = container.createChild();
childContainer.bind(IProfileDetailsViewModel.$).to(ProfileDetailsViewModel);
```

**Инжекция зависимостей**:

```typescript
@injectable()
class ProfileDetailsViewModel {
  constructor(
    @inject(AuthUseCases.$Logout) private logout: LogoutUseCase,
    @inject(UserUseCases.$GetUser) private getUser: GetUserUseCase,
    @inject(PostUseCases.$GetUserPosts) private getUserPosts: GetUserPostsUseCase,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
```

---

### Паттерн Repository

Репозитории скрывают источники данных за единым интерфейсом. Каждый репозиторий может координировать до трёх источников:

| Источник       | Используется для                                       |
|----------------|--------------------------------------------------------|
| API-клиент     | Удалённые данные — всегда источник истины              |
| MobX Стор      | Кэш сессии в памяти (живёт в рамках сессии)            |
| MMKV Storage   | Постоянный кэш (переживает перезапуск приложения)      |

**Интерфейс** (доменный слой):

```typescript
interface IUserRepository {
  // Сессия (память)
  getUserSession(): IUser | null;
  setUserSession(user: IUser | null): void;
  clearUserSession(): void;
  // Постоянный (MMKV)
  loadUserFromStorage(): AuthUser | null;
  persistUser(user: AuthUser): void;
  // Удалённый (API)
  getUser(id: number): Promise<IUser>;
  patchUser(dto: Partial<IPatchUserRequestDto>): Promise<IUser>;
}
```

**Реализация** (слой данных):

```typescript
@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(IUserStore.$) private store: IUserStore,
    @inject(IUserStorage.$) private storage: IUserStorage,
    @inject(IUserApi.$) private api: IUserApi,
  ) {}

  getUserSession() { return this.store.userData; }
  persistUser(user: AuthUser) { this.storage.setUserData(user); }
  async getUser(id: number) {
    return this.api.getUser(id)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}
```

---

### Use Cases

Каждый use case — один инжектируемый класс с методом `execute()`. Use cases содержат все бизнес-правила и оркестрируют репозитории.

**Пример — GetUserUseCase** (стратегия кэширования):

```typescript
async execute({ id, isRefetching }): Promise<IUser> {
  if (id) {
    // Получение другого пользователя — всегда с API
    return this.userRepository.getUser(id);
  }
  // Получение себя — сначала проверяем кэш в памяти
  const sessionUser = this.userRepository.getUserSession();
  if (!isRefetching && sessionUser) return sessionUser;

  const storageUser = this.userRepository.loadUserFromStorage();
  const fetched = await this.userRepository.getUser(storageUser.id);
  this.userRepository.setUserSession(fetched);
  return fetched;
}
```

**Пример — GetUserPostsUseCase** (пагинация + слияние кэша):

```typescript
async execute({ userId, isRefetching, isPagination, ...params }) {
  const isOwn = sessionUser?.id === userId;

  if (isOwn && !isRefetching && !isPagination) {
    const cached = this.postRepository.getLoggedInUserPosts();
    if (cached) return cached;
  }

  const fetched = await this.postRepository.getPosts({ userId, ...params });

  if (isOwn) {
    if (isPagination) {
      const merged = mergeArraysWithoutDuplicates(cached.results, fetched.results, 'id');
      this.postRepository.setLoggedInUserPosts({ ...fetched, results: merged });
    } else {
      this.postRepository.setLoggedInUserPosts(fetched);
    }
  }

  return fetched;
}
```

Use cases группируются и регистрируются через `combineUseCases(container)`:

```
AuthUseCases.$Login, $Register, $Logout, $RefreshToken
UserUseCases.$GetUser, $PatchUser
PostUseCases.$GetPosts, $GetUserPosts, $CreatePost, $PatchPost, $DeletePost
```

---

### MVVM (экраны)

**ViewModel** — `@injectable()` MobX-класс. Содержит всё состояние экрана и методы:

```typescript
@injectable()
class ProfileDetailsViewModel implements IProfileDetailsViewModel {
  private _user: IUser | null = null;
  private _posts: IPost[] = [];
  private _isLoading = false;

  constructor(
    @inject(UserUseCases.$GetUser) private getUser: GetUserUseCase,
    @inject(PostUseCases.$GetUserPosts) private getUserPosts: GetUserPostsUseCase,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get user() { return this._user; }
  get posts() { return this._posts; }
  get isLoading() { return this._isLoading; }

  async getUserData({ id, isRefetching }) {
    this._isLoading = true;
    try {
      this._user = await this.getUser.execute({ id, isRefetching });
    } finally {
      this._isLoading = false;
    }
  }
}
```

**View** — `observer()` React-компонент. Читает MobX-обсервабли ViewModel, перерендерится автоматически:

```typescript
const ProfileDetailsView = observer(() => {
  const vm = useDIContainer().get<IProfileDetailsViewModel>(IProfileDetailsViewModel.$);

  useEffect(() => { vm.getUserData({ isRefetching: false }); }, []);

  if (vm.isLoading) return <Loader />;
  return <ProfileLayout user={vm.user} posts={vm.posts} />;
});
```

---

### MobX-сторы

Сторы — простые реактивные контейнеры. Они хранят состояние, не загружают данные. Данные всегда записываются через Use Cases (через репозитории).

| Стор        | Состояние                                           | Назначение                          |
|-------------|------------------------------------------------------|-------------------------------------|
| `UserStore` | `_userData: IUser \| null`                          | Сессия текущего пользователя        |
| `PostStore` | `_loggedInUserPosts: IPagination<IPost> \| null`    | Кэш постов текущего пользователя    |

```typescript
@injectable()
class UserStore implements IUserStore {
  private _userData: IUser | null = null;

  constructor() { makeAutoObservable(this, {}, { autoBind: true }); }

  get userData() { return this._userData; }
  setUserData(user: IUser | null) { this._userData = user; }
}
```

---

## Навигация

Иерархическая структура навигаторов:

```
Root Stack
├── Auth Stack
│   ├── Login
│   └── Register
├── Maintenance Stack
│   ├── Bottom Tabs
│   │   ├── Home
│   │   ├── Search
│   │   ├── CreatePost
│   │   ├── Chat Stack
│   │   │   ├── Chats
│   │   │   └── Chat
│   │   └── Profile Stack
│   │       ├── ProfileDetails
│   │       ├── ProfileEdit
│   │       ├── ProfileFollows
│   │       ├── ProfileFollowers
│   │       └── ProfilePosts
│   └── Notifications
└── Log (splash/загрузка)
```

Имена маршрутов — enum'ы (`AppRouteNames`, `BottomTabRouteNames`, `ProfileRouteNames`…). Параметры экранов строго типизированы через `ParamList`, пропсы экранов сужаются через `ProfileScreenProps<ProfileRouteNames.ProfileDetails>`.

`NavigationService` предоставляет императивную навигацию (используется в интерцепторах и use cases):

```typescript
@injectable()
class NavigationService implements INavigationService {
  private ref = createNavigationContainerRef();
  navigate(name, params?) { this.ref.navigate(name, params); }
  goBack() { this.ref.goBack(); }
  reset(state) { this.ref.reset(state); }
}
```

---

## HTTP-клиент и интерцепторы

`AxiosHttpClient` оборачивает Axios и реализует `IHttpClient`:

```typescript
get<T>(url, config?)   → Promise<IHttpResponse<T>>
post<T, D>(url, data)  → Promise<IHttpResponse<T>>
patch<T, D>(url, data) → Promise<IHttpResponse<T>>
delete<T>(url)         → Promise<IHttpResponse<T>>
updateHeaders(headers) → void   // используется после обновления токена
```

### Интерцептор запросов

Читает `ACCESS_TOKEN` из MMKV и добавляет `Authorization: Bearer {token}` к каждому запросу.

### Интерцептор ответов

Обрабатывает 401-ошибки с автоматическим обновлением токена:

```
Получен ответ 401
  → Читаем REFRESH_TOKEN из хранилища
  → POST /auth/refresh
  → Сохраняем новый ACCESS_TOKEN в хранилище
  → Обновляем заголовки Axios по умолчанию
  → Повторяем исходный запрос
  → При ошибке обновления: очищаем токены → навигируем на Auth
```

### Хелперы обработки ошибок

```typescript
getDataFromHttpResponse<T>(response: IHttpResponse<T>): T
getErrorFromHttpResponse(error: AxiosError): never  // бросает IHttpError
```

---

## Хранилище

`MMKVStorage` оборачивает `react-native-mmkv` с типизированным интерфейсом:

```typescript
getObject<T>(key): T | null
getString(key): string | null
set<T>(key, value): void
delete(key): void
clear(): void
```

Хранилище зашифровано и использует single-process mode. Классы верхнего уровня (`UserStorage`, `AuthStorage`) определяют типизированные ключи и используют `MMKVStorage` внутри.

---

## WebSocket

`SocketManager` управляет именованными Socket.IO-соединениями:

```typescript
register(path: SocketPath, config: SocketConfig): void
get(path: SocketPath): Socket
disconnectAll(): void
```

При запуске приложения регистрируются три соединения: `CHAT`, `CHATS`, `NOTIFICATIONS`. Каждое настроено с таймаутом 5 секунд и токеном авторизации.

---

## UI-библиотека

Базовые компоненты в `src/presentation/ui/`:

| Компонент          | Описание                                                  |
|--------------------|-----------------------------------------------------------|
| `Button`           | Варианты: primary/secondary, размеры: large/small, состояние загрузки |
| `Input`            | Текстовый + masked ввод, label, ошибка, иконки            |
| `SecurityInput`    | Ввод пароля с переключением видимости                     |
| `Avatar`           | Аватар пользователя                                       |
| `Grid`             | N-колоночный layout                                       |
| `ImageCarousel`    | Reanimated-карусель изображений                           |
| `SegmentedControl` | Tab-подобный переключатель                                |
| `Checkbox`         | Чекбокс формы                                             |
| `Toast`            | Уведомление об успехе/ошибке с обратным отсчётом          |
| `ErrorMessage`     | Инлайн-отображение ошибки поля                            |
| `BottomSheet`      | Обёртка модального bottom sheet                           |
| `Icon`             | SVG-иконка                                                |

Дизайн-токены централизованы в `src/presentation/shared/colors/index.ts`.

---

## Path Aliases

Настроены в `tsconfig.json`:

| Алиас               | Разрешается в                        |
|---------------------|--------------------------------------|
| `@data/*`           | `src/data/*`                         |
| `@domain/*`         | `src/domain/*`                       |
| `@infrastructure/*` | `src/infrastructure/*`               |
| `@core/*`           | `src/core/*`                         |
| `@shared/*`         | `src/presentation/shared/*`          |
| `@ui/*`             | `src/presentation/ui/*`              |
| `@components/*`     | `src/presentation/components/*`      |
| `@screens/*`        | `src/presentation/screens/*`         |
| `@layouts/*`        | `src/presentation/_layouts/*`        |
