import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, within } from '@testing-library/react'

import { renderApp } from '@/test/renderApp'

const eventTypesList = vi.fn()
const bookingsCreate = vi.fn()

vi.mock('@/lib/api', () => ({
  eventTypesList: (...args: unknown[]) => eventTypesList(...args),
  bookingsCreate: (...args: unknown[]) => bookingsCreate(...args),
}))

const intro = {
  id: 'intro',
  title: 'Знакомство',
  description: 'Короткий вводный звонок',
  durationMinutes: 30,
}

async function openBookingForm() {
  eventTypesList.mockResolvedValue({ data: [intro], error: undefined })
  renderApp('/book/intro')

  fireEvent.change(await screen.findByLabelText('Начало'), {
    target: { value: '2026-06-01T10:00' },
  })

  return screen.findByLabelText('Имя')
}

describe('страница бронирования', () => {
  beforeEach(() => {
    eventTypesList.mockReset()
    bookingsCreate.mockReset()
  })

  it('бронирует слот и показывает подтверждение', async () => {
    bookingsCreate.mockResolvedValue({
      data: {
        id: 'booking-1',
        eventTypeId: 'intro',
        guestName: 'Анна',
        guestEmail: 'anna@example.com',
        start: '2026-06-01T07:00:00.000Z',
        createdAt: '2026-06-01T05:30:00.000Z',
      },
      error: undefined,
    })

    await openBookingForm()

    fireEvent.change(screen.getByLabelText('Имя'), {
      target: { value: 'Анна' },
    })
    fireEvent.change(screen.getByLabelText('Электронная почта'), {
      target: { value: 'anna@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }))

    const status = await screen.findByRole('status')
    expect(
      within(status).getByRole('heading', { name: 'Вы записаны' }),
    ).toBeInTheDocument()
    expect(bookingsCreate).toHaveBeenCalledTimes(1)
  })

  it('показывает ошибку, когда слот занят', async () => {
    bookingsCreate.mockResolvedValue({
      data: undefined,
      error: {
        error: {
          code: 'conflict',
          message: 'The slot is already booked',
        },
      },
    })

    await openBookingForm()

    fireEvent.change(screen.getByLabelText('Имя'), {
      target: { value: 'Анна' },
    })
    fireEvent.change(screen.getByLabelText('Электронная почта'), {
      target: { value: 'anna@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }))

    const alert = await screen.findByRole('alert')
    expect(
      within(alert).getByText('The slot is already booked'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Вы записаны' }),
    ).not.toBeInTheDocument()
  })
})
