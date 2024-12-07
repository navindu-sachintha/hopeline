"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { UserButton, useUser, useClerk } from '@clerk/nextjs'

const baseNavItems = [
  { name: "Home", href: "/" },
  { name: "Awareness", href: "/awareness" },
  { name: "Report", href: "/report" },
]

export default function Component() {
  const [open, setOpen] = React.useState(false)
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut();
  }

  // Add dashboard link if user is signed in
  const navItems = isSignedIn ? [
    ...baseNavItems,
    { name: "Dashboard", href: "/dashboard" }
  ] : baseNavItems;

  return (
    <div className="w-full px-2 py-2 z-[999]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent  md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-fuchsia-100 backdrop-blur-sm p-0">
          <nav className="flex flex-col space-y-2 p-4 pt-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm  font-medium transition-colors hover:bg-[#f5d0fe] rounded-full px-4 py-2",
                  pathname === item.href
                    ? "bg-[#f5d0fe] text-black"
                    : "text-black"
                )}
              >
                {item.name}
              </Link>
            ))}
            {isSignedIn && (
            <Button
              variant='ghost'
              onClick={handleSignOut}
              className="mt-auto mb-4 text-sm font-medium hover:text-primary"
            >
              Sign Out
            </Button>
          )

          }
          </nav>
          
        </SheetContent>
      </Sheet>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <nav className="hidden md:flex items-center justify-between w-full">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:bg-[#f5d0fe] rounded-full px-4 py-2",
                    pathname === item.href
                      ? "bg-fuchsia-200 text-primary"
                      : "text-black"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {isSignedIn && (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-sm font-medium hover:text-primary ml-auto"
              >
                Sign Out
              </Button>
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}