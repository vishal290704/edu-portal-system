"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";
import { features } from "@/constants/features";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <Container>

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0F4C81]">
            WHY CHOOSE US
          </span>

          <h2 className="heading-font mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Why Parents Trust
            <span className="block text-[#0F4C81]">
              Dynamic English School
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            We combine academic excellence, modern infrastructure,
            experienced educators, and holistic development to prepare
            students for a successful future.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#0F4C81] hover:shadow-xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition-all group-hover:bg-[#0F4C81]">

                  <Icon className="h-8 w-8 text-[#0F4C81] transition-all group-hover:text-white" />

                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-600">
                  {feature.description}
                </p>

              </motion.div>

            );
          })}

        </div>

      </Container>
    </section>
  );
}