"use client"

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const CasesTabUsr = () => {
    const router = useRouter();
  return (
    <div>
        <Button onClick={() => router.push('/dashboard/create-case')}>Create Case &gt;&gt;</Button>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supervision</TableHead>
                    <TableHead>Created</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Case subject</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>Supervised</TableCell>
                    <TableCell>2021-09-01</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Case subject</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>Supervised</TableCell>
                    <TableCell>2021-09-01</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5} className="text-center">Keep Hopes Alive.</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
  )
}