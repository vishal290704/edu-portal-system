import PageHero from "@/components/common/PageHero";
import CTA from "@/components/common/CTA";

import EventsStory from "@/components/events/EventsStory";
import MemoriesGallery from "@/components/events/MemoriesGallery";
import AdmissionCTA from "@/components/home/AdmissionCTA";
import FeaturedEvents from "@/components/events/FeaturedEvents";

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events"
        subtitle="Celebrating Learning, Culture & Togetherness"
        image="/images/hero-school.jpeg"
        breadcrumb={"Events"}
      />

        <FeaturedEvents/>
      <EventsStory />

      <MemoriesGallery />

      <AdmissionCTA />
    </>
  );
}