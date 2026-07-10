import PageHero from "@/components/common/PageHero";
import SchoolStory from "@/components/about/SchoolStory";
import VisionMission from "@/components/about/VisionMission";
import CoreValues from "@/components/about/CoreValues";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Dynamic English School"
        subtitle="Empowering young minds through quality education, strong values, and holistic development since our establishment."
        image="/images/hero-school.jpg"
        breadcrumb="About"
      />

      <SchoolStory />

      <VisionMission />
      <CoreValues/>
    </>
  );
}