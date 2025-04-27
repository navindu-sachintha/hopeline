import type { Roles } from '@/types/globals'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface CaseActionViewProps {
    caseId: string
    role: Roles
}
const CaseActionView = ({caseId, role}:CaseActionViewProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const [assigneeType, setAssigneeType] = useState<string>("")

  
  return (
    <section className="p-6 rounded-lg shadow">
        <div>
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
        </div>
    </section>
  )
}

export default CaseActionView