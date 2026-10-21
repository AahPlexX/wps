import { DeploymentUpdatePrompt } from './components/DeploymentUpdatePrompt'
import { HomePage } from './pages/HomePage'
import { MapPage } from './pages/MapPage'

export default function App() {
  const normalizedPath = location.pathname.replace(/\/+$/, '')
  const page = normalizedPath.endsWith('/map') ? <MapPage /> : <HomePage />

  return (
    <>
      {page}
      <DeploymentUpdatePrompt />
    </>
  )
}
