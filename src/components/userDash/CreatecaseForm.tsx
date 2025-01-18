"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileDropzone } from '../shared/FileDropZone';
import { FileList } from '../shared/FileList';
import { z } from 'zod';
import axios from 'axios';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const caseFormSchema = z.object({
    caseName: z.string().min(1, "Case name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    incidentHappenedTo: z.enum(['me', 'someone-else']),
    incidentDescription: z.array(z.string()).min(1, 'Please select at least one description'),
    incidentConnection: z.array(z.string()),
    yourConnection: z.enum(['student', 'staff', 'visitor', 'other']),
    affectedPersonConnection: z.enum(['student', 'staff', 'visitor', 'other']),
    allegedPerpetratorConnection: z.enum(['student', 'staff', 'visitor', 'other'])
  });
  
type FormData = z.infer<typeof caseFormSchema>;

export function CreateCaseForm() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { files, addFiles, removeFile, clearFiles } = useFileUpload();


  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormData>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseName: '',
      description: '',
      incidentHappenedTo: 'me',
      incidentDescription: [],
      incidentConnection: [],
      yourConnection: 'student',
      affectedPersonConnection: 'student',
      allegedPerpetratorConnection: 'student'
    }
  });
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
        const values = getValues();
        const formData = new FormData()

        Object.entries(values).forEach(([key,value]) => {
            formData.append(key,value as string)
        })

        files.forEach((file) => {
            formData.append('files', file)
        })
        const response = await axios.post('/api/case', formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Case created', response.data);
        setShowConfirmDialog(false);
        clearFiles(); //clear files
        reset(); //reset form

    } catch (error) {
        console.error('Error submitting form', error);
    } finally {
        setIsSubmitting(false);
    }
  }

  const submit = () => {
    setShowConfirmDialog(true);
  };

  return (
    <>
        <form onSubmit={handleSubmit(submit)}>
          <div className='space-y-4'>
            <h3 className="text-lg font-medium">Case Details</h3>
            <div className='space-y-2'>
                <Label htmlFor="caseName">Case Name</Label>
                <Controller
                    name="caseName"
                    control={control}
                    render={({ field }) => (
                    <Input {...field} />
                    )}
                />
                {errors.caseName && <p className="text-red-500">{errors.caseName.message}</p>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor="description">Description</Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                    <Textarea {...field} />
                    )}
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className='space-y-4'>
            <h3 className="text-lg font-medium">The incident happened to:</h3>
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
                              field.onChange([...field.value, item]);
                            } else {
                              field.onChange(field.value.filter((val) => val !== item));
                            }
                          }}
                        />
                        <Label htmlFor={`incident-description-${item.toLowerCase()}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Do you think the incident was connected to the following?</h3>
                <Controller
                    name='incidentConnection'
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-2">
                            {['Race', 'Gender', 'Sexual Orientation', 'Religion', 'Disability', 'Age', 'Other',"Don't Know"].map((item) => (
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
                        </div>
                    ))}
                    </RadioGroup>
                )}
                />
                {errors.yourConnection && <p className="text-red-500">{errors.yourConnection.message}</p>}
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
                        </div>
                    ))}
                    </RadioGroup>
                )}
                />
                {errors.allegedPerpetratorConnection && <p className="text-red-500">{errors.allegedPerpetratorConnection.message}</p>}
            </div>
            <div className='space-y-4'>
                <FileDropzone onDrop={addFiles} />
                <FileList files={files} onRemove={removeFile} />
            </div>
          </div>
          <div className="flex justify-end space-x-2 my-2">
            <Button type="submit" disabled={files.length === 0}>
              Create Case
            </Button>
          </div>
        </form>
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this case?. This action cannot be undone.
              Due to the sensitive nature of the information, please ensure that all information is accurate.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Confirm'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}