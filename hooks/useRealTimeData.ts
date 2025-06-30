"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchUSGSData, fetchHistoricalData, GAUGE_SITES } from "../services/usgsApi"
import { AlertService } from "../services/alertService"
import { HISTORICAL_DATA_SETS, RIVER_LEVEL_CONSTANTS, CURRENT_WEATHER, WEATHER_FORECAST } from "../constants/data"
import type { GaugeLocation, HistoricalData, WeatherData, ForecastDay, WeatherAlert } from "../types"
import { getWeatherIcon } from "../utils/weather-icons"

// Mock data as fallback
const MOCK_GAUGE_LOCATIONS: Record<string, GaugeLocation> = {
  pruitt: {
    name: "Pruitt",
    level: 5.2,
    status: "floatable",
    siteId: "07055875",
    latitude: 35.9342,
    longitude: -93.2021,
  },
  gilbert: {
    name: "Gilbert",
    level: 4.9,
    status: "floatable",
    siteId: "07056000",
    latitude: 35.8876,
    longitude: -92.9943,
  },
  rush: { name: "Rush", level: 6.1, status: "floatable", siteId: "07055646", latitude: 36.1187, longitude: -93.1065 },
  carver: {
    name: "Carver",
    level: 5.8,
    status: "floatable",
    siteId: "07055660",
    latitude: 36.0876,
    longitude: -93.0432,
  },
  buffalo_city: {
    name: "Buffalo City",
    level: 4.3,
    status: "low",
    siteId: "07056700",
    latitude: 35.8234,
    longitude: -92.8765,
  },
}

async function getWeatherFromApi() {
  try {
    const res = await fetch("/api/weather", { next: { revalidate: 0 } })
    if (!res.ok) throw new Error("Weather route error")
    return await res.json()
  } catch {
    return null
  }
}

export function useRealTimeData() {
  const [selectedGauge, setSelectedGauge] = useState("pruitt")
  const [gaugeLocations, setGaugeLocations] = useState<Record<string, GaugeLocation>>(MOCK_GAUGE_LOCATIONS)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [weatherForecast, setWeatherForecast] = useState<ForecastDay[]>([])
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const alertService = AlertService.getInstance()

  const refreshGaugeData = useCallback(async () => {
    try {
      const updatedGauges = { ...gaugeLocations }
      let hasRealData = false

      // Fetch data for all gauges
      for (const [key, gauge] of Object.entries(GAUGE_SITES)) {
        const reading = await fetchUSGSData(gauge)
        if (reading && !isNaN(reading.value)) {
          const level = reading.value
          let status: "floatable" | "low" | "high" = "low"

          if (level >= RIVER_LEVEL_CONSTANTS.MIN_FLOATABLE && level <= RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE) {
            status = "floatable"
          } else if (level > RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE) {
            status = "high"
          }

          updatedGauges[key] = {
            ...updatedGauges[key],
            level,
            status,
          }
          hasRealData = true
        }
      }

      if (hasRealData) {
        setGaugeLocations(updatedGauges)
        setError(null)

        // Check alert conditions
        const currentLevels = Object.fromEntries(
          Object.entries(updatedGauges).map(([key, gauge]) => [key, gauge.level]),
        )
        await alertService.checkConditions(currentLevels)
      } else {
        setError("Unable to fetch live data - showing cached information")
      }
    } catch (err) {
      console.error("Failed to refresh gauge data:", err)
      setError("Connection error - showing cached data")
    }
  }, [gaugeLocations, alertService])

  const refreshWeatherData = useCallback(async () => {
    const data = await getWeatherFromApi()
    if (data?.current) {
      setCurrentWeather({
        ...data.current,
        icon: getWeatherIcon(data.current.condition),
      })
    }
    if (Array.isArray(data?.forecast)) {
      setWeatherForecast(
        data.forecast.map((d: any) => ({
          ...d,
          icon: getWeatherIcon(d.condition),
        })),
      )
    }
    if (Array.isArray(data?.alerts)) setWeatherAlerts(data.alerts)
  }, [])

  const refreshHistoricalData = useCallback(async () => {
    try {
      const selectedGaugeData = gaugeLocations[selectedGauge]
      if (selectedGaugeData?.siteId) {
        const historical = await fetchHistoricalData(selectedGaugeData.siteId)
        if (historical.length > 0) {
          setHistoricalData(historical)
        } else {
          // Use mock data with consistent range for the selected gauge
          setHistoricalData(HISTORICAL_DATA_SETS[selectedGauge] || HISTORICAL_DATA_SETS.pruitt)
        }
      } else {
        // Use mock data with consistent range for the selected gauge
        setHistoricalData(HISTORICAL_DATA_SETS[selectedGauge] || HISTORICAL_DATA_SETS.pruitt)
      }
    } catch (err) {
      console.error("Failed to refresh historical data:", err)
      // Use mock data with consistent range for the selected gauge
      setHistoricalData(HISTORICAL_DATA_SETS[selectedGauge] || HISTORICAL_DATA_SETS.pruitt)
    }
  }, [selectedGauge, gaugeLocations])

  const refreshData = useCallback(async () => {
    setIsRefreshing(true)

    try {
      await Promise.all([refreshGaugeData(), refreshWeatherData(), refreshHistoricalData()])
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Failed to refresh data:", err)
    } finally {
      setIsRefreshing(false)
    }
  }, [refreshGaugeData, refreshWeatherData, refreshHistoricalData])

  // Initial data load
  useEffect(() => {
    console.log("Initial data load starting...")
    // Set weather data immediately
    setCurrentWeather(CURRENT_WEATHER)
    setWeatherForecast(WEATHER_FORECAST)
    refreshData()
  }, []) // Only run once on mount

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(refreshData, RIVER_LEVEL_CONSTANTS.REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refreshData])

  // Refresh historical data when gauge selection changes
  useEffect(() => {
    refreshHistoricalData()
  }, [selectedGauge, refreshHistoricalData])

  const currentLevel = gaugeLocations[selectedGauge]?.level || 0
  const isFloatable =
    currentLevel >= RIVER_LEVEL_CONSTANTS.MIN_FLOATABLE && currentLevel <= RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE
  const selectedGaugeData = gaugeLocations[selectedGauge]

  return {
    selectedGauge,
    setSelectedGauge,
    gaugeLocations,
    currentLevel,
    historicalData,
    currentWeather,
    weatherForecast,
    weatherAlerts,
    lastUpdated,
    isRefreshing,
    error,
    refreshData,
    isFloatable,
    selectedGaugeData,
  }
}
