"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ResolveCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (resolution: string) => void
  isLoading: boolean
}

export function ResolveCaseDialog({ open, onOpenChange, onConfirm, isLoading }: ResolveCaseDialogProps) {
  const [resolution, setResolution] = useState("")

  const handleConfirm = () => {
    onConfirm(resolution)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resolve Case</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to mark this case as resolved? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resolution">Resolution Details</Label>
            <Textarea
              id="resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Please provide details about how this case was resolved..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!resolution || isLoading}
            className={isLoading ? "opacity-70" : ""}
          >
            {isLoading ? "Resolving..." : "Resolve Case"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
