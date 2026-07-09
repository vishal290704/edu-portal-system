import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import About from "@/components/home/About";
import Programs from "@/components/home/Programs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <About />
      <Programs />
    </>
  );
}