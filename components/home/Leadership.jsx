"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";
import { Button } from "@/components/ui/button";

import { leadership } from "@/constants/leadership";

export default function Leadership() {
  const foundingPrincipal = leadership.find(
    (person) => person.isLegacy
  );

  const currentLeaders = leadership.filter(
    (person) => !person.isLegacy
  );

  return (
    <section className="section-padding bg-white pt-5 pb-5">
      <Container>
        <SectionHeading
          badge="LEGACY & LEADERSHIP"
          title="The People Behind"
          highlight="Dynamic English School"
          description="Honoring the vision that built our school and the leadership that continues to inspire generations of students."
        />

        {/* Founding Principal */}

        <div className="mx-auto mb-16 max-w-2xl">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm transition hover:shadow-xl">

            <div className="mb-6 flex justify-center">
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                ⭐ Founding Principal
              </span>
            </div>

            <div className="flex flex-col items-center text-center">

              <Image
                src={foundingPrincipal.image}
                alt={foundingPrincipal.name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />

              <h3 className="mt-6 text-3xl font-bold">
                {foundingPrincipal.name}
              </h3>

              <p className="mt-2 font-semibold text-[#0F4C81]">
                {foundingPrincipal.designation}
              </p>

              <blockquote className="mt-6 max-w-xl italic leading-8 text-slate-600">
                "{foundingPrincipal.message}"
              </blockquote>

              <Button
                variant="ghost"
                className="mt-8 text-[#0F4C81]"
              >
                {foundingPrincipal.button}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
          </div>
        </div>

        {/* Director & Principal */}

        <div className="grid gap-8 lg:grid-cols-2">

          {currentLeaders.map((person) => (

            <div
              key={person.designation}
              className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-xl"
            >
              <div className="flex items-center gap-5">

                <Image
                  src={person.image}
                  alt={person.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />

                <div>

                  <h3 className="text-2xl font-bold">
                    {person.name}
                  </h3>

                  <p className="mt-1 font-semibold text-[#0F4C81]">
                    {person.designation}
                  </p>

                </div>

              </div>

              <blockquote className="mt-6 border-l-4 border-[#0F4C81] pl-5 italic leading-8 text-slate-600">
                "{person.message}"
              </blockquote>

              <Button
                variant="ghost"
                className="mt-6 px-0 text-[#0F4C81]"
              >
                {person.button}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}