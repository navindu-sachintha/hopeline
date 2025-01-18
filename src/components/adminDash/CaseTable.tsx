"use client"
import React, { useState } from 'react'

interface CaseTableProps {
    cases:Case[]
}

const statusColors = {
    new: "bg-yellow-500",
    processing: "bg-blue-500",
    rejected: "bg-red-500",
    resolved: "bg-green-500"
}
export function CaseTable({cases: initialCases}:CaseTableProps) {

    const [cases, setCases] = useState(initialCases);

  return (
    <div className="space-y-4">
        <div className="flex justify-end">

        </div>
    </div>
  )
}