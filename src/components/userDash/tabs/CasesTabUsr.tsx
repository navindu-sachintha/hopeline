"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { View } from "lucide-react"

export const CasesTabUsr = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const fetchCases = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/case');
            if (response.status === 200) {
                const cases = response.data as Case[];
                setCases(cases);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching cases', error);
        }
    }

    useEffect(() => {
        void fetchCases();
    }, [])

  return (
    <div>
        <Button onClick={() => router.push('/dashboard/create-case')}>Create Case &gt;&gt;</Button>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Case Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? <p>Loading...</p> : (cases.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>{c.description}</TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                            >
                                {c.status}
                            </span>
                        </TableCell>
                        <TableCell>{new Date(c.dateCreated).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <div className="hidden md:flex space-x-2">
                                <View className="cursor-pointer" onClick={() => router.push(`/case/${c.id}`)}/>
                            </div>
                        </TableCell>
                    </TableRow>
                )))}
                
            </TableBody>
        </Table>
    </div>
  )
}