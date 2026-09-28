import type { ErrorBody } from '@/lib/api'

export function apiErrorMessage(error: unknown): string {
  const body = error as ErrorBody | undefined
  return (
    body?.error?.message ??
    'Не удалось выполнить запрос. Попробуйте ещё раз.'
  )
}
