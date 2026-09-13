import { useNavigate, useParams } from 'react-router-dom'
import { AlertTriangle, CloudRain, Radio, TrendingUp, ArrowLeft } from 'lucide-react'
import { getActiveSOS } from '../data/mockData.js'
import { getAreaSnapshot } from '../utils/mockArea.js'
import { useArea } from '../context/AreaContext.jsx'
import AreaSearch from '../components/AreaSearch.jsx'

export default function Dashboard() {
  const { areaName } = useParams()
  const navigate = useNavigate()
  const { homeArea } = useArea()

  const isOtherArea = Boolean(areaName)
  const effectiveName = isOtherArea ? decodeURIComponent(areaName) : homeArea.name
  const snap = getAreaSnapshot(effectiveName)

  const firstToken = effectiveName.split(',')[0].trim().toLowerCase()
  const allSos = getActiveSOS()
  const matchingSos = allSos.filter((s) => s.location.toLowerCase().includes(firstToken))
  const sos = isOtherArea ? matchingSos : allSos

  function goToArea(place) {
    navigate(`/area/${encodeURIComponent(place.name)}`)
  }

  function goToAreaFromLocation(location) {
    navigate(`/area/${encodeURIComponent(location)}`)
  }

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          {isOtherArea && (
            <button className="back-link" onClick={() => navigate('/')}>
              <ArrowLeft size={13} /> Back to my area
            </button>
          )}
          <h1>{isOtherArea ? effectiveName.split(',')[0] : 'Situation overview'}</h1>
          <p className="page-head__sub">
            {effectiveName} — updated {new Date(snap.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="dashboard-search">
          <div className="dashboard-search__label">Check another area</div>
          <AreaSearch placeholder="Search any place…" onSelect={goToArea} />
        </div>
      </div>

      <div className="timeline-rail">
        <div className="timeline-rail__phase timeline-rail__phase--before"><span className="dot" /> BEFORE — Preparedness &amp; Planning</div>
        <div className="timeline-rail__phase timeline-rail__phase--during"><span className="dot" /> DURING — Live Coordination</div>
        <div className="timeline-rail__phase timeline-rail__phase--after"><span className="dot" /> AFTER — Relief &amp; Recovery</div>
      </div>

      <div className="grid-3">
        <StatCard icon={TrendingUp} label={`Risk score — ${snap.riskLevel}`} value={snap.riskScore} suffix="/ 100" tone="before" />
        <StatCard icon={Radio} label="Active SOS signals here" value={sos.length} tone="during" />
        <StatCard icon={CloudRain} label="Weather alerts" value={snap.alerts.length} tone="before" />
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="panel">
          <PanelHead title="AI risk prediction" tag="before" />
          <p className="risk-hazard">{snap.hazard}</p>
          <p className="risk-note">
            Model confidence is based on rainfall trend, river gauge levels and historical hazard
            zones for this area. Feeds the Early Warning System module.
          </p>
        </div>

        <div className="panel">
          <PanelHead title="Weather alerts" tag="before" />
          <div className="alert-list">
            {snap.alerts.map((a) => (
              <div key={a.id} className="alert-row">
                <AlertTriangle size={15} className="alert-row__icon" />
                <div>
                  <div className="alert-row__title">{a.title} <span className="alert-row__time">{a.issuedAt}</span></div>
                  <div className="alert-row__detail">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <PanelHead title="Live SOS feed" tag="during" />
        {sos.length === 0 ? (
          <p className="empty-state">No active SOS signals reported in {effectiveName.split(',')[0]} right now.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Caller</th>
                <th>Location</th>
                <th>ETA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sos.map((s) => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td>{s.name}</td>
                  <td>
                    <button className="row-link" onClick={() => goToAreaFromLocation(s.location)}>
                      {s.location}
                    </button>
                  </td>
                  <td>{s.eta}</td>
                  <td><StatusTag status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function PanelHead({ title, tag }) {
  return (
    <div className="panel-head">
      <h3>{title}</h3>
      <span className={`tag tag--${tag}`}>{tag.toUpperCase()}</span>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, suffix, tone }) {
  return (
    <div className={`panel stat-card stat-card--${tone}`}>
      <div className={`stat-card__icon stat-card__icon--${tone}`}>
        <Icon size={16} />
      </div>
      <div className="stat-card__value">
        {value}{suffix && <span className="stat-card__suffix"> {suffix}</span>}
      </div>
      <div className="stat-card__label">{label}</div>
    </div>
  )
}

function StatusTag({ status }) {
  const map = { dispatched: 'after', acknowledged: 'before', pending: 'during' }
  return <span className={`tag tag--${map[status] || 'before'}`}>{status}</span>
}
