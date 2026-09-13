/**
 * Mock data layer.
 *
 * For the hackathon demo this file stands in for the three external
 * services shown in the Technical Feasibility diagram:
 *   - Disaster Data API  (risk prediction feed)
 *   - Weather API        (live weather alerts)
 *   - Google Maps API    (shelters / hospitals / geocoding)
 *
 * Each exported function is written the way a real API call would be
 * shaped, so swapping the body for a fetch() later is a drop-in
 * replacement — see the comment above each function.
 */

// ---- Disaster Data API -----------------------------------------------
// Real version: fetch(`${DISASTER_API_BASE}/risk?lat=..&lng=..`)
export function getRiskPrediction() {
  return {
    region: "Kharagpur, West Bengal",
    riskLevel: "Moderate",
    riskScore: 42,
    hazard: "River flood risk — monsoon runoff",
    updatedAt: "2026-09-13T09:00:00+05:30",
    forecastWindow: "Next 48 hours",
  };
}

// ---- Weather API --------------------------------------------------------
// Real version: fetch(`${WEATHER_API_BASE}/alerts?lat=..&lng=..`)
export function getWeatherAlerts() {
  return [
    {
      id: "wx-1",
      severity: "during",
      title: "Heavy rainfall warning",
      detail: "120mm+ expected over 24h in the Kangsabati basin.",
      issuedAt: "07:40",
    },
    {
      id: "wx-2",
      severity: "before",
      title: "Wind advisory",
      detail: "Gusts up to 45 km/h expected this evening.",
      issuedAt: "06:10",
    },
  ];
}

// ---- SOS / Live incident feed -------------------------------------------
// Real version: this would be a websocket or polling endpoint fed by the
// "Volunteer Teams" / "Authorities" nodes in the platform workflow diagram.
export function getActiveSOS() {
  return [
    { id: "SOS-1042", name: "Ritwik Sarkar", location: "Nimpura, Kharagpur", status: "dispatched", eta: "6 min" },
    { id: "SOS-1043", name: "Ananya Das", location: "IIT KGP Campus Gate", status: "pending", eta: "—" },
    { id: "SOS-1044", name: "Unknown caller", location: "Malancha Rd", status: "acknowledged", eta: "14 min" },
  ];
}

// ---- Shelters & Hospitals -----------------------------------------------
// Real version: Google Places API "nearbysearch" filtered by type=shelter|hospital
export function getNearbyShelters() {
  return [
    { id: 1, name: "Kharagpur Municipal Relief Camp", type: "Shelter", lat: 22.3460, lng: 87.2320, capacity: "320 / 500", distanceKm: 1.2 },
    { id: 2, name: "IIT KGP Community Hall Shelter", type: "Shelter", lat: 22.3193, lng: 87.3091, capacity: "80 / 200", distanceKm: 3.4 },
    { id: 3, name: "Kharagpur Sub-Divisional Hospital", type: "Hospital", lat: 22.3400, lng: 87.2270, capacity: "ER: Open", distanceKm: 1.6 },
    { id: 4, name: "B.C. Roy Technology Hospital", type: "Hospital", lat: 22.3172, lng: 87.3086, capacity: "ER: Open", distanceKm: 3.6 },
  ];
}

// ---- Rescue teams / volunteer network -----------------------------------
export function getRescueTeams() {
  return [
    { id: "T-01", name: "NDRF Unit 4", type: "Government", specialty: "Water rescue", contact: "108", status: "Active" },
    { id: "T-02", name: "Kharagpur Civil Defence", type: "Government", specialty: "Evacuation support", contact: "1070", status: "Active" },
    { id: "T-03", name: "Red Cross Volunteers — Local Chapter", type: "NGO", specialty: "Medical aid, supplies", contact: "+91 98300 00000", status: "Standby" },
    { id: "T-04", name: "Campus Volunteer Corps", type: "Volunteer", specialty: "Shelter logistics", contact: "+91 90000 00001", status: "Active" },
  ];
}

// ---- Damage reports (post-disaster) -------------------------------------
export function getRecentReports() {
  return [
    { id: "DR-201", area: "Nimpura", severity: "High", description: "Road washout, 2 houses partially flooded", reportedAt: "Yesterday, 18:20", status: "Under review" },
    { id: "DR-202", area: "Malancha", severity: "Medium", description: "Power lines down near market", reportedAt: "Today, 07:05", status: "Team dispatched" },
    { id: "DR-203", area: "Prembazar", severity: "Low", description: "Minor waterlogging, receding", reportedAt: "Today, 08:50", status: "Monitoring" },
  ];
}
