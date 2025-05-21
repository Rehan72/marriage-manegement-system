
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SiteHeader() {
 const location = useLocation();
  const pathname = location.pathname;
   const roles = ['user', 'hall-owner', 'admin', 'super-admin'];
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  profileImage: "https://i.pravatar.cc/150?img=3", // Placeholder image URL
};
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const matched = roles.some(role => pathname.includes(role));
    if (matched) {
      setIsUserLoggedIn(true);
    }
  }, [pathname]);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {
         isUserLoggedIn ?<>
            <div className="w-full mx-auto flex h-16 items-center justify-between m-3 ">
          <div className="flex items-center gap-2 font-bold text-xl ml-3">
          <Link href="/">
             <span className="text-primary ">Wedding</span>
            <span className="text-accent">Haven</span>
          </Link>
        </div>
         <div className="ml-auto flex items-center gap-4 mr-3">
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer p-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">New booking confirmation</p>
                      <p className="text-xs text-muted-foreground">
                        Your booking for Royal Palace Hall has been confirmed
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage || ""} alt={user?.firstName || ""} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
  </div>
         </>:<>
            <div className="container flex h-16 items-center justify-between ml-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Link href="/">
             <span className="text-primary ">Wedding</span>
            <span className="text-accent">Haven</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/search-halls" className="text-sm font-medium hover:text-primary">
            Search Halls
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link to="/list-your-hall" className="text-sm font-medium hover:text-primary">
            List Your Hall
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
         </>
      }
    </header>
  )
}

