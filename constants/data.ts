import type { GaugeLocation, RiverSection, TripReport, HistoricalData, WeatherData, ForecastDay } from "../types"

export const GAUGE_LOCATIONS: Record<string, GaugeLocation> = {
  pruitt: { name: "Pruitt", level: 5.2, status: "floatable" },
  gilbert: { name: "Gilbert", level: 4.9, status: "floatable" },
  rush: { name: "Rush", level: 6.1, status: "floatable" },
  carver: { name: "Carver", level: 5.8, status: "floatable" },
  buffalo_city: { name: "Buffalo City", level: 4.3, status: "low" },
}

export const RIVER_SECTIONS: RiverSection[] = [
  {
    name: "Boxley to Ponca",
    distance: 12,
    difficulty: "Beginner",
    timeRange: "4-6 hours",
    description: "Scenic family-friendly float with gentle rapids",
    minLevel: 4.5,
    maxLevel: 7.0,
  },
  {
    name: "Ponca to Kyles Landing",
    distance: 11,
    difficulty: "Beginner",
    timeRange: "4-5 hours",
    description: "Popular section with beautiful bluffs",
    minLevel: 4.8,
    maxLevel: 6.8,
  },
  {
    name: "Kyles Landing to Pruitt",
    distance: 15,
    difficulty: "Intermediate",
    timeRange: "5-7 hours",
    description: "Longer float with varied scenery",
    minLevel: 5.0,
    maxLevel: 6.5,
  },
  {
    name: "Pruitt to Gilbert",
    distance: 18,
    difficulty: "Intermediate",
    timeRange: "6-8 hours",
    description: "Full day adventure with remote wilderness",
    minLevel: 5.2,
    maxLevel: 6.2,
  },
]

export const MOCK_TRIP_REPORTS: TripReport[] = [
  {
    id: 1,
    user: "RiverRat2024",
    section: "Ponca to Kyles",
    date: "2 hours ago",
    rating: 5,
    report: "Perfect conditions today! Water was crystal clear and just the right level.",
    photos: 3,
  },
  {
    id: 2,
    user: "CanoeFamily",
    section: "Boxley to Ponca",
    date: "5 hours ago",
    rating: 4,
    report: "Great family trip. Kids loved it! One small log jam near mile 8 but easily navigable.",
    photos: 1,
  },
]

// Standardized historical data for all gauges - same chart layout
export const HISTORICAL_DATA: HistoricalData[] = [
  { date: "12/15", level: 4.2 },
  { date: "12/16", level: 4.5 },
  { date: "12/17", level: 4.8 },
  { date: "12/18", level: 5.1 },
  { date: "12/19", level: 5.4 },
  { date: "12/20", level: 5.8 },
  { date: "12/21", level: 6.2 },
  { date: "12/22", level: 6.0 },
  { date: "12/23", level: 5.7 },
  { date: "12/24", level: 5.4 },
  { date: "12/25", level: 5.2 },
  { date: "12/26", level: 5.0 },
  { date: "12/27", level: 4.9 },
  { date: "12/28", level: 5.2 },
]

// Alternative historical data sets for variety (but same range)
export const HISTORICAL_DATA_SETS: Record<string, HistoricalData[]> = {
  pruitt: [
    { date: "12/15", level: 4.2 },
    { date: "12/16", level: 4.5 },
    { date: "12/17", level: 4.8 },
    { date: "12/18", level: 5.1 },
    { date: "12/19", level: 5.4 },
    { date: "12/20", level: 5.8 },
    { date: "12/21", level: 6.2 },
    { date: "12/22", level: 6.0 },
    { date: "12/23", level: 5.7 },
    { date: "12/24", level: 5.4 },
    { date: "12/25", level: 5.2 },
    { date: "12/26", level: 5.0 },
    { date: "12/27", level: 4.9 },
    { date: "12/28", level: 5.2 },
  ],
  gilbert: [
    { date: "12/15", level: 4.1 },
    { date: "12/16", level: 4.4 },
    { date: "12/17", level: 4.7 },
    { date: "12/18", level: 5.0 },
    { date: "12/19", level: 5.3 },
    { date: "12/20", level: 5.7 },
    { date: "12/21", level: 6.1 },
    { date: "12/22", level: 5.9 },
    { date: "12/23", level: 5.6 },
    { date: "12/24", level: 5.3 },
    { date: "12/25", level: 5.1 },
    { date: "12/26", level: 4.9 },
    { date: "12/27", level: 4.8 },
    { date: "12/28", level: 4.9 },
  ],
  rush: [
    { date: "12/15", level: 4.3 },
    { date: "12/16", level: 4.6 },
    { date: "12/17", level: 4.9 },
    { date: "12/18", level: 5.2 },
    { date: "12/19", level: 5.5 },
    { date: "12/20", level: 5.9 },
    { date: "12/21", level: 6.3 },
    { date: "12/22", level: 6.1 },
    { date: "12/23", level: 5.8 },
    { date: "12/24", level: 5.5 },
    { date: "12/25", level: 5.3 },
    { date: "12/26", level: 5.1 },
    { date: "12/27", level: 5.0 },
    { date: "12/28", level: 6.1 },
  ],
  carver: [
    { date: "12/15", level: 4.0 },
    { date: "12/16", level: 4.3 },
    { date: "12/17", level: 4.6 },
    { date: "12/18", level: 4.9 },
    { date: "12/19", level: 5.2 },
    { date: "12/20", level: 5.6 },
    { date: "12/21", level: 6.0 },
    { date: "12/22", level: 5.8 },
    { date: "12/23", level: 5.5 },
    { date: "12/24", level: 5.2 },
    { date: "12/25", level: 5.0 },
    { date: "12/26", level: 4.8 },
    { date: "12/27", level: 4.7 },
    { date: "12/28", level: 5.8 },
  ],
  buffalo_city: [
    { date: "12/15", level: 3.9 },
    { date: "12/16", level: 4.2 },
    { date: "12/17", level: 4.5 },
    { date: "12/18", level: 4.8 },
    { date: "12/19", level: 5.1 },
    { date: "12/20", level: 5.5 },
    { date: "12/21", level: 5.9 },
    { date: "12/22", level: 5.7 },
    { date: "12/23", level: 5.4 },
    { date: "12/24", level: 5.1 },
    { date: "12/25", level: 4.9 },
    { date: "12/26", level: 4.7 },
    { date: "12/27", level: 4.6 },
    { date: "12/28", level: 4.3 },
  ],
}

// Mock weather data that will always load
export const CURRENT_WEATHER: WeatherData = {
  temp: 38,
  condition: "Clear Sky",
  humidity: 72,
  windSpeed: 6,
  feelsLike: 34,
  visibility: 10,
}

export const WEATHER_FORECAST: ForecastDay[] = [
  { day: "Today", high: 42, low: 28, condition: "Clear Sky", rain: 0, windSpeed: 6, humidity: 72 },
  { day: "Tomorrow", high: 46, low: 31, condition: "Partly Cloudy", rain: 10, windSpeed: 8, humidity: 68 },
  { day: "Day 3", high: 39, low: 25, condition: "Light Rain", rain: 60, windSpeed: 12, humidity: 85 },
]

export const RIVER_LEVEL_CONSTANTS = {
  MIN_FLOATABLE: 4.8,
  MAX_FLOATABLE: 6.6,
  REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
  // Fixed chart range for consistent layout
  CHART_MIN: 3.5,
  CHART_MAX: 7.0,
} as const
