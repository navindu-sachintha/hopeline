"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { BarChart2, FileText, PanelLeft, Settings, Users, X } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import ProCaseMngmnt from './ProCaseMngmnt'

export default function ProfessionalDashboard() {
    const [activeTab, setActiveTab] = useState("cases")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    
    interface NavItemProps {
        icon: React.ElementType;
        label: string;
        isActive: boolean;
        onClick: () => void;
    }

    const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
        <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start" onClick={onClick}>
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      )

    const renderContent = () => {
        switch (activeTab) {
          case "cases":
            return <ProCaseMngmnt />
          default:
            return null
        }
      }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <aside className={`bg-background hidden md:block w-64 p-4 border-r`}>
        <ScrollArea className="h-full">
          <nav className="space-y-2">
            <NavItem
              icon={FileText}
              label="Reported Cases"
              isActive={activeTab === "cases"}
              onClick={() => setActiveTab("cases")}
            />
            <NavItem
              icon={BarChart2}
              label="Analytics"
              isActive={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />

          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background p-4 border-r transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out md:hidden`}
      >
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="absolute top-4 right-4">
          <X className="h-4 w-4" />
        </Button>
        <ScrollArea className="h-full mt-12">
          <nav className="space-y-2">
            <NavItem
              icon={FileText}
              label="Case Management"
              isActive={activeTab === "cases"}
              onClick={() => {
                  setActiveTab("cases")
                  toggleSidebar()
                }}
            />
                <NavItem
                  icon={Users}
                  label="User Management"
                  isActive={activeTab === "users"}
                  onClick={() => {
                    setActiveTab("users")
                    toggleSidebar()
                  }}
                />
            <NavItem
              icon={BarChart2}
              label="Analytics"
              isActive={activeTab === "analytics"}
              onClick={() => {
                setActiveTab("analytics")
                toggleSidebar()
              }}
            />
            <NavItem
              icon={Settings}
              label="System Settings"
              isActive={activeTab === "settings"}
              onClick={() => {
                setActiveTab("settings")
                toggleSidebar()
              }}
            />
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                <PanelLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
