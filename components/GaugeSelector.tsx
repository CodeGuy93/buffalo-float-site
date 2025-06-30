"use client"

import { memo } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { GaugeLocation } from "../types"

interface GaugeSelectorProps {
  selectedGauge: string
  onGaugeChange: (gauge: string) => void
  gaugeLocations: Record<string, GaugeLocation>
  lastUpdated: Date
  isRefreshing: boolean
  onRefresh: () => void
}

export const GaugeSelector = memo<GaugeSelectorProps>(
  ({ selectedGauge, onGaugeChange, gaugeLocations, lastUpdated, isRefreshing, onRefresh }) => {
    return (
      <div className="max-w-2xl mx-auto mb-6">
        <Card className="bg-white/60 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">River Gauge</label>
                  <select
                    value={selectedGauge}
                    onChange={(e) => onGaugeChange(e.target.value)}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    aria-label="Select river gauge location"
                  >
                    {Object.entries(gaugeLocations).map(([key, gauge]) => (
                      <option key={key} value={key}>
                        {gauge.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-sm text-slate-600">Last updated: {lastUpdated.toLocaleTimeString()}</div>
              </div>
              <Button
                onClick={onRefresh}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                aria-label="Refresh river data"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
)

GaugeSelector.displayName = "GaugeSelector"
