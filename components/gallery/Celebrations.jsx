"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CalendarDays,
  Images,
  ChevronRight,
} from "lucide-react";

const celebrations = [
  {
    id: "independence",
    title: "Independence Day",
    date: "15 August",
    accent: "from-orange-500 to-orange-600",
    photos: [
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
    ],
  },

  {
    id: "republic",
    title: "Republic Day",
    date: "26 January",
    accent: "from-blue-600 to-indigo-700",
    photos: [
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
    ],
  },

  {
    id: "saraswati",
    title: "Saraswati Puja",
    date: "Vasant Panchami",
    accent: "from-amber-500 to-yellow-500",
    photos: [
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
      "/images/gallery/hero-school.jpeg",
    ],
  },
];

export default function Celebrations() {
  return (
    <section className="bg-[#F8F6F1] py-24">

      <Container>

        {/* Heading */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">

              School Celebrations

            </span>

            <h2 className="mt-5 text-5xl font-black leading-none text-slate-900 md:text-6xl">

              Moments
              <br />

              Worth
              <br />

              Remembering.

            </h2>

          </div>

          <p className="max-w-xl text-lg leading-8 text-slate-600">

            Every celebration reflects the spirit,
            culture and happiness of our students.
            Explore some of the most memorable
            occasions celebrated at Dynamic English School.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 space-y-16">

          {celebrations.map((item, index) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-[40px] bg-white shadow-lg transition duration-500 hover:shadow-2xl"
            >

              <div className="grid lg:grid-cols-12">

                {/* IMAGE */}

                <div
                  className={`relative ${
                    index % 2 === 0
                      ? "lg:col-span-7"
                      : "lg:order-2 lg:col-span-7"
                  }`}
                >

                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    className="group h-full"
                  >

                    <CarouselContent>

                      {item.photos.map((photo, photoIndex) => (

                        <CarouselItem key={photoIndex}>

                          <div className="relative h-[340px] lg:h-[480px]">

                            <Image
                              src={photo}
                              alt={`${item.title} ${photoIndex + 1}`}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Counter */}

                            <div className="absolute right-6 top-6 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">

                              {photoIndex + 1} / {item.photos.length}

                            </div>

                          </div>

                        </CarouselItem>

                      ))}

                    </CarouselContent>

                    <CarouselPrevious
                      className="left-5 h-12 w-12 border-none bg-white/90 shadow-xl backdrop-blur-md"
                    />

                    <CarouselNext
                      className="right-5 h-12 w-12 border-none bg-white/90 shadow-xl backdrop-blur-md"
                    />

                  </Carousel>

                </div>

                {/* CONTENT */}

                <div
                  className={`flex flex-col justify-center p-12 ${
                    index % 2 === 0
                      ? "lg:col-span-5"
                      : "lg:order-1 lg:col-span-5"
                  }`}
                >

                  <div
                    className={`mb-8 h-2 w-20 rounded-full bg-gradient-to-r ${item.accent}`}
                  />


                                    <h3 className="text-4xl font-black leading-tight text-slate-900">

                    {item.title}

                  </h3>

                  <div className="mt-8 flex flex-wrap gap-6 text-slate-500">

                    <span className="inline-flex items-center gap-2">

                      <CalendarDays className="h-5 w-5" />

                      {item.date}

                    </span>

                    <span className="inline-flex items-center gap-2">

                      <Images className="h-5 w-5" />

                      {item.photos.length}{" "}
                      {item.photos.length === 1 ? "Photo" : "Photos"}

                    </span>

                  </div>

                  <p className="mt-8 text-lg leading-8 text-slate-600">

                    Browse beautiful memories from {item.title}. Every
                    photograph reflects the enthusiasm, participation and joyful
                    spirit of our students during this special celebration.

                  </p>

                  {/* Thumbnail Stack */}

                  <div className="mt-10 flex items-center">

                    {item.photos.map((photo, thumbIndex) => (

                      <div
                        key={thumbIndex}
                        className="-ml-4 first:ml-0 relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg"
                      >

                        <Image
                          src={photo}
                          alt={`${item.title} thumbnail ${thumbIndex + 1}`}
                          fill
                          className="object-cover"
                        />

                      </div>

                    ))}

                  </div>

                  {/* Explore */}

                  <button
                    className="group mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-slate-900 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:gap-5"
                  >

                    Explore Collection

                    <ChevronRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      size={18}
                    />

                  </button>

                </div>

              </div>

            </div>

                      ))}

        </div>

        {/* ===========================================
            Closing Banner
        ============================================ */}

        <div className="relative mt-28 overflow-hidden rounded-[40px]">

          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />

          {/* Decorative Blurs */}

          <div className="absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20">

            <div className="grid items-center gap-12 lg:grid-cols-12">

              {/* Left */}

              <div className="lg:col-span-8">

                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.3em] text-blue-200 backdrop-blur-md">

                  Dynamic English School

                </span>

                <h3 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl">

                  Every Celebration
                  <br />

                  Creates A Story
                  <br />

                  Worth Remembering.

                </h3>

                <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">

                  From patriotic celebrations to cultural festivals,
                  every event strengthens friendships, builds confidence
                  and creates lifelong memories for our students.

                </p>

              </div>

              {/* Right */}

              <div className="flex justify-start lg:col-span-4 lg:justify-end">

                <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                  <div className="text-center">

                    <h4 className="text-5xl font-black text-white">

                      {celebrations.reduce(
                        (total, item) => total + item.photos.length,
                        0
                      )}

                    </h4>

                    <p className="mt-3 uppercase tracking-[0.25em] text-slate-300">

                      Total Gallery Photos

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
              </Container>
    </section>
  );
}