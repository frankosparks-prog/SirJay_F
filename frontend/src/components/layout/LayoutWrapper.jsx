"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen flex flex-col bg-navy-950 text-white w-full">{children}</div>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <ChatbotWidget />
    </>
  );
}
