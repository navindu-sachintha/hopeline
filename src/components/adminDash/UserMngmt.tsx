import React from 'react'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

const UserMngmt = () => {
  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        </Table>
    </div>
  )
}

export default UserMngmt