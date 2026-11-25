import { useState } from 'react'
import { complimentaryUnscheduled, days } from '../data/tripData.js'
import { formatDisplayDate } from '../lib/dates.js'

export default function ItineraryScreen({ today, times }) {
  const [open, setOpen] = useState(() => {
    const idx = days.findIndex((d) => d.date === today)
    return idx >= 0 ? days[idx].day : 1
  })

  function copyDay(day) {
    const lines = [
      `Day ${day.day} — ${day.weekday} ${formatDisplayDate(day.date)}`,
      day.route,
      day.hotel ? `Stay: ${day.hotel} · ${day.room} · ${day.mealPlan}` : '',
      day.ferry
        ? `Ferry: ${day.ferry.operator} ${times[day.ferry.timeKey] || ''} (${day.ferry.from} → ${day.ferry.to})`
        : '',
      'Booked:',
      ...day.booked.map((b) => `• ${b}`),
      day.optional.length ? 'Optional:' : '',
      ...day.optional.map((b) => `• ${b}`),
      ...day.foodTips.map((t) => `Food: ${t}`),
      ...day.notes.map((n) => `Note: ${n}`),
    ].filter(Boolean)
    const text = lines.join('\n')
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
    } else {
      window.prompt('Copy day summary', text)
    }
  }

  return (
    <section className="screen">
      <div className="card">
        <h2 className="section-title">7-day itinerary</h2>
        <p className="muted">Tap a day to expand. Today is highlighted.</p>
      </div>

      {days.map((day) => {
        const isToday = day.date === today
        const isOpen = open === day.day
        return (
          <div key={day.day} className={`card ${isToday ? 'highlight' : ''}`}>
            <button
              type="button"
              className="expand-btn"
              onClick={() => setOpen(isOpen ? null : day.day)}
              aria-expanded={isOpen}
            >
              <div className="row-between">
                <div>
                  <strong>
                    Day {day.day} · {day.weekday}
                  </strong>
                  <div className="muted small">
                    {formatDisplayDate(day.date)} · {day.location}
                  </div>
                </div>
                <span className="pill">{isOpen ? '−' : '+'}</span>
              </div>
            </button>

            {isOpen && (
              <div className="panel stack">
                <p style={{ margin: 0 }}>
                  <strong>Route:</strong> {day.route}
                </p>
                {day.hotel && (
                  <p style={{ margin: 0 }}>
                    <strong>Stay:</strong> {day.hotel} · {day.room} · {day.mealPlan}
                  </p>
                )}
                {day.ferry && (
                  <p style={{ margin: 0 }}>
                    <strong>Ferry:</strong> {day.ferry.operator} ·{' '}
                    {times[day.ferry.timeKey] || 'time TBC'} →{' '}
                    {times[day.ferry.arriveKey] || ''} · {day.ferry.from} → {day.ferry.to}
                  </p>
                )}

                <div>
                  <span className="pill">Booked</span>
                  <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                    {day.booked.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                {day.optional.length > 0 && (
                  <div>
                    <span className="pill optional">Optional / Recommended</span>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                      {day.optional.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.foodTips.map((t) => (
                  <p key={t} className="muted small" style={{ margin: 0 }}>
                    Food tip: {t}
                  </p>
                ))}
                {day.notes.map((n) => (
                  <p key={n} className="muted small" style={{ margin: 0 }}>
                    {n}
                  </p>
                ))}

                <button type="button" className="btn secondary" onClick={() => copyDay(day)}>
                  Copy day summary
                </button>
              </div>
            )}
          </div>
        )
      })}

      <div className="card">
        <h2 className="section-title">Complimentary (dates TBC)</h2>
        <p className="muted small">Listed under Verify — not fixed to a day yet.</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
          {complimentaryUnscheduled.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
