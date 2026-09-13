import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import SOSButton from './components/SOSButton.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LiveMap from './pages/LiveMap.jsx'
import Shelters from './pages/Shelters.jsx'
import RescueTeams from './pages/RescueTeams.jsx'
import ReportRecovery from './pages/ReportRecovery.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/area/:areaName" element={<Dashboard />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/rescue-teams" element={<RescueTeams />} />
          <Route path="/report" element={<ReportRecovery />} />
        </Routes>
      </main>
      <SOSButton />
    </div>
  )
}
