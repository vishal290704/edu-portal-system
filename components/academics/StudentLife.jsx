import Image from "next/image";
import {
  Music,
  Laptop,
  MonitorSmartphone,
  Camera,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const features = [
  {
    icon: MonitorSmartphone,
    title: "Smart Classrooms",
    description: "Interactive digital learning that keeps every lesson engaging.",
  },
  {
    icon: Laptop,
    title: "Computer Education",
    description: "Hands-on computer learning to build essential digital skills.",
  },
  {
    icon: Music,
    title: "Dance & Cultural Activities",
    description:
      "Students actively participate in dance, music and national celebrations.",
  },
  {
    icon: Camera,
    title: "Safe Campus",
    description:
      "A secure campus with CCTV surveillance and a caring environment.",
  },
];

export default function StudentLife() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Student Life Beyond Academics"
          subtitle="At Dynamic English School, learning goes beyond textbooks. Students explore their talents, build confidence, and create lasting memories through academics, creativity, and cultural experiences."
        />

        {/* Main Content */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/academics/student-life.jpg"
              alt="Students participating in school activities"
              width={700}
              height={700}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex gap-5 rounded-2xl border border-gray-200 p-5 transition duration-300 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-gray-600 leading-7">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            Moments That Inspire
          </h3>

          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Every day at Dynamic English School is filled with opportunities to
            learn, celebrate, and grow together.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                image: "/images/academics/classroom.jpg",
                title: "Interactive Classrooms",
              },
              {
                image: "/images/academics/cultural-event.jpg",
                title: "Cultural Celebrations",
              },
              {
                image: "/images/academics/group-photo.jpg",
                title: "Learning Together",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl shadow-md"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex items-center justify-between bg-white p-5">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>

                  <ArrowRight className="h-5 w-5 text-blue-600 transition group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}