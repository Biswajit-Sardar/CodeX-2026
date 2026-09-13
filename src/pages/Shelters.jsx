import { Home, Cross, Navigation } from 'lucide-react'
import { getNearbyShelters } from '../data/mockData.js'

export default function Shelters() {
  const places = getNearbyShelters()

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <h1>Nearby shelters &amp; hospitals</h1>
          <p className="page-head__sub">
            Backed by the Google Maps Places API in production — sorted by distance from you.
          </p>
        </div>
        <span className="tag tag--during">{places.length} nearby</span>
      </div>

      <div className="grid-2" style={{ marginTop: 20 }}>
        {places.map((p) => {
          const isShelter = p.type === 'Shelter'
          return (
            <div key={p.id} className="panel entity-card">
              <div className={`entity-card__icon entity-card__icon--${isShelter ? 'before' : 'after'}`}>
                {isShelter ? <Home size={17} /> : <Cross size={17} />}
              </div>
              <div style={{ flex: 1 }}>
                <div className="entity-card__row">
                  <h3 style={{ fontSize: 14.5 }}>{p.name}</h3>
                  <span className={`tag tag--${isShelter ? 'before' : 'after'}`}>{p.type}</span>
                </div>
                <div className="entity-card__meta">{p.distanceKm} km away · {p.capacity}</div>
                <a
                  className="entity-card__link"
                  href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=16/${p.lat}/${p.lng}`}
                  target="_blank" rel="noreferrer"
                >
                  <Navigation size={13} /> Directions
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
