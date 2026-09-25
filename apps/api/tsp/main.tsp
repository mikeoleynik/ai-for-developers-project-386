import "@typespec/http";

using Http;

@service(#{
  title: "Calendar Booking API",
})
namespace CalendarBooking;

@error
model Error {
  code: string;
  message: string;
}

model EventType {
  id: string;
  title: string;
  description?: string;
  durationMinutes: int32;
}

model CreateBooking {
  eventTypeId: string;
  start: utcDateTime;
  guestName: string;
  guestEmail: string;
}

model Booking {
  id: string;
  eventTypeId: string;
  guestName: string;
  guestEmail: string;
  start: utcDateTime;
  createdAt: utcDateTime;
}

model DayAvailability {
  date: string;
  startTimes: string[];
}

@route("/event-types")
interface EventTypes {
  @get list(): EventType[];
  @post create(@body body: EventType): EventType | Error;
}

@route("/availability")
interface Availability {
  @get list(
    @query eventTypeId: string,
    @query from: string,
    @query to: string,
  ): DayAvailability[] | Error;
}

@route("/bookings")
interface Bookings {
  @get list(): Booking[];
  @post create(@body body: CreateBooking): Booking | Error;
}
