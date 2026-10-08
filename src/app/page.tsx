import { couple, site, venue, weddingDate } from "@/data/wedding";
import { getSitePhotos } from "@/lib/photos";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { OurStory } from "@/components/story/OurStory";
import { GalleryProvider } from "@/components/gallery/GalleryProvider";
import { PreWeddingJourney } from "@/components/gallery/PreWeddingJourney";
import { EventsTimeline } from "@/components/events/EventsTimeline";
import { Countdown } from "@/components/countdown/Countdown";
import { Venue } from "@/components/venue/Venue";
import { FinalQuote } from "@/components/quote/FinalQuote";

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
  const { traditional, pottery } = photos.chapters;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <GalleryProvider>
        <main>
          <Hero poster={photos.hero[0]} />
          <OurStory photo={traditional[1] ?? traditional[0] ?? pottery[0]} />
          <EventsTimeline />
          <Venue />
          <PreWeddingJourney chapters={photos.chapters} />
          <FinalQuote />
          <Countdown />
        </main>
      </GalleryProvider>
      <Footer />
    </>
  );
}
