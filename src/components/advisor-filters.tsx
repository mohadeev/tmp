"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

const expertiseAreas = [
  "Business Strategy",
  "Marketing",
  "Financial Planning",
  "Career Coaching",
  "Leadership",
  "Technology",
  "Legal Advice",
  "Health & Wellness",
]

export function AdvisorFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("all")
  const [availability, setAvailability] = useState("all")

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise],
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedExpertise([])
    setPriceRange("all")
    setAvailability("all")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search advisors by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Advisors</SelectItem>
                <SelectItem value="online">Online Now</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $3/min</SelectItem>
                <SelectItem value="medium">$3-5/min</SelectItem>
                <SelectItem value="high">Over $5/min</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Expertise Tags */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Expertise Areas</h4>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((expertise) => (
                <Badge
                  key={expertise}
                  variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleExpertise(expertise)}
                >
                  {expertise}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedExpertise.length > 0 || searchTerm || priceRange !== "all" || availability !== "all") && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Active filters:</span>
              {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
              {availability !== "all" && <Badge variant="secondary">Status: {availability}</Badge>}
              {priceRange !== "all" && <Badge variant="secondary">Price: {priceRange}</Badge>}
              {selectedExpertise.map((expertise) => (
                <Badge key={expertise} variant="secondary">
                  {expertise}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
