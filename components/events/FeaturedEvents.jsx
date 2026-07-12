import Image from "next/image";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

const events = [
  {
    title: "Independence Day Celebration",
    description:
      "Every Independence Day, our students proudly participate in flag hoisting, patriotic performances, speeches, and cultural programmes that inspire love for our nation.",
    image: "/images/events/independence-day.jpg",
  },
  {
    title: "Republic Day Celebration",
    description:
      "Republic Day is celebrated with enthusiasm through cultural performances, patriotic songs, student presentations, and activities that honor our Constitution and national values.",
    image: "/images/events/republic-day.jpg",
  },
];

export default function FeaturedEvents() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Featured Events"
          subtitle="Celebrating national pride, unity, and the vibrant spirit of our school community."
        />

        <div className="mt-16 space-y-20">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                  School Celebration
                </span>

                <h3 className="mt-6 text-3xl font-bold text-gray-900">
                  {event.title}
                </h3>

                <p className="mt-6 leading-8 text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}