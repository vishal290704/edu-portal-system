import {
  Baby,
  School,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const programs = [
  {
    icon: Baby,
    title: "Pre-Primary",
    classes: "Nursery • LKG • UKG",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: School,
    title: "Primary",
    classes: "Classes I – V",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: GraduationCap,
    title: "Middle School",
    classes: "Classes VI – VIII",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function AcademicPrograms() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionHeading
          title="Academic Programs"
          subtitle="Our curriculum is thoughtfully designed to build knowledge, confidence, and lifelong learning skills."
        />

        <div className="grid gap-8 mt-14 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.title}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${program.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold mt-6">
                  {program.title}
                </h3>

                <p className="text-gray-600 mt-2">{program.classes}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mt-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="text-blue-600" />
              <h3 className="text-2xl font-semibold">
                Learning Approach
              </h3>
            </div>

            <ul className="space-y-3 text-gray-600">
              <li>• Activity-based learning</li>
              <li>• Interactive smart classrooms</li>
              <li>• Individual attention to students</li>
              <li>• Practical and conceptual understanding</li>
              <li>• Strong focus on discipline and values</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardCheck className="text-blue-600" />
              <h3 className="text-2xl font-semibold">
                Assessment System
              </h3>
            </div>

            <p className="text-gray-600 leading-8">
              Student progress is evaluated through periodic tests,
              class participation, assignments, half-yearly and annual
              examinations, ensuring continuous academic growth.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}