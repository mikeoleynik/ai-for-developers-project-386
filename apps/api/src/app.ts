import { fileURLToPath } from 'node:url'

import fastify from 'fastify'
import openapiGlue from 'fastify-openapi-glue'

import { serviceHandlers } from './contract-handlers.js'

const specification = fileURLToPath(
  new URL('../generated/openapi.yaml', import.meta.url),
)

export async function buildApp() {
  const server = fastify()

  server.setErrorHandler((error: unknown, _request, reply) => {
    const err = error as {
      statusCode?: number
      message: string
      validation?: unknown
    }
    const statusCode = err.statusCode ?? 500
    const code = err.validation
      ? 'validation_error'
      : statusCode === 501
        ? 'not_implemented'
        : 'internal_error'

    reply.status(statusCode).send({
      error: {
        code,
        message: err.message,
      },
    })
  })

  server.get('/ping', async () => {
    return 'pong'
  })

  await server.register(openapiGlue, {
    specification,
    serviceHandlers,
  })

  return server
}
