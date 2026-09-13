import { useState } from 'react'
import { Siren, X, MapPin, Loader2, CheckCircle2 } from 'lucide-react'

/**
 * Persistent SOS trigger, present on every page (mirrors the
 * "SOS Activation" node in the platform workflow diagram).
 * Uses the browser Geolocation API — no key required — matching
 * the "Browser Geolocation" box in the Technical Feasibility diagram.
 */
export default function SOSButton() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('idle') // idle | locating | sent | error

  function triggerSOS() {
    setOpen(true)
    setPhase('locating')

    if (!navigator.geolocation) {
      setPhase('error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        // In production: POST { lat, lng, timestamp, userId } to the
        // SOS ingestion endpoint shown as "SOS Activation" in the workflow.
        setTimeout(() => setPhase('sent'), 700)
      },
      () => setPhase('error'),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  function close() {
    setOpen(false)
    setPhase('idle')
  }

  return (
    <>
      <button className="sos-fab" onClick={triggerSOS} aria-label="Send SOS">
        <Siren size={20} strokeWidth={2.3} />
        SOS
      </button>

      {open && (
        <div className="sos-overlay" onClick={close}>
          <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
            <button className="sos-modal__close" onClick={close} aria-label="Close"><X size={18} /></button>

            {phase === 'locating' && (
              <>
                <Loader2 className="spin" size={30} style={{ color: 'var(--during)' }} />
                <h3>Getting your location…</h3>
                <p>Keep this open. We're pinpointing you before alerting responders.</p>
              </>
            )}

            {phase === 'sent' && (
              <>
                <CheckCircle2 size={30} style={{ color: 'var(--after)' }} />
                <h3>SOS sent</h3>
                <p>
                  Your location and profile have been shared with the nearest rescue team
                  and local authorities. Stay where you are if it's safe to do so.
                </p>
                <div className="sos-modal__ref"><MapPin size={14} /> Reference: SOS-{Math.floor(1000 + Math.random() * 9000)}</div>
              </>
            )}

            {phase === 'error' && (
              <>
                <h3>Location unavailable</h3>
                <p>
                  We couldn't access your location. Enable location permissions and try again,
                  or call emergency services directly at 112.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
