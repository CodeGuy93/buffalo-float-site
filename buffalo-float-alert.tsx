"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Mail, AlertCircle } from "lucide-react"

// Hooks
import { useRealTimeData } from "./hooks/useRealTimeData"
import { useTripCalculator } from "./hooks/useTripCalculator"

// Components
import { GaugeSelector } from "./components/GaugeSelector"
import { RiverStatusCard } from "./components/RiverStatusCard"
import { TripCalculator } from "./components/TripCalculator"
import { RiverConditionsTab } from "./components/RiverConditionsTab"
import { CommunityTab } from "./components/CommunityTab"
import { PracticalInfoTab } from "./components/PracticalInfoTab"
import { AlertManager } from "./components/AlertManager"
import { WeatherAlertsCard } from "./components/WeatherAlertsCard"

export default function BuffaloFloatAlert() {
  const realTimeData = useRealTimeData()
  const tripCalculator = useTripCalculator(realTimeData.currentLevel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Waves className="h-8 w-8 text-sky-600 mr-3" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Buffalo Float Alert</h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">
            Real-time Buffalo River conditions & trip planning
          </p>
          {realTimeData.error && (
            <div className="max-w-2xl mx-auto mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">{realTimeData.error}</p>
              </div>
            </div>
          )}
        </header>

        {/* Weather Alerts */}
        {realTimeData.weatherAlerts.length > 0 && (
          <div className="max-w-4xl mx-auto mb-6">
            <WeatherAlertsCard alerts={realTimeData.weatherAlerts} />
          </div>
        )}

        {/* Gauge Selection */}
        <GaugeSelector
          selectedGauge={realTimeData.selectedGauge}
          onGaugeChange={realTimeData.setSelectedGauge}
          gaugeLocations={realTimeData.gaugeLocations}
          lastUpdated={realTimeData.lastUpdated}
          isRefreshing={realTimeData.isRefreshing}
          onRefresh={realTimeData.refreshData}
        />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          <Tabs defaultValue="conditions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="conditions">River Conditions</TabsTrigger>
              <TabsTrigger value="planning">Trip Planning</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="practical">Practical Info</TabsTrigger>
            </TabsList>

            {/* River Conditions Tab */}
            <TabsContent value="conditions" className="space-y-8">
              <RiverStatusCard
                currentLevel={realTimeData.currentLevel}
                isFloatable={realTimeData.isFloatable}
                selectedGaugeData={realTimeData.selectedGaugeData}
              />
              <RiverConditionsTab
                gaugeLocations={realTimeData.gaugeLocations}
                selectedGauge={realTimeData.selectedGauge}
                onGaugeChange={realTimeData.setSelectedGauge}
                historicalData={realTimeData.historicalData}
                currentWeather={realTimeData.currentWeather}
                weatherForecast={realTimeData.weatherForecast}
              />
            </TabsContent>

            {/* Trip Planning Tab */}
            <TabsContent value="planning" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-6">
                <TripCalculator
                  groupSize={tripCalculator.groupSize}
                  onGroupSizeChange={tripCalculator.setGroupSize}
                  experienceLevel={tripCalculator.experienceLevel}
                  onExperienceLevelChange={tripCalculator.setExperienceLevel}
                  selectedSection={tripCalculator.selectedSection}
                  onSectionChange={tripCalculator.setSelectedSection}
                  riverSections={tripCalculator.riverSections}
                  selectedSectionData={tripCalculator.selectedSectionData}
                  tripCalculation={tripCalculator.tripCalculation}
                  currentLevel={realTimeData.currentLevel}
                  isFloatable={realTimeData.isFloatable}
                  onReset={tripCalculator.resetCalculator}
                />

                {/* River Sections - Placeholder for now */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-700">River Sections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Enhanced river section details coming soon with real-time conditions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community">
              <CommunityTab />
            </TabsContent>

            {/* Practical Info Tab */}
            <TabsContent value="practical">
              <PracticalInfoTab />
            </TabsContent>
          </Tabs>
        </main>

        {/* Alert Manager */}
        <section className="max-w-4xl mx-auto mt-12">
          <AlertManager gaugeLocations={realTimeData.gaugeLocations} />
        </section>

        {/* Email Signup (Legacy - kept for compatibility) */}
        <section className="max-w-md mx-auto mt-12" aria-labelledby="email-signup">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-emerald-600 mr-2" aria-hidden="true" />
                <CardTitle id="email-signup" className="text-xl text-slate-700">
                  Quick Email Alerts
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <div className="bg-slate-100 rounded-lg p-6 mb-4">
                  <Mail className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-600 mb-2">Coming Soon!</p>
                  <p className="text-sm text-slate-500">
                    Quick email alerts are currently in development. Use the Smart Alerts above for instant
                    notifications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-slate-500">
          <p className="text-sm">Live data from USGS & National Weather Service • Buffalo National River, Arkansas</p>
          <p className="text-xs mt-1">
            Auto-refreshes every 15 minutes • Last updated: {realTimeData.lastUpdated.toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  )
}
