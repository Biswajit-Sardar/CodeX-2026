/**
 * Generates a consistent (deterministic) mock "situation snapshot" for any
 * place name — so searching the same area always returns the same numbers,
 * without needing a real weather/disaster-data API key yet.
 *
 * Swap `getAreaSnapshot` for a real fetch() once your Weather API /
 * Disaster Data API keys are ready — the shape of the returned object
 * is what the UI already expects, so no component changes needed.
 */

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const CONDITIONS = ['Clear', 'Partly cloudy', 'Overcast', 'Light rain', 'Heavy rain', 'Thunderstorms']

const HAZARDS = [
  'River flood risk — monsoon runoff',
  'Flash flood risk — low-lying drainage',
  'Cyclonic wind exposure',
  'Heatwave stress on infrastructure',
  'Landslide-prone slope nearby',
  'Urban waterlogging risk',
]

export function getAreaSnapshot(rawName) {
  const name = (rawName || 'Kharagpur, West Bengal').trim()
  const h = hashString(name.toLowerCase())

  const riskScore = 15 + (h % 80)
  const condition = CONDITIONS[h % CONDITIONS.length]
  const hazard = HAZARDS[Math.floor(h / 7) % HAZARDS.length]
  const tempC = 21 + (h % 16)
  const humidity = 40 + (h % 45)
  const windKmh = 5 + (h % 35)
  const riskLevel = riskScore > 70 ? 'High' : riskScore > 40 ? 'Moderate' : 'Low'

  const alertCount = 1 + (h % 3)
  const alerts = Array.from({ length: alertCount }, (_, i) => ({
    id: `wx-${h}-${i}`,
    severity: i === 0 ? 'during' : 'before',
    title: i === 0 ? `${condition} expected` : 'Precautionary advisory issued',
    detail: i === 0
      ? `Conditions trending toward ${condition.toLowerCase()} over the next 24 hours.`
      : 'Local authorities have flagged this area for monitoring.',
    issuedAt: `0${6 + i}:${String((h + i * 7) % 60).padStart(2, '0')}`,
  }))

  return {
    name,
    riskScore,
    riskLevel,
    hazard,
    condition,
    tempC,
    humidity,
    windKmh,
    alerts,
    updatedAt: new Date().toISOString(),
    forecastWindow: 'Next 48 hours',
  }
}
