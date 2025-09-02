import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, User, Star } from "lucide-react"

const pendingAdvisors = [
  {
    id: 1,
    name: "Dr. Emily Watson",
    email: "emily@example.com",
    expertise: ["Psychology", "Therapy", "Counseling"],
    experience: "8 years",
    requestedRate: 4.5,
    applicationDate: "2024-01-20",
    documents: ["CV", "License", "Certifications"],
  },
  {
    id: 2,
    name: "Robert Martinez",
    email: "robert@example.com",
    expertise: ["Legal Advice", "Contract Law", "Business Law"],
    experience: "12 years",
    requestedRate: 6.0,
    applicationDate: "2024-01-18",
    documents: ["CV", "Bar License", "References"],
  },
  {
    id: 3,
    name: "Dr. Amanda Lee",
    email: "amanda@example.com",
    expertise: ["Medical Consultation", "Health Advice", "Nutrition"],
    experience: "15 years",
    requestedRate: 5.5,
    applicationDate: "2024-01-15",
    documents: ["CV", "Medical License", "Specialization Certs"],
  },
]

export function PendingApprovals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Pending Approvals
        </CardTitle>
        <CardDescription>Advisor applications awaiting review</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingAdvisors.map((advisor) => (
            <div key={advisor.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">{advisor.name}</h4>
                  <p className="text-sm text-muted-foreground">{advisor.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Experience:</span>
                  <span>{advisor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Requested Rate:</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />${advisor.requestedRate}/min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Applied:</span>
                  <span>{advisor.applicationDate}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex flex-wrap gap-1 mb-2">
                  {advisor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {advisor.documents.map((doc) => (
                    <Badge key={doc} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
