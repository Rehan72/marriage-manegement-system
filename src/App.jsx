import { Route, Routes } from "react-router-dom";
import ListYourHall from "./components/ladingPage/ListHall";
import SignIn from "./components/ladingPage/Login";
import Register from "./components/ladingPage/Register";
import SearchHalls from "./components/ladingPage/SearchHalls";
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import AdminDashboardPage from "./pages/admin/Admin";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import OwnerDashboardPage from "./pages/hall-owner/HallOwner";
import Landing from "./pages/showCase/Landing";
import SuperAdminDashboardPage from "./pages/superAdmin/SuperAdmin";
import HowItWorks from "./pages/works/HowItWorks";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookingDetailPage from "./pages/dashboard/BookingDetails";
import Master from "./routes/Master";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="search-halls" element={<SearchHalls />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="list-your-hall" element={<ListYourHall />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>

      {/* DASHBOARD ROUTES */}
      <Route path="/"
      element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
      >
        
        {/* <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="dashboard" element={<SuperAdminDashboardPage />} />
        <Route path="hall-owner" element={<OwnerDashboardPage />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="dashboard/bookings" element={<BookingDetailPage />} />
        <Route path="dashboard/bookings/:id" element={<BookingDetailPage />} />
        <Route path="dashboard/bookings/:id/details" element={<BookingDetailPage />} />
        <Route path="user" element={<Dashboard />} />
        <Route path="user/bookings" element={<BookingDetailPage />} /> */}
      </Route>
      
    </Routes>
    
  );
}

export default App;
