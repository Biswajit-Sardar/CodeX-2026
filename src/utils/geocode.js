/**
 * Place search via OpenStreetMap's free Nominatim API — no API key needed,
 * good enough for a hackathon demo. Swap for the Google Maps Places
 * Autocomplete API in production for better ranking and quota headroom.
 *
 * Nominatim's usage policy asks for light request rates — the AreaSearch
 * component debounces input by 400ms before calling this.
 */
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

export async function searchPlaces(query, limit = 5) {
  if (!query || query.trim().length < 2) return []

  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    addressdetails: '1',
    limit: String(limit),
  })

  const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
    headers: { 'Accept-Language': 'en' },
  })

  if (!res.ok) throw new Error('Geocoding request failed')

  const data = await res.json()
  return data.map((d) => ({
    name: d.display_name,
    shortName: d.display_name.split(',')[0],
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
  }))
}
