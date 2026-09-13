import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'lucide-react'
import { getActiveSOS } from '../data/mockData.js'
import AreaSearch from '../components/AreaSearch.jsx'

// Default Leaflet marker icons don't load correctly via bundlers unless
// re-pointed at the CDN — this is a well-known Leaflet + Vite fix.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const KGP_CENTER = [22.3460, 87.2320]

function FlyToPlace({ place }) {
  const map = useMap()
  useEffect(() => {
    if (place) map.flyTo([place.lat, place.lon], 14, { duration: 1.1 })
  }, [place, map])
  return null
}

export default function LiveMap() {
  const [position, setPosition] = useState(null)
  const [status, setStatus] = useState('idle')
  const [searchedPlace, setSearchedPlace] = useState(null)
  const sos = getActiveSOS()

  function locateMe() {
    if (!navigator.geolocation) { setStatus('unsupported'); return }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude])
        setSearchedPlace(null)
        setStatus('located')
      },
      () => setStatus('denied'),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  useEffect(() => { locateMe() }, [])

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <h1>Live location &amp; SOS map</h1>
          <p className="page-head__sub">
            Uses the browser Geolocation API. In production this feeds the
            "Live Location &amp; Mapping" node in your workflow diagram.
          </p>
        </div>
        <button onClick={locateMe} className="btn btn--dark">Re-center on me</button>
      </div>

      <div className="map-toolbar">
        <div className="map-toolbar__search">
          <div className="dashboard-search__label">Jump to an area</div>
          <AreaSearch
            placeholder="Search a locality, city, landmark…"
            onSelect={(place) => setSearchedPlace(place)}
          />
        </div>
        {searchedPlace && (
          <div className="map-toolbar__chip">
            <MapPin size={13} /> {searchedPlace.shortName}
          </div>
        )}
      </div>

      <div className="panel map-panel">
        <MapContainer center={position || KGP_CENTER} zoom={13} style={{ height: 480, width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToPlace place={searchedPlace} />

          {position && !searchedPlace && (
            <>
              <Marker position={position}>
                <Popup>You are here</Popup>
              </Marker>
              <Circle center={position} radius={400} pathOptions={{ color: '#2b5b8c', fillOpacity: 0.08 }} />
            </>
          )}

          {searchedPlace && (
            <Marker position={[searchedPlace.lat, searchedPlace.lon]}>
              <Popup>{searchedPlace.name}</Popup>
            </Marker>
          )}

          {sos.map((s, i) => (
            <Marker key={s.id} position={[KGP_CENTER[0] + i * 0.01, KGP_CENTER[1] + i * 0.008]}>
              <Popup>
                <strong>{s.id}</strong><br />
                {s.name}<br />
                {s.location}<br />
                Status: {s.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="map-status">
        {status === 'locating' && 'Locating you…'}
        {status === 'denied' && 'Location permission denied — showing default region view.'}
        {status === 'unsupported' && 'Geolocation is not supported in this browser.'}
        {status === 'located' && !searchedPlace && 'Location found. Red markers are active SOS signals in the area.'}
        {searchedPlace && `Showing ${searchedPlace.name}.`}
      </p>
    </div>
  )
}
