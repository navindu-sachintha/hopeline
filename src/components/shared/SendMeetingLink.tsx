"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SendMeetingLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (meetingLink: string) => void
  isLoading: boolean
}

export function SendMeetingLinkDialog({ open, onOpenChange, onConfirm, isLoading }: SendMeetingLinkDialogProps) {
  const [meetingLink, setMeetingLink] = useState("")

  const handleConfirm = () => {
    if (!meetingLink) return
    onConfirm(meetingLink)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Meeting Link</DialogTitle>
          <DialogDescription>Provide a meeting link to send to the case reporter.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="meeting-link">Meeting Link</Label>
            <Input
              id="meeting-link"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!meetingLink || isLoading}
            className={isLoading ? "opacity-70" : ""}
          >
            {isLoading ? "Sending..." : "Send Meeting Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
