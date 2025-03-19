import type { Roles } from '@/types/globals'
import React from 'react'

interface CaseActionViewProps {
    caseId: string
    role: Roles
}
const CaseActionView = ({caseId, role}:CaseActionViewProps) => {
  return (
    <section className="p-6 rounded-lg shadow">
        <div>
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            {role === 'admin' && (
                <>
                </>
            )}
        </div>
    </section>
  )
}

export default CaseActionView