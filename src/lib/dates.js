import { TRIP, days } from '../data/tripData.js'

const TZ = TRIP.timezone
const TEST_DATE_KEY = 'andaman:testDate'

/** Format a Date as YYYY-MM-DD in Asia/Kolkata. */
export function toIndiaDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/** Compare calendar dates as YYYY-MM-DD strings. */
export function compareDates(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d + n))
  const yyyy = utc.getUTCFullYear()
  const mm = String(utc.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(utc.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function getStoredTestDate() {
  try {
    const v = localStorage.getItem(TEST_DATE_KEY)
    return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null
  } catch {
    return null
  }
}

export function setStoredTestDate(dateStr) {
  try {
    if (!dateStr) localStorage.removeItem(TEST_DATE_KEY)
    else localStorage.setItem(TEST_DATE_KEY, dateStr)
  } catch {
    /* ignore */
  }
}

/** Effective "today" — test override or real India date. */
export function getToday() {
  return getStoredTestDate() || toIndiaDateString()
}

export function getPhase(dateStr = getToday()) {
  if (compareDates(dateStr, TRIP.startDate) < 0) return 'before'
  if (compareDates(dateStr, TRIP.endDate) > 0) return 'after'
  return 'trip'
}

export function getDayIndex(dateStr = getToday()) {
  const day = days.find((d) => d.date === dateStr)
  return day ? day.day : null
}

export function getTomorrow(dateStr = getToday()) {
  return addDays(dateStr, 1)
}

export function daysUntilTrip(dateStr = getToday()) {
  const [ys, ms, ds] = TRIP.startDate.split('-').map(Number)
  const [yt, mt, dt] = dateStr.split('-').map(Number)
  const start = Date.UTC(ys, ms - 1, ds)
  const today = Date.UTC(yt, mt - 1, dt)
  return Math.round((start - today) / 86400000)
}

export function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function subtractHoursFromTime(timeHHMM, hours) {
  if (!timeHHMM || !/^\d{1,2}:\d{2}$/.test(timeHHMM)) return null
  const [h, min] = timeHHMM.split(':').map(Number)
  let total = h * 60 + min - Math.round(Number(hours) * 60)
  if (total < 0) total += 24 * 60
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

export { TEST_DATE_KEY, TZ }
