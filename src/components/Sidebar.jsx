import { motion } from "framer-motion";
import {
   ArrowLeft,
   BarChart3,
   Building2,
   Calendar,
   CreditCard,
   Database,
   FileText,
   Globe,
   Heart,
   ImageIcon,
   LayoutDashboard,
   Lock,
   MessageSquare,
   Settings,
   ShieldAlert,
   User,
   Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";



const Sidebar = () => {
   const location = useLocation();
  const currentPath = location.pathname;
  const roleSegment = currentPath.split("/")[1]
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
    const handleResize = () => {
      const small = window.innerWidth < 768;
      setIsSmallScreen(small);
      setIsOpen(!small);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   const menuItems = getRoutesByRole(roleSegment)

  const sidebarVariants = {
    open: {
      width: "12rem",
      transition: { type: "spring", stiffness: 90, damping: 10 },
    },
    closed: {
      width: "5rem",
      transition: { type: "spring", stiffness: 90, damping: 10 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const iconHover = {
    rest: { scale: 1 ,color: "#000"},
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
  };

 const allRoutes = [
  // User Routes
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["user"] },
  { title: "My Bookings", path: "/dashboard/bookings", icon: Calendar, roles: ["user"] },
  { title: "All Halls", path: "/dashboard/halls", icon: Building2, roles: ["user"] },
  { title: "Favorites", path: "/dashboard/favorites", icon: Heart, roles: ["user"] },
  { title: "Payments", path: "/dashboard/payments", icon: CreditCard, roles: ["user"] },
  { title: "Profile", path: "/dashboard/profile", icon: User, roles: ["user"] },
  { title: "Settings", path: "/dashboard/settings", icon: Settings, roles: ["user"] },

  // Hall Owner Routes
  { title: "Dashboard", path: "/hall-owner", icon: LayoutDashboard, roles: ["hall-owner"] },
  { title: "My Halls", path: "/hall-owner/halls", icon: Building2, roles: ["hall-owner"] },
  { title: "Bookings", path: "/hall-owner/bookings", icon: Calendar, roles: ["hall-owner"] },
  { title: "Gallery", path: "/hall-owner/gallery", icon: ImageIcon, roles: ["hall-owner"] },
  { title: "Messages", path: "/hall-owner/messages", icon: MessageSquare, roles: ["hall-owner"] },
  { title: "Payments", path: "/hall-owner/payments", icon: CreditCard, roles: ["hall-owner"] },
  { title: "Analytics", path: "/hall-owner/analytics", icon: BarChart3, roles: ["hall-owner"] },
  { title: "Settings", path: "/hall-owner/settings", icon: Settings, roles: ["hall-owner"] },

  // Admin Routes
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard, roles: ["admin"] },
  { title: "Users", path: "/admin/users", icon: Users, roles: ["admin"] },
  { title: "Halls", path: "/admin/halls", icon: Building2, roles: ["admin"] },
  { title: "Bookings", path: "/admin/bookings", icon: Calendar, roles: ["admin"] },
  { title: "Payments", path: "/admin/payments", icon: CreditCard, roles: ["admin"] },
  { title: "Reports", path: "/admin/reports", icon: BarChart3, roles: ["admin"] },
  { title: "Settings", path: "/admin/settings", icon: Settings, roles: ["admin"] },

  // Super Admin Routes
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["superadmin"] },
  { title: "Admins", path: "/admins", icon: ShieldAlert, roles: ["superadmin"] },
  { title: "Users", path: "/users", icon: Users, roles: ["superadmin"] },
  { title: "Halls", path: "/halls", icon: Building2, roles: ["superadmin"] },
  { title: "Bookings", path: "/bookings", icon: Calendar, roles: ["superadmin"] },
  { title: "Payments", path: "/payments", icon: CreditCard, roles: ["superadmin"] },
  { title: "Reports", path: "/reports", icon: BarChart3, roles: ["superadmin"] },
  { title: "Locations", path: "/locations", icon: Globe, roles: ["superadmin"] },
  { title: "Database", path: "/database", icon: Database, roles: ["superadmin"] },
  { title: "Logs", path: "/logs", icon: FileText, roles: ["superadmin"] },
  { title: "Permissions", path: "/permissions", icon: Lock, roles: ["superadmin"] },
  { title: "Settings", path: "/settings", icon: Settings, roles: ["superadmin"] },
];


const filteredRoutes = allRoutes.filter(route => route.roles.includes(role));
console.log("Filtered Routes:", filteredRoutes);

  return (
    <motion.aside
      className="min-h-screen bg-[#f2f2f4] text-black shadow-lg relative border-r border-[#c59bbd]"
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      {/* Toggle Button */}
      <div className="absolute -right-2.5 top-4 z-10">
        <motion.button
          className="bg-primary text-black rounded-full p-2 hover:bg-[#c59bbd] transition cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowLeft size={16} className="text-white" />
          </motion.div>
        </motion.button>
      </div>

      {/* Navigation */}
      <motion.nav
        className="mt-16 px-4 space-y-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredRoutes.map(({ title, path, icon: Icon }, idx) => (
          <motion.div key={idx} variants={linkVariants}>
           <NavLink
  to={path}
  className={({ isActive }) =>
    `flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-primary text-white shadow-md scale-105"
        : "hover:bg-accent hover:text-white"
    }`
  }
>
  {({ isActive }) => (
    <>
      <motion.div
        variants={iconHover}
        whileHover="hover"
        className={`transition-colors duration-300 ${
          isActive ? "text-white" : "text-black group-hover:text-white"
        }`}
      >
        <Icon size={20} />
      </motion.div>
      {isOpen && (
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isActive ? "text-white" : "text-black group-hover:text-white"
          }`}
        >
          {title}
        </span>
      )}
    </>
  )}
</NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </motion.aside>
  );
};

export default Sidebar;
