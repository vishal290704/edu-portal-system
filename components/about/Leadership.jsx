import Image from "next/image";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

export default function Leadership() {
  return (
    <section className="section-padding bg-amber-50 to-white">
      <Container>
        <SectionHeading
          badge="OUR LEADERSHIP"
          title="Guiding Every Student"
          highlight="Towards Excellence"
          description="Our leadership team is committed to nurturing academic excellence, strong values, and holistic development for every student."
        />

        {/* Founder */}

        <div
          className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-yellow-100 p-8 shadow-lg lg:p-12"
        >
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="relative">
              <Image
                src="/images/student-1.jpeg"
                alt="Late Avinash Srivastava"
                width={240}
                height={300}
                className="rounded-2xl object-cover shadow-xl"
              />

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0F4C81] px-5 py-2 text-xs font-semibold tracking-wider text-white">
               DIRECTOR
              </div>
            </div>

            <div className="flex-1">
              <p className="font-semibold uppercase tracking-[0.3em] text-[#0F4C81]">
                ★ Founder & Director ★
              </p>

              <h3 className="mt-3 text-4xl font-bold text-slate-900">
                Mr. Dilip Kumar Srivastava
              </h3>

              <div className="mt-6 h-1 w-20 rounded-full bg-[#0F4C81]" />

              <p className="mt-8 leading-8 text-slate-600">
                 Providing strategic leadership while ensuring every child
                receives quality education in an environment that promotes
                innovation, discipline, and holistic development.
              </p>
            </div>
          </div>
        </div>

        {/* Director & Principal */}

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Director */}

          <div className="rounded-3xl border border-slate-200 bg-yellow-100 p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <Image
              src="/images/student-1.jpeg"
              alt="Director"
              width={170}
              height={170}
              className="mx-auto rounded-full object-cover shadow-lg"
            />

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F4C81]">
               ★ Founding Principal ★
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Late Avinash Srivastava
              </h3>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#0F4C81]" />

              <p className="mt-6 leading-8 text-slate-600">
               
                Late Avinash Srivastava laid the foundation of Dynamic English
                School with a vision of providing quality education rooted in
                discipline, knowledge, and strong moral values. His dedication
                continues to inspire generations of students, teachers, and the
                entire school community.
              </p>
            </div>
          </div>

          {/* Principal */}

          <div className="rounded-3xl border border-slate-200 bg-yellow-100 p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <Image
              src="/images/student-1.jpeg"
              alt="Principal"
              width={170}
              height={170}
              className="mx-auto rounded-full object-cover shadow-lg"
            />

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F4C81]">
               ★ Principal ★
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Mrs. Madhu Pal
              </h3>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#0F4C81]" />

              <p className="mt-6 leading-8 text-slate-600">
                Dedicated to creating a nurturing learning environment where
                students grow academically, socially, and morally while
                developing confidence and lifelong learning skills.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
