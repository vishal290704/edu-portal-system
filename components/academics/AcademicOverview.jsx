import { GraduationCap, BookOpen, Users, HeartHandshake } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const highlights = [
  {
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "A balanced curriculum designed to strengthen academic excellence while nurturing creativity and curiosity.",
  },
  {
    icon: BookOpen,
    title: "Modern Learning",
    description:
      "Interactive teaching methods supported by smart classrooms and digital learning resources.",
  },
  {
    icon: Users,
    title: "Experienced Teachers",
    description:
      "Dedicated educators who provide personal attention and encourage every child to reach their potential.",
  },
  {
    icon: HeartHandshake,
    title: "Holistic Development",
    description:
      "We focus on academics, discipline, confidence, values, and life skills to prepare students for the future.",
  },
];

export default function AcademicOverview() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Academic Excellence"
          subtitle="Our educational approach combines strong academic foundations with modern teaching practices to help every student grow into a confident, responsible, and lifelong learner."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}