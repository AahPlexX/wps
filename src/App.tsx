import { HomePage } from './pages/HomePage'
import { MapPage } from './pages/MapPage'

export default function App() {
  const normalizedPath = location.pathname.replace(/\/+$/, '')
  return normalizedPath.endsWith('/map') ? <MapPage /> : <HomePage />
}
