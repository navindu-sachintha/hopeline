import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getStatusStyles } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function UserCaseMngmnt() {
    const{toast} = useToast()
    const [cases, setCases] = useState<CaseData[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} =  useUser();
    const router = useRouter();

    const fetchAssignedCases = async () =>{
        try {
            setLoading(true);
            const response  = await axios.get<CaseData[]>(`/api/case`)
            const cases = response.data
            setCases(cases);
            console.log('reported cases:', cases);
        } catch (error) {
            console.error('Error getting cases', error);
        } finally{
            setLoading(false);
        }
    }

    const deleteCase = async (caseId:string) => {
        try {
            const response = await axios.delete('/api/case',{
                data:{
                    caseId
                }
            })

            if (response.status === 200) {
                setCases((prev) => prev.filter((c) => c.id !== caseId));
                toast({
                    title: 'Case deleted',
                    description: 'The case has been deleted successfully',
                })
            }

        } catch (error) {
            console.error('Error deleting case', error);
            toast({
                title: 'Error deleting case',
                description: 'There was an error deleting the case',
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        void fetchAssignedCases()
    },[user?.id])

    if (loading) {
        return <div>Loading...</div>
    }
  return (
    <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
            <Button onClick={() => router.push('/report')}>Create New Case</Button>
        </div>
        <div className="grid gap-6">
            {cases.length === 0 ? 
            <div className="text-center"></div> :
            <>
                {cases.map((c)=> (
                    <div key={c.id} className="border rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{c.title}</h2>
                                <p className="text-muted-foreground mt-1">{c.description}</p>
                            </div>
                            <div className={"px-3 py-1 rounded-full text-sm font-medium" + getStatusStyles(c.status)}>
                                {c.status}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Reported by</p>
                            <p>{c.reportedByUser.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Date Reported</p>
                            <p>{new Date(c.dateCreated).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Case ID</p>
                            <p>{c.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p>{c.incidentTypes.map((i)=> ` ${i} |`)}</p>
                        </div>
                        </div>
                        {c.status === 'OPEN' && <Button variant='destructive' onClick={() => deleteCase(c.id)}>Delete</Button>}
                    </div>
                ))}
            </>
            }
        </div>
    </div>
  )
}

export default UserCaseMngmnt