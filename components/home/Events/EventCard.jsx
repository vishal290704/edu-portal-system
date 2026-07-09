import Image from "next/image";
import Link from "next/link";

import { CalendarDays, ArrowRight } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="relative h-60 overflow-hidden">

        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      <div className="p-6">

        <div className="mb-4 flex items-center gap-2 text-sm text-[#0F4C81]">

          <CalendarDays className="h-4 w-4"/>

          {event.date}

        </div>

        <h3 className="text-2xl font-bold">

          {event.title}

        </h3>

        <p className="mt-4 leading-7 text-slate-600">

          {event.shortDescription}

        </p>

        <Link
          href={`/events/${event.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0F4C81]"
        >

          Read More

          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2"/>

        </Link>

      </div>

    </div>
  );
}