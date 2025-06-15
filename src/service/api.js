// import { toast } from "@/components/ui/use-toast"

const API_URL = import.meta.env.VITE_API_BASE_URL;
// const API_URL = process.env.VITE_API_BASE_URL || "http://localhost:5000/api"

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error)
  const message = error.response?.data?.message || "Something went wrong"
  console.log("Error message:", message);
  
//   toast({
//     title: "Error",
//     description: message,
//     variant: "destructive",
//   })
  throw error
}

// Get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// API service
const api = {
  // Auth
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      return data
    } catch (error) {
      return handleApiError(error)
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      return data
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getCurrentUser() {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Halls
  async getHalls(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`${API_URL}/halls?${queryParams.toString()}`)

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getHallById(id) {
    try {
      const response = await fetch(`${API_URL}/halls/${id}`)

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async createHall(hallData) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/halls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hallData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async updateHall(id, hallData) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/halls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hallData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async deleteHall(id) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/halls/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getMyHalls() {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/halls/owner/my-halls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Bookings
  async createBooking(bookingData) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getMyBookings(params = {}) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`${API_URL}/bookings/my-bookings?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getHallBookings(params = {}) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`${API_URL}/bookings/hall-bookings?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getBookingById(id) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async updateBookingStatus(id, status, reason) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, cancellationReason: reason }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async cancelBooking(id, reason) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cancellationReason: reason }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Users
  async getUsers(params = {}) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`${API_URL}/users?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getUserById(id) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async updateUser(id, userData) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async deleteUser(id) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Favorites
  async addToFavorites(hallId) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/favorites/${hallId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async removeFromFavorites(hallId) {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/favorites/${hallId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getFavorites() {
    try {
      const token = getToken()
      if (!token) throw new Error("No token found")

      const response = await fetch(`${API_URL}/users/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}

export default api
