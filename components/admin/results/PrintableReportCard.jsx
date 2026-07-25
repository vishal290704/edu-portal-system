"use client";

import Image from "next/image";

export default function PrintableReportCard({ result }) {
  if (!result) return null;

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white p-8 text-black">

      {/* ================================= */}
      {/* School Header */}
      {/* ================================= */}

      <div className="relative border-b-2 border-black pb-5 text-center">

        <div className="absolute left-0 top-0">
          <Image
            src="/logos/school-logo.png"
            alt="School Logo"
            width={85}
            height={85}
          />
        </div>

        <h1 className="text-3xl font-bold uppercase">
          Dynamic English School
        </h1>

        <p className="mt-1 text-sm">
          Phulwariya, Varanasi, Uttar Pradesh
        </p>

        <h2 className="mt-4 text-xl font-bold uppercase">
          Report Card
        </h2>

        <p className="mt-1 text-sm font-medium">
          {result.exam?.name || "Examination"}
          {" • "}
          Academic Session{" "}
          {result.academicSession?.name || "-"}
        </p>

      </div>


      {/* ================================= */}
      {/* Student Information */}
      {/* ================================= */}

      <div className="mt-6">

        <h3 className="mb-3 border-b pb-2 text-base font-bold uppercase">
          Student Details
        </h3>

        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">

          <Info
            label="Student Name"
            value={result.student?.fullName}
          />

          <Info
            label="Admission No."
            value={result.student?.admissionNo}
          />

          <Info
            label="Roll No."
            value={result.student?.rollNo}
          />

          <Info
            label="Class"
            value={`${result.student?.className || "-"}${
              result.student?.section
                ? ` - ${result.student.section}`
                : ""
            }`}
          />

          <Info
            label="Father's Name"
            value={result.student?.fatherName}
          />

          <Info
            label="Mother's Name"
            value={result.student?.motherName}
          />

        </div>

      </div>


      {/* ================================= */}
      {/* Marks Table */}
      {/* ================================= */}

      <div className="mt-7 overflow-hidden border border-black">

        <table className="w-full border-collapse text-sm">

          <thead>

            <tr className="bg-slate-100">

              <th className="border-r border-black px-3 py-3 text-left">
                Subject
              </th>

              <th className="border-r border-black px-3 py-3 text-center">
                Code
              </th>

              <th className="border-r border-black px-3 py-3 text-center">
                Max.
              </th>

              <th className="border-r border-black px-3 py-3 text-center">
                Obtained
              </th>

              <th className="border-r border-black px-3 py-3 text-center">
                Grade
              </th>

              <th className="px-3 py-3 text-left">
                Remarks
              </th>

            </tr>

          </thead>

          <tbody>

            {result.subjects?.map((subject) => (

              <tr
                key={subject.id}
                className="border-t border-black"
              >

                <td className="border-r border-black px-3 py-3 font-medium">
                  {subject.subject}
                </td>

                <td className="border-r border-black px-3 py-3 text-center">
                  {subject.code || "-"}
                </td>

                <td className="border-r border-black px-3 py-3 text-center">
                  {subject.maximum}
                </td>

                <td className="border-r border-black px-3 py-3 text-center">
                  {subject.obtained}
                </td>

                <td className="border-r border-black px-3 py-3 text-center font-semibold">
                  {subject.grade}
                </td>

                <td className="px-3 py-3">
                  {subject.remarks || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* ================================= */}
      {/* Result Summary */}
      {/* ================================= */}

      <div className="mt-6">

        <h3 className="mb-3 border-b pb-2 text-base font-bold uppercase">
          Result Summary
        </h3>

        <div className="grid grid-cols-5 border border-black text-center">

          <SummaryItem
            label="Total"
            value={`${result.totalObtained} / ${result.totalMaximum}`}
          />

          <SummaryItem
            label="Percentage"
            value={`${result.percentage}%`}
          />

          <SummaryItem
            label="Grade"
            value={result.grade}
          />

          <SummaryItem
            label="Rank"
            value={result.rank ?? "-"}
          />

          <SummaryItem
            label="Result"
            value={result.result}
            last
          />

        </div>

      </div>


      {/* ================================= */}
      {/* Teacher Remarks */}
      {/* ================================= */}

      <div className="mt-7">

        <h3 className="text-sm font-bold">
          Teacher's Remarks:
        </h3>

        <div className="mt-2 min-h-12 border-b border-black text-sm">
          ________________________________________________
        </div>

      </div>


      {/* ================================= */}
      {/* Signatures */}
      {/* ================================= */}

      <div className="mt-16 grid grid-cols-3 gap-10 text-center text-sm">

        <Signature title="Class Teacher" />

        <Signature title="Examination Controller" />

        <Signature title="Principal" />

      </div>

    </div>
  );
}


// ===================================
// Info
// ===================================

function Info({ label, value }) {
  return (
    <div className="flex gap-2">

      <span className="font-semibold">
        {label}:
      </span>

      <span>
        {value || "-"}
      </span>

    </div>
  );
}


// ===================================
// Summary Item
// ===================================

function SummaryItem({
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`p-3 ${
        last ? "" : "border-r border-black"
      }`}
    >

      <p className="text-xs font-medium uppercase">
        {label}
      </p>

      <p className="mt-1 font-bold">
        {value ?? "-"}
      </p>

    </div>
  );
}


// ===================================
// Signature
// ===================================

function Signature({ title }) {
  return (
    <div>

      <div className="mb-2 border-t border-black" />

      <p className="font-semibold">
        {title}
      </p>

      <p className="mt-1 text-xs">
        Signature
      </p>

    </div>
  );
}