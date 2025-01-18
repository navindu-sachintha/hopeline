"use client"
import type { Roles } from "@/types/globals"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeft, Trash2 } from "lucide-react"
import axios from "axios"

interface CaseDataProps {
    incident: Case
    role: Roles
}

export const Incident = ({incident, role }:CaseDataProps) => {
    const router = useRouter();

    const deleteCase = async (id:string) => {
        if(confirm('Are you sure you want to delete this case?')){
            try {
                const response = await axios.delete(`/api/case/${id}`);
                if (response.status === 200) {
                    console.log('Case deleted');
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error deleting case', error);
            }
        }
    }

    const processEvidence = async (id:string) => {
        if(confirm('Are you sure you want to process evidence?, This will run AI analysis on the evidence')){
            try {
                const response = await axios.put(`/api/case/${id}`);
                if (response.status === 200) {
                    console.log('Evidence processed');
                }
            } catch (error) {
                console.error('Error processing evidence', error);
            }
        }
    }
    return (
        <div className="p-6 mx-auto">
      <Button onClick={() => router.back()}>
        <ArrowLeft size='small'/>
        Back
      </Button>
      <h1 className="text-2xl font-bold mt-2">{incident.title}</h1>
      <div className="grid grid-cols-2 gap-6">
        <section className="p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Incident Details</h2>
            <div className="grid gap-4">
                <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <p className="mt-1">{incident.description}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Type of Incident</label>
                    <p className="mt-1">{incident.incidentDescription}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Connection to Incident</label>
                    <p className="mt-1">{incident.incidentConnection}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <p>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${incident.status === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                            {incident.status}
                        </span>
                    </p>
                </div>
            </div>
        </section>
        <section className="p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">People Involved</h2>
        <div className="grid gap-4">
          <div>
            <label className="text-sm text-gray-600">Incident Happened To</label>
            <p className="mt-1">{incident.incidentHappenedTo}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Reporter&apos;s Connection</label>
            <p className="mt-1">{incident.reporterConnection}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Affected Person&apos;s Connection</label>
            <p className="mt-1">{incident.affectedConnection}</p>
          </div>
        </div>
      </section>
      <section className="p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Case Information</h2>
        <div className="grid gap-4">
          <div>
            <label className="text-sm text-gray-600">Case ID</label>
            <p className="mt-1">{incident.id}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Created</label>
            <p className="mt-1">{new Date(incident.dateCreated).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Last Updated</label>
            <p className="mt-1">{new Date(incident.dateUpdated).toLocaleDateString()}</p>
          </div>
        </div>
      </section>
      {incident.evidenceUrls.length > 0 && (
        <section className="p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Evidence</h2>
          <div className="grid gap-2">
            {incident.evidenceUrls.map((url, index) => (
              <a key={index} href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Evidence {index + 1}
              </a>
            ))}
          </div>
        </section>
      )}
      </div>
      <div className="mt-8 flex justify-end">
        {role === 'admin' && 
            <Button variant='outline' onClick={() => processEvidence(incident.id)}>
                Process Evidence
            </Button> 
        }
        <Button variant='destructive' onClick={() => deleteCase(incident.id)}>
            <Trash2 size='small'/>
            Delete Case
        </Button>
      </div>
    </div>
    )
}