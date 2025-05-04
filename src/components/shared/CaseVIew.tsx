"use client"

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CaseActionView from './CaseActionView'
import type { Roles } from '@/types/globals'
import EvidenceView from './EvidenceView'

interface CaseAdminVIewProps {
    incident: CaseData
    role: Roles
}
const CaseVIew = ({incident, role}:CaseAdminVIewProps) => {
    const router = useRouter();
  
  return (
    <div className="p6-mx-auto">
        <Button onClick={() => router.back()}>
        <ArrowLeft size='small'/>
        Back
      </Button>
      <h1 className="text-2xl font-bold mt-2">{incident.title}</h1>
      <div className="grid grid-cols-2 gap-6">
        <section className="p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Incident Details</h2>
          <div className="grid gap-2">
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <p className="mt-1">{incident.description}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Type of Incident</label>
              <p className="mt-1">{incident.incidentTypes.map((i)=> ` ${i} |`)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Connection</label>
              <p className="mt-1">{incident.incidentConnections.map((i)=> ` ${i} |`)}</p>
            </div>
          </div>
        </section>
        <section className="p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Reporter Details</h2>
          <div className="grid gap-2">
            <div>
              <label className="text-sm text-gray-600">Reporter Details</label>
              {incident.reportedByUser ? (
                <>
                  <p className="mt-1"><span className='font-semibold'>Username:</span> {incident.reportedByUser.username}</p>
                  <p className="mt-1"><span className='font-semibold'>E-Mail:</span> {incident.reportedByUser.email}</p>
                </>
              ): (
                <>
                  <p className="mt-1 font-semibold text-primary">Anonymous Reporter</p>
                  <p className="mt-1"><span className='font-semibold'>IP Address: </span>{incident.reportedByAnonymous.ipAddress}</p>
                </>
              )}
            </div>
          </div>
        </section>
        <EvidenceView role={role} urls={incident.Evidence.map((e) => e.url)}/>
        {(role === 'student_rep' || role === 'professional' || role === 'admin') && (
          <CaseActionView 
            repeorterEmail={incident.reportedByUser ? incident.reportedByUser.email : incident.reportedByAnonymous.ipAddress}
            caseTitle={incident.title}
            username={incident.reportedByUser ? incident.reportedByUser.username : 'Anonymous'}
            caseStatus={incident.status} 
            caseId={incident.id} 
            role={role}
            anonymous={!incident.reportedByUser} />
        )}
      </div>
    </div>
  )
}

export default CaseVIew