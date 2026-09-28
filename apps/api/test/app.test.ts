import { describe, expect, it } from 'vitest'

import { buildApp } from '../src/app.js'

const NOW = new Date('2026-06-01T05:30:00.000Z')

function makeApp(now: () => Date = () => NOW) {
  return buildApp({ databasePath: ':memory:', now })
}

const validEventType = {
  id: 'intro',
  title: 'Знакомство',
  description: 'Короткий вводный звонок',
  durationMinutes: 30,
}

async function createEventType(
  app: Awaited<ReturnType<typeof buildApp>>,
  payload: Record<string, unknown> = validEventType,
) {
  return app.inject({
    method: 'POST',
    url: '/event-types',
    payload,
  })
}

describe('GET /ping', () => {
  it('responds with 200 and pong', async () => {
    const app = await makeApp()
    const response = await app.inject({ method: 'GET', url: '/ping' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('pong')
    await app.close()
  })
})

describe('event types', () => {
  it('starts with an empty list', async () => {
    const app = await makeApp()
    const response = await app.inject({ method: 'GET', url: '/event-types' })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual([])
    await app.close()
  })

  it('creates an event type and returns it in the list', async () => {
    const app = await makeApp()

    const created = await createEventType(app)
    expect(created.statusCode).toBe(201)
    expect(created.json()).toEqual(validEventType)

    const listed = await app.inject({ method: 'GET', url: '/event-types' })
    expect(listed.json()).toEqual([validEventType])

    await app.close()
  })

  it('rejects a duplicate id with 422', async () => {
    const app = await makeApp()
    await createEventType(app)

    const duplicate = await createEventType(app)
    expect(duplicate.statusCode).toBe(422)
    expect(duplicate.json().error.code).toBe('unprocessable_entity')

    await app.close()
  })

  it('rejects a duration that is not a positive multiple of 30', async () => {
    const app = await makeApp()

    const response = await createEventType(app, {
      ...validEventType,
      durationMinutes: 45,
    })
    expect(response.statusCode).toBe(422)

    await app.close()
  })

  it('rejects a body that does not match the contract with 400', async () => {
    const app = await makeApp()

    const response = await app.inject({
      method: 'POST',
      url: '/event-types',
      payload: { id: 'intro' },
    })
    expect(response.statusCode).toBe(400)
    expect(response.json().error.code).toBe('validation_error')

    await app.close()
  })
})
