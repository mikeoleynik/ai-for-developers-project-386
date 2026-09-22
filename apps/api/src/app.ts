import fastify from 'fastify'

export function buildApp() {
  const server = fastify()

  server.get('/ping', async () => {
    return 'pong\n'
  })

  return server
}
