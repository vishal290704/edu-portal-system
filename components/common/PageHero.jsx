import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import Container from "@/components/layout/Container";

export default function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
}) {
  return (
    <section className="relative h-[420px] overflow-hidden">

      {/* Background Image */}

      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}

      <Container>

        <div className="relative z-10 flex h-[420px] flex-col items-center justify-center text-center text-white">

          {/* Breadcrumb */}

          <div className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur-md">

            <Link
              href="/"
              className="flex items-center gap-1 transition hover:text-blue-300"
            >
              <Home className="h-4 w-4" />

              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-blue-300">
              {breadcrumb}
            </span>

          </div>

          {/* Title */}

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">

            {title}

          </h1>

          {/* Subtitle */}

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">

            {subtitle}

          </p>

        </div>

      </Container>

    </section>
  );
}