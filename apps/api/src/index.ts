import { buildApp } from './app.js'

try {
  const server = await buildApp()
  const address = await server.listen({ port: 8080 })
  console.log(`Server listening at ${address}`)
} catch (err) {
  console.error(err)
  process.exit(1)
}
