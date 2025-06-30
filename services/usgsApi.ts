import type { USGSReading, HistoricalData } from "../types"

// USGS Water Services API
const USGS_BASE_URL = "https://waterservices.usgs.gov/nwis/iv"

// Buffalo River gauge site IDs
export const GAUGE_SITES = {
  pruitt: "07055875", // Buffalo River near Pruitt
  gilbert: "07056000", // Buffalo River near Gilbert
  rush: "07055646", // Buffalo River near Rush
  carver: "07055660", // Buffalo River near Carver
  buffalo_city: "07056700", // Buffalo River near Buffalo City
}

export async function fetchUSGSData(siteId: string): Promise<USGSReading | null> {
  try {
    const params = new URLSearchParams({
      format: "json",
      sites: siteId,
      parameterCd: "00065", // Gauge height in feet
      siteStatus: "active",
      period: "P1D", // Last 1 day
    })

    const response = await fetch(`${USGS_BASE_URL}?${params}`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.value?.timeSeries?.[0]?.values?.[0]?.value?.[0]) {
      return null
    }

    const timeSeries = data.value.timeSeries[0]
    const latestValue = timeSeries.values[0].value[0]

    return {
      siteId,
      dateTime: latestValue.dateTime,
      value: Number.parseFloat(latestValue.value),
      qualifiers: latestValue.qualifiers || "",
    }
  } catch (error) {
    console.error(`Failed to fetch USGS data for site ${siteId}:`, error)
    return null
  }
}

export async function fetchHistoricalData(siteId: string, days = 14): Promise<HistoricalData[]> {
  try {
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)

    const params = new URLSearchParams({
      format: "json",
      sites: siteId,
      parameterCd: "00065",
      startDT: startDate.toISOString().split("T")[0],
      endDT: endDate.toISOString().split("T")[0],
    })

    const response = await fetch(`${USGS_BASE_URL}?${params}`)

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.value?.timeSeries?.[0]?.values?.[0]?.value) {
      return []
    }

    const values = data.value.timeSeries[0].values[0].value

    // Group by day and take daily averages
    const dailyData: { [key: string]: number[] } = {}

    values.forEach((reading: any) => {
      const date = new Date(reading.dateTime)
      const dateKey = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
      const value = Number.parseFloat(reading.value)

      if (!isNaN(value)) {
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = []
        }
        dailyData[dateKey].push(value)
      }
    })

    return Object.entries(dailyData)
      .map(([date, values]) => ({
        date,
        level: values.reduce((sum, val) => sum + val, 0) / values.length,
        timestamp: Date.now(),
      }))
      .slice(-14) // Last 14 days
  } catch (error) {
    console.error(`Failed to fetch historical data for site ${siteId}:`, error)
    return []
  }
}
