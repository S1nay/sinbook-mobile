# Архитектурные правила

Обязательные правила, выведенные из кодовой базы. Весь новый код должен им соответствовать.

---

## 1. Правила зависимостей между слоями

**Зависимости указывают только внутрь.** Внешний слой никогда не импортируется во внутренний.

```
Presentation  →  Domain  ←  Data
                    ↑
              Infrastructure
```

| Разрешено                                          | Запрещено                                         |
|----------------------------------------------------|---------------------------------------------------|
| `Presentation` импортирует из `Domain`             | `Domain` импортирует из `Data`                    |
| `Data` импортирует из `Domain`                     | `Domain` импортирует из `Presentation`            |
| `Infrastructure` импортирует из `Domain`           | `Data` импортирует из `Presentation`              |
| Любой слой импортирует из `Core`                   | `Infrastructure` импортирует из `Data`            |

---

## 2. Сначала интерфейс

Каждый сервис, репозиторий, стор, API-клиент и ViewModel **обязаны иметь интерфейс** до реализации.

- Интерфейсы репозиториев — `src/domain/repositories/`
- Интерфейсы ViewModel — рядом с реализацией: `view-model/IXxxViewModel.ts`
- Интерфейсы сторов — рядом со стором: `IXxxStore.ts`
- Интерфейсы API — рядом с API: `IXxxApi.ts`

---

## 3. DI-идентификаторы

**Два паттерна — использовать нужный:**

### 3a. Интерфейс с namespace `$` (предпочтительно для доменных интерфейсов)
```typescript
// IUserRepository.ts
interface IUserRepository { ... }
namespace IUserRepository {
  export const $ = Symbol('IUserRepository');
}
export { IUserRepository };
```

### 3b. Именованный символ в `identifiers.ts` (для инфраструктуры без namespace)
```typescript
// core/di/identifiers.ts
export const SinbookHttpClient = Symbol('SinbookHttpClient');
export const MMKVStorage = Symbol('MMKVStorage');
```

**Правило:** Никогда не использовать строковые идентификаторы. Только Symbols.

---

## 4. Правила DI-контейнера

- Все привязки находятся в `src/core/di/container.ts`
- Все привязки используют **singleton scope** (`inSingletonScope()`)
- Порядок регистрации должен соблюдаться:
  ```
  API clients → Stores → MMKV Storage → HTTP Client
  → Internal Storages → Navigation Service → Socket Manager
  → Repositories → Use Cases
  ```
- Use Cases регистрируются через `combineUseCases(container)`, не inline
- **ViewModel-привязки НЕ находятся в корневом контейнере** — каждый экран создаёт дочерний контейнер

---

## 5. Структура экрана

Каждый экран обязан следовать этой структуре папок:

```
screen-name/
├── index.tsx                        ← только DI-настройка, рендерит ViewModelInjector
├── view/
│   ├── XxxView.tsx                  ← observer() компонент, без бизнес-логики
│   └── styles.ts
├── view-model/
│   ├── IXxxViewModel.ts             ← интерфейс + символ $
│   └── XxxViewModel.ts             ← @injectable() MobX-класс
└── components/                      ← компоненты, специфичные для экрана (если нужны)
```

`index.tsx` создаёт дочерний контейнер и привязывает ViewModel:
```typescript
const childContainer = container.createChild();
childContainer.bind(IXxxViewModel.$).to(XxxViewModel);
```

**Правило:** Никакой бизнес-логики в `view/`. Никакого UI-кода в `view-model/`.

---

## 6. Правила ViewModel

```typescript
@injectable()
class XxxViewModel implements IXxxViewModel {
  // Приватные поля — никогда не выставлять напрямую
  private _data: IData | null = null;
  private _isLoading = false;

  constructor(
    @inject(XxxUseCases.$DoSomething) private doSomething: DoSomethingUseCase,
  ) {
    makeAutoObservable(this, {}, { autoBind: true }); // всегда в конструкторе
  }

  // Публичные геттеры для всего состояния
  get data() { return this._data; }
  get isLoading() { return this._isLoading; }

  // Методы вызывают use cases, никогда репозитории или API напрямую
  async loadData() {
    this._isLoading = true;
    try {
      this._data = await this.doSomething.execute(...);
    } finally {
      this._isLoading = false;
    }
  }
}
```

Правила:
- Всегда `makeAutoObservable(this, {}, { autoBind: true })` в конструкторе
- Все поля состояния **приватные** с публичными **геттерами**
- ViewModel инжектирует **только use cases**, никогда репозитории или API-клиенты
- У каждого ViewModel есть соответствующий интерфейс с символом `$`

---

## 7. Правила View (React-компонент)

```typescript
const XxxView = observer(() => {
  const vm = useDIContainer().get<IXxxViewModel>(IXxxViewModel.$);
  // ...
});
```

Правила:
- Все View оборачиваются в `observer()` из `mobx-react-lite`
- ViewModel получается через `useDIContainer().get<Interface>(Interface.$)`
- Никакого управления состоянием во View — всё состояние живёт в ViewModel
- Никакой бизнес-логики во View — только вызовы методов ViewModel

---

## 8. Правила MobX-стора

Сторы — **тупые контейнеры состояния**. Они никогда не загружают данные и не содержат бизнес-логику.

```typescript
@injectable()
class XxxStore implements IXxxStore {
  private _data: IData | null = null;

  constructor() { makeAutoObservable(this, {}, { autoBind: true }); }

  get data() { return this._data; }
  setData(data: IData | null) { this._data = data; }
}
```

Правила:
- Только геттер + сеттер
- Никаких асинхронных методов
- Никаких инжекций use cases или API
- Сторы представляют **только in-memory состояние сессии** (сбрасывается при перезапуске)

