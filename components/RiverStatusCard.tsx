import { memo } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RIVER_LEVEL_CONSTANTS } from "../constants/data"
import type { GaugeLocation } from "../types"

interface RiverStatusCardProps {
  currentLevel: number
  isFloatable: boolean
  selectedGaugeData: GaugeLocation
}

export const RiverStatusCard = memo<RiverStatusCardProps>(({ currentLevel, isFloatable, selectedGaugeData }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-slate-700">Buffalo River at {selectedGaugeData.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-lg text-slate-600 mb-2">Current River Level</p>
            <p className="text-4xl font-bold text-slate-800" aria-live="polite">
              {currentLevel.toFixed(1)} ft
            </p>
          </div>

          <div
            className={`p-6 rounded-lg ${
              isFloatable ? "bg-emerald-100 border-2 border-emerald-200" : "bg-red-100 border-2 border-red-200"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="text-5xl mb-3" aria-hidden="true">
              {isFloatable ? "✅" : "🚫"}
            </div>
            <p className={`text-2xl font-bold ${isFloatable ? "text-emerald-800" : "text-red-800"}`}>
              {isFloatable ? "Floatable Today!" : "Not Floatable Today."}
            </p>
          </div>

          <div className="bg-sky-50 rounded-lg p-4">
            <p className="text-slate-700 leading-relaxed">
              The Buffalo River at {selectedGaugeData.name} is considered floatable when the water level is between{" "}
              <span className="font-semibold text-sky-700">
                {RIVER_LEVEL_CONSTANTS.MIN_FLOATABLE} and {RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE} feet
              </span>
              .
            </p>
          </div>

          <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg">
            <a
              href="https://waterdata.usgs.gov/monitoring-location/07055875/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              View USGS River Gauge
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
})

RiverStatusCard.displayName = "RiverStatusCard"
