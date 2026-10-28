import { couple, site, venue, weddingDate } from "@/data/wedding";
import { getSitePhotos } from "@/lib/photos";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ScrollCue } from "@/components/hero/ScrollCue";
import { Invitation } from "@/components/invitation/Invitation";
import { Couple } from "@/components/couple/Couple";
import { Teaser } from "@/components/teaser/Teaser";
import { Celebrations } from "@/components/events/Celebrations";
import { GalleryProvider } from "@/components/gallery/GalleryProvider";
import { QuoteGallery } from "@/components/gallery/QuoteGallery";
import { Countdown } from "@/components/countdown/Countdown";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `Wedding of ${couple.names}`,
  description: site.description,
  startDate: weddingDate.ceremonyISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: venue.name,
    address: venue.address,
    hasMap: venue.mapsUrl,
  },
};

export default function Home() {
  const photos = getSitePhotos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <GalleryProvider>
        <main className="overflow-x-clip">
          <Hero photos={photos.hero} />
          <ScrollCue />
          <Invitation photos={photos.invitation} />
          <Couple bride={photos.bride} groom={photos.groom} />
          <Teaser />
          <Celebrations />
          <QuoteGallery photos={photos.gallery} />
          <Countdown />
        </main>
      </GalleryProvider>
      <Footer />
    </>
  );
}
