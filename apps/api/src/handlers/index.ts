import type { Repository } from '../domain/repository.js'
import { createEventTypesHandlers } from './event-types.js'

export function createServiceHandlers(repository: Repository) {
  return {
    ...createEventTypesHandlers(repository),
  }
}
