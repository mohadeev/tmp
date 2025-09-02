import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CallButton } from "@/components/call-button"
import { Star } from "lucide-react"

interface Advisor {
  id: string
  name: string
  title: string
  rating: number
  reviews: number
  rate: number
  expertise: string[]
  avatar: string
  isOnline: boolean
  description: string
}

interface AdvisorCardProps {
  advisor: Advisor
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={advisor.avatar || "/placeholder.svg"}
              alt={advisor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {advisor.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{advisor.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{advisor.title}</p>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{advisor.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({advisor.reviews} reviews)</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{advisor.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {advisor.expertise.slice(0, 2).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {advisor.expertise.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{advisor.expertise.length - 2} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">${advisor.rate}/min</span>
              </div>
              <CallButton advisorId={advisor.id} advisorName={advisor.name} isAvailable={advisor.isOnline} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
