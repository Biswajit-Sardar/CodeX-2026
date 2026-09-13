import { Phone } from 'lucide-react'
import { getRescueTeams } from '../data/mockData.js'

export default function RescueTeams() {
  const teams = getRescueTeams()

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <h1>Rescue teams &amp; volunteer network</h1>
          <p className="page-head__sub">
            Government units, NGOs and campus volunteers coordinated from one directory.
          </p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Type</th>
              <th>Specialty</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 600 }}>{t.name}</td>
                <td style={{ color: 'var(--text-dim)' }}>{t.type}</td>
                <td style={{ color: 'var(--text-dim)' }}>{t.specialty}</td>
                <td><span className={`tag tag--${t.status === 'Active' ? 'after' : 'before'}`}>{t.status}</span></td>
                <td>
                  <a href={`tel:${t.contact.replace(/\s/g, '')}`} className="row-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <Phone size={13} /> {t.contact}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
