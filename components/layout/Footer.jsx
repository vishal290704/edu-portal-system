import Link from "next/link";
import Image from "next/image";

import { Phone, Mail, MapPin, Clock} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { Heart } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* School */}

          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="School Logo"
                width={55}
                height={55}
              />

              <div>
                <h3 className="text-xl font-bold">Dynamic English School</h3>

                <p className="text-sm text-slate-400">
                  Learn Today, Lead Tomorrow
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Providing quality education through innovation, discipline and
              holistic development.
            </p>

            <div className="mt-6 flex gap-4 text-xl">
              <FaFacebookF className="cursor-pointer transition hover:text-blue-500" />

              <FaInstagram className="cursor-pointer transition hover:text-pink-500" />

              <FaYoutube className="cursor-pointer transition hover:text-red-500" />
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">
              Quick Links
            </h4>

            <nav className="flex flex-col space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Academics", href: "/academics" },
                { name: "Events", href: "/events" },
                { name: "Gallery", href: "/gallery" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex w-fit items-center text-slate-400 transition-all duration-300 hover:translate-x-2 hover:text-white"
                >
                  <span className="mr-2 text-[#0F4C81] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    →
                  </span>

                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Admissions */}

          <div>
            <h4 className="mb-6 text-xl font-semibold text-white ml-10">
                   Admissions
            </h4>

            <nav className="space-y-2">
              {[
                { name: "Admission Process", href: "/admissions" },
                { name: "Apply Online", href: "/admissions" },
                { name: "Fee Structure", href: "/admissions" },
                { name: "FAQs", href: "/admissions" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4 text-[#0F4C81] transition-transform duration-300 group-hover:translate-x-1" />

                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          {/* Contact */}

         <div>
  <h4 className="mb-2 text-xl font-semibold text-white">
    Contact Us
  </h4>

  <div className="mb-6 h-1 w-12 rounded-full bg-[#0F4C81]" />

  <div className="space-y-5">
    </div>

    {/* Address */}

    <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-slate-900">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C81]/15">

        <MapPin className="h-5 w-5 text-[#3B82F6]" />

      </div>

      <div>

        <h5 className="font-semibold text-white">
          Address
        </h5>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Dynamic English School
          <br />
          Phulwariya, Varanasi,
          <br />
          Uttar Pradesh
        </p>

      </div>

    </div>

    {/* Phone */}

    <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-slate-900">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C81]/15">

        <Phone className="h-5 w-5 text-[#3B82F6]" />

      </div>

      <div>

        <h5 className="font-semibold text-white">
          Call Us
        </h5>

        <a
          href="tel:+919653087078"
          className="mt-1 block text-sm text-slate-400 transition hover:text-white"
        >
          +91 96530 87078
        </a>

      </div>

    </div>

    {/* Email */}

    <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-slate-900">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C81]/15">

        <Mail className="h-5 w-5 text-[#3B82F6]" />

      </div>

      <div>

        <h5 className="font-semibold text-white">
          Email
        </h5>

        <a
          href="mailto:desvaranasi001@gmail.com"
          className="mt-1 block text-sm break-all text-slate-400 transition hover:text-white"
        >
          desvaranasi001@gmail.com
        </a>

      </div>

    </div>

    {/* Office Hours */}

    <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-slate-900">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C81]/15">

        <Clock className="h-5 w-5 text-[#3B82F6]" />

      </div>

      <div>

        <h5 className="font-semibold text-white">
          Office Hours
        </h5>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Monday – Saturday
          <br />
          8:00 AM – 4:00 PM
        </p>

      </div>

    </div>

  </div>
</div>

       <div className="border-t border-slate-800">
  <div className="flex flex-col items-center justify-between gap-6 py-6 text-sm text-slate-400 lg:flex-row">
</div>
    {/* Copyright */}

    <div className="border-t border-slate-800 pb-3">
  <div className="flex flex-col items-center justify-between gap-8 py-1 lg:flex-row">

    {/* Left */}

    <div className="text-center lg:text-left">

      <p className="text-sm text-slate-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">
          Dynamic English School
        </span>
        . All Rights Reserved.
      </p>

    </div>

    {/* Right */}

    <div className="flex flex-col items-center lg:items-end">

      <p className="text-sm uppercase tracking-[0.25em] pt-2 text-slate-500">

        Designed • Developed • Deployed BY

      </p>

      <h4 className="mt-2 text-2xl font-semibold text-white">

        Vishal Srivastava

      </h4>

      <p className="mt-1 text-sm text-slate-400">

        Full Stack Developer

      </p>

      <div className="mt-2 flex items-center gap-6">

        <a
          href="mailto:vsjee2002@gmail.com"
          className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <Mail className="h-4 w-4" />

          Email
        </a>

        <a
          href="https://linkedin.com/in/vishal290704"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#0A66C2]"
        >
          <FaLinkedinIn className="text-base" />

          LinkedIn
        </a>

      </div>

    </div>

  </div>
</div>
</div>
      </Container>
    </footer>
  );
}
