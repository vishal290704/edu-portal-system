"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { Button } from "@/components/ui/button";

import { aboutFeatures } from "@/constants/about";

export default function About() {
  return (
    <section className="section-padding bg-slate-50 pt-5">
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative">

            <Image
              src="/images/student-1.jpeg"
              alt="School"
              width={650}
              height={700}
              className="rounded-3xl shadow-2xl object-cover"
            />

            <div className="absolute -bottom-8 -left-8 rounded-3xl bg-[#0F4C81] px-8 py-6 text-white shadow-2xl">

              <h2 className="text-4xl font-bold">

                18+

              </h2>

              <p className="mt-2">

                Years of Excellence

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <SectionHeading
              badge="ABOUT OUR SCHOOL"
              title="Discover"
              highlight="Dynamic English School"
              description="Dynamic English School is committed to providing quality education that nurtures academic excellence, leadership, creativity, discipline, and character."
              align="left"
            />

            <div className="space-y-5">

              {aboutFeatures.map((feature) => (

                <div
                  key={feature}
                  className="flex items-start gap-4"
                >

                  <CheckCircle2 className="mt-1 h-6 w-6 text-[#0F4C81]" />

                  <p className="text-lg text-slate-600">

                    {feature}

                  </p>

                </div>

              ))}

            </div>

            <Button
              size="lg"
              className="mt-10"
            >

              Learn More

            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
}