"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  GraduationCap,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    designation: "Principal",
    qualification: "M.Ed., Ph.D.",
    experience: "22+ Years Experience",
    image: "/images/faculty/faculty-1.jpg",
    email: "principal@dynamicschool.edu",
  },
  {
    id: 2,
    name: "Anita Verma",
    designation: "Senior Mathematics Teacher",
    qualification: "M.Sc., B.Ed.",
    experience: "15+ Years Experience",
    image: "/images/faculty/faculty-2.jpg",
    email: "anita@dynamicschool.edu",
  },
  {
    id: 3,
    name: "Rohit Singh",
    designation: "Science Teacher",
    qualification: "M.Sc. Physics",
    experience: "12+ Years Experience",
    image: "/images/faculty/faculty-3.jpg",
    email: "rohit@dynamicschool.edu",
  },
  {
    id: 4,
    name: "Priya Gupta",
    designation: "English Teacher",
    qualification: "M.A. English",
    experience: "10+ Years Experience",
    image: "/images/faculty/faculty-4.jpg",
    email: "priya@dynamicschool.edu",
  },
  {
    id: 5,
    name: "Amit Tiwari",
    designation: "Computer Teacher",
    qualification: "MCA",
    experience: "8+ Years Experience",
    image: "/images/faculty/faculty-5.jpg",
    email: "amit@dynamicschool.edu",
  },
  {
    id: 6,
    name: "Neha Srivastava",
    designation: "Primary Coordinator",
    qualification: "M.Ed.",
    experience: "14+ Years Experience",
    image: "/images/faculty/faculty-6.jpg",
    email: "neha@dynamicschool.edu",
  },
];

export default function FacultySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <Container>

        <SectionHeading
          badge="Our Faculty"
          title="Meet Our Dedicated Teachers"
          description="Our experienced educators inspire students through knowledge, innovation, discipline and personal guidance."
        />

        <div className="relative mt-16">

          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110 lg:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110 lg:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="overflow-hidden px-2 lg:px-16"
            ref={emblaRef}
          >
            <div className="flex">

              {facultyMembers.map((member, index) => {
                const active = index === selectedIndex;

                return (
                  <div
                    key={member.id}
                    className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] xl:flex-[0_0_33.333%]"
                  >
                    <div
                      className={`group h-full overflow-hidden rounded-3xl border bg-white transition-all duration-500
                      ${
                        active
                          ? "scale-100 border-blue-600 shadow-2xl"
                          : "scale-95 border-slate-200 shadow-md opacity-80"
                      }`}
                    >

                      <div className="relative h-80 overflow-hidden">

                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                            {member.designation}
                          </span>
                        </div>

                      </div>

                      <div className="space-y-4 p-7">

                        <h3 className="text-2xl font-bold text-slate-900">
                          {member.name}
                        </h3>

                        <div className="flex items-center gap-2 text-slate-600">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                          <span>{member.qualification}</span>
                        </div>

                        <p className="text-slate-500">
                          {member.experience}
                        </p>

                        <div className="flex items-center gap-2 text-blue-600">
                          <Mail className="h-5 w-5" />
                          <span className="text-sm break-all">
                            {member.email}
                          </span>
                        </div>
                                              </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">

            <button
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

          </div>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-3">

            {facultyMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "w-10 bg-blue-600"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}

          </div>

        </div>

        {/* Bottom Content */}

        <div className="mt-20 grid gap-8 rounded-3xl bg-white p-8 shadow-xl lg:grid-cols-3">

          <div className="rounded-2xl bg-slate-50 p-6">
            <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>

            <h4 className="mb-3 text-xl font-bold text-slate-900">
              Qualified Educators
            </h4>

            <p className="leading-7 text-slate-600">
              Every teacher possesses strong academic qualifications along
              with years of classroom experience to ensure quality education
              and holistic development.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <div className="mb-4 inline-flex rounded-full bg-green-100 p-3">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>

            <h4 className="mb-3 text-xl font-bold text-slate-900">
              Student-Centered Learning
            </h4>

            <p className="leading-7 text-slate-600">
              Our faculty believes every child learns differently. Lessons are
              designed to encourage creativity, confidence, participation and
              practical understanding.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <GraduationCap className="h-6 w-6 text-amber-600" />
            </div>

            <h4 className="mb-3 text-xl font-bold text-slate-900">
              Continuous Growth
            </h4>

            <p className="leading-7 text-slate-600">
              Our teachers regularly participate in workshops and professional
              development programs to bring innovative teaching practices into
              every classroom.
            </p>
          </div>

        </div>
              </Container>
    </section>
  );
}