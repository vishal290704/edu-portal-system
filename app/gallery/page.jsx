import PageHero from "@/components/common/PageHero";
import Celebrations from "@/components/gallery/Celebrations";
import LifeAtDynamic from "@/components/gallery/LifeAtDynamic";



export const metadata = {
  title: "Gallery | Dynamic English School",
  description:
    "Explore life at Dynamic English School through our classrooms, campus, celebrations, and memorable student moments.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Capturing Every Smile, Celebration & Achievement"
        image="/images/hero-school.jpeg"
        breadcrumb={"Gallery"}
      />
      <LifeAtDynamic/>
      <Celebrations/>
     
    </>
  );
}