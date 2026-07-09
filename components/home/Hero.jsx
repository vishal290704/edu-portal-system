"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "../layout/Container";
import { stats } from "@/constants/stats";
import AnimatedCounter from "../shared/AnimatedCounter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Container className="grid min-h-[85vh] items-center gap-16 py-16 lg:grid-cols-2">
        {/* Left */}

        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#0F4C81]">
            🎓 Admissions Open 2026–27
          </span>

          <h1 className="heading-font mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
            Nurturing Minds,
            <span className="block text-[#0F4C81]">Building Futures</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Dynamic English School provides quality education, modern
            classrooms, experienced teachers, and a safe environment that
            empowers every student to succeed.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg">Apply Now</Button>

            <Button variant="outline" size="lg">
              Explore Campus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <h2 className="text-4xl font-bold text-[#0F4C81]">
                  <AnimatedCounter end={item.end} suffix={item.suffix} />
                </h2>

                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}

        <div className="relative">
          <Image
            src="/images/hero-school.jpeg"
            alt="School Building"
            width={700}
            height={700}
            priority
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
