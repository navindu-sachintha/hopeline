import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const anonymousReasons = [
    "Dont want to be identified", 
    "Fear of retaliation", 
    "Privacy concerns", 
    "Already reported",
    "Other"
  ]
interface Props {
  formData: ReportFormData;
  updateFormData: (data: Partial<ReportFormData>) => void;
  userLoggedIn: boolean | undefined;
}

export default function ReporterInfo({ formData, updateFormData, userLoggedIn }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Reporter Type</Label>
        <RadioGroup value={formData.reporterType} onValueChange={(value) => updateFormData({ reporterType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">Registered User</Label>
          </div>
          {!userLoggedIn && 
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="anonymous" id="anonymous" />
                <Label htmlFor="anonymous">Anonymous</Label>
            </div>
            }
        </RadioGroup>
      </div>

      {formData.reporterType === "user" && (
        <div>
          {userLoggedIn ? (
            <div>
              <Label>Your Email</Label>
              <p>{formData.email}</p>
            </div>
          ) : (
            <p className="text-red-500">Please log in to submit a report as a registered user.</p>
          )}
        </div>
      )}

      {formData.reporterType === "anonymous" && (
        <div>
          <Label>Reason for Anonymity</Label>
          <div className="flex flex-row flex-wrap gap-4 mt-2">
            {anonymousReasons.map((reason: string) => (
                <div key={reason} className="flex items-center space-x-2">
                <Checkbox
                id={reason}
                checked={formData.anonymousReason.includes(reason)}
                onCheckedChange={(checked: boolean | 'indeterminate') => {
                const newReasons: string[] = checked === true
                    ? [...formData.anonymousReason, reason]
                    : formData.anonymousReason.filter((r: string) => r !== reason)
                updateFormData({ anonymousReason: newReasons })
                }}
                />
                <Label htmlFor={reason}>{reason}</Label>
                </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 pt-6">
        <Checkbox
          id="consentToReport"
          checked={formData.consentToReport}
          onCheckedChange={(checked) => updateFormData({ consentToReport: checked === true })}
        />
        <Label htmlFor="consentToReport">I agree to provide accurate information in the form<span className="text-red-700">*</span></Label>
      </div>
    </div>
  )
}

