import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import About from "@/components/home/About";
import Programs from "@/components/home/Programs";
import Facilities from "@/components/home/Facilities";
import Statistics from "@/components/home/Statistics";
import Leadership from "@/components/home/Leadership";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <About />
      <Programs />
      <Facilities />
      <Statistics />
      <Leadership />
    </>
  );
}