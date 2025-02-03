import React from 'react'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

const CaseMngmt = () => {
  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        </Table>
    </div>
  )
}

export default CaseMngmt