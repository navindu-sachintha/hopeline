import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { validationErrors } from "@/lib/formSchemas"

interface StepThreeEvidenceConsentProps {
  formData: ReportFormData
  updateFormData: (data: Partial<ReportFormData>) => void;
  errors: validationErrors | null;
}

export default function EvidenceUpload({ formData, updateFormData, errors }: StepThreeEvidenceConsentProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles:File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: true,
    onDropAccepted(files) {
        updateFormData({ evidenceFiles: files })
    },
  })

  const removeFile = (fileToRemove:File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Evidence Consent</Label>
        <p className="text-sm text-gray-500 mb-2">
          By consenting, you agree to upload evidence related to this cyberbullying case.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="consentToUploadEvidence"
            checked={formData.consentToUpload}
            onCheckedChange={(checked) => updateFormData({ consentToUpload: checked === true })}
          />
          <Label htmlFor="consentToUploadEvidence">I consent to upload evidence related to this case</Label>
        </div>
      </div>

      {formData.consentToUpload && (
        <div className="space-y-4">
          {errors?.evidenceFiles && <p className="text-red-500">{errors.evidenceFiles}</p>}
          <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-md text-center cursor-pointer ${isDragActive ? "border-primary" : "border-gray-300"}`}
          >
            <input 
                {...getInputProps()}
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            )}
          </div>
          {files.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Uploaded Files:</h4>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

