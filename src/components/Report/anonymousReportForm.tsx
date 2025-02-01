'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { reportSchema, useAnonymousReportStore } from "@/store/formstore"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input"
import axios from "axios"

type FormData = z.infer<typeof reportSchema>

export const AnonymousReport = () => {
  const { resetForm } = useAnonymousReportStore()

  const { control, handleSubmit, formState: { errors }, register } = useForm<FormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      incidentHappenedTo: 'me',
      incidentDescription: [],
      incidentConnection: [],
      yourConnection: 'student',
      affectedPersonConnection: 'student',
      allegedPerpetratorConnection: 'student',
      anonymousReportReason: [],
    }
  })


  const onSubmit = async (data: FormData) => {
    const formDataToSubmit = {
      ...data,
      incidentDescription:
        data.incidentDescription.includes("Other") && data.otherIncidentDescription
          ? [...data.incidentDescription.filter((item) => item !== "Other"), data.otherIncidentDescription]
          : data.incidentDescription,
      incidentConnection: data.incidentConnection
        .map((item) => (item === "Other" ? `${data.otherIncidentConnection}` : item))
        .filter(Boolean),
      yourConnection: data.yourConnection === "other" ? `${data.otherYourConnection}` : data.yourConnection,
      affectedPersonConnection: data.affectedPersonConnection === "other" ? `${data.otherAffectedPersonConnection}` : data.affectedPersonConnection,
      allegedPerpetratorConnection: data.allegedPerpetratorConnection === "other" ? `${data.otherAllegedPerpetratorConnection}` : data.allegedPerpetratorConnection,
      anonymousReportReason: data.anonymousReportReason
        .map((item) => (item === "Other" ? `${data.otherAnonymousReportReason}` : item))
        .filter(Boolean),
    }
    const response = await axios.post('/api/case/anonymous', formDataToSubmit)
    console.log(response.status)
    resetForm()

  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Anonymous Report</CardTitle>
        <CardDescription>Please provide information about the incident you&apos;re reporting.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">The incident I am reporting happened to:</h3>
            <Controller
              name="incidentHappenedTo"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  {['me', 'someone-else'].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`incident-${value}`} />
                      <Label htmlFor={`incident-${value}`}>{value.replace('-', ' ')}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.incidentHappenedTo && <p className="text-red-500">{errors.incidentHappenedTo.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">How would you describe the incident?</h3>
            <Controller
              name="incidentDescription"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {['Blackmail','Harassment', 'Relationship Abuse', 'Sexual Assault', 'Bullying', 'Violence','Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`incident-description-${item.toLowerCase()}`}
                        checked={field.value.includes(item)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, item])
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== item))
                          }
                        }}
                      />
                      <Label htmlFor={`incident-description-${item.toLowerCase()}`}>{item}</Label>
                      {item === 'Other' && field.value.includes("Other") && (
                        <div className="mt-2">
                          <Input  
                            id="other-incident-description" 
                            placeholder="Please specify"
                            {...register("otherIncidentDescription")} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.incidentDescription && <p className="text-red-500">{errors.incidentDescription.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Do you think the incident was connected to the following?</h3>
            <Controller
              name="incidentConnection"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {['Race', 'Gender', 'Sexual Orientation', 'Religion', 'Disability', 'Age', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`incident-connection-${item.toLowerCase()}`}
                        checked={field.value.includes(item)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, item])
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== item))
                          }
                        }}
                      />
                      <Label htmlFor={`incident-connection-${item.toLowerCase()}`}>{item}</Label>
                      {item === "Other" && field.value.includes("Other") && (
                          <Input
                            className="ml-2 w-48"
                            placeholder="Please specify"
                            {...register("otherIncidentConnection")}
                          />
                        )}
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.incidentConnection && <p className="text-red-500">{errors.incidentConnection.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your connection to the university:</h3>
            <Controller
              name="yourConnection"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  {['student', 'staff', 'visitor', 'other'].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`your-connection-${value}`} />
                      <Label htmlFor={`your-connection-${value}`}>{value}</Label>
                      {value === "other" && field.value === "other" && (
                        <Input
                          className="ml-2 w-48"
                          placeholder="Please specify"
                          {...register("otherYourConnection")}
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.yourConnection && <p className="text-red-500">{errors.yourConnection.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">For the person affected by the incident, what is their connection to the university?</h3>
            <Controller
              name="affectedPersonConnection"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  {['student', 'staff', 'visitor', 'other'].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`affected-person-connection-${value}`} />
                      <Label htmlFor={`affected-person-connection-${value}`}>{value}</Label>
                      {value === "other" && field.value === "other" && (
                        <Input
                          className="ml-2 w-48"
                          placeholder="Please specify"
                          {...register("otherAffectedPersonConnection")}
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.affectedPersonConnection && <p className="text-red-500">{errors.affectedPersonConnection.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alleged perpetrator&apos;s connection to the university:</h3>
            <Controller
              name="allegedPerpetratorConnection"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  {['student', 'staff', 'visitor', 'other'].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`alleged-perpetrator-connection-${value}`} />
                      <Label htmlFor={`alleged-perpetrator-connection-${value}`}>{value}</Label>
                      {value === "other" && field.value === "other" && (
                        <Input
                          className="ml-2 w-48"
                          placeholder="Please specify"
                          {...register("otherAllegedPerpetratorConnection")}
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.allegedPerpetratorConnection && <p className="text-red-500">{errors.allegedPerpetratorConnection.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Let us know why you are reporting anonymously:</h3>
            <Controller
              name="anonymousReportReason"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {['Fear of retaliation', 'Unsure of the reporting process', 'Prefer to remain anonymous', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`anonymous-reason-${item.toLowerCase().replace(/\s+/g, '-')}`}
                        checked={field.value.includes(item)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, item])
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== item))
                          }
                        }}
                      />
                      <Label htmlFor={`anonymous-reason-${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Label>
                      {item === 'Other' && field.value.includes("Other") && (
                        <div className="mt-2">
                          <Input  
                            id="other-incident-description" 
                            placeholder="Please specify"
                            {...register("otherAnonymousReportReason")} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.anonymousReportReason && <p className="text-red-500">{errors.anonymousReportReason.message}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit Report</Button>
      </CardFooter>
    </Card>
  )
}