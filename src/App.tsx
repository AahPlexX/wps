import { DeploymentUpdatePrompt } from './components/DeploymentUpdatePrompt'
import { ComparePage } from './pages/ComparePage'
import { HomePage } from './pages/HomePage'
import { MapPage } from './pages/MapPage'

export default function App() {
  const normalizedPath = location.pathname.replace(/\/+$/, '')
  const page = normalizedPath.endsWith('/map')
    ? <MapPage />
    : normalizedPath.endsWith('/compare')
      ? <ComparePage />
      : <HomePage />

  return (
    <>
      {page}
      <DeploymentUpdatePrompt />
    </>
  )
}
