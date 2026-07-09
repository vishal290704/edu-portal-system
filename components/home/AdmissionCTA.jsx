"use client";

import Link from "next/link";
import { ArrowRight, Phone, MapPin } from "lucide-react";

import Container from "../layout/Container";
import { Button } from "@/components/ui/button";

export default function AdmissionCTA() {
  return (
    <section className="section-padding bg-[#0F4C81] text-white">
      <Container>

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            ADMISSIONS OPEN • 2026–27
          </span>

          <h2 className="mt-8 text-4xl font-bold md:text-5xl">
            Give Your Child the Best Start
            <br />
            to a Bright Future
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Join Dynamic English School and become a part of an
            inspiring learning environment that nurtures academic
            excellence, discipline, creativity, and character.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link href="/admissions">
              <Button
                size="lg"
                className="bg-white text-[#0F4C81] hover:bg-slate-100"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0F4C81]"
              >
                Contact Us
              </Button>
            </Link>

          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">

            <div className="flex items-center gap-2">

              <Phone className="h-5 w-5" />

              <span>+91 98765 43210</span>

            </div>

            <div className="hidden h-5 w-px bg-white/30 md:block" />

            <div className="flex items-center gap-2">

              <MapPin className="h-5 w-5" />

              <span>Dynamic English School, Ghaziabad</span>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}