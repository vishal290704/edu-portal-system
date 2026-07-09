"use client";

import Link from "next/link";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

import { Button } from "@/components/ui/button";

import EventCard from "./EventCard";

import { events } from "@/constants/events";

export default function EventsPreview() {
  return (
    <section className="section-padding bg-slate-50 pt-5 pb-5">
      <Container>
        <SectionHeading
          badge="LATEST EVENTS"
          title="Stay Updated With"
          highlight="School Activities"
          description="Discover the latest celebrations, cultural programs, and memorable moments from Dynamic English School."
        />

        {/* Events Grid */}

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>

        {/* View All Button */}

        <div className="mt-14 text-center">
          <Link href="/events">
            <Button size="lg">
              View All Events
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}