import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CasesTabUsr } from '@/components/userDash/tabs/CasesTabUsr'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='cases'>Cases</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <div>Overview</div>
        </TabsContent>
        <TabsContent value='cases'>
          <CasesTabUsr />
        </TabsContent>
        <TabsContent value='settings'>
          <div>Settings</div>
        </TabsContent>  
      </Tabs>
    </div>
  )
}

export default Dashboard