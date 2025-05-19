import { ThemeProvider } from "../hooks/ThemeContext"
import { SiteFooter } from "./ladingPage/Footer"
import { SiteHeader } from "./ladingPage/Header"
// import SidebarNav from "./dashboard/sidebar-nav"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"


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


         <div className="flex flex-1">
        <Sidebar />
      
       {/* Main content */}
          <div className="flex-1 p-4 md:p-6 bg-app-background">
            <main className="min-h-full">
              <Outlet />
            </main>
          </div>
      </div>
        {/* Main content area with sidebar and content */}
           

        {/* Footer stays at the bottom */}
        <SiteFooter />
      </div>
    </ThemeProvider>
     </>
  )
}
