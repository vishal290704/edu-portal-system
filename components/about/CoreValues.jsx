import {
  Star,
  Handshake,
  BookOpen,
  Heart,
  Lightbulb,
  Globe,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const values = [
  {
    icon: Star,
    title: "Excellence",
    description: "Striving for the highest standards in learning and character.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Handshake,
    title: "Respect",
    description: "Treating everyone with kindness, dignity and empathy.",
    color: "bg-blue-100 text-[#0F4C81]",
  },
  {
    icon: BookOpen,
    title: "Discipline",
    description: "Building responsibility, consistency and self-control.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Creating a caring environment where everyone belongs.",
    color: "bg-red-100 text-red-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Encouraging creativity, curiosity and critical thinking.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Globe,
    title: "Responsibility",
    description: "Preparing students to contribute positively to society.",
    color: "bg-green-100 text-green-600",
  },
];

export default function CoreValues() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="CORE VALUES"
          title="Principles That"
          highlight="Shape Every Student"
          description="Our values inspire students to become responsible, confident and compassionate individuals."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0F4C81]/30 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${value.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}