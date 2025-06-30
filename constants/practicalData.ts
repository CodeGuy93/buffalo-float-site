import type { Amenity, EmergencyContact } from "../types"

export const AMENITIES: Record<string, Amenity[]> = {
  restaurants: [
    {
      name: "Buffalo Grill",
      type: "restaurant",
      distance: "8 mi",
      description: "Local favorite with burgers and catfish",
      status: "open",
    },
    {
      name: "Cliff House Inn Restaurant",
      type: "restaurant",
      distance: "12 mi",
      description: "Fine dining with river views",
      status: "open",
    },
    {
      name: "Ozark Cafe",
      type: "restaurant",
      distance: "15 mi",
      description: "Home-style cooking and pie",
      status: "open",
    },
    {
      name: "Buffalo Point Restaurant",
      type: "restaurant",
      distance: "5 mi",
      description: "Casual dining near the river",
      status: "open",
    },
  ],
  gas: [
    {
      name: "Casey's General Store",
      type: "gas",
      distance: "7 mi",
      description: "24/7 gas and convenience items",
      status: "open",
    },
    {
      name: "Phillips 66 (Jasper)",
      type: "gas",
      distance: "8 mi",
      description: "Full service station",
      status: "open",
    },
    {
      name: "Shell Station (Harrison)",
      type: "gas",
      distance: "25 mi",
      description: "Major highway stop",
      status: "open",
    },
  ],
  lodging: [
    {
      name: "Buffalo River Lodge",
      type: "lodging",
      distance: "3 mi",
      price: "$89-129/night",
      phone: "(870) 439-2244",
      status: "available",
      description: "Rustic cabins on the river",
    },
    {
      name: "Cliff House Inn",
      type: "lodging",
      distance: "12 mi",
      price: "$110-180/night",
      phone: "(870) 446-2292",
      status: "available",
      description: "Historic inn with modern amenities",
    },
    {
      name: "Buffalo Camping & Cabins",
      type: "lodging",
      distance: "6 mi",
      price: "$65-95/night",
      phone: "(870) 439-2888",
      status: "available",
      description: "Family-friendly cabins and RV sites",
    },
  ],
  camping: [
    {
      name: "Buffalo Point Campground",
      type: "camping",
      distance: "2 mi",
      price: "$20/night",
      description: "Full hookups, 12 sites available",
      status: "available",
    },
    {
      name: "Rush Creek Campground",
      type: "camping",
      distance: "8 mi",
      price: "$15/night",
      description: "Primitive camping, vault toilets",
      status: "available",
    },
    {
      name: "Carver Campground",
      type: "camping",
      distance: "15 mi",
      price: "$18/night",
      description: "Electric hookups, shower house",
      status: "available",
    },
  ],
  gear: [
    {
      name: "Buffalo Outdoor Center",
      type: "gear",
      distance: "1 mi",
      phone: "(870) 861-5514",
      status: "open",
      description: "Canoes: $45/day • Kayaks: $35/day • Shuttle service available",
    },
    {
      name: "Buffalo River Canoe Rental",
      type: "gear",
      distance: "4 mi",
      phone: "(870) 439-2663",
      status: "open",
      description: "Full outfitter services, guided trips",
    },
    {
      name: "Wild Bill's Outfitter",
      type: "gear",
      distance: "12 mi",
      phone: "(870) 446-5555",
      status: "open",
      description: "Gear rental and river supplies",
    },
  ],
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "Emergency Services",
    phone: "911",
    type: "emergency",
  },
  {
    name: "Buffalo National River",
    phone: "(870) 439-2502",
    type: "park",
  },
  {
    name: "Newton County Sheriff",
    phone: "(870) 446-5124",
    type: "sheriff",
  },
  {
    name: "Baxter Regional Medical Center",
    phone: "(870) 508-1000",
    type: "medical",
  },
]

export const SEASONAL_INFO = [
  {
    season: "Spring (Mar-May)",
    color: "blue",
    description: "Best water levels, wildflowers, cooler temps. Peak season!",
    tips: ["Book accommodations early", "Bring layers for temperature changes", "Perfect for photography"],
  },
  {
    season: "Summer (Jun-Aug)",
    color: "green",
    description: "Lower levels, perfect for swimming, hot weather. Early morning best.",
    tips: ["Start early to beat heat", "Bring plenty of water", "Great for families"],
  },
  {
    season: "Fall (Sep-Nov)",
    color: "orange",
    description: "Beautiful colors, comfortable temps, variable water levels.",
    tips: ["Check water levels frequently", "Spectacular fall foliage", "Fewer crowds"],
  },
  {
    season: "Winter (Dec-Feb)",
    color: "slate",
    description: "Cold water, fewer crowds, check for ice conditions.",
    tips: ["Dress warmly", "Check ice conditions", "Limited services available"],
  },
]
