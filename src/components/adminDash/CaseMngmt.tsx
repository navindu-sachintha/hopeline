"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { CaseStatus } from '@prisma/client'
import axios from 'axios'
import { Button } from '../ui/button'

const CaseMngmt = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [status, setStatus] = useState(CaseStatus.OPEN)
  const [totalPages, setTotalPages] = useState(1)
  const [cases, setCases] = useState<CaseData[]>([])

  const fetchCases = async() =>{
    try {
      const response = await axios.get(`/api/case/all/filter?status=${status}&page=${page}&limit=${limit}`)
      // setCases(response.data.cases as CaseData[])
      // setTotalPages(response.data.totalPages as number)

      console.log(response.data)
    } catch (error) {
      console.error('Error getting cases', error);
    }
  }

  useEffect(() => {
    void fetchCases()
  }, [page, limit, status])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.title}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{c.incidentConnection}</TableCell>
              <TableCell>{c.dateCreated}</TableCell>
              <TableCell>
                <Button>Hello</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  )
}

export default CaseMngmt