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

  const handleCreateCase = (data: any) => {
    const newCase = {
      ...data,
      id: (cases.length + 1).toString(),
      reportedBy: "1", // Assuming admin is creating
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCases([...cases, newCase]);
  };

  const handleUpdateCase = (caseId: string, data: any) => {
    setCases(cases.map(case_ => 
      case_.id === caseId ? { 
        ...case_,
        ...data,
        updatedAt: new Date().toISOString(),
      } : case_
    ));
  };

  const handleDeleteCase = (caseId: string) => {
    setCases(cases.filter(case_ => case_.id !== caseId));
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-end">

        </div>
    </div>
  )
}