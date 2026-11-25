import { verifyItems } from '../data/tripData.js'
import { useLocalStorage } from '../lib/storage.js'

export default function VerifyScreen() {
  const [state, setState] = useLocalStorage('verify', {})

  const done = verifyItems.filter((v) => state[v.id]?.done).length

  function patch(id, patch) {
    setState((prev) => ({
      ...prev,
      [id]: { done: false, notes: '', ...prev[id], ...patch },
    }))
  }

  return (
    <section className="screen">
      <div className="card">
        <h2 className="section-title">Confirm with agent</h2>
        <p className="muted">
          {done}/{verifyItems.length} checked · notes stay on this phone only
        </p>
        <div className="progress-bar">
          <span style={{ width: `${Math.round((done / verifyItems.length) * 100)}%` }} />
        </div>
      </div>

      {verifyItems.map((item) => {
        const entry = state[item.id] || { done: false, notes: '' }
        return (
          <div key={item.id} className="card">
            <div className={`check-item ${entry.done ? 'done' : ''}`}>
              <input
                id={item.id}
                type="checkbox"
                checked={Boolean(entry.done)}
                onChange={() => patch(item.id, { done: !entry.done })}
              />
              <label htmlFor={item.id}>
                {item.label}
                {item.critical && (
                  <span className="pill optional" style={{ marginLeft: 6 }}>
                    Critical
                  </span>
                )}
              </label>
            </div>
            <div className="field" style={{ marginTop: 8 }}>
              <label htmlFor={`${item.id}-notes`}>Notes</label>
              <textarea
                id={`${item.id}-notes`}
                value={entry.notes || ''}
                onChange={(e) => patch(item.id, { notes: e.target.value })}
                placeholder="What the agent said…"
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
