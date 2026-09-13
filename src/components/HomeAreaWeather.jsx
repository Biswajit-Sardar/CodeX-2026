import { useState } from 'react'
import { CloudSun, Pencil, X } from 'lucide-react'
import { useArea } from '../context/AreaContext.jsx'
import { getAreaSnapshot } from '../utils/mockArea.js'
import AreaSearch from './AreaSearch.jsx'

export default function HomeAreaWeather() {
  const { homeArea, setHomeArea } = useArea()
  const [editing, setEditing] = useState(false)
  const snap = getAreaSnapshot(homeArea.name)

  return (
    <div className="home-weather">
      <div className="home-weather__label">
        MY AREA
        {!editing && (
          <button className="home-weather__edit" onClick={() => setEditing(true)} aria-label="Change area">
            <Pencil size={11} />
          </button>
        )}
      </div>

      {editing ? (
        <div className="home-weather__edit-panel">
          <AreaSearch
            compact
            autoFocus
            placeholder="Search your area…"
            onSelect={(place) => {
              setHomeArea({ name: place.name, lat: place.lat, lon: place.lon })
              setEditing(false)
            }}
          />
          <button className="home-weather__cancel" onClick={() => setEditing(false)}>
            <X size={12} /> Cancel
          </button>
        </div>
      ) : (
        <div className="home-weather__body">
          <CloudSun size={18} className="home-weather__icon" />
          <div>
            <div className="home-weather__temp">{snap.tempC}°C · {snap.condition}</div>
            <div className="home-weather__place">{homeArea.name.split(',')[0]}</div>
          </div>
        </div>
      )}
    </div>
  )
}