---

## 9. Правила репозитория

Репозитории координируют **три источника данных**: API (удалённый), Store (память), Storage (постоянный).

```typescript
@injectable()
class XxxRepository implements IXxxRepository {
  constructor(
    @inject(IXxxStore.$) private store: IXxxStore,
    @inject(IXxxStorage.$) private storage: IXxxStorage,
    @inject(IXxxApi.$) private api: IXxxApi,
  ) {}

  // Всегда использовать хелперы для API-вызовов:
  async getItem(id: number): Promise<IItem> {
    return this.api.getItem(id)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}
```

Правила:
- Репозитории реализуют доменные интерфейсы (`IXxxRepository`)
- **Всегда** использовать `getDataFromHttpResponse` и `getErrorFromHttpResponse` для API-вызовов
- Никакой бизнес-логики — репозитории только получают и преобразуют данные
- Решения о кэшировании принадлежат **Use Cases**, не репозиториям

---

## 10. Правила Use Case

Use cases содержат всю бизнес-логику. Один класс = одна операция.

```typescript
@injectable()
class GetXxxUseCase {
  constructor(
    @inject(IXxxRepository.$) private repo: IXxxRepository,
  ) {}

  async execute(params: XxxParams): Promise<IXxx> {
    // Бизнес-логика: кэширование, валидация, оркестрация
  }
}
```

Правила:
- Один use case = одна бизнес-операция (`GetUser`, `CreatePost`, `Logout`)
- Use cases инжектируют **только репозитории**, никогда API-клиенты или сторы напрямую
- Use cases группируются и регистрируются в `combineUseCases.ts`
- Стратегия кэширования (память → storage → API) живёт в use cases

---

## 11. Правила API-клиента

API-клиенты — тонкие обёртки: один метод на эндпоинт, никакой логики.

```typescript
@injectable()
class XxxApi implements IXxxApi {
  constructor(
    @inject(SinbookHttpClient) private http: IHttpClient<AxiosInstance>,
  ) {}

  getItem(id: number): Promise<IHttpResponse<IItem>> {
    return this.http.get(`/xxx/${id}`);
  }
}
```

Правила:
- Методы API возвращают `Promise<IHttpResponse<T>>` — никогда не разворачивать ответ
- Никакой обработки ошибок в API-клиентах — это делается в репозиториях через хелперы
- Никакой бизнес-логики
- Инжектировать идентификатор `SinbookHttpClient`, не Axios-инстанс напрямую

---

## 12. Стратегия кэширования

Стандартный паттерн кэширования, используемый в use cases:

```
1. Проверить in-memory стор (быстрее всего, только для сессии)
2. Проверить MMKV storage (постоянный, переживает перезапуск)
3. Загрузить с API (источник истины)
4. Обновить стор и/или storage после загрузки
```

Для пагинированных данных (посты текущего пользователя):
- При первой загрузке: вернуть кэш, если есть
- При пагинации: слить новые результаты с существующими через `mergeArraysWithoutDuplicates`
- При обновлении (`isRefetching: true`): пропустить кэш, загрузить свежие данные

---

## 13. Обработка ошибок

- **API-слой**: возвращает сырой `Promise<IHttpResponse<T>>`
- **Репозиторий**: всегда `.then(getDataFromHttpResponse).catch(getErrorFromHttpResponse)`
- **Use case**: может перебросить или трансформировать ошибку
- **ViewModel**: перехватывает ошибки, показывает toast через `Toast.show()`
- **Никогда не проглатывать ошибки молча**

---

## 14. Соглашения по именованию

| Сущность          | Паттерн                   | Пример                         |
|-------------------|---------------------------|--------------------------------|
| Интерфейс         | Префикс `I`               | `IUserRepository`              |
| DI-идентификатор  | `$` в namespace           | `IUserRepository.$`            |
| Use Case          | Суффикс `XxxUseCase`      | `GetUserUseCase`               |
| ViewModel         | Суффикс `XxxViewModel`    | `ProfileDetailsViewModel`      |
| Интерфейс VM      | Суффикс `IXxxViewModel`   | `IProfileDetailsViewModel`     |
| Реализация репо   | Суффикс `XxxRepository`   | `UserRepository`               |
| API-клиент        | Суффикс `XxxApi`          | `PostApi`                      |
| Стор              | Суффикс `XxxStore`        | `UserStore`                    |
| Папка экрана      | kebab-case `xxx-screen`   | `profile-details-screen`       |

---

## 15. Правила импортов

Всегда использовать **path aliases**, никогда — относительные пути между слоями.

```typescript
// Правильно
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { Colors } from '@shared/colors';
import { Button } from '@ui/button';

// Неправильно
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
```

Доступные алиасы: `@data`, `@domain`, `@infrastructure`, `@core`, `@shared`, `@ui`, `@components`, `@screens`, `@layouts`

---

## 16. Стиль кода

- Нет `console.log` — только `console.warn` или `console.error`
- TypeScript strict mode — нет `any`, нет `!` non-null assertion без крайней необходимости
- Лимит строки: 100 символов
- Все асинхронные методы во ViewModel обязаны управлять состоянием `_isLoading`
- Стили определяются в отдельном `styles.ts` через `StyleSheet.create()`

---

## 17. Инициализация приложения (App.tsx)

Иерархия компонентов должна соблюдать этот порядок:

```
GestureHandlerRootView
  SafeAreaProvider
    BottomSheetModalProvider
      DIProvider          ← Inversify-контейнер
        AuthProvider      ← Auth-контекст
          AppNavigator
```

Интерцепторы и WebSocket-соединения регистрируются один раз в `App.tsx` после получения ссылок из контейнера.
