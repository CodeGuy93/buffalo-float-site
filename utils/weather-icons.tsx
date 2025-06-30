"use client"

import { Sun, Cloud, CloudRain, CloudSnow, Zap, type LucideIcon } from "lucide-react"

export function getWeatherIcon(condition: string): LucideIcon {
  const txt = condition.toLowerCase()
  if (txt.includes("rain") || txt.includes("drizzle")) return CloudRain
  if (txt.includes("snow")) return CloudSnow
  if (txt.includes("thunder") || txt.includes("storm")) return Zap
  if (txt.includes("cloud")) return Cloud
  return Sun
}
