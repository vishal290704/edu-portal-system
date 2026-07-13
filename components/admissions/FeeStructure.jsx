import Link from "next/link";
import {
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import {
  feeStructure,
  feeNotes,
  admissionCTA,
} from "@/constants/admissions";

export default function FeeStructure() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-primary">
            Fee Structure
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Transparent Fee Structure
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about admission and tuition fees for
            the academic session.
          </p>

        </div>

        {/* Desktop Table */}

        <div className="mt-16 hidden overflow-hidden rounded-3xl border bg-white shadow-2xl lg:block">

          <table className="w-full">

            <thead className="bg-primary text-white">

              <tr>

                <th className="px-6 py-5 text-left">
                  Class
                </th>

                <th>Registration</th>

                <th>Development</th>

                <th>Uniform</th>

                <th>ID + Diary</th>

                <th>Monthly</th>

                <th>Exam</th>

              </tr>

            </thead>

            <tbody>

              {feeStructure.map((item, index) => (

                <tr
                  key={item.className}
                  className={`transition hover:bg-blue-50 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }`}
                >

                  <td className="px-6 py-5 font-semibold">

                    {item.className}

                  </td>

                  <td>{item.registration}</td>

                  <td>{item.development}</td>

                  <td>{item.uniform}</td>

                  <td>{item.idCardDiary}</td>

                  <td className="font-bold text-primary">

                    {item.monthly}

                  </td>

                  <td>{item.examination}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="mt-12 space-y-6 lg:hidden">

          {feeStructure.map((item) => (

            <div
              key={item.className}
              className="rounded-3xl border bg-white p-6 shadow-lg"
            >

              <h3 className="mb-5 text-2xl font-bold text-primary">

                {item.className}

              </h3>

              <div className="space-y-3">

                <FeeRow
                  label="Registration Fee"
                  value={item.registration}
                />

                <FeeRow
                  label="Development Fee"
                  value={item.development}
                />

                <FeeRow
                  label="Uniform Fee"
                  value={item.uniform}
                />

                <FeeRow
                  label="ID Card & Diary"
                  value={item.idCardDiary}
                />

                <FeeRow
                  label="Monthly Fee"
                  value={item.monthly}
                  highlight
                />

                <FeeRow
                  label="Exam Fee"
                  value={item.examination}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Notes */}

        <div className="mt-14 rounded-3xl border bg-white p-8 shadow-xl">

          <div className="mb-6 flex items-center gap-3">

            <ShieldCheck className="text-green-600" />

            <h3 className="text-2xl font-bold">

              Important Notes

            </h3>

          </div>

          <ul className="space-y-4">

            {feeNotes.map((note) => (

              <li
                key={note}
                className="flex gap-3 text-slate-600"
              >

                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />

                {note}

              </li>

            ))}

          </ul>

        </div>

        {/* CTA */}

        <div className="mt-16 rounded-[36px] bg-primary p-10 text-center text-white shadow-2xl">

          <GraduationCap
            className="mx-auto mb-5"
            size={42}
          />

          <h3 className="text-4xl font-bold">

            {admissionCTA.title}

          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">

            {admissionCTA.description}

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href={admissionCTA.primaryButton.href}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-primary transition hover:scale-105"
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

        </div>

      </div>
    </section>
  );
}

function FeeRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">

      <span className="text-slate-600">

        {label}

      </span>

      <span
        className={`font-semibold ${
          highlight
            ? "text-primary"
            : "text-slate-900"
        }`}
      >

        {value}

      </span>

    </div>
  );
}