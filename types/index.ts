export interface GaugeLocation {
  name: string
  level: number
  status: "floatable" | "low" | "high"
  siteId: string
  latitude: number
  longitude: number
}

export interface RiverSection {
  name: string
  distance: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  timeRange: string
  description: string
  minLevel: number
  maxLevel: number
}

export interface TripReport {
  id: number
  user: string
  section: string
  date: string
  rating: number
  report: string
  photos: number
}

export interface HistoricalData {
  date: string
  level: number
  timestamp: number
}

export interface WeatherData {
  temp: number
  condition: string
  icon: any
  humidity: number
  windSpeed: number
  feelsLike: number
  visibility: number
}

export interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: any
  rain: number
  windSpeed: number
  humidity: number
}

export interface TripCalculation {
  canoes: number
  estimatedCost: number
  estimatedTime: number
  shuttleCost: number
  launchTime: string
  isRecommended: boolean
}

export interface Amenity {
  name: string
  type: "restaurant" | "gas" | "lodging" | "camping" | "gear"
  distance: string
  phone?: string
  status?: "open" | "closed" | "available"
  price?: string
  description?: string
}

export interface EmergencyContact {
  name: string
  phone: string
  type: "emergency" | "park" | "sheriff" | "medical"
}

export interface UserTripReport {
  id: string
  user: string
  section: string
  date: string
  rating: number
  report: string
  photos: number
  waterLevel: number
  conditions: string
  timestamp: number
}

export interface CommunityStats {
  totalReports: number
  totalPhotos: number
  activeUsers: number
  averageRating: number
}

export interface USGSReading {
  siteId: string
  dateTime: string
  value: number
  qualifiers: string
}

export interface WeatherAlert {
  id: string
  title: string
  description: string
  severity: "minor" | "moderate" | "severe" | "extreme"
  urgency: "immediate" | "expected" | "future"
  certainty: "observed" | "likely" | "possible"
  expires: string
}

export interface AlertSubscription {
  id: string
  email: string
  phone?: string
  gaugeId: string
  minLevel: number
  maxLevel: number
  weatherAlerts: boolean
  enabled: boolean
  createdAt: number
}
