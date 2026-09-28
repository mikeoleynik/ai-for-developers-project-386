export const CALENDAR_TIME_ZONE = 'Europe/Moscow'

export function formatSlot(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: CALENDAR_TIME_ZONE,
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(iso))
}
