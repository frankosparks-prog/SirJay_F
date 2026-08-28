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
  metadataBase: new URL("https://sirjay.co.ke"),
  title: {
    default: "Sir Jay Training Institute | Fashion, ICT & Media Arts in Nanyuki, Kenya",
    template: "%s | Sir Jay Training Institute",
  },
  description:
    "TVETA-registered vocational college in Nanyuki offering practical courses in Fashion Design, ICT, Media Arts, Beauty, and Entrepreneurship. Achieving Greatness Together.",
  keywords: [
    "Sir Jay Training Institute",
    "Fashion Design School Nanyuki",
    "Vocational Training Kenya",
    "TVETA Institute Laikipia",
    "Sir Jay Suits",
    "KNQF Certificate Diploma Kenya",
    "ICT Courses Nanyuki",
    "Media Arts College Kenya",
  ],
  authors: [{ name: "Sir Jay Training Institute", url: "https://sirjay.co.ke" }],
  creator: "Sir Jay Training Institute",
  publisher: "Sir Jay Training Institute",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sir Jay Training Institute | Fashion, ICT & Media Arts",
    description:
      "Empowering minds with hands-on skills in Fashion Design, ICT, Media Arts & Beauty in Nanyuki, Kenya.",
    url: "https://sirjay.co.ke",
    siteName: "Sir Jay Training Institute",
    images: [
      {
        url: "/SirJayLogo.jpeg",
        width: 1200,
        height: 630,
        alt: "Sir Jay Training Institute Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sir Jay Training Institute | Nanyuki, Kenya",
    description:
      "TVETA-registered vocational college offering practical courses in Fashion, ICT, Media & Beauty.",
    images: ["/SirJayLogo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-gold-500/30 selection:text-navy-950"
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
