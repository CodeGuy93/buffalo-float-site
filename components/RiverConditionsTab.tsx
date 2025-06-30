"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GaugeLocation } from "../types"

interface RiverConditionsTabProps {
  gaugeLocations: Record<string, GaugeLocation>
  selectedGauge: string
  onGaugeChange: (gauge: string) => void
}

export const RiverConditionsTab = memo<RiverConditionsTabProps>(({ gaugeLocations, selectedGauge, onGaugeChange }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-700 text-center">All Buffalo River Gauges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(gaugeLocations).map(([key, gauge]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedGauge === key
                  ? "border-sky-500 bg-sky-50"
                  : gauge.status === "floatable"
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
              }`}
              onClick={() => onGaugeChange(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onGaugeChange(key)
                }
              }}
              aria-label={`Select ${gauge.name} gauge, current level ${gauge.level} feet`}
            >
              <div className="text-center">
                <p className="font-semibold text-slate-800">{gauge.name}</p>
                <p className="text-2xl font-bold text-slate-800">{gauge.level} ft</p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    gauge.status === "floatable" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {gauge.status === "floatable" ? "Floatable" : "Low"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

RiverConditionsTab.displayName = "RiverConditionsTab"
