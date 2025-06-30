import "server-only"
import { NextResponse } from "next/server"
import { fetchCurrentWeather, fetchWeatherForecast, fetchWeatherAlerts } from "@/services/weatherApi"

export async function GET() {
  try {
    const [current, forecast, alerts] = await Promise.all([
      fetchCurrentWeather(),
      fetchWeatherForecast(),
      fetchWeatherAlerts(),
    ])

    return NextResponse.json({ current, forecast, alerts })
  } catch (err) {
    console.error("Weather API route error:", err)
    return NextResponse.json({ error: "Failed to load weather data" }, { status: 500 })
  }
}
