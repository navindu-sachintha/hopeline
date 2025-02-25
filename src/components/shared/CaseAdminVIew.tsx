"use client"

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import EvidenceView from './EvidenceView'

interface CaseAdminVIewProps {
    incident: CaseData
}
const CaseAdminVIew = ({incident}:CaseAdminVIewProps) => {
    const router = useRouter();
  
  return (
    <div className="p6-mx-auto">
        <Button onClick={() => router.back()}>
        <ArrowLeft size='small'/>
        Back
      </Button>
      <h1 className="text-2xl font-bold mt-2">{incident.title}</h1>
      <EvidenceView urls={incident.Evidence.map((e) => e.url)}/>
    </div>
  )
}

export default CaseAdminVIew