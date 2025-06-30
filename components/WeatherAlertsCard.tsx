"use client"

import { memo } from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { WeatherAlert } from "../types"

interface WeatherAlertsCardProps {
  alerts: WeatherAlert[]
}

export const WeatherAlertsCard = memo<WeatherAlertsCardProps>(({ alerts }) => {
  if (alerts.length === 0) return null

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "bg-red-100 border-red-500 text-red-800"
      case "severe":
        return "bg-orange-100 border-orange-500 text-orange-800"
      case "moderate":
        return "bg-yellow-100 border-yellow-500 text-yellow-800"
      default:
        return "bg-blue-100 border-blue-500 text-blue-800"
    }
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)} shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{alert.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-3">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs opacity-75">
                    <span className="capitalize">Severity: {alert.severity}</span>
                    <span className="capitalize">Urgency: {alert.urgency}</span>
                    {alert.expires && <span>Expires: {new Date(alert.expires).toLocaleDateString()}</span>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

WeatherAlertsCard.displayName = "WeatherAlertsCard"
