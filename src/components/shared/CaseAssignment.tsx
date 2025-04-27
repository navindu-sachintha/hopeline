"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { Check, UserRound } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Roles } from "@/types/globals"
import axios from "axios"
import type { User } from "@clerk/nextjs/server"

interface CaseAssignmentProps {
  caseId: string
  caseTitle: string
  onAssignmentComplete?: () => void
}

export function CaseAssignment({ caseId, caseTitle, onAssignmentComplete }: CaseAssignmentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Roles| null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isAssigning, setIsAssigning] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value as Roles)
    setSelectedUser(null)
  }

  const handleUserSelect = (userId: string) => {
    const user = availableUsers.find(user => user.id === userId);
    setSelectedUser(user ?? null);
  }

  const handleAssignCase = async () => {
    if (!selectedRole || !selectedUser) return

    setIsAssigning(true)

    try {

      const response = await axios.post('/api/case/assign',{
        caseId,
        assignToUserId: selectedUser.id,
        role:selectedRole
      })

      if (response.status !== 200) {
        throw new Error('Failed to assign case');
      }

      // Close dialogs
      setIsConfirmOpen(false)
      setIsDialogOpen(false)

      // Reset selections
      setSelectedRole(null)
      setSelectedUser(null)

      // Show success toast
      toast({
        title: "Case assigned successfully",
        description: `Case #${caseId} has been assigned.`,
      })

      // Call the callback if provided
      if (onAssignmentComplete) {
        onAssignmentComplete()
      }
    } catch (error) {
      toast({
        title: "Error assigning case",
        description: "There was an error assigning the case. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAssigning(false)
    }
  }

  const getSelectedUserDetails = () => {
    if (!selectedRole || !selectedUser) return null
    return availableUsers.find((user) => user.id === selectedUser.id)
  }

  const selectedUserDetails = getSelectedUserDetails()

  useEffect(() => {
    if (selectedRole){
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/users/role?role=${selectedRole}`)
                setAvailableUsers(response.data as User[])
            } catch (error) {
                console.error('Error fetching users by role:', error)
                toast({
                    title: "Error fetching users",
                    description: "There was an error fetching users. Please try again.",
                    variant: "destructive",
                })
                
            }
        }
        console.log(availableUsers)
        void fetchUsers()
    }
  }, [selectedRole])

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost'>Assign Case</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Case #{caseId}</DialogTitle>
            <DialogDescription>
              Assign this cyber harassment case to a student representative or professional.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="role-select">Select Role</Label>
              <Select onValueChange={handleRoleSelect} value={selectedRole ?? undefined}>
                <SelectTrigger id="role-select">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student_rep">Student Representative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole && (
              <div className="grid gap-2">
                <Label>Select {selectedRole === "student_rep" ? "Student Representative" : "Professional"}</Label>
                <RadioGroup
                  onValueChange={(value) => handleUserSelect(value)}
                >
                  <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-1">
                    {availableUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer ${
                          selectedUser?.id === user.id ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => handleUserSelect(user.id)}
                      >
                        <RadioGroupItem value={user.id.toString()} id={`user-${user.id}`} className="sr-only" />
                        <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
                          <UserRound className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{user.username}</p>
                          <p className="text-xs text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedUser?.id === user.id && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsConfirmOpen(true)} disabled={!selectedRole || !selectedUser}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUserDetails ? (
                <>
                  You are about to assign case <strong>#{caseId}</strong> ({caseTitle}) to{" "}
                  <strong>{selectedUserDetails.username}</strong> (
                  {selectedRole === "student_rep" ? "Student Representative" : "Professional"}).
                  <br />
                </>
              ) : (
                "Please select a user to assign this case to."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAssignCase} disabled={isAssigning}>
              {isAssigning ? "Assigning..." : "Confirm Assignment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
