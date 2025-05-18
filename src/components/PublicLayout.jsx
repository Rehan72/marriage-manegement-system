import React from "react";
import { Outlet } from "react-router-dom"; // ✅ needed for nested routing
import { SiteHeader } from "./ladingPage/Header";
import { SiteFooter } from "./ladingPage/Footer";
import { ThemeProvider } from "../hooks/ThemeContext";

export const metadata = {
  title: "Wedding Haven - Marriage Hall Booking Platform",
  description: "Find and book the perfect marriage hall for your special day",
};

export default function PublicLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 ml-5">
          <Outlet /> {/* ✅ this renders the nested route content */}
        </main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
