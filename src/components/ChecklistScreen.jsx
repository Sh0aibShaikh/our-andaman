import { useMemo, useState } from 'react'
import { checklistGroups } from '../data/tripData.js'
import { useLocalStorage } from '../lib/storage.js'

export default function ChecklistScreen() {
  const [checked, setChecked] = useLocalStorage('checklist', {})
  const [custom, setCustom] = useLocalStorage('customChecklist', [])
  const [draft, setDraft] = useState('')

  const allItems = useMemo(() => {
    const base = checklistGroups.flatMap((g) => g.items)
    return [...base, ...custom]
  }, [custom])

  const overallDone = allItems.filter((i) => checked[i.id]).length
  const overallTotal = allItems.length

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function addCustom(e) {
    e.preventDefault()
    const label = draft.trim()
    if (!label) return
    const id = `custom-${Date.now()}`
    setCustom((prev) => [...prev, { id, label, custom: true }])
    setDraft('')
  }

  function removeCustom(id) {
    setCustom((prev) => prev.filter((i) => i.id !== id))
    setChecked((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  return (
    <section className="screen">
      <div className="card">
        <h2 className="section-title">Packing checklist</h2>
        <p className="muted">
          {overallDone}/{overallTotal} done
        </p>
        <div className="progress-bar">
          <span style={{ width: `${Math.round((overallDone / (overallTotal || 1)) * 100)}%` }} />
        </div>
      </div>

      {checklistGroups.map((group) => {
        const done = group.items.filter((i) => checked[i.id]).length
        return (
          <div key={group.id} className="card">
            <div className="row-between">
              <h2 className="section-title">{group.title}</h2>
              <span className="pill">
                {done}/{group.items.length}
              </span>
            </div>
            {group.items.map((item) => (
              <div key={item.id} className={`check-item ${checked[item.id] ? 'done' : ''}`}>
                <input
                  id={item.id}
                  type="checkbox"
                  checked={Boolean(checked[item.id])}
                  onChange={() => toggle(item.id)}
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
            ))}
          </div>
        )
      })}

      <div className="card">
        <div className="row-between">
          <h2 className="section-title">Custom items</h2>
          <span className="pill">
            {custom.filter((i) => checked[i.id]).length}/{custom.length}
          </span>
        </div>
        {custom.map((item) => (
          <div key={item.id} className={`check-item ${checked[item.id] ? 'done' : ''}`}>
            <input
              id={item.id}
              type="checkbox"
              checked={Boolean(checked[item.id])}
              onChange={() => toggle(item.id)}
            />
            <label htmlFor={item.id}>{item.label}</label>
            <button
              type="button"
              className="delete-btn"
              aria-label={`Delete ${item.label}`}
              onClick={() => removeCustom(item.id)}
            >
              ×
            </button>
          </div>
        ))}
        <form className="row" onSubmit={addCustom} style={{ marginTop: 8 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add item"
            aria-label="Add checklist item"
            style={{
              flex: 1,
              minHeight: 44,
              borderRadius: 12,
              border: '1px solid var(--border)',
              padding: '0 12px',
              background: 'var(--card)',
            }}
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    </section>
  )
}
