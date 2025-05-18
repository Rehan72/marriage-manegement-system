import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("token") // or from context/store
const isAuthenticated = true // for testing purposes
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return children
}
export default ProtectedRoute;