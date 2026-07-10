import { Eye, Target, CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const visionPoints = [
  "Academic Excellence",
  "Strong Moral Values",
  "Lifelong Learning",
];

const missionPoints = [
  "Student-Centered Education",
  "Safe & Inclusive Environment",
  "Holistic Development",
];

export default function VisionMission() {
  return (
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading
          badge="OUR FOUNDATION"
          title="The Values That"
          highlight="Guide Every Child"
          description="Our vision and mission define the purpose of Dynamic English School and inspire every step of our educational journey."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Vision */}

          <div className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

              <Eye className="h-8 w-8 text-[#0F4C81]" />

            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-5 leading-8 text-slate-600">
              To nurture confident, responsible, and compassionate individuals
              through quality education, innovation, and strong moral values.
            </p>

            <div className="mt-8 space-y-4">

              {visionPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#0F4C81]" />

                  <span className="text-slate-700">
                    {point}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* Mission */}

          <div className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">

              <Target className="h-8 w-8 text-green-700" />

            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Our Mission
            </h3>

            <p className="mt-5 leading-8 text-slate-600">
              To provide a safe, engaging, and inspiring learning environment
              where every student can achieve academic excellence while
              developing leadership, creativity, and character.
            </p>

            <div className="mt-8 space-y-4">

              {missionPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-700" />

                  <span className="text-slate-700">
                    {point}
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