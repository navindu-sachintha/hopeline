import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getStatusStyles } from '@/lib/utils';

interface ResponseItem {
    case:CaseData
}
function ProCaseMngmnt() {
    const [cases, setCases] = useState<CaseData[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} =  useUser();
    const router = useRouter();

    const fetchAssignedCases = async () =>{
        try {
            setLoading(true);
            const response  = await axios.get<ResponseItem[]>(`/api/case/assigned/${user?.id}`)
            const cases = response.data.map(item => item.case);
            setCases(cases);
            console.log('Assigned cases:', cases);
        } catch (error) {
            console.error('Error getting cases', error);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchAssignedCases()
    },[user?.id])

    if (loading) {
        return <div>Loading...</div>
    }
  return (
    <div className="overflow-x-auto">
        <Table>   
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Created</TableHead>
                </TableRow>
            </TableHeader>
            {cases.length === 0 ? 
          <TableRow><TableCell>No cases found</TableCell></TableRow> : 
          <TableBody className='overflow-y-auto'>
          {cases.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.title}</TableCell>
              <TableCell>
              <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(c.status)}`}
              >
                {c.status}
              </span>
              </TableCell>
              <TableCell>{c.reportedByUser ? c.reportedByUser.username : 'Anonymous'}</TableCell>
              <TableCell>{c.reportedByUser ? c.reportedByUser.email : `IP Address: ${c.reportedByAnonymous.ipAddress}`}</TableCell>
              <TableCell>{new Date(c.dateCreated).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant='link' onClick={() => router.push(`/case/${c.id}`)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        }
        </Table>
    </div>
  )
}

export default ProCaseMngmnt