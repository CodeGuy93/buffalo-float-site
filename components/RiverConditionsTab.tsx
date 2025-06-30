"use client"

import { memo } from "react"
import { Thermometer, Droplets, Wind, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RIVER_LEVEL_CONSTANTS } from "../constants/data"
import type { GaugeLocation, HistoricalData, WeatherData, ForecastDay } from "../types"

interface RiverConditionsTabProps {
  gaugeLocations: Record<string, GaugeLocation>
  selectedGauge: string
  onGaugeChange: (gauge: string) => void
  historicalData: HistoricalData[]
  currentWeather: WeatherData | null
  weatherForecast: ForecastDay[]
}

export const RiverConditionsTab = memo<RiverConditionsTabProps>(
  ({ gaugeLocations, selectedGauge, onGaugeChange, historicalData, currentWeather, weatherForecast }) => {
    const FLOATABLE_MIN = RIVER_LEVEL_CONSTANTS.MIN_FLOATABLE
    const FLOATABLE_MAX = RIVER_LEVEL_CONSTANTS.MAX_FLOATABLE

    // Use fixed chart range for consistent layout across all gauges
    const chartMin = RIVER_LEVEL_CONSTANTS.CHART_MIN
    const chartMax = RIVER_LEVEL_CONSTANTS.CHART_MAX
    const chartRange = chartMax - chartMin

    // Generate consistent Y-axis ticks for all gauges
    const generateYTicks = () => {
      const ticks = []
      const step = 0.5
      let current = chartMin

      while (current <= chartMax) {
        ticks.push(current)
        current += step
      }

      return ticks.sort((a, b) => b - a) // Sort from high to low for display
    }

    const yTicks = generateYTicks()

    return (
      <div className="space-y-8">
        {/* All Gauges Overview */}
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
                        : gauge.status === "high"
                          ? "border-orange-200 bg-orange-50"
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
                    <p className="text-2xl font-bold text-slate-800">{gauge.level.toFixed(1)} ft</p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        gauge.status === "floatable"
                          ? "bg-green-100 text-green-800"
                          : gauge.status === "high"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {gauge.status === "floatable" ? "Floatable" : gauge.status === "high" ? "High" : "Low"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standardized Chart Layout */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-700 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                14-Day Water Level Trend - {gaugeLocations[selectedGauge]?.name}
              </CardTitle>
              <div className="text-lg text-slate-600">
                Current Level:{" "}
                <span className="font-bold text-blue-600">{gaugeLocations[selectedGauge]?.level.toFixed(1)} ft</span>
              </div>
            </CardHeader>
            <CardContent>
              {historicalData.length > 0 ? (
                <div className="space-y-6">
                  {/* Chart Container - CONSISTENT LAYOUT */}
                  <div className="w-full h-96 bg-gradient-to-b from-sky-50/30 to-blue-50/20 rounded-xl border border-slate-200 p-8">
                    <div className="relative w-full h-full">
                      {/* Floatable Range Background - Always in same position */}
                      <div
                        className="absolute left-12 right-8 bg-emerald-100/60 border-y-2 border-emerald-300 border-dashed rounded"
                        style={{
                          top: `${((chartMax - FLOATABLE_MAX) / chartRange) * 100}%`,
                          height: `${((FLOATABLE_MAX - FLOATABLE_MIN) / chartRange) * 100}%`,
                        }}
                      >
                        <div className="text-sm text-emerald-700 font-semibold p-2">
                          🌊 Floatable Range (4.8 - 6.6 ft)
                        </div>
                      </div>

                      {/* Chart SVG */}
                      <svg className="absolute inset-0 w-full h-full" style={{ padding: "0 3rem" }}>
                        {/* Grid Lines - Consistent across all gauges */}
                        {yTicks.map((level) => (
                          <line
                            key={level}
                            x1="0"
                            x2="100%"
                            y1={`${((chartMax - level) / chartRange) * 100}%`}
                            y2={`${((chartMax - level) / chartRange) * 100}%`}
                            stroke={level === FLOATABLE_MIN || level === FLOATABLE_MAX ? "#10b981" : "#e2e8f0"}
                            strokeWidth={level === FLOATABLE_MIN || level === FLOATABLE_MAX ? "2" : "1"}
                            strokeDasharray={level === FLOATABLE_MIN || level === FLOATABLE_MAX ? "5,5" : "none"}
                            opacity="0.7"
                          />
                        ))}

                        {/* Data Line */}
                        <polyline
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={historicalData
                            .map((point, index) => {
                              const x = (index / (historicalData.length - 1)) * 100
                              const y = ((chartMax - point.level) / chartRange) * 100
                              return `${x}%,${y}%`
                            })
                            .join(" ")}
                        />

                        {/* Data Points */}
                        {historicalData.map((point, index) => {
                          const x = (index / (historicalData.length - 1)) * 100
                          const y = ((chartMax - point.level) / chartRange) * 100
                          const isFloatable = point.level >= FLOATABLE_MIN && point.level <= FLOATABLE_MAX

                          return (
                            <g key={index}>
                              <circle
                                cx={`${x}%`}
                                cy={`${y}%`}
                                r="6"
                                fill={isFloatable ? "#10b981" : "#ef4444"}
                                stroke="white"
                                strokeWidth="3"
                                className="hover:r-8 transition-all cursor-pointer drop-shadow-lg"
                              />
                              <title>{`${point.date}: ${point.level.toFixed(1)} ft`}</title>
                            </g>
                          )
                        })}
                      </svg>

                      {/* Y-Axis Labels - CONSISTENT POSITIONING */}
                      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-start text-sm font-medium text-slate-600">
                        {yTicks.map((tick) => (
                          <div
                            key={tick}
                            className="absolute flex items-center justify-end w-full pr-2"
                            style={{
                              top: `${((chartMax - tick) / chartRange) * 100}%`,
                              transform: "translateY(-50%)",
                            }}
                          >
                            <span
                              className={`${
                                tick === FLOATABLE_MIN || tick === FLOATABLE_MAX
                                  ? "text-emerald-600 font-bold"
                                  : "text-slate-600"
                              }`}
                            >
                              {tick.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* X-Axis Labels */}
                      <div className="absolute bottom-0 left-12 right-8 flex justify-between text-sm text-slate-500">
                        {historicalData
                          .filter((_, i) => i % Math.ceil(historicalData.length / 6) === 0)
                          .map((point, index) => (
                            <span key={index}>{point.date}</span>
                          ))}
                      </div>

                      {/* Current Level Indicator */}
                      {gaugeLocations[selectedGauge] && (
                        <div
                          className="absolute right-4 flex items-center"
                          style={{
                            top: `${((chartMax - gaugeLocations[selectedGauge].level) / chartRange) * 100}%`,
                            transform: "translateY(-50%)",
                          }}
                        >
                          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                          <span className="ml-2 text-sm font-bold text-red-600">
                            {gaugeLocations[selectedGauge].level.toFixed(1)} ft
                          </span>
                        </div>
                      )}

                      {/* Y-Axis Title */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90">
                        <span className="text-sm font-medium text-slate-600">Water Level (ft)</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between text-sm bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                        <span className="font-medium">Floatable Level (4.8-6.6 ft)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Not Floatable</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-blue-500 rounded"></div>
                        <span className="font-medium">Water Level Trend</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-slate-500">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-30" />
                    <p className="text-xl">Loading historical data...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weather Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Current Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {console.log("RiverConditionsTab - currentWeather:", currentWeather)}
              {console.log("RiverConditionsTab - weatherForecast:", weatherForecast)}
              {currentWeather ? (
                <>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {currentWeather.icon ? <currentWeather.icon className="h-12 w-12 text-slate-600" /> : null}
                        <div>
                          <p className="text-3xl font-bold text-slate-800">{currentWeather.temp}°F</p>
                          <p className="text-lg text-slate-600">{currentWeather.condition}</p>
                        </div>
                      </div>
                      <div className="text-right text-base text-slate-600 space-y-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-5 w-5" />
                          <span>{currentWeather.humidity}% Humidity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="h-5 w-5" />
                          <span>{currentWeather.windSpeed} mph Wind</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {weatherForecast.map((day, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 text-center">
                        <p className="text-sm font-medium text-slate-700 mb-2">{day.day}</p>
                        {day.icon ? <day.icon className="h-8 w-8 text-slate-600 mx-auto mb-2" /> : null}
                        <p className="text-lg font-bold text-slate-800">{day.high}°</p>
                        <p className="text-sm text-slate-600">{day.low}°</p>
                        {day.rain > 0 && <p className="text-sm text-blue-600 mt-1">{day.rain}% rain</p>}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-32 text-slate-500">Loading weather data...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
)

RiverConditionsTab.displayName = "RiverConditionsTab"
