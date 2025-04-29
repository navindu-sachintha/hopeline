import type { Roles } from '@/types/globals'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { RejectCaseDialog } from './RejectCase'
import { SendMeetingLinkDialog } from './SendMeetingLink'
import { ResolveCaseDialog } from './ResolveCase'
import type { CaseStatus } from '@prisma/client'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

interface CaseActionViewProps {
    caseId: string
    role: Roles
    caseStatus: CaseStatus
    username:string;
    caseTitle: string;
    repeorterEmail: string;
}
const CaseActionView = ({caseId, role, caseStatus, username, caseTitle, repeorterEmail}:CaseActionViewProps) => {
  const {toast} = useToast()
  const [isSendMeetingOpen, setIsSendMeetingOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [isResolveOpen, setIsResolveOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMeeting = async (meetingLink: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/case/meet',{
        meetingLink,
        repeorterEmail,
        caseTitle,
        username,
        caseId
      })

      if (response.status === 200) {
        toast({
          title: 'Meeting Link Sent',
          description: "Provide a meeting link to send to the case reporter.",
        })
      }
      setIsSendMeetingOpen(false)
     
    } catch (error) {
      console.error("Failed to schedule meeting:", error)
      toast({
        title: 'Meeting Link Sent failed',
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
      }
      setIsRejectOpen(false)
      // In a real app, you would update the UI or refetch data
      alert("Case rejected successfully")
    } catch (error) {
      console.error("Failed to reject case:", error)
      toast({
        title: 'Case Rejected failed',
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
          description: "The case marked as resolved successfully.",
        })
      }
      setIsResolveOpen(false)
      // In a real app, you would update the UI or refetch data
      alert("Case resolved successfully")
    } catch (error) {
      console.error("Failed to resolve case:", error)
      toast({
        title: 'Case Resolved failed',
        variant:'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <section className="p-6 rounded-lg shadow">
        <div className="flex flex-wrap gap-3 mt-4">
      <Button 
        onClick={() => setIsSendMeetingOpen(true)} 
        disabled={isLoading || caseStatus === 'RESOLVED' || caseStatus === 'REJECTED'}>
        Send Meeting Link
      </Button>

      <Button
        variant="destructive"
        onClick={() => setIsRejectOpen(true)}
        disabled={isLoading || caseStatus === 'REJECTED' || caseStatus === 'RESOLVED'}
      >
        Reject Case
      </Button>

      <Button 
        variant="outline" 
        onClick={() => setIsResolveOpen(true)} 
        disabled={isLoading || caseStatus === 'RESOLVED' || caseStatus === 'REJECTED'}>
        Resolve Case
      </Button>

      <SendMeetingLinkDialog
        open={isSendMeetingOpen}
        onOpenChange={setIsSendMeetingOpen}
        onConfirm={handleSendMeeting}
        isLoading={isLoading}
      />

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
    </div>
    </section>
  )
}

export default CaseActionView