import PageHero from "@/components/common/PageHero";
import AcademicOverview from "@/components/academics/AcademicOverview";
import AcademicPrograms from "@/components/academics/AcademicPrograms";

export const metadata = {
  title: "Academics | Dynamic English School",
  description:
    "Explore the academic programs, teaching methodology, learning environment, and co-curricular activities at Dynamic English School.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        subtitle="Building Strong Foundations for Lifelong Learning"
        backgroundImage="/images/academics/hero.jpg"
      />

      <AcademicOverview />
      <AcademicPrograms/>
    </>
  );
}