"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/constants/navigation";
import Container from "../layout/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
      <Container className="flex h-24 items-center justify-between">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-4">

          <Image
            src="/logos/school-logo.png"
            alt="School Logo"
            width={65}
            height={65}
            priority
          />

          <div>

            <h1 className="heading-font text-3xl font-extrabold text-[#0F4C81] leading-none">

              Dynamic English School

            </h1>

            <p className="mt-1 text-sm text-slate-500">

              Learn Today • Lead Tomorrow

            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-8">

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-slate-700 transition-all duration-300 hover:text-[#0F4C81]"
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-3">

          <Button variant="outline">
            Login
          </Button>

          <Button className="bg-[#0F4C81] hover:bg-blue-700">
            Apply Now
          </Button>

        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu />
        </Button>

      </Container>
    </header>
  );
}