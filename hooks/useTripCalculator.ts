"use client"

import { useState, useMemo } from "react"
import { RIVER_SECTIONS } from "../constants/data"
import type { TripCalculation } from "../types"

type ExperienceLevel = "beginner" | "intermediate" | "advanced"

export function useTripCalculator(currentLevel: number) {
  const [groupSize, setGroupSize] = useState(4)
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("beginner")
  const [selectedSection, setSelectedSection] = useState("")

  const selectedSectionData = useMemo(
    () => RIVER_SECTIONS.find((section) => section.name === selectedSection),
    [selectedSection],
  )

  const tripCalculation = useMemo((): TripCalculation | null => {
    if (!selectedSectionData) return null

    const baseTime = selectedSectionData.distance * 0.4

    // Water level adjustments
    let levelMultiplier = 1.0
    if (currentLevel > 5.5) {
      levelMultiplier = 0.8 // Faster in higher water
    } else if (currentLevel < 5.0) {
      levelMultiplier = 1.3 // Slower in low water
    }

    // Experience level adjustments
    const experienceMultipliers: Record<ExperienceLevel, number> = {
      beginner: 1.3,
      intermediate: 1.0,
      advanced: 0.8,
    }

    const experienceMultiplier = experienceMultipliers[experienceLevel]
    const groupMultiplier = groupSize > 6 ? 1.2 : groupSize < 3 ? 0.9 : 1.0
    const totalTime = baseTime * levelMultiplier * experienceMultiplier * groupMultiplier

    const canoes = Math.ceil(groupSize / 2)
    const estimatedCost = canoes * 45
    const shuttleCost = groupSize > 6 ? 25 : 15
    const launchTime = experienceLevel === "beginner" ? "9:00 AM" : "8:00 AM"
    const isRecommended = currentLevel >= selectedSectionData.minLevel && currentLevel <= selectedSectionData.maxLevel

    return {
      canoes,
      estimatedCost,
      estimatedTime: Math.round(totalTime * 10) / 10,
      shuttleCost,
      launchTime,
      isRecommended,
    }
  }, [selectedSectionData, currentLevel, experienceLevel, groupSize])

  const resetCalculator = () => {
    setGroupSize(4)
    setExperienceLevel("beginner")
    setSelectedSection("")
  }

  return {
    groupSize,
    setGroupSize,
    experienceLevel,
    setExperienceLevel,
    selectedSection,
    setSelectedSection,
    selectedSectionData,
    tripCalculation,
    resetCalculator,
    riverSections: RIVER_SECTIONS,
  }
}
