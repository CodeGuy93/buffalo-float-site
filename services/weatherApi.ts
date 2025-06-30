import "server-only"
import type { WeatherData, ForecastDay, WeatherAlert } from "../types"
import { Cloud, CloudRain, Sun, CloudSnow, Zap } from "lucide-react"

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"
const NWS_ALERTS_URL = "https://api.weather.gov/alerts"

// Buffalo River area coordinates (approximate center)
const BUFFALO_RIVER_COORDS = {
  lat: 35.9342,
  lon: -93.2021,
}

// Updated mock weather data with more realistic Arkansas winter conditions
const MOCK_CURRENT_WEATHER: WeatherData = {
  temp: 38,
  condition: "Clear Sky",
  humidity: 72,
  windSpeed: 6,
  feelsLike: 34,
  visibility: 10,
}

const MOCK_WEATHER_FORECAST: ForecastDay[] = [
  {
    day: "Today",
    high: 42,
    low: 28,
    condition: "Clear Sky",
    rain: 0,
    windSpeed: 6,
    humidity: 72,
  },
  {
    day: "Tomorrow",
    high: 46,
    low: 31,
    condition: "Partly Cloudy",
    rain: 10,
    windSpeed: 8,
    humidity: 68,
  },
  {
    day: "Day 3",
    high: 39,
    low: 25,
    condition: "Light Rain",
    rain: 60,
    windSpeed: 12,
    humidity: 85,
  },
]

function getWeatherIcon(condition: string, isDay = true) {
  const conditionLower = condition.toLowerCase()

  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return CloudRain
  }
  if (conditionLower.includes("snow")) {
    return CloudSnow
  }
  if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
    return Zap
  }
  if (conditionLower.includes("cloud")) {
    return Cloud
  }
  return Sun
}

export async function fetchCurrentWeather(): Promise<WeatherData> {
  console.log("fetchCurrentWeather called, API key available:", !!WEATHER_API_KEY)

  // Always return mock data for now to ensure weather displays
  if (!WEATHER_API_KEY) {
    console.log("No API key - returning mock weather data")
    return MOCK_CURRENT_WEATHER
  }

  try {
    const params = new URLSearchParams({
      lat: BUFFALO_RIVER_COORDS.lat.toString(),
      lon: BUFFALO_RIVER_COORDS.lon.toString(),
      appid: WEATHER_API_KEY,
      units: "imperial",
    })

    console.log("Fetching weather from:", `${OPENWEATHER_BASE_URL}/weather?${params}`)
    const response = await fetch(`${OPENWEATHER_BASE_URL}/weather?${params}`)

    if (!response.ok) {
      console.warn(`Weather API error: ${response.status} - falling back to mock data`)
      return MOCK_CURRENT_WEATHER
    }

    const data = await response.json()
    console.log("Weather API response:", data)

    const weatherData = {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description
        .split(" ")
        .map((w: string) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind?.speed || 0),
      feelsLike: Math.round(data.main.feels_like),
      visibility: Math.round((data.visibility || 10000) / 1609.34),
    }

    console.log("Processed weather data:", weatherData)
    return weatherData
  } catch (error) {
    console.warn("Failed to fetch current weather - using mock data:", error)
    return MOCK_CURRENT_WEATHER
  }
}

export async function fetchWeatherForecast(): Promise<ForecastDay[]> {
  console.log("fetchWeatherForecast called, API key available:", !!WEATHER_API_KEY)

  // Always return mock data for now to ensure forecast displays
  if (!WEATHER_API_KEY) {
    console.log("No API key - returning mock forecast data")
    return MOCK_WEATHER_FORECAST
  }

  try {
    const params = new URLSearchParams({
      lat: BUFFALO_RIVER_COORDS.lat.toString(),
      lon: BUFFALO_RIVER_COORDS.lon.toString(),
      appid: WEATHER_API_KEY,
      units: "imperial",
    })

    console.log("Fetching forecast from:", `${OPENWEATHER_BASE_URL}/forecast?${params}`)
    const response = await fetch(`${OPENWEATHER_BASE_URL}/forecast?${params}`)

    if (!response.ok) {
      console.warn(`Weather forecast API error: ${response.status} - falling back to mock data`)
      return MOCK_WEATHER_FORECAST
    }

    const data = await response.json()
    console.log("Forecast API response:", data)

    // Group forecasts by day and get daily highs/lows
    const dailyForecasts: { [key: string]: any[] } = {}

    data.list.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000)
      const dateKey = date.toDateString()

      if (!dailyForecasts[dateKey]) {
        dailyForecasts[dateKey] = []
      }
      dailyForecasts[dateKey].push(forecast)
    })

    const days = ["Today", "Tomorrow", "Day 3"]

    const processedForecast = Object.entries(dailyForecasts)
      .slice(0, 3)
      .map(([dateKey, forecasts], index) => {
        const temps = forecasts.map((f) => f.main.temp)
        const high = Math.round(Math.max(...temps))
        const low = Math.round(Math.min(...temps))

        // Use the most common weather condition for the day
        const conditions = forecasts.map((f) => f.weather[0].main)
        const mostCommonCondition = conditions
          .sort((a, b) => conditions.filter((v) => v === a).length - conditions.filter((v) => v === b).length)
          .pop()

        const rainChance = Math.max(...forecasts.map((f) => (f.pop || 0) * 100))

        return {
          day: days[index] || `Day ${index + 1}`,
          high,
          low,
          condition: mostCommonCondition || "Clear",
          rain: Math.round(rainChance),
          windSpeed: Math.round(forecasts[0].wind?.speed || 0),
          humidity: forecasts[0].main.humidity,
        }
      })

    console.log("Processed forecast data:", processedForecast)
    return processedForecast
  } catch (error) {
    console.warn("Failed to fetch weather forecast - using mock data:", error)
    return MOCK_WEATHER_FORECAST
  }
}

export async function fetchWeatherAlerts(): Promise<WeatherAlert[]> {
  const baseUrl = `${NWS_ALERTS_URL}?area=AR&status=actual&severity=severe,extreme`
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`

  async function get(url: string) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Weather alerts API error: ${res.status}`)
    return res.json()
  }

  try {
    // 1️⃣ Try the official endpoint first (works server-side, often fails in browser)
    return parseAlerts(await get(baseUrl))
  } catch (directErr) {
    console.warn("Direct NWS alert fetch failed, falling back to CORS proxy:", directErr)
    try {
      // 2️⃣ Try via CORS proxy
      return parseAlerts(await get(proxyUrl))
    } catch (proxyErr) {
      console.warn("Weather alert proxy fetch failed:", proxyErr)
      return [] // Graceful degradation
    }
  }

  /* ----------------- */
  function parseAlerts(data: any): WeatherAlert[] {
    return (data?.features || [])
      .filter((alert: any) => {
        const txt = `${alert.properties.headline} ${alert.properties.description}`.toLowerCase()
        return (
          txt.includes("buffalo") ||
          txt.includes("newton") ||
          txt.includes("severe thunderstorm") ||
          txt.includes("flash flood")
        )
      })
      .slice(0, 3)
      .map((alert: any) => ({
        id: alert.id,
        title: alert.properties.headline,
        description: alert.properties.description,
        severity: (alert.properties.severity || "moderate").toLowerCase(),
        urgency: (alert.properties.urgency || "expected").toLowerCase(),
        certainty: (alert.properties.certainty || "likely").toLowerCase(),
        expires: alert.properties.expires,
      }))
  }
}
