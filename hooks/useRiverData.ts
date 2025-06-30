"use client"

import { useState, useEffect, useCallback } from "react"
import { GAUGE_LOCATIONS, RIVER_LEVEL_CONSTANTS } from "../constants/data"

export function useRiverData() {
  const [selectedGauge, setSelectedGauge] = useState("pruitt")
  const [currentLevel, setCurrentLevel] = useState(5.2)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = useCallback(async () => {
    setIsRefreshing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data variation
      const variation = (Math.random() - 0.5) * 0.2
      setCurrentLevel((prev) => Math.max(3.0, Math.min(8.0, prev + variation)))
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to refresh river data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(refreshData, RIVER_LEVEL_CONSTANTS.REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refreshData])

  const isFloatable =
    currentLevel >= RIVER_LEVEL_CONSTANTS.MIN_FLOATABLE && currentLevel <= RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE

  const selectedGaugeData = GAUGE_LOCATIONS[selectedGauge]

  return {
    selectedGauge,
    setSelectedGauge,
    currentLevel,
    lastUpdated,
    isRefreshing,
    refreshData,
    isFloatable,
    selectedGaugeData,
    gaugeLocations: GAUGE_LOCATIONS,
  }
}
