"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";
import { features } from "@/constants/features";
import SectionHeading from "../layout/SectionHeading";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white pt-3">
      <Container>

        {/* Heading */}

        <SectionHeading
  badge="WHY CHOOSE US"
  title="Why Parents Trust"
  highlight="Dynamic English School"
  description="We combine academic excellence, modern infrastructure, experienced educators, and holistic development to prepare students for a successful future."
/>

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