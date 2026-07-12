import Image from "next/image";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const celebrations = [
  "Teachers' Day",
  "Children's Day",
  "Annual Function",
  "Cultural Activities",
];

export default function EventsStory() {
  return (
    <section className="py-24">
      <Container>

        <SectionHeading
          title="Celebrating Together"
          subtitle="Every celebration at Dynamic English School creates opportunities for students to learn, perform, collaborate and build lifelong memories."
        />

        {/* Hero Image */}

        <div className="relative mt-14 h-[520px] overflow-hidden rounded-[32px]">

          <Image
            src="/images/events/celebration.jpg"
            alt="School Celebration"
            fill
            className="object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-10 left-10 max-w-xl text-white">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
              Dynamic English School
            </span>

            <h3 className="mt-5 text-4xl font-bold">
              Creating Memories Beyond Classrooms
            </h3>

          </div>

        </div>

      </Container>
    </section>
  );
}