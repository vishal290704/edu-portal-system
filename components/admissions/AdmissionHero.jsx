import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AdmissionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 lg:py-28">
      {/* Decorative Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Breadcrumb */}

        <div className="mb-6 flex items-center text-sm text-slate-600">

          <Link
            href="/"
            className="hover:text-primary transition"
          >
            Home
          </Link>

          <ChevronRight className="mx-2 h-4 w-4" />

          <span className="font-medium text-primary">
            Admissions
          </span>

        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
              Admissions Open
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">

              Begin Your Child's Journey

              <span className="block text-primary">
                Towards Excellence
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

              Give your child the foundation for a bright future through quality
              education, experienced teachers, modern classrooms, and a caring
              environment where every child can learn, grow, and succeed.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="rounded-xl bg-primary px-7 py-4 font-semibold text-white transition hover:scale-105 hover:shadow-xl"
              >
                Apply Now
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-primary px-7 py-4 font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/admissions/hero.jpg"
                alt="Admissions"
                width={700}
                height={550}
                className="h-full w-full object-cover"
                priority
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">

              <p className="text-3xl font-bold text-primary">
                Admissions
              </p>

              <span className="text-slate-500">
                Open for 2026-27
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}