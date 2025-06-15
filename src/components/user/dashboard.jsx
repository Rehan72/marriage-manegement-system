"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingBookings } from "@/components/dashboard/upcoming-bookings"
import { Calendar, MapPin, Heart, CreditCard } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import api from "@/services/api"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    favoriteHalls: 0,
    totalSpent: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // Fetch user's bookings and favorites
        const [bookingsData, favoritesData] = await Promise.all([
          api.getMyBookings(),
          api.getFavorites().catch(() => ({ favorites: [] })),
        ])

        const bookings = bookingsData.bookings || []
        const favorites = favoritesData.favorites || []

        const upcomingEvents = bookings.filter(
          (booking) => new Date(booking.eventDate) > new Date() && booking.bookingStatus !== "cancelled",
        ).length

        const totalSpent = bookings
          .filter((booking) => booking.paymentStatus === "paid")
          .reduce((sum, booking) => sum + booking.totalAmount, 0)

        setStats({
          totalBookings: bookings.length,
          upcomingEvents,
          favoriteHalls: favorites.length,
          totalSpent,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <div className="col-span-4 h-96 bg-muted animate-pulse rounded-md"></div>
          <div className="col-span-3 h-96 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your bookings today.</p>
        </div>
        <Button asChild>
          <Link href="/search-halls">Browse Halls</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.toString()}
          description="All time bookings"
          icon={<Calendar className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents.toString()}
          description="Events this month"
          icon={<MapPin className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
        />
        <StatCard
          title="Favorite Halls"
          value={stats.favoriteHalls.toString()}
          description="Saved for later"
          icon={<Heart className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
        />
        <StatCard
          title="Total Spent"
          value={`₹${stats.totalSpent.toLocaleString()}`}
          description="All time spending"
          icon={<CreditCard className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest booking activities</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your next events</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingBookings />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild className="justify-start">
              <Link href="/search-halls">
                <MapPin className="mr-2 h-4 w-4" />
                Search New Halls
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                View All Bookings
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/favorites">
                <Heart className="mr-2 h-4 w-4" />
                Manage Favorites
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Get support when you need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Have questions about your bookings or need assistance? We're here to help!
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/help">Help Center</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
