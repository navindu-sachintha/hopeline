import type { Roles } from '@/types/globals'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { RejectCaseDialog } from './RejectCase'
import { ResolveCaseDialog } from './ResolveCase'
import type { CaseStatus } from '@prisma/client'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { DateTimePicker } from '../ui/date-picker'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { AlertCircle } from 'lucide-react'

interface CaseActionViewProps {
    caseId: string
    role: Roles
    caseStatus: CaseStatus
    username: string;
    caseTitle: string;
    repeorterEmail: string;
    anonymous: boolean
}
const CaseActionView = ({caseId, role, caseStatus, username, caseTitle, repeorterEmail, anonymous}:CaseActionViewProps) => {
  const {toast} = useToast()
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [meetingLink, setMeetingLink] = useState('')
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [isResolveOpen, setIsResolveOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isCaseClosed = caseStatus === 'RESOLVED' || caseStatus === 'REJECTED'
  const meetingDisabled = isLoading || isCaseClosed || anonymous

  const handleSendMeeting = async (meetingLink: string, date:Date) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/case/meet',{
        meetingLink,
        repeorterEmail,
        caseTitle,
        username,
        caseId,
        date
      })
      if (response.status === 200) {
        toast({
          title: 'Meeting Link Sent',
          description: "Meeting invitation has been sent to the case reporter.",
        })
        setShowMeetingForm(false)
      }
     
    } catch (error) {
      console.error("Failed to schedule meeting:", error)
      toast({
        title: 'Failed to send meeting invitation',
        description: "Please try again later or contact support.",
        variant:'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectCase = async (reason: string) => {
    setIsLoading(true)
    try {
      const response = await axios.put('/api/case/reject',{
        caseId,
        rejection: reason,
        username,
        caseTitle,
        email: repeorterEmail
      })
      if (response.status === 200) {
        toast({
          title: 'Case Rejected',
          description: "The case has been rejected successfully.",
        })
        setIsRejectOpen(false)
        window.location.reload() // Refresh to show updated case status
      }
    } catch (error) {
      console.error("Failed to reject case:", error)
      toast({
        title: 'Failed to reject case',
        description: "Please try again later or contact support.",
        variant:'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResolveCase = async (resolution: string) => {
    setIsLoading(true)
    try {
      const response = await axios.put('/api/case/resolve',{
        caseId,
        resolution,
        username,
        caseTitle,
        email: repeorterEmail
      })
      if (response.status === 200) {
        toast({
          title: 'Case Resolved',
          description: "The case has been marked as resolved successfully.",
        })
        setIsResolveOpen(false)
        window.location.reload() // Refresh to show updated case status
      }
    } catch (error) {
      console.error("Failed to resolve case:", error)
      toast({
        title: 'Failed to resolve case',
        description: "Please try again later or contact support.",
        variant:'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <section className="p-4 md:p-6 rounded-lg shadow">
      {isCaseClosed && (
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center gap-2 text-sm">
          <AlertCircle size={16} className="text-gray-500 dark:text-gray-400" />
          <span>This case is {caseStatus.toLowerCase()}. Actions are limited.</span>
        </div>
      )}
      
      {anonymous && !isCaseClosed && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md flex items-center gap-2 text-sm">
          <AlertCircle size={16} className="text-amber-500" />
          <span>This is an anonymous case. Meeting scheduling is unavailable.</span>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
        <Button 
          onClick={() => setShowMeetingForm(prev => !prev)} 
          disabled={meetingDisabled}
          className="w-full sm:w-auto"
          variant={showMeetingForm ? "secondary" : "default"}>
          {showMeetingForm ? "Hide Meeting Form" : "Schedule Meeting"}
        </Button>

        <Button
          variant="destructive"
          onClick={() => setIsRejectOpen(true)}
          disabled={isLoading || isCaseClosed}
          className="w-full sm:w-auto">
          Reject Case
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setIsResolveOpen(true)} 
          disabled={isLoading || isCaseClosed}
          className="w-full sm:w-auto">
          Resolve Case
        </Button>
      </div>

      {showMeetingForm && 
        <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900 transition-all">
          <h3 className="text-lg font-medium mb-4">Schedule a Meeting</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="meeting-link">Meeting Link <span className="text-red-500">*</span></Label>
              <Input
                id="meeting-link"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                disabled={meetingDisabled}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Provide a valid meeting link (Zoom, Google Meet, etc.)</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date-time">Date and Time <span className="text-red-500">*</span></Label>
              <DateTimePicker onDateTimeChange={(date) => setDateTime(date)} />
              <p className="text-xs text-gray-500 mt-1">Select a date and time convenient for the meeting</p>
            </div>
            <div className="flex justify-end mt-2">
              <Button
                onClick={() => handleSendMeeting(meetingLink, dateTime!)}
                disabled={!meetingLink || isLoading || isCaseClosed || anonymous || !dateTime}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          </div>
        </div>
      }

      <RejectCaseDialog
        open={isRejectOpen}
        onOpenChange={setIsRejectOpen}
        onConfirm={handleRejectCase}
        isLoading={isLoading}
      />

      <ResolveCaseDialog
        open={isResolveOpen}
        onOpenChange={setIsResolveOpen}
        onConfirm={handleResolveCase}
        isLoading={isLoading}
      />
    </section>
  )
}

export default CaseActionView