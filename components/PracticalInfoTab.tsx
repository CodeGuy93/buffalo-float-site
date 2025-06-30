import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const PracticalInfoTab = memo(() => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-700">Practical Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">Practical information coming soon!</p>
      </CardContent>
    </Card>
  )
})

PracticalInfoTab.displayName = "PracticalInfoTab"
