import { GROUP_COLORS, GROUP_LABELS, type CountryRecord } from '../lib/countries'

export function CountryDetail({ country }: { country: CountryRecord }) {
  return (
    <section className="detail-panel" aria-labelledby="country-detail-title">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h2 id="country-detail-title" className="detail-title">
          {country.country}
        </h2>
        <span
          className="mt-2 size-3.5 shrink-0 rounded-full"
          style={{ backgroundColor: GROUP_COLORS[country.group] }}
          aria-label={country.group}
        />
      </div>
      <dl className="detail-grid">
        <div>
          <dt>Top political assignment</dt>
          <dd>{country.assignment}</dd>
        </div>
        <div>
          <dt>Government structure</dt>
          <dd>{country.system}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{GROUP_LABELS[country.group]}</dd>
        </div>
        <div className="detail-hierarchy">
          <dt>Political hierarchy</dt>
          <dd>{country.hierarchy}</dd>
        </div>
      </dl>
      {country.note ? <p className="detail-note">{country.note}</p> : null}
    </section>
  )
}
