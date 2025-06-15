"use client"

import api from "@/service/api"
import { createContext, useContext, useState, useEffect } from "react"
// import api from "@/services/api"
import { useNavigate } from "react-router-dom"
// import { toast } from "@/components/ui/use-toast"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const userData = await api.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await api.login({ email, password })
      setUser(data.user)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      if (data.user.role === "hall-owner") {
        navigate("/hall-owner")
      } else if (data.user.role === "admin") {
        navigate("/admin")
      } else if (data.user.role === "super-admin") {
        navigate("/super-admin")
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const data = await api.register(userData)
      setUser(data.user)
      toast({
        title: "Success",
        description: "Registered successfully",
      })
      navigate("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/sign-in")
    toast({
      title: "Success",
      description: "Logged out successfully",
    })
  }

  const updateUser = async (userData) => {
    try {
      if (!user) throw new Error("No user logged in")
      setLoading(true)
      const data = await api.updateUser(user.id, userData)
      setUser({ ...user, ...data.user })
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Update failed:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
