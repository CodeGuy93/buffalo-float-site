"use client"

import { memo } from "react"
import { MapPin, Tent, Car, Utensils, Bed, AlertTriangle, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AMENITIES, EMERGENCY_CONTACTS, SEASONAL_INFO } from "../constants/practicalData"

export const PracticalInfoTab = memo(() => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-800",
      green: "bg-green-50 text-green-800",
      orange: "bg-orange-50 text-orange-800",
      slate: "bg-slate-50 text-slate-800",
    }
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 text-gray-800"
  }

  const getIconForType = (type: string) => {
    const iconMap = {
      restaurant: Utensils,
      gas: Car,
      lodging: Bed,
      camping: Tent,
      gear: MapPin,
    }
    return iconMap[type as keyof typeof iconMap] || MapPin
  }

  return (
    <div className="space-y-8">
      {/* Nearby Amenities */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(AMENITIES).map(([category, items]) => {
          const Icon = getIconForType(category)
          const categoryNames = {
            restaurants: "Restaurants",
            gas: "Gas Stations",
            lodging: "Lodging",
            camping: "Camping",
            gear: "Gear Rental",
          }

          return (
            <Card key={category} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-sky-600" />
                  {categoryNames[category as keyof typeof categoryNames]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <div className="flex items-center gap-2">
                        {item.status && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              item.status === "open" || item.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status === "available" ? "Available" : item.status}
                          </span>
                        )}
                        <span className="text-slate-500 text-sm">{item.distance}</span>
                      </div>
                    </div>

                    {item.description && <p className="text-sm text-slate-600 mb-2">{item.description}</p>}

                    <div className="flex justify-between items-center">
                      {item.price && <span className="text-sm font-medium text-emerald-600">{item.price}</span>}
                      {item.phone && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${item.phone}`} className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {item.phone}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Emergency Contacts */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <span className="text-2xl font-bold text-red-800">Emergency: 911</span>
              <p className="text-sm text-red-700 mt-1">For life-threatening emergencies</p>
            </div>

            <div className="space-y-3">
              {EMERGENCY_CONTACTS.slice(1).map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <span className="font-medium text-slate-800">{contact.name}</span>
                    <p className="text-xs text-slate-600 capitalize">{contact.type} services</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {contact.phone}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Information */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Seasonal Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEASONAL_INFO.map((season, index) => (
              <div key={index} className={`rounded-lg p-4 ${getColorClasses(season.color)}`}>
                <h4 className="font-semibold mb-2">{season.season}</h4>
                <p className="text-sm mb-3">{season.description}</p>

                <div className="space-y-1">
                  <p className="text-xs font-medium">Tips:</p>
                  {season.tips.map((tip, tipIndex) => (
                    <p key={tipIndex} className="text-xs">
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* River Safety Tips */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">River Safety Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Before You Go</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Check current water levels and weather conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  File a float plan with someone reliable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Bring proper safety equipment and life jackets
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Pack extra food, water, and emergency supplies
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">On the River</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Always wear your life jacket
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Stay with your group and communicate regularly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Be aware of changing weather and water conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Know your limits and turn back if conditions worsen
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

PracticalInfoTab.displayName = "PracticalInfoTab"
