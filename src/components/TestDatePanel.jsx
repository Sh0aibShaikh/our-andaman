import { getStoredTestDate, setStoredTestDate, toIndiaDateString } from '../lib/dates.js'

export default function TestDatePanel({ open, onClose, onChange, currentDate }) {
  if (!open) return null
  const usingTest = Boolean(getStoredTestDate())

  return (
    <div className="card test-panel">
      <div className="row-between">
        <strong>Test date</strong>
        <button type="button" className="btn ghost" onClick={onClose}>
          Close
        </button>
      </div>
      <p className="muted small">
        Preview any day. Currently {usingTest ? 'using override' : 'using real India date'} (
        {currentDate}).
      </p>
      <div className="field">
        <label htmlFor="test-date">Override today</label>
        <input
          id="test-date"
          type="date"
          value={currentDate}
          onChange={(e) => {
            setStoredTestDate(e.target.value)
            onChange()
          }}
        />
      </div>
      <button
        type="button"
        className="btn secondary block"
        onClick={() => {
          setStoredTestDate(null)
          onChange()
        }}
      >
        Use real date ({toIndiaDateString()})
      </button>
    </div>
  )
}
