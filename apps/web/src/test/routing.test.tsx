import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderApp } from '@/test/renderApp'

describe('маршруты приложения', () => {
  it('открывает заглушку записи на звонок по /book', () => {
    renderApp('/book')

    expect(
      screen.getByRole('heading', { name: 'Запись на звонок' }),
    ).toBeInTheDocument()
  })

  it('открывает заглушку предстоящих событий по /events', () => {
    renderApp('/events')

    expect(
      screen.getByRole('heading', { name: 'Предстоящие события' }),
    ).toBeInTheDocument()
  })
})
