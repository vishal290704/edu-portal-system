import PageHero from "@/components/common/PageHero";
import EventsStory from "@/components/events/EventsStory";
import FeaturedEvents from "@/components/events/FeaturedEvents";


export const metadata = {
  title: "Events | Dynamic English School",
  description:
    "Explore the celebrations, cultural activities, and memorable moments at Dynamic English School.",
};

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
      <EventsStory/>
    </>
  );
}