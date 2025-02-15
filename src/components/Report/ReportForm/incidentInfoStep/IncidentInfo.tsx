import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { validationErrors } from "@/lib/formSchemas"

const incidentTypes = [
    'Blackmail',
    'Bullying',
    'Harassment',
    'Relationship Abuse',
    'Sexual Assault',
    'Sexual Harassment',
    'Violence',
    'Other'
]

const incidentConnections = [
    'Age',
    'Disability',
    'Gender Identity',
    'Nationality',
    'Race',
    'Religion',
    'Sexual Orientation',
    'Other',
    "Don't Know"
]

const connectionTypes = ["Student", "Staff", "Visitor", "Other", "Prefer not to say"]
interface IncidentInfoProps {
    formData: ReportFormData;
    updateFormData: (updates: Partial<ReportFormData>) => void;
    errors: validationErrors | null;
}

export default function IncidentInfo({ formData, updateFormData, errors }: IncidentInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={formData.title} onChange={(e) => updateFormData({ title: e.target.value })} />
        {errors?.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
        {errors?.description && <p className="text-red-500">{errors.description}</p>}
      </div>

      <div>
        <Label htmlFor="incidentHappenedTo">Incident Happened To</Label>
        <Select
            value={formData.incidentHappenedTo}
            onValueChange={(value) => updateFormData({ incidentHappenedTo: value })}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select who the incident happened to" />
            </SelectTrigger>
            <SelectContent>
                {["Me","SomeoneElse"].map((option) => (
                <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
        {errors?.incidentHappenedTo && <p className="text-red-500">{errors.incidentHappenedTo}</p>}
      </div>

      <div>
        <Label>Incident Types</Label>
        <div className="flex flex-row flex-wrap gap-4 mt-2">
            {incidentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
                <Checkbox
                id={type}
                checked={formData.incidentTypes.includes(type)}
                onCheckedChange={(checked) => {
                    const newTypes = checked
                    ? [...formData.incidentTypes, type]
                    : formData.incidentTypes.filter((t) => t !== type)
                    updateFormData({ incidentTypes: newTypes })
                }}
                />
                <Label htmlFor={type}>{type}</Label>
            </div>
            ))}
        </div>
        {errors?.incidentTypes && <p className="text-red-500">{errors.incidentTypes}</p>}
      </div>

      <div>
        <Label>Incident Connections</Label>
        <div className="flex flex-row flex-wrap gap-4 mt-2">
            {incidentConnections.map((connection) => (
            <div key={connection} className="flex items-center space-x-2">
                <Checkbox
                id={connection}
                checked={formData.incidentConnections.includes(connection)}
                onCheckedChange={(checked) => {
                    const newConnections = checked
                    ? [...formData.incidentConnections, connection]
                    : formData.incidentConnections.filter((c) => c !== connection)
                    updateFormData({ incidentConnections: newConnections })
                }}
                />
                <Label htmlFor={connection}>{connection}</Label>
            </div>
            ))}
        </div>
        {errors?.incidentConnections && <p className="text-red-500">{errors.incidentConnections}</p>}
      </div>

      <div>
        <Label htmlFor="reporterConnection">Reporter Connection</Label>
        <Select
          value={formData.reporterConnection}
          onValueChange={(value) => updateFormData({ reporterConnection: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select reporter connection" />
          </SelectTrigger>
          <SelectContent>
            {connectionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.reporterConnection && <p className="text-red-500">{errors.reporterConnection}</p>}
      </div>

      <div>
        <Label htmlFor="affectedConnection">Affected Person Connection</Label>
        <Select
          value={formData.affectedConnection}
          onValueChange={(value) => updateFormData({ affectedConnection: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select affected person connection" />
          </SelectTrigger>
          <SelectContent>
            {connectionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.affectedConnection && <p className="text-red-500">{errors.affectedConnection}</p>}
      </div>

      <div>
        <Label htmlFor="perpetratorConnection">Perpetrator Connection</Label>
        <Select
          value={formData.perpetratorConnection}
          onValueChange={(value) => updateFormData({ perpetratorConnection: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select perpetrator connection" />
          </SelectTrigger>
          <SelectContent>
            {connectionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.perpetratorConnection && <p className="text-red-500">{errors.perpetratorConnection}</p>}
      </div>
    </div>
  )
}

