import { describe, expect, it } from 'vitest'

import { buildApp } from '../src/app.js'

describe('GET /ping', () => {
  it('responds with 200 and pong', async () => {
    const app = await buildApp()

    const response = await app.inject({ method: 'GET', url: '/ping' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('pong')

    await app.close()
  })
})

describe('contract routes', () => {
  it('routes GET /event-types to the generated operation', async () => {
    const app = await buildApp()

    const response = await app.inject({ method: 'GET', url: '/event-types' })

    expect(response.statusCode).toBe(501)
    expect(response.json()).toEqual({
      error: { code: 'not_implemented', message: 'Not implemented' },
    })

    await app.close()
  })

  it('rejects POST /event-types when the body does not match the contract', async () => {
    const app = await buildApp()

    const response = await app.inject({
      method: 'POST',
      url: '/event-types',
      payload: {},
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toMatchObject({
      error: { code: 'validation_error' },
    })
    expect(response.json().error.message).toContain("required property 'id'")

    await app.close()
  })
})
