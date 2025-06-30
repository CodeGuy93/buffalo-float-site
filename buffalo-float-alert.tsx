"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Mail } from "lucide-react"

// Hooks
import { useRiverData } from "./hooks/useRiverData"
import { useTripCalculator } from "./hooks/useTripCalculator"

// Components
import { GaugeSelector } from "./components/GaugeSelector"
import { RiverStatusCard } from "./components/RiverStatusCard"
import { TripCalculator } from "./components/TripCalculator"

// Legacy components (to be refactored)
import { RiverConditionsTab } from "./components/RiverConditionsTab"
import { CommunityTab } from "./components/CommunityTab"
import { PracticalInfoTab } from "./components/PracticalInfoTab"

export default function BuffaloFloatAlert() {
  const riverData = useRiverData()
  const tripCalculator = useTripCalculator(riverData.currentLevel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Waves className="h-8 w-8 text-sky-600 mr-3" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Buffalo Float Alert</h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">Complete Buffalo River trip planning</p>
        </header>

        {/* Gauge Selection */}
        <GaugeSelector
          selectedGauge={riverData.selectedGauge}
          onGaugeChange={riverData.setSelectedGauge}
          gaugeLocations={riverData.gaugeLocations}
          lastUpdated={riverData.lastUpdated}
          isRefreshing={riverData.isRefreshing}
          onRefresh={riverData.refreshData}
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
                currentLevel={riverData.currentLevel}
                isFloatable={riverData.isFloatable}
                selectedGaugeData={riverData.selectedGaugeData}
              />
              <RiverConditionsTab
                gaugeLocations={riverData.gaugeLocations}
                selectedGauge={riverData.selectedGauge}
                onGaugeChange={riverData.setSelectedGauge}
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
                  currentLevel={riverData.currentLevel}
                  isFloatable={riverData.isFloatable}
                  onReset={tripCalculator.resetCalculator}
                />

                {/* River Sections - Placeholder for now */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-700">River Sections (Coming Soon)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">Detailed river section information will be displayed here.</p>
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

        {/* Email Signup */}
        <section className="max-w-md mx-auto mt-12" aria-labelledby="email-signup">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-emerald-600 mr-2" aria-hidden="true" />
                <CardTitle id="email-signup" className="text-xl text-slate-700">
                  Email Alerts
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-slate-600">Get notified when river conditions change!</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  disabled
                  aria-label="Email address for alerts"
                />
                <Button disabled className="bg-emerald-600 hover:bg-emerald-700">
                  Notify Me
                </Button>
              </div>
              <p className="text-sm text-center text-slate-500">Coming soon! Email alerts for river level changes.</p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-slate-500">
          <p className="text-sm">Data provided by USGS • Buffalo National River, Arkansas</p>
          <p className="text-xs mt-1">Auto-refreshes every 15 minutes</p>
        </footer>
      </div>
    </div>
  )
}
