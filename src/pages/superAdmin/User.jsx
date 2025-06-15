import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Badge } from "../../components/ui/badge"
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
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react"

const userSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
  role: z.enum(["user", "hall-owner", "admin", "super-admin"]),
})

function StatusBadge({ variant, children }) {
  const variants = {
    pending: ["Pending", "text-amber-500"],
    active: ["Active", "text-green-500"],
    inactive: ["Inactive", "text-gray-500"],
    rejected: ["Rejected", "text-red-500"],
    user: ["User", "text-blue-500"],
    "hall-owner": ["Hall Owner", "text-purple-500"],
    admin: ["Admin", "text-orange-500"],
    "super-admin": ["Super Admin", "text-primary"],
  }

  const [text = "Unknown", color = "text-gray-500"] = variants[variant] || []
  return <Badge className={color}>{children || text}</Badge>
}

export default function UsersPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [role, setRole] = useState(searchParams.get("role") || "all")
  const [selectedUser, setSelectedUser] = useState(null)

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      role: "user",
    },
  })

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        // const data = await api.getUsers({ page, limit, search, role })
        // setUsers(data.users)
        // setTotal(data.pagination.total)
      } catch (error) {
        console.error("Error loading users")
        // toast({ title: "Error", description: "Failed to load users", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [page, limit, search, role])

  const buildURL = (page, limit, search, role) =>
    `/super-admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}`

  const handlePageChange = (newPage) => {
    navigate(buildURL(newPage, limit, search, role))
    setPage(newPage)
  }

  const handleLimitChange = (newLimit) => {
    navigate(buildURL(1, newLimit, search, role))
    setLimit(newLimit)
    setPage(1)
  }

  const handleSearchChange = (newSearch) => {
    navigate(buildURL(1, limit, newSearch, role))
    setSearch(newSearch)
    setPage(1)
  }

  const handleRoleChange = (newRole) => {
    navigate(buildURL(1, limit, search, newRole))
    setRole(newRole)
    setPage(1)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      address: user.address || { street: "", city: "", state: "", pincode: "" },
      role: user.role,
    })
  }

  const onSubmit = async (data) => {
    try {
      if (!selectedUser) throw new Error("No user selected")
      // await api.updateUser(selectedUser.id, data)
      // toast({ title: "Success", description: "User updated successfully" })
      // Trigger refetch
    } catch (error) {
      console.error("Failed to update user")
      // toast({ title: "Error", description: "Failed to update user", variant: "destructive" })
    }
  }

  return (
    <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="hall-owner">Hall Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="super-admin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableCaption>A list of all the users in your account.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge variant={user.role}>{user.role}</StatusBadge>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                          <DialogDescription>Make changes to the user profile here.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="First name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="hall-owner">Hall Owner</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="super-admin">Super Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <Button type="submit">Update User</Button>
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
    </div>
  )
}
