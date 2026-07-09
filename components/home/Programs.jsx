"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { programs } from "@/constants/programs";

export default function Programs() {
  return (
    <section className="section-padding bg-white pt-5">
      <Container>

        <SectionHeading
          badge="ACADEMICS"
          title="Learning For"
          highlight="Every Stage"
          description="Our curriculum is designed to inspire curiosity, critical thinking, creativity, and lifelong learning at every stage of education."
        />

        <div className="grid gap-8 lg:grid-cols-4">

          {programs.map((program, index) => {

            const Icon = program.icon;

            return (

              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-[#0F4C81]">

                  <Icon className="h-8 w-8 text-[#0F4C81] group-hover:text-white" />

                </div>

                <h3 className="mb-4 text-2xl font-bold">

                  {program.title}

                </h3>

                <p className="leading-7 text-slate-600">

                  {program.description}

                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-[#0F4C81]">

                  Learn More

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />

                </div>

              </motion.div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}