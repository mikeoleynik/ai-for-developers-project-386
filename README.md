# Календарь звонков


[![hexlet-check](https://github.com/mikeoleynik/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mikeoleynik/ai-for-developers-project-386/actions)

Разработайте совместно с ИИ сервис для бронирования календаря

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-for-developers
Как это должно работать: https://files.hexlet.app/a/2ipc5m

## Стек

- Монорепо на pnpm workspaces
- Бекенд: Fastify + TypeScript (`apps/api`)
- Фронтенд: Vite + React + TypeScript + shadcn/ui (`apps/web`)
- Тесты: Vitest (API и web)
- Контракт: TypeSpec → OpenAPI → клиентский SDK
- Линтер: ESLint (flat config) + `tsc --noEmit`
- Релизы: release-please поверх Conventional Commits

## Требования

- Node.js 20.19+ или 22.12+
- pnpm (версия закреплена полем `packageManager`, например через corepack)

## Установка

```bash
git clone https://github.com/mikeoleynik/ai-for-developers-project-386.git
cd ai-for-developers-project-386
pnpm install
```

## Использование

```bash
pnpm dev               # API и фронтенд одновременно
pnpm --filter api dev  # только API (порт 8080)
pnpm --filter web dev  # только фронтенд
pnpm generate          # перегенерировать контракт (OpenAPI + SDK)
pnpm test              # тесты API и web
pnpm lint              # ESLint + проверка типов
```

## Контракт и кодогенерация

Контракт API — единый источник правды, описан в [TypeSpec](https://typespec.io/) в `apps/api/tsp/main.tsp`. Из него одной командой генерируется:

- OpenAPI-спецификация — `apps/api/generated/openapi.yaml`;
- типизированный клиентский SDK для фронтенда — `apps/web/src/client` (heyapi/openapi-ts);
- серверные маршруты и валидация присоединяются из OpenAPI через `fastify-openapi-glue`.

Сгенерированные файлы коммитятся и не правятся руками.
```

Поднятый API отвечает на `GET http://localhost:8080/ping` телом `pong`.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
