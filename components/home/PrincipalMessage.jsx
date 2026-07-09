"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { Button } from "@/components/ui/button";

import { principal } from "@/constants/principal";

export default function PrincipalMessage() {
  return (
    <section className="section-padding bg-white">
      <Container>

        <SectionHeading
          badge="PRINCIPAL'S MESSAGE"
          title="A Message From"
          highlight="Our Principal"
          description="Leadership, vision and dedication that inspire every student to achieve excellence."
        />

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Image */}

          <div className="relative mx-auto">

            <Image
              src="/images/student.jpeg"
              alt="Principal"
              width={500}
              height={600}
              className="rounded-3xl shadow-2xl"
            />

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-[#0F4C81] px-8 py-4 text-white shadow-xl">

              <h3 className="text-xl font-bold">

                25+ Years

              </h3>

              <p className="text-sm">

                Educational Leadership

              </p>

            </div>

          </div>

          {/* Content */}

          <div>

            <blockquote className="text-3xl font-bold leading-relaxed text-slate-900">

              "{principal.message}"

            </blockquote>

            <div className="mt-10 space-y-4">

              {principal.points.map((point) => (

                <div
                  key={point}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2 className="h-6 w-6 text-[#0F4C81]" />

                  <span className="text-lg">

                    {point}

                  </span>

                </div>

              ))}

            </div>

            <div className="mt-10">

              <h3 className="text-2xl font-bold">

                {principal.name}

              </h3>

              <p className="text-slate-500">

                {principal.designation}

              </p>

            </div>

            <Button
              className="mt-8"
            >

              Read Full Message

            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
}