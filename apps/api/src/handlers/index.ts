import type { AppConfig } from '../config.js'
import type { Repository } from '../domain/repository.js'
import { createBookingsHandlers } from './bookings.js'
import { createEventTypesHandlers } from './event-types.js'

export function createServiceHandlers(
  repository: Repository,
  config: AppConfig,
  now: () => Date,
) {
  return {
    ...createEventTypesHandlers(repository),
    ...createBookingsHandlers(repository, config, now),
  }
}
