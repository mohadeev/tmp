"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings, Star, Edit } from "lucide-react"

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    title: "Business Strategy Consultant",
    description: "Experienced business consultant with 10+ years helping companies grow and optimize their operations.",
    ratePerMinute: 3.5,
    expertise: ["Business Strategy", "Marketing", "Leadership", "Operations"],
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Manage your advisor profile</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="rate">Rate per Minute ($)</Label>
              <Input
                id="rate"
                type="number"
                step="0.25"
                value={profile.ratePerMinute}
                onChange={(e) => setProfile({ ...profile, ratePerMinute: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{profile.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{profile.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">(127 reviews)</span>
            </div>

            <div>
              <div className="text-lg font-semibold text-primary">${profile.ratePerMinute}/min</div>
              <div className="text-sm text-muted-foreground">Consultation rate</div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Expertise</div>
              <div className="flex flex-wrap gap-1">
                {profile.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
