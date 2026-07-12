import PageHero from "@/components/common/PageHero";
import AcademicOverview from "@/components/academics/AcademicOverview";
import AcademicPrograms from "@/components/academics/AcademicPrograms";
import StudentLife from "@/components/academics/StudentLife";
import AdmissionCTA from "@/components/home/AdmissionCTA";
import Footer from "@/components/layout/Footer";

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
        image={"/images/hero-school.jpeg"}
        subtitle="Building Strong Foundations for Lifelong Learning"
        backgroundImage="/images/academics/hero.jpg"
        breadcrumb={"Academics"}
      />

      <AcademicOverview />
      <AcademicPrograms/>
      <StudentLife/>
      <AdmissionCTA/>
    </>
  );
}