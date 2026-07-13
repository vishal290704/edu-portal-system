import Link from "next/link";
import {
  MapPinned,
  Phone,
  Mail,
  Clock,
  Navigation,
} from "lucide-react";

import { contactInfo } from "@/constants/contact";

export default function ContactInfo() {
  return (
    <section
      id="contact-info"
      className="bg-white py-24"
    >
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
            Contact Information
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Visit Our Campus
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            We welcome parents and students to visit our campus and
            experience our learning environment.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            {/* Address */}

            <InfoCard
              icon={<MapPinned />}
              title="School Address"
              value={contactInfo.address}
            />

            {/* Phone */}

            <InfoCard
              icon={<Phone />}
              title="Phone Number"
              value={
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary"
                >
                  {contactInfo.phone}
                </a>
              }
            />

            {/* Email */}

            <InfoCard
              icon={<Mail />}
              title="Email Address"
              value={
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              }
            />

            {/* Office */}

            <InfoCard
              icon={<Clock />}
              title="Office Hours"
              value={contactInfo.officeHours}
            />

            {/* Button */}

            {contactInfo.directionsLink && (
              <Link
                href={contactInfo.directionsLink}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Navigation size={18} />

                Get Directions
              </Link>
            )}

          </div>

          {/* Right */}

          <div className="overflow-hidden rounded-[32px] border shadow-xl">

            {contactInfo.googleMapsEmbed ? (

              <iframe
                src={contactInfo.googleMapsEmbed}
                className="h-[520px] w-full"
                loading="lazy"
                allowFullScreen
              />

            ) : (

              <div className="flex h-[520px] items-center justify-center bg-slate-100">

                <div className="text-center">

                  <MapPinned
                    size={60}
                    className="mx-auto text-primary"
                  />

                  <h3 className="mt-5 text-2xl font-bold">
                    Google Map Coming Soon
                  </h3>

                  <p className="mt-3 text-slate-600">
                    The school location map will appear here.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="group flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-primary transition group-hover:bg-primary group-hover:text-white">

        {icon}

      </div>

      <div>

        <h3 className="font-semibold text-slate-900">

          {title}

        </h3>

        <div className="mt-2 text-slate-600">

          {value}

        </div>

      </div>

    </div>
  );
}