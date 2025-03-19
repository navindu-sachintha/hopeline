"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { CaseStatus } from '@prisma/client'
import axios from 'axios'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useRouter } from 'next/navigation'

const CaseMngmt = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [status, setStatus] = useState<CaseStatus>(CaseStatus.OPEN)
  const [totalPages, setTotalPages] = useState(1)
  const [cases, setCases] = useState<CaseData[]>([])
  const router = useRouter();

  const fetchCases = async() =>{
    try {
      setLoading(true)
      const response = await axios.get(`/api/case/all/filter?status=${status}&page=${page}&limit=${limit}`)
      const data = response.data as {
        cases: CaseData[],
        totalCases: number,
        page: number,
        totalPages: number,
      }
      setLoading(false)
      setCases(data.cases)
      setTotalPages(data.totalPages)

      console.log(response.data)
    } catch (error) {
      setLoading(false)
      console.error('Error getting cases', error);
    }
  }

  useEffect(() => {
    void fetchCases()
  }, [page, limit, status])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <Label>Filter By Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as CaseStatus)}>
          <SelectTrigger>
            <SelectValue placeholder='Select a Status'/>
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem value={CaseStatus.OPEN}>Open</SelectItem>
              <SelectItem value={CaseStatus.PROCESSING} >Processing</SelectItem>
              <SelectItem value={CaseStatus.RESOLVED}>Resolved</SelectItem>
              <SelectItem value={CaseStatus.REJECTED}>Rejected</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>
            <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder='Show'/>
              </SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  {[5,10,15,20].map((l) => (
                    <SelectItem key={l} value={l.toString()}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
            </TableHead>
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
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === CaseStatus.OPEN ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
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
        <div>
          <Button size='sm' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <span>{page} of {totalPages}</span>
          <Button size='sm' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
    </div>
  )
}

export default CaseMngmt