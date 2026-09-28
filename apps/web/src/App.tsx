import { Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { BookPage } from '@/pages/BookPage'
import { EventTypesPage } from '@/pages/EventTypesPage'
import { EventsPage } from '@/pages/EventsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/event-types" element={<EventTypesPage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  )
}

export default AppRoutes
