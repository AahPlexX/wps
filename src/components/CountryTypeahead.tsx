import { useId, useMemo, useState, type RefObject } from 'react'
import { countryTypeaheadMatches } from '../lib/countries'
import './CountryTypeahead.css'

interface CountryTypeaheadProps {
  countryNames: string[]
  value: string
  onValueChange: (value: string) => void
  onSelect: (country: string) => void
  onSubmit: () => void
  inputRef: RefObject<HTMLInputElement | null>
}

export function CountryTypeahead({
  countryNames,
  value,
  onValueChange,
  onSelect,
  onSubmit,
  inputRef,
}: CountryTypeaheadProps) {
  const inputId = useId()
  const listboxId = `${inputId}-listbox`
  const locale = navigator.language || 'en-US'
  const matches = useMemo(
    () => countryTypeaheadMatches(countryNames, value, locale),
    [countryNames, locale, value],
  )
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const visible = open && value.trim().length > 0 && matches.length > 0

  function commit(country: string) {
    onSelect(country)
    setOpen(false)
    setActiveIndex(-1)
  }

  function moveActive(direction: 1 | -1) {
    if (!matches.length) return
    setOpen(true)
    setActiveIndex((current) => {
      if (current < 0) return direction > 0 ? 0 : matches.length - 1
      return (current + direction + matches.length) % matches.length
    })
  }

  return (
    <label className="field min-w-0 typeahead-field" htmlFor={inputId}>
      <span>Find a country</span>
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        name="country"
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={visible}
        aria-controls={listboxId}
        aria-activedescendant={
          visible && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        value={value}
        onFocus={() => setOpen(value.trim().length > 0)}
        onBlur={() => {
          setOpen(false)
          setActiveIndex(-1)
        }}
        onChange={(event) => {
          const nextValue = event.target.value
          onValueChange(nextValue)
          setOpen(nextValue.trim().length > 0)
          setActiveIndex(-1)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            moveActive(1)
            return
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            moveActive(-1)
            return
          }
          if (event.key === 'Escape') {
            if (open) event.preventDefault()
            setOpen(false)
            setActiveIndex(-1)
            return
          }
          if (event.key === 'Enter') {
            event.preventDefault()
            if (visible && activeIndex >= 0) commit(matches[activeIndex])
            else onSubmit()
          }
        }}
      />

      <span className="sr-only" aria-live="polite">
        {value.trim() ? `${matches.length} ${matches.length === 1 ? 'country' : 'countries'} match` : ''}
      </span>

      {visible ? (
        <div id={listboxId} className="typeahead-listbox" role="listbox" aria-label="Matching countries">
          {matches.map((country, index) => (
            <button
              key={country}
              id={`${listboxId}-option-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              className="typeahead-option"
              onMouseEnter={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => commit(country)}
            >
              {country}
            </button>
          ))}
        </div>
      ) : null}
    </label>
  )
}
