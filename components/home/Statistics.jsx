"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";

import { statistics } from "@/constants/statistics";

export default function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="section-padding bg-[#0F4C81] text-white"
    >
      <Container>

        <SectionHeading
          badge="OUR ACHIEVEMENTS"
          title="Building Bright"
          highlight="Futures Every Day"
          description="Our commitment to quality education has helped thousands of students achieve academic excellence."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {statistics.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-sm"
              >

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">

                  <Icon className="h-8 w-8" />

                </div>

                <h2 className="text-5xl font-bold">

                  {inView && (
                    <CountUp
                      end={item.value}
                      duration={2}
                      suffix={item.suffix}
                    />
                  )}

                </h2>

                <p className="mt-3 text-white/80">

                  {item.title}

                </p>

              </div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}