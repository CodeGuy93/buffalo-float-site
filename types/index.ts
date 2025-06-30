export interface GaugeLocation {
  name: string
  level: number
  status: "floatable" | "low" | "high"
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
}

export interface WeatherData {
  temp: number
  condition: string
  icon: any
  humidity: number
  windSpeed: number
}

export interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: any
  rain: number
}

export interface TripCalculation {
  canoes: number
  estimatedCost: number
  estimatedTime: number
  shuttleCost: number
  launchTime: string
  isRecommended: boolean
}
