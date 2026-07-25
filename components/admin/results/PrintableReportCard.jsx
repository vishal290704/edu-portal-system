"use client";

import Image from "next/image";

export default function PrintableReportCard({ result }) {
  if (!result) return null;

  return (
    <div
      id="printable-report-card"
      className="mx-auto w-full max-w-[794px] bg-white text-slate-900"
    >
      {/* ================================= */}
      {/* OUTER DOCUMENT BORDER */}
      {/* ================================= */}

      <div className="border-[3px] border-[#0F4C81] p-1">

        <div className="border border-[#0F4C81] px-8 py-7">

          {/* ================================= */}
          {/* SCHOOL HEADER */}
          {/* ================================= */}

          <div className="grid grid-cols-[90px_1fr_90px] items-center border-b-2 border-[#0F4C81] pb-5">

            <div className="flex justify-center">
              <Image
                src="/logos/school-logo.png"
                alt="School Logo"
                width={78}
                height={78}
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center">

              <h1 className="text-[28px] font-extrabold uppercase tracking-wide text-[#0F4C81]">
                Dynamic English School
              </h1>

              <p className="mt-1 text-sm font-medium">
                Phulwariya, Varanasi, Uttar Pradesh
              </p>

              <p className="mt-1 text-xs italic text-slate-500">
                Learn Today • Lead Tomorrow
              </p>

            </div>

            <div />

          </div>


          {/* ================================= */}
          {/* REPORT TITLE */}
          {/* ================================= */}

          <div className="py-5 text-center">

            <h2 className="text-xl font-extrabold uppercase tracking-[0.18em]">
              Report Card
            </h2>

            <div className="mx-auto mt-2 h-[2px] w-20 bg-[#0F4C81]" />

            <p className="mt-3 text-sm font-bold">
              {result.exam?.name || "Examination"}
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Academic Session:{" "}
              <span className="font-bold text-slate-900">
                {result.academicSession?.name || "-"}
              </span>
            </p>

          </div>


          {/* ================================= */}
          {/* STUDENT INFORMATION */}
          {/* ================================= */}

          <div className="border border-slate-400">

            <div className="bg-[#0F4C81] px-4 py-2 text-white">
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Student Information
              </h3>
            </div>

            <div className="grid grid-cols-2">

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
                label="Class / Section"
                value={`${result.student?.className || "-"}${
                  result.student?.section
                    ? ` / ${result.student.section}`
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
          {/* ACADEMIC PERFORMANCE */}
          {/* ================================= */}

          <div className="mt-6">

            <SectionHeading>
              Academic Performance
            </SectionHeading>

            <table className="mt-3 w-full border-collapse text-sm">

              <thead>

                <tr className="bg-[#0F4C81] text-white">

                  <th className="border border-[#0F4C81] px-4 py-2.5 text-left">
                    Subject
                  </th>

                  <th className="border border-[#0F4C81] px-3 py-2.5 text-center">
                    Maximum Marks
                  </th>

                  <th className="border border-[#0F4C81] px-3 py-2.5 text-center">
                    Marks Obtained
                  </th>

                  <th className="border border-[#0F4C81] px-3 py-2.5 text-center">
                    Grade
                  </th>

                  <th className="border border-[#0F4C81] px-4 py-2.5 text-left">
                    Remarks
                  </th>

                </tr>

              </thead>

              <tbody>

                {result.subjects?.map((subject) => (

                  <tr key={subject.id}>

                    <td className="border border-slate-400 px-4 py-2.5 font-semibold">
                      {subject.subject}
                    </td>

                    <td className="border border-slate-400 px-3 py-2.5 text-center">
                      {subject.maximum}
                    </td>

                    <td className="border border-slate-400 px-3 py-2.5 text-center font-bold">
                      {subject.obtained}
                    </td>

                    <td className="border border-slate-400 px-3 py-2.5 text-center font-bold">
                      {subject.grade}
                    </td>

                    <td className="border border-slate-400 px-4 py-2.5">
                      {subject.remarks || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================================= */}
          {/* RESULT SUMMARY */}
          {/* ================================= */}

          <div className="mt-6">

            <SectionHeading>
              Overall Performance
            </SectionHeading>

            <div className="mt-3 grid grid-cols-5 border border-slate-400">

              <Summary
                label="Total"
                value={`${result.totalObtained}/${result.totalMaximum}`}
              />

              <Summary
                label="Percentage"
                value={`${result.percentage}%`}
              />

              <Summary
                label="Overall Grade"
                value={result.grade}
              />

              <Summary
                label="Rank"
                value={
                  result.rank
                    ? `${result.rank}`
                    : "-"
                }
              />

              <Summary
                label="Result"
                value={result.result}
                last
              />

            </div>

          </div>


          {/* ================================= */}
          {/* PERFORMANCE MESSAGE */}
          {/* ================================= */}

          <div className="mt-6 border border-slate-400">

            <div className="bg-slate-100 px-4 py-2">
              <p className="text-xs font-bold uppercase tracking-wide">
                Overall Remark
              </p>
            </div>

            <div className="px-4 py-3">

              <p className="text-sm font-medium">
                {getOverallRemark(
                  result.percentage
                )}
              </p>

            </div>

          </div>


          {/* ================================= */}
          {/* GRADING SCALE */}
          {/* ================================= */}

          <div className="mt-5">

            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Grading Scale
            </p>

            <div className="grid grid-cols-8 border border-slate-300 text-center text-[10px]">

              <GradeBox grade="A+" range="91-100" />
              <GradeBox grade="A" range="81-90" />
              <GradeBox grade="B+" range="71-80" />
              <GradeBox grade="B" range="61-70" />
              <GradeBox grade="C+" range="51-60" />
              <GradeBox grade="C" range="41-50" />
              <GradeBox grade="D" range="33-40" />
              <GradeBox grade="F" range="<33" last />

            </div>

          </div>


          {/* ================================= */}
          {/* SIGNATURES */}
          {/* ================================= */}

          <div className="mt-16 grid grid-cols-3 gap-12">

            <Signature title="Class Teacher" />

            <Signature title="Examination Controller" />

            <Signature title="Principal" />

          </div>


          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="mt-8 border-t border-slate-300 pt-3 text-center">

            <p className="text-[10px] leading-relaxed text-slate-500">
              This report card is an official academic
              performance record of Dynamic English School.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


// ===================================
// Student Information
// ===================================

function Info({ label, value }) {
  return (
    <div className="flex min-h-12 border-b border-r border-slate-300 px-4 py-2.5">

      <span className="w-32 shrink-0 text-xs font-semibold text-slate-500">
        {label}
      </span>

      <span className="text-sm font-bold">
        {value || "-"}
      </span>

    </div>
  );
}


// ===================================
// Section Heading
// ===================================

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3">

      <h3 className="whitespace-nowrap text-xs font-extrabold uppercase tracking-wider text-[#0F4C81]">
        {children}
      </h3>

      <div className="h-px flex-1 bg-[#0F4C81]" />

    </div>
  );
}


// ===================================
// Result Summary
// ===================================

function Summary({
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`px-2 py-3 text-center ${
        last
          ? ""
          : "border-r border-slate-400"
      }`}
    >

      <p className="text-[10px] font-semibold uppercase text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-extrabold">
        {value ?? "-"}
      </p>

    </div>
  );
}


// ===================================
// Grading Scale
// ===================================

function GradeBox({
  grade,
  range,
  last = false,
}) {
  return (
    <div
      className={`px-1 py-2 ${
        last
          ? ""
          : "border-r border-slate-300"
      }`}
    >
      <p className="font-bold">
        {grade}
      </p>

      <p className="mt-0.5 text-slate-500">
        {range}
      </p>
    </div>
  );
}


// ===================================
// Signatures
// ===================================

function Signature({ title }) {
  return (
    <div className="text-center">

      <div className="h-10" />

      <div className="border-t border-slate-600 pt-2">

        <p className="text-xs font-bold">
          {title}
        </p>

        <p className="mt-1 text-[9px] uppercase tracking-wide text-slate-500">
          Signature
        </p>

      </div>

    </div>
  );
}


// ===================================
// Overall Remark
// ===================================

function getOverallRemark(percentage) {
  const value = Number(percentage);

  if (value >= 91) {
    return "Outstanding academic performance. Keep up the excellent work.";
  }

  if (value >= 81) {
    return "Excellent performance with a strong understanding of the subjects.";
  }

  if (value >= 71) {
    return "Very good performance. Continue working consistently.";
  }

  if (value >= 61) {
    return "Good performance with scope for further improvement.";
  }

  if (value >= 51) {
    return "Satisfactory performance. More consistent effort is encouraged.";
  }

  if (value >= 41) {
    return "Fair performance. Regular practice and greater focus are recommended.";
  }

  if (value >= 33) {
    return "The student has passed but needs improvement through regular practice.";
  }

  return "The student requires additional attention, guidance and consistent academic support.";
}