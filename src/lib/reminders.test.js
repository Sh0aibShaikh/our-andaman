import { describe, expect, it } from 'vitest'
import { getReminders } from './reminders.js'

const times = {
  ferryJan1: '07:30',
  ferryJan3: '09:15',
  ferryJan4: '11:00',
  wakeOffsetHours: 2,
  returnFlight: '12:00',
  returnFlightArrive: '15:20',
}

function ids(date) {
  return getReminders(date, times).map((b) => b.id)
}

describe('getReminders', () => {
  it('shows Baratang night-before on 30 Dec', () => {
    expect(ids('2026-12-30')).toContain('baratang-night-before')
  })

  it('shows Baratang day + ferry night-before on 31 Dec', () => {
    const list = ids('2026-12-31')
    expect(list).toContain('baratang-day')
    expect(list).toContain('ferry-night-before')
  })

  it('shows ferry morning on 1 Jan with wake 05:30', () => {
    const banners = getReminders('2027-01-01', times)
    const ferry = banners.find((b) => b.id === 'ferry-morning')
    expect(ferry).toBeTruthy()
    expect(ferry.body).toContain('07:30')
    expect(ferry.body).toContain('05:30')
  })

  it('shows ferry night-before on 2 Jan for 3 Jan boat', () => {
    const ferry = getReminders('2027-01-02', times).find((b) => b.id === 'ferry-night-before')
    expect(ferry).toBeTruthy()
    expect(ferry.body).toContain('09:15')
    expect(ferry.body).toContain('07:15')
  })

  it('shows scuba warning on 2 Jan', () => {
    expect(ids('2027-01-02')).toContain('scuba-day')
  })

  it('shows ferry morning + Natural Bridge on 3 Jan', () => {
    const list = ids('2027-01-03')
    expect(list).toContain('ferry-morning')
    expect(list).toContain('natural-bridge')
    expect(list).toContain('ferry-night-before')
  })

  it('shows ferry morning on 4 Jan with Haddo and wake 09:00', () => {
    const ferry = getReminders('2027-01-04', times).find((b) => b.id === 'ferry-morning')
    expect(ferry.body).toContain('11:00')
    expect(ferry.body).toContain('09:00')
    expect(ferry.body).toContain('Haddo')
  })

  it('shows departure banner on 5 Jan', () => {
    const dep = getReminders('2027-01-05', times).find((b) => b.id === 'departure')
    expect(dep.body).toContain('12:00')
  })

  it('includes dont-forget on trip mornings', () => {
    expect(ids('2027-01-01')).toContain('dont-forget')
  })

  it('updates when ferry time changes', () => {
    const banners = getReminders('2027-01-01', { ...times, ferryJan1: '08:00' })
    const ferry = banners.find((b) => b.id === 'ferry-morning')
    expect(ferry.body).toContain('08:00')
    expect(ferry.body).toContain('06:00')
  })
})
