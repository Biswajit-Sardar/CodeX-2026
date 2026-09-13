import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MapPin, ShieldPlus, Users, ClipboardList, Radio } from 'lucide-react'
import HomeAreaWeather from './HomeAreaWeather.jsx'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/live-map', label: 'Live Map & SOS', icon: MapPin },
  { to: '/shelters', label: 'Shelters & Hospitals', icon: ShieldPlus },
  { to: '/rescue-teams', label: 'Rescue Teams', icon: Users },
  { to: '/report', label: 'Report & Recovery', icon: ClipboardList },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__mark"><Radio size={18} strokeWidth={2.4} /></div>
        <div>
          <div className="sidebar__name">ResQ360</div>
          <div className="sidebar__sub">SIH 2026 · PS 26206</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <HomeAreaWeather />

      <div className="sidebar__footer">
        <div className="sidebar__footer-label">System status</div>
        <div className="sidebar__footer-row">
          <span className="pulse-dot" />
          All services nominal
        </div>
      </div>
    </aside>
  )
}
