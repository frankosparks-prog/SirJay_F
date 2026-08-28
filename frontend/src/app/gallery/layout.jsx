export const metadata = {
  title: "Media Gallery & Student Works",
  description:
    "Browse photos and videos of fashion design showcases, ICT workshops, student creations, and campus life at Sir Jay Training Institute.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Media Gallery | Sir Jay Training Institute",
    description:
      "Visual showcase of student projects, fashion collections, and campus facilities in Nanyuki.",
    url: "https://sirjay.co.ke/gallery",
  },
};

export default function GalleryLayout({ children }) {
  return <>{children}</>;
}
