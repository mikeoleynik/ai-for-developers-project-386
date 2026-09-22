import { describe, expect, it } from 'vitest'

import { buildApp } from '../src/app.js'

describe('GET /ping', () => {
  it('responds with 200 and pong', async () => {
    const app = buildApp()

    const response = await app.inject({ method: 'GET', url: '/ping' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('pong')
  })
})
