"use client"

import { memo } from "react"
import { Calculator, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TripCalculation, RiverSection } from "../types"

interface TripCalculatorProps {
  groupSize: number
  onGroupSizeChange: (size: number) => void
  experienceLevel: string
  onExperienceLevelChange: (level: string) => void
  selectedSection: string
  onSectionChange: (section: string) => void
  riverSections: RiverSection[]
  selectedSectionData: RiverSection | undefined
  tripCalculation: TripCalculation | null
  currentLevel: number
  isFloatable: boolean
  onReset: () => void
}

export const TripCalculator = memo<TripCalculatorProps>(
  ({
    groupSize,
    onGroupSizeChange,
    experienceLevel,
    onExperienceLevelChange,
    selectedSection,
    onSectionChange,
    riverSections,
    selectedSectionData,
    tripCalculation,
    currentLevel,
    isFloatable,
    onReset,
  }) => {
    return (
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
              onChange={(e) => onGroupSizeChange(Number.parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              onChange={(e) => onExperienceLevelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              onChange={(e) => onSectionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select a section</option>
              {riverSections.map((section, index) => (
                <option key={index} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          {/* Trip Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="font-semibold text-emerald-800">Trip Summary</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded p-2">
                <p className="text-slate-600">Canoes Needed</p>
                <p className="font-bold text-emerald-700">{tripCalculation?.canoes ?? Math.ceil(groupSize / 2)}</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="text-slate-600">Estimated Cost</p>
                <p className="font-bold text-emerald-700">
                  ${tripCalculation?.estimatedCost ?? Math.ceil(groupSize / 2) * 45}
                </p>
              </div>
            </div>

            {selectedSectionData && tripCalculation && (
              <div className="bg-white rounded-lg p-3 mt-3">
                <h4 className="font-semibold text-emerald-800 mb-2">{selectedSection}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-medium">{selectedSectionData.distance} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span className="font-medium">{tripCalculation.estimatedTime} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium">{selectedSectionData.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conditions:</span>
                    <span
                      className={`font-medium ${tripCalculation.isRecommended ? "text-green-600" : "text-red-600"}`}
                    >
                      {tripCalculation.isRecommended ? "Good" : "Poor"}
                    </span>
                  </div>
                  {!tripCalculation.isRecommended && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                      <p className="text-yellow-800 text-xs">
                        ⚠️ Current water level ({currentLevel.toFixed(1)} ft) is outside optimal range (
                        {selectedSectionData.minLevel}-{selectedSectionData.maxLevel} ft)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-xs text-emerald-700 space-y-1 mt-3">
              <p>• Shuttle service: ${tripCalculation?.shuttleCost ?? (groupSize > 6 ? "25" : "15")} per vehicle</p>
              <p>
                • Best launch time:{" "}
                {tripCalculation?.launchTime ?? (experienceLevel === "beginner" ? "9:00 AM" : "8:00 AM")}
              </p>
              <p>• Weather: {isFloatable ? "Favorable" : "Check conditions"}</p>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent" onClick={onReset}>
            Reset Calculator
          </Button>
        </CardContent>
      </Card>
    )
  },
)

TripCalculator.displayName = "TripCalculator"
