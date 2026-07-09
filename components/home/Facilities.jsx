"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { facilities } from "@/constants/facilities";

export default function Facilities() {
  return (
    <section className="section-padding bg-slate-50 pt-5 pb-5">
      <Container>

        <SectionHeading
          badge="CAMPUS & FACILITIES"
          title="Everything Your Child Needs"
          highlight="For Better Learning"
          description="Our school provides a safe, modern and engaging environment where students learn, grow and develop with confidence."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {facilities.map((facility, index) => {

            const Icon = facility.icon;

            return (

              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-2xl"
              >

                {/* IMAGE */}

                <div className="relative h-56 overflow-hidden">

                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Gradient */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Floating Icon */}

                  <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl">

                    <Icon className="h-7 w-7 text-[#0F4C81]" />

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h3 className="text-xl font-bold">

                    {facility.title}

                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">

                    {facility.description}

                  </p>

                  <button
                    className="mt-6 flex items-center gap-2 font-semibold text-[#0F4C81]"
                  >

                    Learn More

                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-2"
                    />

                  </button>

                </div>

              </motion.div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}