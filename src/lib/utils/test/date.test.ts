import { describe, expect, test } from 'vitest'
import { lunarToSolar, solarToLunar } from '../date'

describe('Date', () => {
  test('lunar <-> solar', async () => {
    const days = (2100 - 1900) * 365

    for (let i = 0; i < days; i++) {
      const date = new Date(Date.UTC(1900, 1, 31 + i))

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      const {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
      } = solarToLunar(year, month, day)

      const {
        year: solarYear,
        month: solarMonth,
        day: solarDay,
      } = lunarToSolar(lunarYear, lunarMonth, lunarDay)

      // const source = `source: ${year}-${month}-${day}`
      // const lunar = `lunar: ${lunarYear}-${lunarMonth}-${lunarDay}`
      // const solar = `solar: ${solarYear}-${solarMonth}-${solarDay}`
      // console.log(`${source}, ${lunar}, ${solar}`)

      expect(`${year}-${month}-${day}`).toBe(
        `${solarYear}-${solarMonth}-${solarDay}`,
      )
    }
  })
})
