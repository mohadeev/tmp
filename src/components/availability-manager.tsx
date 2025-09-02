"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, Trash2 } from "lucide-react"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

interface AvailabilitySlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}

export function AvailabilityManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { id: "1", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "2", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "3", dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "4", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
    { id: "5", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", isActive: true },
  ])

  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
  })

  const addAvailabilitySlot = () => {
    const slot: AvailabilitySlot = {
      id: Date.now().toString(),
      dayOfWeek: newSlot.dayOfWeek,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      isActive: true,
    }
    setAvailability([...availability, slot])
  }

  const toggleSlot = (id: string) => {
    setAvailability(availability.map((slot) => (slot.id === id ? { ...slot, isActive: !slot.isActive } : slot)))
  }

  const removeSlot = (id: string) => {
    setAvailability(availability.filter((slot) => slot.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Availability Management
            </CardTitle>
            <CardDescription>Set your consultation hours and availability</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="online-status">Online Status</Label>
            <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
          <span className="font-medium">{isOnline ? "Available for consultations" : "Currently offline"}</span>
        </div>

        {/* Availability Slots */}
        <div className="space-y-3">
          <h4 className="font-medium">Weekly Schedule</h4>
          {availability.map((slot) => (
            <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Switch checked={slot.isActive} onCheckedChange={() => toggleSlot(slot.id)} />
                <div>
                  <div className="font-medium">{daysOfWeek[slot.dayOfWeek]}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={slot.isActive ? "default" : "secondary"}>{slot.isActive ? "Active" : "Inactive"}</Badge>
                <Button variant="ghost" size="sm" onClick={() => removeSlot(slot.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Slot */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Add New Time Slot</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select
              value={newSlot.dayOfWeek.toString()}
              onValueChange={(value) => setNewSlot({ ...newSlot, dayOfWeek: Number.parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newSlot.startTime} onValueChange={(value) => setNewSlot({ ...newSlot, startTime: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newSlot.endTime} onValueChange={(value) => setNewSlot({ ...newSlot, endTime: value })}>
              <SelectTrigger>
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={addAvailabilitySlot}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slot
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
