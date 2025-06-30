"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  Waves,
  Mail,
  MapPin,
  Tent,
  Car,
  Utensils,
  Calculator,
  Users,
  Camera,
  MessageSquare,
  Navigation,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react"

export default function BuffaloFloatAlert() {
  // State for data and auto-refresh
  const [selectedGauge, setSelectedGauge] = useState("pruitt")
  const [currentLevel, setCurrentLevel] = useState(5.2)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // Trip planning state
  const [groupSize, setGroupSize] = useState(4)
  const [experienceLevel, setExperienceLevel] = useState("beginner")
  const [selectedSection, setSelectedSection] = useState("")

  const minLevel = 4.8
  const maxLevel = 6.6
  const isFloatable = currentLevel >= minLevel && currentLevel <= maxLevel

  // Multiple gauge locations
  const gaugeLocations = {
    pruitt: { name: "Pruitt", level: 5.2, status: "floatable" },
    gilbert: { name: "Gilbert", level: 4.9, status: "floatable" },
    rush: { name: "Rush", level: 6.1, status: "floatable" },
    carver: { name: "Carver", level: 5.8, status: "floatable" },
    buffalo_city: { name: "Buffalo City", level: 4.3, status: "low" },
  }

  // Trip planning data
  const riverSections = [
    {
      name: "Boxley to Ponca",
      distance: 12,
      difficulty: "Beginner",
      timeRange: "4-6 hours",
      description: "Scenic family-friendly float with gentle rapids",
      minLevel: 4.5,
      maxLevel: 7.0,
    },
    {
      name: "Ponca to Kyles Landing",
      distance: 11,
      difficulty: "Beginner",
      timeRange: "4-5 hours",
      description: "Popular section with beautiful bluffs",
      minLevel: 4.8,
      maxLevel: 6.8,
    },
    {
      name: "Kyles Landing to Pruitt",
      distance: 15,
      difficulty: "Intermediate",
      timeRange: "5-7 hours",
      description: "Longer float with varied scenery",
      minLevel: 5.0,
      maxLevel: 6.5,
    },
    {
      name: "Pruitt to Gilbert",
      distance: 18,
      difficulty: "Intermediate",
      timeRange: "6-8 hours",
      description: "Full day adventure with remote wilderness",
      minLevel: 5.2,
      maxLevel: 6.2,
    },
  ]

  // Mock community data
  const recentReports = [
    {
      id: 1,
      user: "RiverRat2024",
      section: "Ponca to Kyles",
      date: "2 hours ago",
      rating: 5,
      report: "Perfect conditions today! Water was crystal clear and just the right level.",
      photos: 3,
    },
    {
      id: 2,
      user: "CanoeFamily",
      section: "Boxley to Ponca",
      date: "5 hours ago",
      rating: 4,
      report: "Great family trip. Kids loved it! One small log jam near mile 8 but easily navigable.",
      photos: 1,
    },
  ]

  // Mock historical data
  const historicalData = [
    { date: "12/15", level: 4.2 },
    { date: "12/16", level: 4.5 },
    { date: "12/17", level: 4.8 },
    { date: "12/18", level: 5.1 },
    { date: "12/19", level: 5.4 },
    { date: "12/20", level: 5.8 },
    { date: "12/21", level: 6.2 },
    { date: "12/22", level: 6.0 },
    { date: "12/23", level: 5.7 },
    { date: "12/24", level: 5.4 },
    { date: "12/25", level: 5.2 },
    { date: "12/26", level: 5.0 },
    { date: "12/27", level: 4.9 },
    { date: "12/28", level: 5.2 },
  ]

  // Mock weather data
  const currentWeather = {
    temp: 45,
    condition: "Partly Cloudy",
    icon: Cloud,
    humidity: 65,
    windSpeed: 8,
  }

  const forecast = [
    { day: "Today", high: 48, low: 32, condition: "Partly Cloudy", icon: Cloud, rain: 0 },
    { day: "Tomorrow", high: 52, low: 35, condition: "Sunny", icon: Sun, rain: 0 },
    { day: "Day 3", high: 46, low: 30, condition: "Rain", icon: CloudRain, rain: 75 },
  ]

  // Trip planning calculator
  const calculateTripTime = (section: any) => {
    if (!section) return 0

    const baseTime = section.distance * 0.4

    let levelMultiplier = 1.0
    if (currentLevel > 5.5) {
      levelMultiplier = 0.8
    } else if (currentLevel < 5.0) {
      levelMultiplier = 1.3
    }

    const experienceMultipliers = {
      beginner: 1.3,
      intermediate: 1.0,
      advanced: 0.8,
    }

    const experienceMultiplier = experienceMultipliers[experienceLevel as keyof typeof experienceMultipliers] || 1.0
    const groupMultiplier = groupSize > 6 ? 1.2 : groupSize < 3 ? 0.9 : 1.0
    const totalTime = baseTime * levelMultiplier * experienceMultiplier * groupMultiplier

    return Math.round(totalTime * 10) / 10
  }

  // Auto-refresh functionality
  const refreshData = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const variation = (Math.random() - 0.5) * 0.2
    setCurrentLevel((prev) => Math.max(3.0, Math.min(8.0, prev + variation)))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const maxHistoricalLevel = Math.max(...historicalData.map((d) => d.level))
  const chartHeight = 120

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Waves className="h-8 w-8 text-sky-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Buffalo Float Alert</h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">Complete Buffalo River trip planning</p>
        </div>

        {/* Gauge Selection & Controls */}
        <div className="max-w-2xl mx-auto mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">River Gauge</label>
                    <select
                      value={selectedGauge}
                      onChange={(e) => setSelectedGauge(e.target.value)}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-md"
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
                <div className="flex gap-2">
                  <Button onClick={refreshData} disabled={isRefreshing} variant="outline" size="sm">
                    <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="conditions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="conditions">River Conditions</TabsTrigger>
              <TabsTrigger value="planning">Trip Planning</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="practical">Practical Info</TabsTrigger>
            </TabsList>

            {/* River Conditions Tab */}
            <TabsContent value="conditions" className="space-y-8">
              {/* Main Status Card */}
              <div className="max-w-2xl mx-auto">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl text-slate-700">
                      Buffalo River at {gaugeLocations[selectedGauge as keyof typeof gaugeLocations].name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-lg text-slate-600 mb-2">Current River Level</p>
                      <p className="text-4xl font-bold text-slate-800">{currentLevel.toFixed(1)} ft</p>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        isFloatable
                          ? "bg-emerald-100 border-2 border-emerald-200"
                          : "bg-red-100 border-2 border-red-200"
                      }`}
                    >
                      <div className="text-5xl mb-3">{isFloatable ? "✅" : "🚫"}</div>
                      <p className={`text-2xl font-bold ${isFloatable ? "text-emerald-800" : "text-red-800"}`}>
                        {isFloatable ? "Floatable Today!" : "Not Floatable Today."}
                      </p>
                    </div>

                    <div className="bg-sky-50 rounded-lg p-4">
                      <p className="text-slate-700 leading-relaxed">
                        The Buffalo River at {gaugeLocations[selectedGauge as keyof typeof gaugeLocations].name} is
                        considered floatable when the water level is between{" "}
                        <span className="font-semibold text-sky-700">
                          {minLevel} and {maxLevel} feet
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
                              : "border-red-200 bg-red-50"
                        }`}
                        onClick={() => setSelectedGauge(key)}
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

              {/* Historical Chart & Weather */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-700 text-center">14-Day Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative" style={{ height: chartHeight + 40 }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-50 to-transparent rounded-lg"></div>
                      <div
                        className="absolute left-0 right-0 bg-emerald-100 border-y border-emerald-200"
                        style={{
                          top: `${((maxHistoricalLevel - maxLevel) / maxHistoricalLevel) * chartHeight}px`,
                          height: `${((maxLevel - minLevel) / maxHistoricalLevel) * chartHeight}px`,
                        }}
                      >
                        <div className="text-xs text-emerald-700 p-1">Floatable Range</div>
                      </div>
                      <svg className="absolute inset-0 w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="3"
                          points={historicalData
                            .map((point, index) => {
                              const x = (index / (historicalData.length - 1)) * 100
                              const y = ((maxHistoricalLevel - point.level) / maxHistoricalLevel) * chartHeight
                              return `${x}%,${y}`
                            })
                            .join(" ")}
                        />
                        {historicalData.map((point, index) => {
                          const x = (index / (historicalData.length - 1)) * 100
                          const y = ((maxHistoricalLevel - point.level) / maxHistoricalLevel) * chartHeight
                          return (
                            <circle
                              key={index}
                              cx={`${x}%`}
                              cy={y}
                              r="4"
                              fill="#0ea5e9"
                              className="hover:r-6 transition-all"
                            />
                          )
                        })}
                      </svg>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-2">
                        {historicalData
                          .filter((_, i) => i % 3 === 0)
                          .map((point, index) => (
                            <span key={index}>{point.date}</span>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-700 text-center flex items-center justify-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Weather
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <currentWeather.icon className="h-8 w-8 text-slate-600" />
                          <div>
                            <p className="text-2xl font-bold text-slate-800">{currentWeather.temp}°F</p>
                            <p className="text-slate-600">{currentWeather.condition}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-slate-600">
                          <div className="flex items-center gap-1 mb-1">
                            <Droplets className="h-4 w-4" />
                            {currentWeather.humidity}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Wind className="h-4 w-4" />
                            {currentWeather.windSpeed} mph
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {forecast.map((day, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-2 text-center">
                          <p className="text-xs font-medium text-slate-700 mb-1">{day.day}</p>
                          <day.icon className="h-5 w-5 text-slate-600 mx-auto mb-1" />
                          <p className="text-sm font-bold text-slate-800">{day.high}°</p>
                          <p className="text-xs text-slate-600">{day.low}°</p>
                          {day.rain > 0 && <p className="text-xs text-blue-600">{day.rain}%</p>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trip Planning Tab */}
            <TabsContent value="planning" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Trip Calculator */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-emerald-600" />
                      Trip Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Group Size</label>
                      <select
                        value={groupSize.toString()}
                        onChange={(e) => setGroupSize(Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="2">2 people</option>
                        <option value="4">4 people</option>
                        <option value="6">6 people</option>
                        <option value="8">8+ people</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Experience Level</label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">River Section</label>
                      <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a section</option>
                        {riverSections.map((section, index) => (
                          <option key={index} value={section.name}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Live Calculations */}
                    <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="font-semibold text-emerald-800">Trip Summary</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white rounded p-2">
                          <p className="text-slate-600">Canoes Needed</p>
                          <p className="font-bold text-emerald-700">{Math.ceil(groupSize / 2)}</p>
                        </div>
                        <div className="bg-white rounded p-2">
                          <p className="text-slate-600">Estimated Cost</p>
                          <p className="font-bold text-emerald-700">${Math.ceil(groupSize / 2) * 45}</p>
                        </div>
                      </div>

                      {selectedSection && (
                        <div className="bg-white rounded-lg p-3 mt-3">
                          <h4 className="font-semibold text-emerald-800 mb-2">{selectedSection}</h4>
                          {(() => {
                            const section = riverSections.find((s) => s.name === selectedSection)
                            if (section) {
                              const estimatedTime = calculateTripTime(section)
                              const isRecommended = currentLevel >= section.minLevel && currentLevel <= section.maxLevel
                              return (
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Distance:</span>
                                    <span className="font-medium">{section.distance} miles</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Estimated Time:</span>
                                    <span className="font-medium">{estimatedTime} hours</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Difficulty:</span>
                                    <span className="font-medium">{section.difficulty}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Conditions:</span>
                                    <span
                                      className={`font-medium ${isRecommended ? "text-green-600" : "text-red-600"}`}
                                    >
                                      {isRecommended ? "Good" : "Poor"}
                                    </span>
                                  </div>
                                  {!isRecommended && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                                      <p className="text-yellow-800 text-xs">
                                        ⚠️ Current water level ({currentLevel.toFixed(1)} ft) is outside optimal range (
                                        {section.minLevel}-{section.maxLevel} ft)
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )
                            }
                            return null
                          })()}
                        </div>
                      )}

                      <div className="text-xs text-emerald-700 space-y-1 mt-3">
                        <p>• Shuttle service: ${groupSize > 6 ? "25" : "15"} per vehicle</p>
                        <p>• Best launch time: {experienceLevel === "beginner" ? "9:00 AM" : "8:00 AM"}</p>
                        <p>• Weather: {isFloatable ? "Favorable" : "Check conditions"}</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setGroupSize(4)
                        setExperienceLevel("beginner")
                        setSelectedSection("")
                      }}
                    >
                      Reset Calculator
                    </Button>
                  </CardContent>
                </Card>

                {/* River Sections */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-sky-600" />
                        River Sections
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {riverSections.map((section, index) => {
                          const isRecommended = currentLevel >= section.minLevel && currentLevel <= section.maxLevel
                          const estimatedTime = calculateTripTime(section)

                          return (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 ${
                                isRecommended ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold text-slate-800">{section.name}</h3>
                                  <p className="text-sm text-slate-600">{section.description}</p>
                                </div>
                                {isRecommended && (
                                  <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-1">
                                  <Navigation className="h-3 w-3 text-slate-500" />
                                  <span>{section.distance} miles</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-slate-500" />
                                  <span>{estimatedTime}h estimated</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3 text-slate-500" />
                                  <span>{section.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Waves className="h-3 w-3 text-slate-500" />
                                  <span>
                                    {section.minLevel}-{section.maxLevel} ft
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Recent Trip Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentReports.map((report) => (
                        <div key={report.id} className="border-l-4 border-blue-200 pl-4 py-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-semibold text-slate-800">{report.user}</span>
                              <span className="text-slate-500 text-sm ml-2">{report.section}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < report.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-slate-500">{report.date}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">{report.report}</p>
                          {report.photos > 0 && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Camera className="h-3 w-3" />
                              <span>{report.photos} photos</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                      <Camera className="h-5 w-5 text-emerald-600" />
                      Share Your Trip
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">River Section</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select section</option>
                        {riverSections.map((section, index) => (
                          <option key={index} value={section.name}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Trip Report</label>
                      <Textarea placeholder="Share your experience..." className="min-h-[100px]" />
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled>
                      Submit Report (Coming Soon)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Practical Info Tab */}
            <TabsContent value="practical" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-sky-600" />
                      Nearby Amenities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="h-4 w-4 text-orange-600" />
                        <span className="font-semibold text-orange-800">Restaurants</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Buffalo Grill (Jasper)</span>
                          <span className="text-slate-500">8 mi</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cliff House Inn Restaurant</span>
                          <span className="text-slate-500">12 mi</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Gas Stations</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Casey's General Store</span>
                          <span className="text-slate-500">7 mi</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phillips 66 (Jasper)</span>
                          <span className="text-slate-500">8 mi</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                      <Tent className="h-5 w-5 text-emerald-600" />
                      Camping & Gear
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-emerald-800">Buffalo Point</span>
                        <span className="text-green-600 font-bold">12 sites</span>
                      </div>
                      <p className="text-sm text-slate-600">Full hookups • $20/night</p>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-indigo-800">Buffalo Outdoor Center</span>
                        <span className="text-green-600 font-medium">Open</span>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">
                        <p>Canoes: $45/day • Kayaks: $35/day</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href="tel:870-861-5514">(870) 861-5514</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Email Signup */}
        <div className="max-w-md mx-auto mt-12">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-emerald-600 mr-2" />
                <CardTitle className="text-xl text-slate-700">Email Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-slate-600">Get notified when river conditions change!</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" disabled />
                <Button disabled className="bg-emerald-600 hover:bg-emerald-700">
                  Notify Me
                </Button>
              </div>
              <p className="text-sm text-center text-slate-500">Coming soon! Email alerts for river level changes.</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500">
          <p className="text-sm">Data provided by USGS • Buffalo National River, Arkansas</p>
          <p className="text-xs mt-1">Auto-refreshes every 15 minutes</p>
        </div>
      </div>
    </div>
  )
}
