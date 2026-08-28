export const metadata = {
  title: "Events & Workshops",
  description:
    "Upcoming fashion shows, ICT bootcamps, workshops, and campus events at Sir Jay Training Institute Nanyuki.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Workshops | Sir Jay Training Institute",
    description:
      "Stay updated with fashion exhibitions, career fairs, and technical workshops at Sir Jay.",
    url: "https://sirjay.co.ke/events",
  },
};

export default function EventsLayout({ children }) {
  return <>{children}</>;
}
