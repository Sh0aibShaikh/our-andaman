import { useEffect, useMemo } from 'react'
import {
  alwaysCarry,
  contacts,
  getDayByDate,
  preTripTodos,
  verifyItems,
} from '../data/tripData.js'
import {
  daysUntilTrip,
  formatDisplayDate,
  getPhase,
  getTomorrow,
  subtractHoursFromTime,
} from '../lib/dates.js'
import { getReminders } from '../lib/reminders.js'
import { useLocalStorage } from '../lib/storage.js'
import WarningBanner from './WarningBanner.jsx'

function CheckList({ items, checked, onToggle }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className={`check-item ${checked[item.id] ? 'done' : ''}`}>
          <input
            id={item.id}
            type="checkbox"
            checked={Boolean(checked[item.id])}
            onChange={() => onToggle(item.id)}
          />
          <label htmlFor={item.id}>{item.label}</label>
        </div>
      ))}
    </div>
  )
}

export default function TodayScreen({ today, times, checklistProgress, verifyState, onGo }) {
  const phase = getPhase(today)
  const day = getDayByDate(today)
  const tomorrow = getTomorrow(today)
  const tomorrowDay = getDayByDate(tomorrow)
  const banners = useMemo(() => getReminders(today, times), [today, times])

  const [preTrip, setPreTrip] = useLocalStorage('preTripTodos', {})
  const [planDone, setPlanDone] = useLocalStorage('dayPlanDone', {})
  const [carryState, setCarryState] = useLocalStorage('carryToday', { date: null, items: {} })
  const [day1Step, setDay1Step] = useLocalStorage('day1Step', 0)
  const [dayNotes, setDayNotes] = useLocalStorage('dayNotes', {})
  const [dayComplete, setDayComplete] = useLocalStorage('dayComplete', {})

  useEffect(() => {
    if (carryState.date !== today) {
      setCarryState({ date: today, items: {} })
    }
  }, [today, carryState.date, setCarryState])

  const carryItems = useMemo(() => {
    const extra = day?.carryExtra || []
    return [...alwaysCarry, ...extra]
  }, [day])

  const urgent = useMemo(() => {
    const items = []
    if (phase === 'before' || phase === 'trip') {
      if (!times.ferryJan1) items.push('Ferry time missing: 1 Jan Port Blair → Havelock')
      if (!times.ferryJan3) items.push('Ferry time missing: 3 Jan Havelock → Neil')
      if (!times.ferryJan4) items.push('Ferry time missing: 4 Jan Neil → Port Blair')
    }
    verifyItems
      .filter((v) => v.critical && !verifyState[v.id]?.done)
      .forEach((v) => items.push(v.label.split(':')[0]))
    return items.slice(0, 4)
  }, [phase, times, verifyState])

  const boatBadge = useMemo(() => {
    if (banners.some((b) => b.id === 'ferry-morning')) {
      const key =
        today === '2027-01-01'
          ? times.ferryJan1
          : today === '2027-01-03'
            ? times.ferryJan3
            : times.ferryJan4
      return `Boat today ${key || ''}`.trim()
    }
    if (banners.some((b) => b.id === 'ferry-night-before')) return 'Boat tomorrow'
    return null
  }, [banners, today, times])

  const wakeFor = (time) => subtractHoursFromTime(time, times.wakeOffsetHours ?? 2)

  function toggleMap(setter, id) {
    setter((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (phase === 'after') {
    return (
      <section className="screen">
        <div className="card thank-you hero-card">
          <p className="thank-eyebrow">Our Andaman</p>
          <h2>Hope you had a wonderful honeymoon</h2>
          <p className="muted">
            May the island blues stay with you both. Export a backup from More if you want to keep
            your notes.
          </p>
          <button type="button" className="btn secondary" onClick={() => onGo('more')}>
            Open More / Backup
          </button>
        </div>
      </section>
    )
  }

  if (phase === 'before') {
    const left = daysUntilTrip(today)
    const preDone = preTripTodos.filter((t) => preTrip[t.id]).length
    return (
      <section className="screen">
        <div className="card hero-card">
          <p className="muted" style={{ margin: 0 }}>
            Countdown to 30 Dec 2026
          </p>
          <p className="hero-count">{left <= 0 ? 'Almost there' : `${left} days to go`}</p>
          <p className="muted">
            Checklist {checklistProgress.done}/{checklistProgress.total} · Pre-trip {preDone}/
            {preTripTodos.length}
          </p>
          <div className="progress-bar" aria-hidden="true">
            <span
              style={{
                width: `${Math.round(
                  ((checklistProgress.done + preDone) /
                    (checklistProgress.total + preTripTodos.length || 1)) *
                    100,
                )}%`,
              }}
            />
          </div>
        </div>

        {urgent.length > 0 && (
          <div className="card urgent">
            <strong>Still to confirm</strong>
            <ul className="muted" style={{ margin: '8px 0 0', paddingLeft: 18 }}>
              {urgent.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <div className="row" style={{ marginTop: 10 }}>
              <button type="button" className="btn secondary" onClick={() => onGo('verify')}>
                Verify
              </button>
              <button type="button" className="btn secondary" onClick={() => onGo('more')}>
                Times
              </button>
            </div>
          </div>
        )}

        <div className="card">
          <h2 className="section-title">Pre-trip to-do</h2>
          <CheckList
            items={preTripTodos}
            checked={preTrip}
            onToggle={(id) => toggleMap(setPreTrip, id)}
          />
        </div>
      </section>
    )
  }

  // trip phase
  if (!day) {
    return (
      <section className="screen">
        <div className="card">
          <p>No trip day for {formatDisplayDate(today)}. Use the test-date panel to jump into Day 1–7.</p>
        </div>
      </section>
    )
  }

  const dayPlanKey = `d${day.day}`
  const dayChecks = planDone[dayPlanKey] || {}
  const carryChecks = carryState.items || {}
  const steps = day.arrivalSteps || []
  const stepIndex = Math.min(day1Step, Math.max(steps.length - 1, 0))
  const isComplete = Boolean(dayComplete[day.day])

  return (
    <section className="screen">
      <div className="card hero-card">
        <h1 className="day-header">
          Day {day.day} · {day.weekday}
        </h1>
        <p className="muted" style={{ margin: '4px 0 0' }}>
          {formatDisplayDate(day.date)} · {day.location}
        </p>
        {boatBadge && <div className="app-badge" style={{ marginTop: 8, display: 'inline-block' }}>{boatBadge}</div>}
      </div>

      <WarningBanner banners={banners} />

      {urgent.length > 0 && (
        <div className="card urgent">
          <strong>Urgent</strong>
          <ul className="muted" style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            {urgent.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
      )}

      {day.day === 1 && steps.length > 0 && (
        <div className="card">
          <div className="row-between">
            <h2 className="section-title">Next step</h2>
            <span className="pill">
              {stepIndex + 1}/{steps.length}
            </span>
          </div>
          <h3 style={{ margin: '8px 0 4px' }}>{steps[stepIndex].title}</h3>
          <p className="muted">{steps[stepIndex].detail}</p>
          {day.arrivalNote && stepIndex === steps.length - 1 && (
            <p className="small" style={{ marginTop: 8 }}>
              {day.arrivalNote}
            </p>
          )}
          <div className="row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn"
              onClick={() => setDay1Step((s) => Math.min(s + 1, steps.length - 1))}
              disabled={stepIndex >= steps.length - 1}
            >
              Done, next
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setDay1Step((s) => Math.max(s - 1, 0))}
              disabled={stepIndex === 0}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="section-title">Today&apos;s plan</h2>
        <div className="stack">
          {(day.timeline || []).map((item) => (
            <div key={item.id} className="timeline-item">
              <input
                type="checkbox"
                id={item.id}
                checked={Boolean(dayChecks[item.id])}
                onChange={() =>
                  setPlanDone((prev) => ({
                    ...prev,
                    [dayPlanKey]: { ...dayChecks, [item.id]: !dayChecks[item.id] },
                  }))
                }
              />
              <label htmlFor={item.id}>
                {item.label}{' '}
                <span className={`pill ${item.booked ? '' : 'optional'}`}>
                  {item.booked ? 'Booked' : 'Optional'}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {day.hotel && (
        <div className="card">
          <h2 className="section-title">Where you&apos;re staying tonight</h2>
          <p style={{ margin: '6px 0' }}>
            <strong>{day.hotel}</strong>
          </p>
          <p className="muted" style={{ margin: 0 }}>
            {day.room} · {day.mealPlan}
          </p>
        </div>
      )}

      <div className="card">
        <div className="row-between">
          <h2 className="section-title">Carry today</h2>
          <button
            type="button"
            className="btn ghost"
            onClick={() => setCarryState({ date: today, items: {} })}
          >
            Reset
          </button>
        </div>
        <CheckList
          items={carryItems}
          checked={carryChecks}
          onToggle={(id) =>
            setCarryState((prev) => ({
              ...prev,
              date: today,
              items: { ...prev.items, [id]: !prev.items?.[id] },
            }))
          }
        />
      </div>

      {tomorrowDay && (
        <div className="card">
          <h2 className="section-title">Tomorrow&apos;s heads-up</h2>
          <p style={{ margin: '6px 0' }}>
            Day {tomorrowDay.day}: {tomorrowDay.location}
          </p>
          <p className="muted">{day.headsUp || tomorrowDay.route}</p>
          {tomorrowDay.ferry && (
            <p className="small" style={{ marginTop: 8 }}>
              Ferry {times[tomorrowDay.ferry.timeKey] || '—'}
              {times[tomorrowDay.ferry.timeKey]
                ? ` · wake ${wakeFor(times[tomorrowDay.ferry.timeKey])}`
                : ''}{' '}
              · {tomorrowDay.ferry.operator}
            </p>
          )}
        </div>
      )}

      <div className="card">
        <h2 className="section-title">Notes for today</h2>
        <div className="field">
          <textarea
            value={dayNotes[day.day] || ''}
            onChange={(e) => setDayNotes((prev) => ({ ...prev, [day.day]: e.target.value }))}
            placeholder="Plan changes, agent updates…"
          />
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Quick call</h2>
        <div className="stack">
          {contacts.map((c) => (
            <a key={c.id} className="btn-call" href={`tel:${c.phone}`}>
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <div className="card">
        {!isComplete ? (
          <button
            type="button"
            className="btn block"
            onClick={() => setDayComplete((prev) => ({ ...prev, [day.day]: true }))}
          >
            Mark day complete
          </button>
        ) : (
          <p className="complete-toast">Day {day.day} marked complete — rest well.</p>
        )}
      </div>
    </section>
  )
}
