import { useCallback, useMemo, useState } from 'react'
import ChecklistScreen from './components/ChecklistScreen.jsx'
import ItineraryScreen from './components/ItineraryScreen.jsx'
import MoreScreen from './components/MoreScreen.jsx'
import TabBar from './components/TabBar.jsx'
import TestDatePanel from './components/TestDatePanel.jsx'
import TodayScreen from './components/TodayScreen.jsx'
import VerifyScreen from './components/VerifyScreen.jsx'
import { checklistGroups, defaultTimes, TRIP } from './data/tripData.js'
import { getPhase, getToday } from './lib/dates.js'
import { readStorage, useLocalStorage } from './lib/storage.js'

export default function App() {
  const [tab, setTab] = useState('today')
  const [tick, setTick] = useState(0)
  const [titleTaps, setTitleTaps] = useState(0)
  const [testOpen, setTestOpen] = useState(false)
  const [times, setTimes] = useLocalStorage('times', defaultTimes)

  const today = useMemo(() => {
    void tick
    return getToday()
  }, [tick])

  const phase = getPhase(today)
  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const verifyState = useMemo(() => {
    void tick
    return readStorage('verify', {})
  }, [tick, tab])

  const checklistProgress = useMemo(() => {
    void tick
    const checklist = readStorage('checklist', {})
    const custom = readStorage('customChecklist', [])
    const items = [...checklistGroups.flatMap((g) => g.items), ...custom]
    return {
      done: items.filter((i) => checklist[i.id]).length,
      total: items.length,
    }
  }, [tick, tab])

  function onTitleTap() {
    const next = titleTaps + 1
    if (next >= 5) {
      setTestOpen(true)
      setTitleTaps(0)
    } else {
      setTitleTaps(next)
      window.setTimeout(() => setTitleTaps(0), 1200)
    }
  }

  function changeTab(id) {
    setTab(id)
    refresh()
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <h1 className="app-title" onClick={onTitleTap} title="Tap 5× for test date">
            {TRIP.name}
          </h1>
          <p className="app-tagline">{TRIP.tagline}</p>
        </div>
        <span className="app-badge">
          {phase === 'before' && 'Before trip'}
          {phase === 'trip' && 'On trip'}
          {phase === 'after' && 'After'}
        </span>
      </header>

      <TestDatePanel
        open={testOpen}
        onClose={() => setTestOpen(false)}
        onChange={refresh}
        currentDate={today}
      />

      {tab === 'today' && (
        <TodayScreen
          today={today}
          times={times}
          checklistProgress={checklistProgress}
          verifyState={verifyState}
          onGo={changeTab}
        />
      )}
      {tab === 'checklist' && <ChecklistScreen />}
      {tab === 'itinerary' && <ItineraryScreen today={today} times={times} />}
      {tab === 'verify' && <VerifyScreen />}
      {tab === 'more' && (
        <MoreScreen times={times} setTimes={setTimes} onImported={refresh} />
      )}

      <TabBar active={tab} onChange={changeTab} />
    </div>
  )
}
