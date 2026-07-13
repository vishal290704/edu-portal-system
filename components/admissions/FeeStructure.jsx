"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import {
  feeStructure,
  feeNotes,
  admissionCTA,
} from "@/constants/admissions";

import ClassSelector from "./ClassSelector";
import FeeCard from "./FeeCard";

export default function FeeStructure() {
  const [selectedClass, setSelectedClass] = useState(feeStructure[0]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24">
      {/* Decorative Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-primary">
            Fee Structure
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            Simple. Transparent.
            <span className="block text-primary">
              Parent Friendly.
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Select your child's class below to view the complete admission
            charges, tuition fee and examination fee.
          </p>
        </motion.div>

        {/* Class Selector */}

        <ClassSelector
          feeStructure={feeStructure}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />

        {/* Card */}

        <div className="mx-auto mt-12 max-w-2xl">

          <AnimatePresence mode="wait">

            <motion.div
              key={selectedClass.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: .35 }}
            >
              <FeeCard fee={selectedClass} />
            </motion.div>

          </AnimatePresence>

        </div>

        {/* Notes */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-3xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl"
        >
          <div className="mb-6 flex items-center gap-3">

            <ShieldCheck className="text-emerald-600" />

            <h3 className="text-2xl font-bold">
              Important Information
            </h3>

          </div>

          <div className="space-y-4">

            {feeNotes.map((note) => (

              <div
                key={note}
                className="flex gap-3"
              >

                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />

                <p className="text-slate-600">

                  {note}

                </p>

              </div>

            ))}

          </div>

        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-[36px] bg-gradient-to-r from-primary to-blue-700 p-12 text-center text-white shadow-2xl"
        >

          <h3 className="text-4xl font-bold">

            {admissionCTA.title}

          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">

            {admissionCTA.description}

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href={admissionCTA.primaryButton.href}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-primary transition hover:-translate-y-1 hover:shadow-xl"
            >
              {admissionCTA.primaryButton.text}
            </Link>

            <a
              href={admissionCTA.secondaryButton.href}
              className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-primary"
            >
              <PhoneCall size={18} />

              {admissionCTA.secondaryButton.text}

              <ArrowRight size={18} />
            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}