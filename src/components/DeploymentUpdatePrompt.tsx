import { useCallback, useEffect, useRef, useState } from 'react'
import { isNewerVersion } from '../lib/version'

const CHECK_INTERVAL_MS = 5 * 60 * 1000
const DISMISSED_VERSION_KEY = 'wps-dismissed-version'

function wasDismissed(version: string) {
  try {
    return sessionStorage.getItem(DISMISSED_VERSION_KEY) === version
  } catch {
    return false
  }
}

function rememberDismissal(version: string) {
  try {
    sessionStorage.setItem(DISMISSED_VERSION_KEY, version)
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

export function DeploymentUpdatePrompt() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [availableVersion, setAvailableVersion] = useState<string | null>(null)

  const checkForUpdate = useCallback(async () => {
    try {
      const versionUrl = new URL(`${import.meta.env.BASE_URL}version.json`, window.location.origin)
      versionUrl.searchParams.set('t', Date.now().toString())
      const response = await fetch(versionUrl, { cache: 'no-store' })
      if (!response.ok) return

      const payload: unknown = await response.json()
      if (!payload || typeof payload !== 'object' || !('version' in payload)) return
      const version = (payload as { version?: unknown }).version
      if (typeof version !== 'string') return
      if (!isNewerVersion(version, __APP_VERSION__) || wasDismissed(version)) return

      setAvailableVersion(version)
    } catch {
      // Update checks must never interrupt the reference experience.
    }
  }, [])

  useEffect(() => {
    void checkForUpdate()
    const intervalId = window.setInterval(() => void checkForUpdate(), CHECK_INTERVAL_MS)
    const onFocus = () => void checkForUpdate()
    window.addEventListener('focus', onFocus)
    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', onFocus)
    }
  }, [checkForUpdate])

  useEffect(() => {
    const dialog = dialogRef.current
    if (availableVersion && dialog && !dialog.open) dialog.showModal()
  }, [availableVersion])

  if (!availableVersion) return null

  const cancel = () => {
    rememberDismissal(availableVersion)
    dialogRef.current?.close()
    setAvailableVersion(null)
  }

  return (
    <dialog
      ref={dialogRef}
      className="update-dialog"
      aria-labelledby="update-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        cancel()
      }}
    >
      <div className="update-dialog__body">
        <p className="update-dialog__eyebrow">Update available</p>
        <h2 id="update-dialog-title">Version {availableVersion} is now available.</h2>
        <div className="update-dialog__actions">
          <button className="update-dialog__update" type="button" autoFocus onClick={() => window.location.reload()}>
            Update
          </button>
          <button className="update-dialog__cancel" type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}
