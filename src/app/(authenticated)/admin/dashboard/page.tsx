"use client";
import { AnalyticsCard } from '@/components/adminDash/AnalyticsCard'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const [stats, setStats] = useState<AnalyticSummary>({
      totalCases:0,
      resolvedCases:0,
      newCases:0,
      processingCases:0,
      totalRegisteredUsers:0,
      recentCases: []
    });

    const router = useRouter();
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/admin/stats`);
        const stats: AnalyticSummary = response.data as AnalyticSummary;
        setStats(stats);
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    }
    useEffect(() => {
      void fetchStats();
    }, [])

    const {recentCases, ...rest} = stats;
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <AnalyticsCard
        data={rest}
      />
      <div className="mt-8">
        <h3 className="text-2xl font-bold tracking-tight">Recent Cases</h3>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableHead>Case ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {recentCases.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.status === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {c.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(c.dateCreated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant='ghost' onClick={() => router.push(`/case/${c.id}`)}>
                    View
                    <Eye className="h-4 w-4 ml-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminDashboard