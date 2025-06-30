import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const CommunityTab = memo(() => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-700">Community Features</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">Community features coming soon!</p>
      </CardContent>
    </Card>
  )
})

CommunityTab.displayName = "CommunityTab"
