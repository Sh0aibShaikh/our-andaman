import { defaultTimes } from '../data/tripData.js'
import { addDays, subtractHoursFromTime } from './dates.js'

/**
 * Pure reminder engine.
 * @param {string} date YYYY-MM-DD
 * @param {object} savedTimes merged with defaults
 * @returns {Array<{ id: string, level: 'warning'|'info', title: string, body: string }>}
 */
export function getReminders(date, savedTimes = {}) {
  const times = { ...defaultTimes, ...savedTimes }
  const offset = Number(times.wakeOffsetHours ?? 2)
  const banners = []
  const tomorrow = addDays(date, 1)

  const ferryByDate = {
    '2027-01-01': { time: times.ferryJan1, label: 'Port Blair → Havelock (Nautika)' },
    '2027-01-03': { time: times.ferryJan3, label: 'Havelock → Neil (Green Ocean)' },
    '2027-01-04': {
      time: times.ferryJan4,
      label: 'Neil → Port Blair Haddo Gate-3 (Green Ocean)',
    },
  }

  const nightBeforeDates = ['2026-12-31', '2027-01-02', '2027-01-03']

  if (nightBeforeDates.includes(date)) {
    const nextFerry = ferryByDate[tomorrow]
    let body =
      'Tomorrow you travel by boat. Eat light tonight. Keep neck pillow, water, candies and medicines ready.'
    if (nextFerry?.time) {
      const wake = subtractHoursFromTime(nextFerry.time, offset)
      body += ` Boat at ${nextFerry.time}${wake ? `. Plan to wake at ${wake}` : ''} (${nextFerry.label}).`
    }
    banners.push({
      id: 'ferry-night-before',
      level: 'warning',
      title: 'Boat tomorrow',
      body,
    })
  }

  const morningOf = ferryByDate[date]
  if (morningOf) {
    let body =
      'Boat today. Eat light food. Carry a neck pillow, water, candies and medicines.'
    if (morningOf.time) {
      const wake = subtractHoursFromTime(morningOf.time, offset)
      body += ` Wake at ${wake || '—'}, boat at ${morningOf.time}. ${morningOf.label}.`
    }
    banners.push({
      id: 'ferry-morning',
      level: 'warning',
      title: 'Boat today',
      body,
    })
  }

  if (date === '2026-12-30') {
    banners.push({
      id: 'baratang-night-before',
      level: 'warning',
      title: 'Early start tomorrow',
      body: 'Baratang is a long early road trip (~110 km) before daybreak. Rest well and eat light tonight.',
    })
  }

  if (date === '2026-12-31') {
    banners.push({
      id: 'baratang-day',
      level: 'warning',
      title: 'Baratang day',
      body:
        'Long early road trip (~110 km) before daybreak. Light food only. Carry plenty of water, dry fruits, chocolates, khatti-meethi candies, small water bottle, neck pillow, and basic medicines.',
    })
  }

  if (date === '2027-01-02') {
    banners.push({
      id: 'scuba-day',
      level: 'warning',
      title: 'Scuba / water activities',
      body:
        'Eat light before diving. Sleep well. Skip the 3:30 AM night kayak if you are doing scuba this morning.',
    })
  }

  if (date === '2027-01-03') {
    banners.push({
      id: 'natural-bridge',
      level: 'info',
      title: 'Natural Bridge',
      body: 'Check tide timings. Best around 3 PM.',
    })
  }

  const beachDays = ['2026-12-30', '2027-01-01', '2027-01-02', '2027-01-03', '2027-01-04']
  if (beachDays.includes(date)) {
    banners.push({
      id: 'beach-dark',
      level: 'info',
      title: 'Daylight tip',
      body: 'It gets dark around 5 PM. Plan photos and sunsets earlier.',
    })
  }

  if (date === '2027-01-05') {
    banners.push({
      id: 'departure',
      level: 'warning',
      title: 'Departure day',
      body: `Breakfast, pack, check room, keep tickets and IDs handy. Flight IXZ ${times.returnFlight || '12:00'} → BOM ${times.returnFlightArrive || '15:20'}. Leave for the airport on time.`,
    })
  }

  // Trip mornings: 30 Dec – 5 Jan
  if (date >= '2026-12-30' && date <= '2027-01-05') {
    banners.push({
      id: 'dont-forget',
      level: 'info',
      title: "Don't forget",
      body: 'Cash, sunscreen, sunglasses, cap, phone charger, power bank, water bottle, IDs.',
    })
  }

  return banners
}
