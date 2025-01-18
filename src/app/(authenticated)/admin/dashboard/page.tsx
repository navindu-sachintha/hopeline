import { AnalyticsCard } from '@/components/adminDash/AnalyticsCard'
import { analyticsSummary } from '@/lib/mockData'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <AnalyticsCard data={analyticsSummary}/>

    </div>
  )
}

export default AdminDashboard