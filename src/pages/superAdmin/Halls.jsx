"use client"

import { Badge } from "../../components/ui/badge"

import { Textarea } from "../../components/ui/textarea"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
// import { toast } from "../../components/ui/use-toast"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import api from "../../service/api"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react"

const hallSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number(),
  capacity: z.number(),
  status: z.enum(["pending", "active", "inactive", "rejected"]),
})

export default function HallsPage() {
    const navigate = useNavigate()
  const location = useLocation()
  const [halls, setHalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
 const searchParams = new URLSearchParams(window.location.search)

const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10)
const [search, setSearch] = useState(searchParams.get("search") || "")
const [status, setStatus] = useState(searchParams.get("status") || "all")
  const [selectedHall, setSelectedHall] = useState(null)

  // Form for editing hall
  const form = useForm<z.infer<typeof hallSchema>>({
    resolver: zodResolver(hallSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      capacity: 0,
      status: "pending",
    },
  })

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true)
        const data = await api.getHalls({
          page,
          limit,
          search,
          status,
        })
        setHalls(data.halls)
        setTotal(data.pagination.total)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load halls",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHalls()
  }, [page, limit, search, status])

  const handlePageChange = (newPage) => {
    const newURL = `/super-admin/halls?page=${newPage}&limit=${limit}&search=${search}&status=${status}`
    navigate(newURL)
    setPage(newPage)
  }

  const handleLimitChange = (newLimit) => {
    const newURL = `/super-admin/halls?page=1&limit=${newLimit}&search=${search}&status=${status}`
    navigate(newURL)
    setLimit(newLimit)
    setPage(1)
  }

  const handleSearchChange = (newSearch) => {
    const newURL = `/super-admin/halls?page=1&limit=${limit}&search=${newSearch}&status=${status}`
    navigate(newURL)
    setSearch(newSearch)
    setPage(1)
  }

  const handleStatusChange = (newStatus) => {
    const newURL = `/super-admin/halls?page=1&limit=${limit}&search=${search}&status=${newStatus}`
    navigate(newURL)
    setStatus(newStatus)
    setPage(1)
  }

  const handleEditHall = (hall) => {
    setSelectedHall(hall)
    form.reset({
      name: hall.name,
      description: hall.description,
      price: hall.price,
      capacity: hall.capacity,
      status: hall.status,
    })
  }

  const onSubmit = async (data) => {
    try {
      if (!selectedHall) throw new Error("No hall selected")
      await api.updateHall(selectedHall._id, data)
      toast({
        title: "Success",
        description: "Hall updated successfully",
      })
      navigate.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hall",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Halls</h1>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search halls..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableCaption>A list of all the halls in your account.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : halls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No halls found.
                </TableCell>
              </TableRow>
            ) : (
              halls.map((hall) => (
                <TableRow key={hall._id}>
                  <TableCell className="font-medium">{hall._id}</TableCell>
                  <TableCell>{hall.name}</TableCell>
                  <TableCell>{hall.description}</TableCell>
                  <TableCell>₹{hall.price.toLocaleString()}</TableCell>
                  <TableCell>{hall.capacity}</TableCell>
                  <TableCell>
                    <StatusBadge variant={hall.status}>{hall.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditHall(hall)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Edit Hall</DialogTitle>
                          <DialogDescription>Make changes to the hall details here.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Hall name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Capacity</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Capacity" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Description" className="resize-none" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button type="submit">Update Hall</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Select value={String(limit)} onValueChange={(value) => handleLimitChange(Number(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="text-sm font-medium">
            Page {page} of {Math.ceil(total / limit)}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className={cn("h-8 w-8 p-0", page === 1 && "opacity-50 pointer-events-none")}
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Go to first page</span>
            </Button>
            <Button
              variant="outline"
              className={cn("h-8 w-8 p-0", page === 1 && "opacity-50 pointer-events-none")}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go to previous page</span>
            </Button>
            <Button
              variant="outline"
              className={cn("h-8 w-8 p-0", page === Math.ceil(total / limit) && "opacity-50 pointer-events-none")}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === Math.ceil(total / limit)}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Go to next page</span>
            </Button>
            <Button
              variant="outline"
              className={cn("h-8 w-8 p-0", page === Math.ceil(total / limit) && "opacity-50 pointer-events-none")}
              onClick={() => handlePageChange(Math.ceil(total / limit))}
              disabled={page === Math.ceil(total / limit)}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Go to last page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



function StatusBadge({ variant }) {
  let text, color
  switch (variant) {
    case "pending":
      text = "Pending"
      color = "text-amber-500"
      break
    case "active":
      text = "Active"
      color = "text-green-500"
      break
    case "inactive":
      text = "Inactive"
      color = "text-gray-500"
      break
    case "rejected":
      text = "Rejected"
      color = "text-red-500"
      break
    case "user":
      text = "User"
      color = "text-blue-500"
      break
    case "hall-owner":
      text = "Hall Owner"
      color = "text-purple-500"
      break
    case "admin":
      text = "Admin"
      color = "text-orange-500"
      break
    case "super-admin":
      text = "Super Admin"
      color = "text-primary"
      break
    default:
      text = "Unknown"
      color = "text-gray-500"
  }

  return <Badge className={color}>{text}</Badge>
}
