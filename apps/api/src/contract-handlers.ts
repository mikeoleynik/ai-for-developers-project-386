function notImplemented(): never {
  const error = new Error('Not implemented') as Error & { statusCode: number }
  error.statusCode = 501
  throw error
}

export const serviceHandlers = {
  EventTypes_list: notImplemented,
  EventTypes_create: notImplemented,
  Availability_list: notImplemented,
  Bookings_list: notImplemented,
  Bookings_create: notImplemented,
}
