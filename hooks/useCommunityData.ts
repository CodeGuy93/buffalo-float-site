"use client"

import { useState, useEffect, useCallback } from "react"
import type { UserTripReport, CommunityStats } from "../types"
import { MOCK_TRIP_REPORTS } from "../constants/data"

const STORAGE_KEY = "buffalo-float-community-reports"

export function useCommunityData() {
  const [userReports, setUserReports] = useState<UserTripReport[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load reports from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const reports = JSON.parse(stored)
        setUserReports(reports)
      }
    } catch (error) {
      console.error("Failed to load community reports:", error)
    }
  }, [])

  // Save reports to localStorage whenever userReports changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userReports))
    } catch (error) {
      console.error("Failed to save community reports:", error)
    }
  }, [userReports])

  const submitReport = useCallback(async (reportData: Omit<UserTripReport, "id" | "timestamp">) => {
    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReport: UserTripReport = {
        ...reportData,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }

      setUserReports((prev) => [newReport, ...prev])
      return { success: true }
    } catch (error) {
      console.error("Failed to submit report:", error)
      return { success: false, error: "Failed to submit report" }
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Combine mock reports with user reports, sorted by timestamp/recency
  const allReports = [
    ...userReports,
    ...MOCK_TRIP_REPORTS.map((report) => ({
      ...report,
      id: report.id.toString(),
      waterLevel: 5.2,
      conditions: "Good",
      timestamp: Date.now() - report.id * 3600000, // Mock timestamps
    })),
  ].sort((a, b) => b.timestamp - a.timestamp)

  // Calculate community stats
  const communityStats: CommunityStats = {
    totalReports: allReports.length,
    totalPhotos: allReports.reduce((sum, report) => sum + report.photos, 0),
    activeUsers: new Set(allReports.map((report) => report.user)).size,
    averageRating:
      allReports.length > 0
        ? Math.round((allReports.reduce((sum, report) => sum + report.rating, 0) / allReports.length) * 10) / 10
        : 0,
  }

  return {
    allReports,
    userReports,
    communityStats,
    submitReport,
    isSubmitting,
  }
}
