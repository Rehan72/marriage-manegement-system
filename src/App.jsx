import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Landing from "./pages/showCase/Landing";
import SearchHalls from "./components/ladingPage/SearchHalls";
import HowItWorks from "./pages/works/HowItWorks";
import ListYourHall from "./components/ladingPage/ListHall";
import Contact from "./pages/contact/Contact";
import Register from "./components/ladingPage/Register";
import SignIn from "./components/ladingPage/Login";
import AdminDashboardPage from "./pages/admin/Admin";
import SuperAdminDashboardPage from "./pages/superAdmin/SuperAdmin";
import OwnerDashboardPage from "./pages/hall-owner/HallOwner";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

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
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="super-admin" element={<SuperAdminDashboardPage />} />
        <Route path="hall-owner" element={<OwnerDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
