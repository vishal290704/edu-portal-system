import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, MapPinned } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 lg:py-28">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">

        {/* Breadcrumb */}

        <div className="mb-6 flex items-center text-sm text-slate-600">

          <Link
            href="/"
            className="transition hover:text-primary"
          >
            Home
          </Link>

          <ChevronRight className="mx-2 h-4 w-4" />

          <span className="font-medium text-primary">
            Contact
          </span>

        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
              We'd Love To Hear From You
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Let's Connect
              <span className="block text-primary">
                With Dynamic English School
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Whether you're looking for admissions, have questions about our
              programs, or want to visit our campus, we're here to help. Reach
              out to us and our team will be happy to assist you.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="tel:+919653087078"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Phone size={18} />
                Call Now
              </Link>

              <Link
                href="#contact-info"
                className="inline-flex items-center gap-2 rounded-xl border border-primary px-7 py-4 font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                <MapPinned size={18} />
                Get Directions
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="overflow-hidden rounded-[32px] shadow-2xl">

              <Image
                src="/images/hero-school.jpeg"
                alt="Dynamic English School"
                width={700}
                height={550}
                priority
                className="h-full w-full object-cover"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur">

              <div className="grid grid-cols-2 gap-6 text-center">

                <div>

                  <h3 className="text-3xl font-bold text-primary">
                    25+
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Years of Excellence
                  </p>

                </div>

                <div>

                  <h3 className="text-3xl font-bold text-primary">
                    500+
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Happy Students
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}