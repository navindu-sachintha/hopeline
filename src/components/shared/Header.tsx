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

const navItems = [
  { name: "Home", href: "/" },
  { name: "Awareness", href: "/awareness" },
  { name: "Report", href: "/report" },
  { name: "Dashboard", href: "/dashboard" },
]

export default function Component() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="w-full px-2 py-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-transparent backdrop-blur-sm p-0">
          <nav className="flex flex-col space-y-2 p-4 pt-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:bg-[#f5d0fe] rounded-full px-4 py-2",
                  pathname === item.href
                    ? "bg-[#f5d0fe] text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:flex space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:bg-fuchsia-200 rounded-full px-4 py-1",
              pathname === item.href
                ? "bg-fuchsia-200 text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}