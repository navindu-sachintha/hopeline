"use client"
import { Button } from "@/components/ui/button";
import axios from "axios"
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Case({params}:{
    params: {id:string}
}) {
    const [caseData, setCaseData] = useState<Case|null>(null);
    const {id} = params;
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

    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                const response = await axios.get(`/api/case/${id}`);
                if (response.status === 200) {
                    const caseData = response.data as Case;
                    setCaseData(caseData);
                }
    
            } catch (error) {
                console.error('Error fetching case data', error);
            }
        }
        void fetchCaseData();
    },[id])

    if(caseData === null) return <p>Loading...</p>
    
  return (
    <div className="p-6 mx-auto">
      <Button onClick={() => router.back()}>
        <ArrowLeft size='small'/>
        Back
      </Button>
      <h1 className="text-2xl font-bold mt-2">{caseData.title}</h1>
      <div className="grid grid-cols-2 gap-6">
        <section className="p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Incident Details</h2>
            <div className="grid gap-4">
                <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <p className="mt-1">{caseData.description}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Type of Incident</label>
                    <p className="mt-1">{caseData.incidentDescription}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Connection to Incident</label>
                    <p className="mt-1">{caseData.incidentConnection}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <p>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${caseData.status === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                            {caseData.status}
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
            <p className="mt-1">{caseData.incidentHappenedTo}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Reporter&apos;s Connection</label>
            <p className="mt-1">{caseData.reporterConnection}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Affected Person&apos;s Connection</label>
            <p className="mt-1">{caseData.affectedConnection}</p>
          </div>
        </div>
      </section>
      <section className="p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Case Information</h2>
        <div className="grid gap-4">
          <div>
            <label className="text-sm text-gray-600">Case ID</label>
            <p className="mt-1">{caseData.id}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Created</label>
            <p className="mt-1">{new Date(caseData.dateCreated).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Last Updated</label>
            <p className="mt-1">{new Date(caseData.dateUpdated).toLocaleDateString()}</p>
          </div>
        </div>
      </section>
      {caseData.evidenceUrls.length > 0 && (
        <section className="p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Evidence</h2>
          <div className="grid gap-2">
            {caseData.evidenceUrls.map((url, index) => (
              <a key={index} href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Evidence {index + 1}
              </a>
            ))}
          </div>
        </section>
      )}
      </div>
      <div className="mt-8 flex justify-end">
        <Button variant='destructive' onClick={() => deleteCase(caseData.id)}>
            <Trash2 size='small'/>
            Delete Case
        </Button>
      </div>
    </div>
  )
}