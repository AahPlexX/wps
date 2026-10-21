import type { CountryRecord } from '../lib/countries'

export function CountryTable({ countries }: { countries: CountryRecord[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Top state office</th>
            <th scope="col">Government structure</th>
            <th scope="col">Political hierarchy</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td className="country-cell" data-label="Country">
                {country.country}
              </td>
              <td className="assignment-cell" data-label="Top state office">
                {country.assignment}
                {country.note ? <div className="country-note">{country.note}</div> : null}
              </td>
              <td data-label="Government structure">{country.system}</td>
              <td className="hierarchy-cell" data-label="Political hierarchy">
                {country.hierarchy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
