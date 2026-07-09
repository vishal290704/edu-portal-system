"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { aboutFeatures } from "@/constants/about";

export default function About() {
  return (
    <section className="section-padding bg-slate-50">
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT IMAGE */}

          <div className="relative">

            <Image
              src="/images/about-school.jpg"
              alt="School Building"
              width={650}
              height={700}
              className="rounded-3xl object-cover shadow-2xl"
            />

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-[#0F4C81] px-8 py-6 text-white shadow-2xl">

              <h2 className="text-4xl font-bold">
                25+
              </h2>

              <p className="mt-2">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div>

            <SectionHeading
              badge="ABOUT OUR SCHOOL"
              title="Discover"
              highlight="Dynamic English School"
              description="Dynamic English School provides an inspiring learning environment that nurtures creativity, discipline, leadership, and academic excellence."
              align="left"
            />

            <div className="space-y-5">

              {aboutFeatures.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3"
                >

                  <CheckCircle2 className="mt-1 h-6 w-6 text-[#0F4C81]" />

                  <p className="text-lg text-slate-600">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}