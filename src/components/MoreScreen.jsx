import { useMemo, useRef, useState } from 'react'
import { activities, contacts, defaultTimes, quickTips } from '../data/tripData.js'
import {
  exportAllState,
  importAllState,
  resetAllState,
  useLocalStorage,
} from '../lib/storage.js'

export default function MoreScreen({ times, setTimes, onImported }) {
  const [activityState, setActivityState] = useLocalStorage('activities', {})
  const [tipSeen, setTipSeen] = useLocalStorage('firstRunTipSeen', false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef(null)

  const mergedActivities = useMemo(
    () =>
      activities.map((a) => ({
        ...a,
        choice: activityState[a.id]?.choice ?? a.defaultChoice,
        finalPrice: activityState[a.id]?.finalPrice ?? '',
      })),
    [activityState],
  )

  const estimate = useMemo(() => {
    return mergedActivities.reduce((sum, a) => {
      if (a.choice !== 'yes' && a.choice !== 'maybe') return sum
      const price = Number(a.finalPrice || a.voucherPrice) || 0
      return sum + price * 2
    }, 0)
  }, [mergedActivities])

  function updateTime(key, value) {
    setTimes((prev) => ({ ...prev, [key]: value }))
  }

  function patchActivity(id, patch) {
    setActivityState((prev) => ({
      ...prev,
      [id]: { choice: 'maybe', finalPrice: '', ...prev[id], ...patch },
    }))
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(exportAllState(), null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `andaman-trip-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Backup downloaded.')
  }

  function onImportFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        importAllState(data)
        setMsg('Backup restored. Reloading…')
        onImported?.()
        setTimeout(() => window.location.reload(), 400)
      } catch {
        setMsg('Could not import that file.')
      }
    }
    reader.readAsText(file)
  }

  function resetAll() {
    if (!window.confirm('Reset all saved data on this phone? This cannot be undone.')) return
    resetAllState()
    setMsg('Reset complete. Reloading…')
    setTimeout(() => window.location.reload(), 400)
  }

  return (
    <section className="screen">
      {!tipSeen && (
        <div className="card">
          <h2 className="section-title">Install & backup</h2>
          <p className="muted">
            On iPhone: Safari → Share → Add to Home Screen. After your first online visit, the app
            works offline. Export a backup from this screen before the trip.
          </p>
          <button type="button" className="btn secondary" onClick={() => setTipSeen(true)}>
            Got it
          </button>
        </div>
      )}

      <div className="card stack">
        <h2 className="section-title">Times</h2>
        <div className="field">
          <label htmlFor="flightArrival">Flight arrival 30 Dec (IXZ)</label>
          <input
            id="flightArrival"
            type="time"
            value={times.flightArrival || defaultTimes.flightArrival}
            onChange={(e) => updateTime('flightArrival', e.target.value)}
          />
          <span className="small muted">{defaultTimes.flightArrivalNote}</span>
        </div>
        <div className="field">
          <label htmlFor="ferryJan1">Ferry 1 Jan Port Blair → Havelock (Nautika)</label>
          <input
            id="ferryJan1"
            type="time"
            value={times.ferryJan1 || ''}
            onChange={(e) => updateTime('ferryJan1', e.target.value)}
          />
          <span className="small muted">Arrives {times.ferryJan1Arrive || '09:15'}</span>
        </div>
        <div className="field">
          <label htmlFor="ferryJan3">Ferry 3 Jan Havelock → Neil (Green Ocean)</label>
          <input
            id="ferryJan3"
            type="time"
            value={times.ferryJan3 || ''}
            onChange={(e) => updateTime('ferryJan3', e.target.value)}
          />
          <span className="small muted">Arrives Neil {times.ferryJan3Arrive || '10:30'}</span>
        </div>
        <div className="field">
          <label htmlFor="ferryJan4">Ferry 4 Jan Neil → Port Blair Haddo Gate-3</label>
          <input
            id="ferryJan4"
            type="time"
            value={times.ferryJan4 || ''}
            onChange={(e) => updateTime('ferryJan4', e.target.value)}
          />
          <span className="small muted">Arrives {times.ferryJan4Arrive || '12:45'}</span>
        </div>
        <div className="field">
          <label htmlFor="returnFlight">Return flight 5 Jan (IXZ depart)</label>
          <input
            id="returnFlight"
            type="time"
            value={times.returnFlight || ''}
            onChange={(e) => updateTime('returnFlight', e.target.value)}
          />
          <span className="small muted">
            Arrives BOM {times.returnFlightArrive || '15:20'}
          </span>
        </div>
        <div className="field">
          <label htmlFor="wakeOffset">Wake-up offset (hours before boat)</label>
          <input
            id="wakeOffset"
            type="number"
            min="0"
            max="6"
            step="0.5"
            value={times.wakeOffsetHours ?? 2}
            onChange={(e) => updateTime('wakeOffsetHours', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Activities</h2>
        <p className="muted small">
          Preferences: scuba both = Yes, Jet Ski both = Yes, Night kayaking = Maybe, Snorkelling =
          Optional. Estimate uses price × 2 for Yes/Maybe.
        </p>
        <div className="activity-grid" style={{ marginTop: 10 }}>
          {mergedActivities.map((a) => (
            <div key={a.id} className="activity-row">
              <strong>{a.label}</strong>
              <span className="small muted">Voucher ₹{a.voucherPrice}/person</span>
              <div className="row">
                <select
                  aria-label={`${a.label} choice`}
                  value={a.choice}
                  onChange={(e) => patchActivity(a.id, { choice: e.target.value })}
                  style={{ minHeight: 44, flex: 1, borderRadius: 12, padding: '0 10px' }}
                >
                  <option value="yes">Yes</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">No</option>
                </select>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Final ₹"
                  aria-label={`${a.label} final price`}
                  value={a.finalPrice}
                  onChange={(e) => patchActivity(a.id, { finalPrice: e.target.value })}
                  style={{
                    minHeight: 44,
                    width: 110,
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    padding: '0 10px',
                    background: 'var(--card)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12 }}>
          <strong>Estimated total (couple):</strong> ₹{estimate.toLocaleString('en-IN')}
        </p>
      </div>

      <div className="card stack">
        <h2 className="section-title">Contacts</h2>
        {contacts.map((c) => (
          <a key={c.id} className="btn-call" href={`tel:${c.phone}`}>
            {c.label}
            <span className="small muted" style={{ marginLeft: 8 }}>
              {c.display}
            </span>
          </a>
        ))}
      </div>

      <div className="card">
        <h2 className="section-title">Quick tips</h2>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
          {quickTips.map((t) => (
            <li key={t} className="muted">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="card stack">
        <h2 className="section-title">Backup</h2>
        <button type="button" className="btn block" onClick={exportBackup}>
          Export backup
        </button>
        <button type="button" className="btn secondary block" onClick={() => fileRef.current?.click()}>
          Import backup
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={onImportFile}
        />
        <button type="button" className="btn danger block" onClick={resetAll}>
          Reset all
        </button>
        {msg && <p className="muted small">{msg}</p>}
      </div>
    </section>
  )
}
