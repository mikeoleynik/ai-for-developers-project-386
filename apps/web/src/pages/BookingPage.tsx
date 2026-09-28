import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { BookingForm } from '@/components/booking/BookingForm'
import { buttonVariants } from '@/components/ui/button'
import { eventTypesList, type EventType } from '@/lib/api'
import { apiErrorMessage } from '@/lib/errors'
import { cn } from '@/lib/utils'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'not-found' }
  | { status: 'ready'; eventType: EventType }

export function BookingPage() {
  const { eventTypeId = '' } = useParams()
  const [state, setState] = useState<State>({ status: 'loading' })
  const [start, setStart] = useState('')

  useEffect(() => {
    let active = true

    eventTypesList()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          setState({ status: 'error', message: apiErrorMessage(error) })
          return
        }
        const eventType = (data ?? []).find((item) => item.id === eventTypeId)
        setState(
          eventType ? { status: 'ready', eventType } : { status: 'not-found' },
        )
      })
      .catch((error: unknown) => {
        if (active) {
          setState({ status: 'error', message: apiErrorMessage(error) })
        }
      })

    return () => {
      active = false
    }
  }, [eventTypeId])

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/book"
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-4')}
      >
        Назад
      </Link>

      {state.status === 'loading' && (
        <p className="text-muted-foreground">Загружаем вид встречи…</p>
      )}

      {state.status === 'error' && (
        <p role="alert" className="text-destructive">
          {state.message}
        </p>
      )}

      {state.status === 'not-found' && (
        <p role="alert" className="text-destructive">
          Вид встречи не найден.
        </p>
      )}

      {state.status === 'ready' && (
        <>
          <h1 className="text-3xl font-semibold">{state.eventType.title}</h1>
          {state.eventType.description && (
            <p className="mt-2 text-muted-foreground">
              {state.eventType.description}
            </p>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            {state.eventType.durationMinutes} мин
          </p>

          <div className="mt-8 space-y-1">
            <label htmlFor="booking-start" className="block text-sm font-medium">
              Начало
            </label>
            <input
              id="booking-start"
              type="datetime-local"
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="rounded-lg border bg-background px-3 py-2"
            />
          </div>

          {start && (
            <BookingForm
              eventTypeId={state.eventType.id}
              start={new Date(start).toISOString()}
            />
          )}
        </>
      )}
    </main>
  )
}
