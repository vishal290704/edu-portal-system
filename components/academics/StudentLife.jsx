import {
  Music,
  MonitorSmartphone,
  Camera,
  Laptop,
  Palette,
  Trophy,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const activities = [
  {
    title: "Dance & Music",
    icon: Music,
    description:
      "Students express creativity and confidence through dance and music activities.",
  },
  {
    title: "Smart Classrooms",
    icon: MonitorSmartphone,
    description:
      "Technology-enabled classrooms make learning interactive and engaging.",
  },
  {
    title: "Computer Lab",
    icon: Laptop,
    description:
      "Hands-on computer education helps students build essential digital skills.",
  },
  {
    title: "Safe Campus",
    icon: Camera,
    description:
      "CCTV surveillance and a secure environment ensure students' safety.",
  },
  {
    title: "Art & Creativity",
    icon: Palette,
    description:
      "Creative activities encourage imagination, innovation, and self-expression.",
  },
  {
    title: "Cultural Activities",
    icon: Trophy,
    description:
      "Students actively participate in celebrations like Independence Day, Republic Day, and other school events.",
  },
];

export default function StudentLife() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Student Life Beyond Academics"
          subtitle="Education extends beyond the classroom. We encourage every student to participate in activities that foster creativity, confidence, teamwork, and leadership."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {activity.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}