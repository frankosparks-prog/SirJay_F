import { Poppins, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Sir Jay Training Institute | Fashion, ICT & Media Arts in Nanyuki, Kenya",
  description:
    "TVETA-registered vocational college in Nanyuki offering practical courses in Fashion Design, ICT, Media Arts, Beauty, and Entrepreneurship. Achieving Greatness Together.",
  keywords: [
    "Sir Jay Training Institute",
    "Fashion Design School Nanyuki",
    "Vocational Training Kenya",
    "TVETA Institute Laikipia",
    "Sir Jay Suits",
    "KNQF Certificate Diploma Kenya",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-navy-950 text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-300">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
