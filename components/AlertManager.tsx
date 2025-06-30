"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertService } from "../services/alertService"
import type { AlertSubscription, GaugeLocation } from "../types"

interface AlertManagerProps {
  gaugeLocations: Record<string, GaugeLocation>
}

export function AlertManager({ gaugeLocations }: AlertManagerProps) {
  const [subscriptions, setSubscriptions] = useState<AlertSubscription[]>([])
  const [isTestingNotification, setIsTestingNotification] = useState(false)

  const alertService = AlertService.getInstance()

  useEffect(() => {
    setSubscriptions(alertService.getSubscriptions())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      alertService.deleteSubscription(id)
      setSubscriptions(alertService.getSubscriptions())
    }
  }

  const handleToggle = (id: string, enabled: boolean) => {
    alertService.updateSubscription(id, { enabled })
    setSubscriptions(alertService.getSubscriptions())
  }

  const testNotification = async () => {
    setIsTestingNotification(true)
    const success = await alertService.testNotification()

    if (success) {
      alert("Test notification sent! Check your browser notifications.")
    } else {
      alert("Failed to send test notification. Please enable browser notifications.")
    }

    setIsTestingNotification(false)
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          Smart Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <div className="bg-blue-100 rounded-lg p-6 mb-4">
            <Bell className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-blue-600 mb-2">Smart Alerts Coming Soon!</p>
            <p className="text-sm text-blue-700 mb-4">
              Advanced alert system with browser notifications, email, and SMS is currently in development.
            </p>
            <div className="text-left bg-white rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Planned Features:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Real-time browser notifications when conditions change</li>
                <li>• Email alerts for water level changes</li>
                <li>• SMS notifications for urgent weather alerts</li>
                <li>• Custom thresholds for each river gauge</li>
                <li>• Severe weather integration</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
