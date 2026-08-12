import { Poppins, Inter } from "next/font/google";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
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
  icons: {
    icon: "/SJLogo.ico",
    shortcut: "/SJLogo.ico",
    apple: "/SJLogo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-gold-500/30 selection:text-navy-950">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
