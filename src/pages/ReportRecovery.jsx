/*import { useState } from 'react'
import { getRecentReports } from '../data/mockData.js'

export default function ReportRecovery() {
  const [form, setForm] = useState({ area: '', severity: 'Low', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const reports = getRecentReports()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Real version: POST to the "Damage Reporting" endpoint shown in the
    // AFTER phase of the workflow diagram, then refresh the list below.
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ area: '', severity: 'Low', description: '' })
  }

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <h1>Damage reports &amp; recovery tracking</h1>
          <p className="page-head__sub">
            Citizens file reports here; relief coordination and recovery tracking pick up from there.
          </p>
        </div>
        <span className="tag tag--after">AFTER PHASE</span>
      </div>

      <div className="grid-2" style={{ marginTop: 20, alignItems: 'start' }}>
        <form className="panel" onSubmit={handleSubmit}>
          <h3 style={{ fontSize: 14.5, marginBottom: 14 }}>File a damage report</h3>

          <label className="form-label">Area / locality</label>
          <input
            required name="area" value={form.area} onChange={handleChange}
            placeholder="e.g. Nimpura" className="form-field"
          />

          <label className="form-label">Severity</label>
          <select name="severity" value={form.severity} onChange={handleChange} className="form-field">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label className="form-label">Description</label>
          <textarea
            required name="description" value={form.description} onChange={handleChange}
            placeholder="What happened, and what help is needed?" rows={4}
            className="form-field" style={{ resize: 'vertical' }}
          />

          <button type="submit" className="form-submit">Submit report</button>
          {submitted && <p className="form-success">Report submitted — a team will review it shortly.</p>}
        </form>

        <div className="panel">
          <h3 style={{ fontSize: 14.5, marginBottom: 14 }}>Recent reports</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {reports.map((r) => (
              <div key={r.id} className="report-item">
                <div className="report-item__row">
                  <span className="report-item__area">{r.area}</span>
                  <span className={`tag tag--${r.severity === 'High' ? 'during' : r.severity === 'Medium' ? 'before' : 'after'}`}>{r.severity}</span>
                </div>
                <p className="report-item__desc">{r.description}</p>
                <div className="report-item__meta">{r.reportedAt} · {r.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
*/


import { useState } from 'react'
import { getRecentReports } from '../data/mockData.js'

export default function ReportRecovery() {
  const [form, setForm] = useState({ area: '', severity: 'Low', description: '' })
  const [submitted, setSubmitted] = useState(false)
  // reports-কে state হিসেবে রাখা হলো
  const [reports, setReports] = useState(getRecentReports())

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // নতুন রিপোর্ট তৈরি করা হচ্ছে
    const newReport = {
      id: Date.now(),
      area: form.area,
      severity: form.severity,
      description: form.description,
      reportedAt: 'Just now',
      status: 'Under Review'
    }

    // তালিকার শুরুতে নতুন রিপোর্ট যুক্ত করা হচ্ছে
    setReports([newReport, ...reports])

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ area: '', severity: 'Low', description: '' })
  }

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <h1>Damage reports &amp; recovery tracking</h1>
          <p className="page-head__sub">
            Citizens file reports here; relief coordination and recovery tracking pick up from there.
          </p>
        </div>
        <span className="tag tag--after">AFTER PHASE</span>
      </div>

      <div className="grid-2" style={{ marginTop: 20, alignItems: 'start' }}>
        <form className="panel" onSubmit={handleSubmit}>
          <h3 style={{ fontSize: 14.5, marginBottom: 14 }}>File a damage report</h3>

          <label className="form-label">Area / locality</label>
          <input
            required name="area" value={form.area} onChange={handleChange}
            placeholder="e.g. Nimpura" className="form-field"
          />

          <label className="form-label">Severity</label>
          <select name="severity" value={form.severity} onChange={handleChange} className="form-field">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label className="form-label">Description</label>
          <textarea
            required name="description" value={form.description} onChange={handleChange}
            placeholder="What happened, and what help is needed?" rows={4}
            className="form-field" style={{ resize: 'vertical' }}
          />

          <button type="submit" className="form-submit">Submit report</button>
          {submitted && <p className="form-success">Report submitted — a team will review it shortly.</p>}
        </form>

        <div className="panel">
          <h3 style={{ fontSize: 14.5, marginBottom: 14 }}>Recent reports</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {reports.map((r) => (
              <div key={r.id} className="report-item">
                <div className="report-item__row">
                  <span className="report-item__area">{r.area}</span>
                  <span className={`tag tag--${r.severity === 'High' ? 'during' : r.severity === 'Medium' ? 'before' : 'after'}`}>{r.severity}</span>
                </div>
                <p className="report-item__desc">{r.description}</p>
                <div className="report-item__meta">{r.reportedAt} · {r.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}