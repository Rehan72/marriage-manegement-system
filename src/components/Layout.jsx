import  React from "react"
import { SiteHeader } from "./ladingPage/Header"
import { SiteFooter } from "./ladingPage/Footer"
import { ThemeProvider } from "../hooks/ThemeContext"
import { UserNav } from "./dashboard/Navbar"
// import SidebarNav from "./dashboard/sidebar-nav"
import { Outlet } from "react-router-dom"
import { SidebarNav } from "./dashboard/sidebar-nav"


export const metadata = {
  title: "Wedding Haven - Marriage Hall Booking Platform",
  description: "Find and book the perfect marriage hall for your special day",
}

export default function Layout({ children }) {
  return (
  
       <>
       
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* Outer wrapper: Column layout */}
      <div className="flex flex-col min-h-screen">

        {/* Header */}
        <SiteHeader />

        {/* Main content area with sidebar and content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r">
            <SidebarNav />
          </aside>

          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 bg-app-background">
            <main className="min-h-full">
              <Outlet />
            </main>
          </div>
        </div>

        {/* Footer stays at the bottom */}
        <SiteFooter />
      </div>
    </ThemeProvider>
     </>
  )
}
