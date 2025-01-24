import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Clock, FileText, Users } from 'lucide-react'

interface AnalyticsCardProps {
  data: Omit<AnalyticSummary, 'recentCases'>
}

export function AnalyticsCard ({ data }: AnalyticsCardProps) {
  
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalCases}</div>
          <p className="text-xs text-muted-foreground">
            All reported cases
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Cases</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.newCases}</div>
          <p className="text-xs text-muted-foreground">
            Cases requiring attention
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalRegisteredUsers}</div>
          <p className="text-xs text-muted-foreground">
            Active system users
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processing Cases</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.processingCases}</div>
          <p className="text-xs text-muted-foreground">
            Average time to resolve
          </p>
        </CardContent>
      </Card>
    </div>
  )
}