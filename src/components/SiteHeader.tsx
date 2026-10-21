const BASE = import.meta.env.BASE_URL

export function SiteHeader({ active }: { active: 'directory' | 'map' }) {
  return (
    <header className="site-nav">
      <div className="site-shell flex min-w-0 items-center justify-between gap-4 py-3">
        <a className="brand-link" href={BASE} translate="no">
          World Political Structures
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <a className="nav-link" aria-current={active === 'directory' ? 'page' : undefined} href={BASE}>
            Directory
          </a>
          <a
            className="nav-link"
            aria-current={active === 'map' ? 'page' : undefined}
            href={`${BASE}map/`}
          >
            3D map
          </a>
        </nav>
      </div>
    </header>
  )
}
