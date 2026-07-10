import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const highlights = [
  "Quality Education",
  "Experienced & Caring Teachers",
  "Safe & Secure Campus",
  "Holistic Student Development",
];

export default function SchoolStory() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Image */}

          <div className="relative">

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/hero-school.jpg"
                alt="Dynamic English School"
                width={700}
                height={800}
                className="h-full w-full object-cover"
              />

            </div>

            {/* Floating Badge */}

            <div className="absolute -bottom-8 left-8 rounded-2xl bg-[#0F4C81] px-8 py-5 text-white shadow-2xl">

              <p className="text-3xl font-bold">

                25+

              </p>

              <p className="text-sm text-slate-200">

                Years of Excellence

              </p>

            </div>

          </div>

          {/* Right Content */}

          <div>

            <SectionHeading
              align="left"
              badge="OUR STORY"
              title="More Than a School,"
              highlight="A Place Where Futures Begin."
              description=""
            />

            <p className="mt-6 leading-8 text-slate-600">

              Dynamic English School was established with a vision of providing
              quality education that nurtures knowledge, discipline, creativity,
              and character. We believe every child has unique potential, and
              our goal is to create an environment where students can learn,
              grow, and become confident individuals ready to contribute to
              society.

            </p>

            <p className="mt-6 leading-8 text-slate-600">

              Through modern teaching practices, experienced educators, smart
              classrooms, and value-based learning, we strive to prepare our
              students not only for academic success but also for lifelong
              learning and responsible citizenship.

            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {highlights.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2 className="h-6 w-6 text-[#0F4C81]" />

                  <span className="font-medium text-slate-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}