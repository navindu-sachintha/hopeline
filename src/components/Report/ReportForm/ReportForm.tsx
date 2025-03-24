"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ReporterInfo from "./reporterInfoStep/ReporterInfo"
import IncidentInfo from "./incidentInfoStep/IncidentInfo"
import EvidenceUpload from "./evidenceUploadStep/EvidenceUpload"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { validateForm, validationErrors } from "@/lib/formSchemas"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function CyberbullyingReportForm() {
  const {toast} = useToast()
  const {isSignedIn, user} = useUser()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaValue, setCaptchaValue] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState<ReportFormData>({
    reporterType: 'user',
    email: user?.primaryEmailAddress?.emailAddress ?? '',
    anonymousReason: [],
    title: '',
    description: '',
    incidentHappenedTo: '',
    incidentTypes: [],
    incidentConnections: [],
    reporterConnection: '',
    affectedConnection: '',
    perpetratorConnection: '',
    consentToReport: false,
    consentToUpload: false,
    evidenceFiles: [],
  })
  const [validationErrors, setValidationErrors] = useState<validationErrors | null>(null)
  const router = useRouter()

  
  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }
  
  const handleNext = () => {
    if (step === 2) {
        const {isValid, errors} = validateForm(formData);
        if(!isValid){
            setValidationErrors(errors)
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return
        }
    }
    if (step === 3){
        const {isValid, errors} = validateForm(formData);
        if(!isValid){
            setValidationErrors(errors)
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return
        }
    }
    setStep((prev) => prev + 1)
  }
  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (formData.reporterType === "user" && !isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a report.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.consentToReport) {
      toast({
        title: "Consent required",
        description: "Please agree to create a report.",
        variant: "destructive",
        action:<ToastAction 
                altText="agree"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, consentToReport: true }))
                }}
            >Agree</ToastAction>
      })
      setIsSubmitting(false)
      return
    }

    if (!captchaValue) {
      toast({
        title: "Captcha required",
        description: "Please complete the captcha.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const endpoint = formData.reporterType === "anonymous" ? "/api/case/anonymous" : "/api/case"

    try {
        const data = new FormData();

        Object.entries(formData).forEach(([Key, value]) => {
            if(Key === 'evidenceFiles'){
                return
            }
            data.append(Key, value as string);
        })

        if(formData.evidenceFiles){
            formData.evidenceFiles.forEach((file) => {
                data.append('evidenceFiles', file)
            })
        }

      console.log("Submitting to endpoint:", endpoint)
      const response = await axios.post(endpoint, data,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      })
    console.log("Response", response.status)

      toast({
        title: "Report submitted",
        description: "Your report has been successfully submitted.",
      })
      setIsSubmitting(false)
      if(isSignedIn){
        router.push('/dashboard')
      }else{
        router.push('/')
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReporterInfo formData={formData} updateFormData={updateFormData} userLoggedIn={isSignedIn} />
      case 2:
        return <IncidentInfo formData={formData} updateFormData={updateFormData} errors={validationErrors}/>
      case 3:
        return <EvidenceUpload formData={formData} updateFormData={updateFormData} errors={validationErrors} onRecaptchaRef={(ref) => ref && setCaptchaValue(ref.getValue() ?? undefined)}/>
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cyberbullying Case Report - Step {step} of 3</CardTitle>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep((prev) => prev - 1)}>
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} disabled={formData.reporterType === 'user' && !isSignedIn}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin"/>}
            {isSubmitting? 'Submitting': 'Submit'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

