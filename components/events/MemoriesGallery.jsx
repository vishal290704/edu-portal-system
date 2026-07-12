import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";

const gallery = [
  {
    image: "/images/events/gallery1.jpg",
    height: "h-[420px]",
  },
  {
    image: "/images/events/gallery2.jpg",
    height: "h-[260px]",
  },
  {
    image: "/images/events/gallery3.jpg",
    height: "h-[320px]",
  },
  {
    image: "/images/events/gallery4.jpg",
    height: "h-[380px]",
  },
  {
    image: "/images/events/gallery5.jpg",
    height: "h-[260px]",
  },
];

export default function MemoriesGallery() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Gallery
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Moments That Matter
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every celebration, classroom activity and shared experience
            becomes a cherished memory in the journey of our students.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-[28px] ${item.height}`}
            >
              <Image
                src={item.image}
                alt={`School Event ${index + 1}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-white transition hover:bg-blue-600"
          >
            View Complete Gallery

            <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}