import AdmissionHero from "@/components/admissions/AdmissionHero";
import AdmissionInfo from "@/components/admissions/AdmissionInfo";
import FeeStructure from "@/components/admissions/FeeStructure";


export const metadata = {
  title: "Admissions | Dynamic English School",
  description:
    "Learn about the admission process, fee structure, required documents, and join Dynamic English School.",
};

export default function AdmissionsPage() {
  return (
    <main className="overflow-hidden">
      <AdmissionHero />
      <AdmissionInfo/>
      <FeeStructure/>
   
    </main>
  );
}