import { useEffect, useRef, useState } from 'react'
import { Search, Loader2, MapPin } from 'lucide-react'
import { searchPlaces } from '../utils/geocode.js'

export default function AreaSearch({ placeholder = 'Search a place…', onSelect, compact = false, autoFocus = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)
    setOpen(true)
    clearTimeout(debounceRef.current)

    if (value.trim().length < 2) {
      setResults([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const places = await searchPlaces(value)
        setResults(places)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)
  }

  function handleSelect(place) {
    setQuery(place.shortName)
    setResults([])
    setOpen(false)
    onSelect?.(place)
  }

  return (
    <div ref={boxRef} className="area-search">
      <div className="area-search__field">
        <Search size={14} className="area-search__icon" />
        <input
          className={`area-search__input ${compact ? 'area-search__input--compact' : ''}`}
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {loading && <Loader2 size={14} className="spin area-search__spinner" />}
      </div>

      {open && results.length > 0 && (
        <div className="area-search__dropdown">
          {results.map((r, i) => (
            <button key={`${r.lat}-${r.lon}-${i}`} className="area-search__option" onClick={() => handleSelect(r)}>
              <MapPin size={13} className="area-search__pin" />
              <span>{r.name}</span>
            </button>
          ))}
        </div>
      )}

      {open && !loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="area-search__dropdown">
          <div className="area-search__empty">No places found for "{query}"</div>
        </div>
      )}
    </div>
  )
}
