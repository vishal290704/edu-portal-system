"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { Camera } from "lucide-react";

export default function LifeAtDynamic() {
  return (
    <section className="bg-white py-24">

      <Container>

        <div className="grid gap-16 lg:grid-cols-12">

          {/* Left */}

          <div className="lg:col-span-4 flex flex-col justify-center">

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">

              <Camera size={16} />

              Gallery

            </span>

            <h2 className="mt-8 text-6xl font-black leading-[0.9] text-slate-900">

              Every
              <br />

              Picture
              <br />

              Has A
              <br />

              Story.

            </h2>

            <div className="mt-10 h-1 w-20 rounded-full bg-amber-500" />

            <p className="mt-10 text-lg leading-9 text-slate-600">

              Explore unforgettable moments from classrooms,
              celebrations, cultural activities and everyday life
              at Dynamic English School.

            </p>

          </div>

          {/* Right */}

          <div className="lg:col-span-8">

            <div className="group relative overflow-hidden rounded-[40px]">

              <div className="relative h-[680px]">

                <Image
                  src="/images/gallery/featured.jpg"
                  alt="Dynamic English School"
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>

                <div className="absolute bottom-10 left-10">

                  <div className="rounded-[28px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

                    <span className="text-sm uppercase tracking-[0.3em] text-blue-100">

                      Dynamic English School

                    </span>

                    <h3 className="mt-5 text-5xl font-black leading-tight text-white">

                      Learning.
                      <br />

                      Celebrating.
                      <br />

                      Growing.

                    </h3>

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