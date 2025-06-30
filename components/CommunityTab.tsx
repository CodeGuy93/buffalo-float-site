"use client"

import type React from "react"

import { memo, useState } from "react"
import { MessageSquare, Camera, Star, Users, TrendingUp, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCommunityData } from "../hooks/useCommunityData"
import { RIVER_SECTIONS } from "../constants/data"

export const CommunityTab = memo(() => {
  const { allReports, communityStats, submitReport, isSubmitting } = useCommunityData()

  // Form state
  const [formData, setFormData] = useState({
    user: "",
    section: "",
    rating: 0,
    report: "",
    photos: 0,
    waterLevel: 5.2,
    conditions: "Good",
  })

  const [showForm, setShowForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.user || !formData.section || !formData.report || formData.rating === 0) {
      setSubmitStatus({ type: "error", message: "Please fill in all required fields" })
      return
    }

    const result = await submitReport({
      ...formData,
      date: "Just now",
    })

    if (result.success) {
      setSubmitStatus({ type: "success", message: "Trip report submitted successfully!" })
      setFormData({
        user: "",
        section: "",
        rating: 0,
        report: "",
        photos: 0,
        waterLevel: 5.2,
        conditions: "Good",
      })
      setShowForm(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    } else {
      setSubmitStatus({ type: "error", message: result.error || "Failed to submit report" })
    }
  }

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }

  return (
    <div className="space-y-8">
      {/* Community Stats */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700 text-center flex items-center justify-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Community Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-blue-600">{communityStats.totalReports}</p>
              <p className="text-sm text-blue-800">Trip Reports</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-emerald-600">{communityStats.totalPhotos}</p>
              <p className="text-sm text-emerald-800">Photos Shared</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-purple-600">{communityStats.activeUsers}</p>
              <p className="text-sm text-purple-800">Active Users</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-orange-600">{communityStats.averageRating}</p>
              <p className="text-sm text-orange-800">Avg Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Trip Reports */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Recent Trip Reports
                </CardTitle>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  size="sm"
                >
                  <Camera className="h-4 w-4 mr-1" />
                  Share Trip
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {allReports.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No trip reports yet. Be the first to share your experience!</p>
                </div>
              ) : (
                allReports.map((report) => (
                  <div key={report.id} className="border-l-4 border-blue-200 pl-4 py-3 bg-slate-50 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-slate-800">{report.user}</span>
                        <span className="text-slate-500 text-sm">• {report.section}</span>
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
                        <span className="text-xs text-slate-500">
                          {typeof report.timestamp === "number" ? formatTimeAgo(report.timestamp) : report.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 mb-2">{report.report}</p>

                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        {report.photos > 0 && (
                          <div className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            <span>{report.photos} photos</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>Water: {report.waterLevel}ft</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
                        {report.conditions}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Report Form */}
        <div>
          {showForm ? (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  Share Your Trip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Your Name *</label>
                    <Input
                      value={formData.user}
                      onChange={(e) => setFormData((prev) => ({ ...prev, user: e.target.value }))}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">River Section *</label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="">Select section</option>
                      {RIVER_SECTIONS.map((section, index) => (
                        <option key={index} value={section.name}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Rating *</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            star <= formData.rating
                              ? "text-yellow-400 fill-current"
                              : "text-slate-300 hover:text-yellow-300"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Trip Report *</label>
                    <Textarea
                      value={formData.report}
                      onChange={(e) => setFormData((prev) => ({ ...prev, report: e.target.value }))}
                      placeholder="Share your experience, conditions, tips for other floaters..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Photos</label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.photos}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, photos: Number.parseInt(e.target.value) || 0 }))
                        }
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Water Level (ft)</label>
                      <Input
                        type="number"
                        step="0.1"
                        min="3"
                        max="8"
                        value={formData.waterLevel}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, waterLevel: Number.parseFloat(e.target.value) || 5.2 }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Conditions</label>
                    <select
                      value={formData.conditions}
                      onChange={(e) => setFormData((prev) => ({ ...prev, conditions: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-1" />
                          Submit Report
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-blue-50 rounded-lg p-6">
                  <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800 font-medium mb-2">Help Fellow Floaters!</p>
                  <p className="text-sm text-blue-700">
                    Share your recent trip experience, current conditions, and photos to help others plan their
                    adventures.
                  </p>
                </div>

                <Button onClick={() => setShowForm(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Share Your Trip
                </Button>

                <p className="text-xs text-slate-500">
                  Your reports are stored locally and help build our community knowledge base.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
})

CommunityTab.displayName = "CommunityTab"
