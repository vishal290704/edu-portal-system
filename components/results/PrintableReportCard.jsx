"use client";

import Image from "next/image";

export default function PrintableReportCard({ result }) {
  if (!result) return null;

  const subjectCount = result.subjects?.length || 0;

  const compact = subjectCount >= 8;
  const dense = subjectCount >= 11;
  const extraDense = subjectCount >= 14;

  const logoSize = extraDense ? 42 : dense ? 48 : compact ? 54 : 62;

  const schoolTitleSize = extraDense
    ? "text-[18px]"
    : dense
      ? "text-[20px]"
      : compact
        ? "text-[22px]"
        : "text-[24px]";

  const sectionGap = extraDense
    ? "mt-2"
    : dense
      ? "mt-2.5"
      : compact
        ? "mt-3"
        : "mt-4";

  const tablePadding = extraDense
    ? "py-[3px]"
    : dense
      ? "py-1"
      : compact
        ? "py-1.5"
        : "py-2";

  const tableText = extraDense
    ? "text-[10px]"
    : dense
      ? "text-[10.5px]"
      : compact
        ? "text-[11px]"
        : "text-xs";

  return (
    <div
      id="printable-report-card"
      className="report-card-page mx-auto w-full bg-white text-slate-900"
      style={{
        "--subject-count": Math.max(subjectCount, 1),
      }}
    >
      <div className="report-card-outer">
        <div className="report-card-inner">
          {/* ================================= */}
          {/* SCHOOL HEADER */}
          {/* ================================= */}

          <div
            className={`grid items-center border-b-2 border-[#0F4C81] ${
              extraDense
                ? "grid-cols-[50px_1fr_50px] pb-1"
                : dense
                  ? "grid-cols-[55px_1fr_55px] pb-2"
                  : compact
                    ? "grid-cols-[60px_1fr_60px] pb-2"
                    : "grid-cols-[70px_1fr_70px] pb-3"
            }`}
          >
            <div className="flex justify-center">
              <Image
                src="/logos/school-logo.png"
                alt="School Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center">
              <h1
                className={`${schoolTitleSize} font-extrabold uppercase tracking-wide text-[#0F4C81]`}
              >
                Dynamic English School
              </h1>

              <p
                className={`font-medium ${
                  dense ? "mt-0.5 text-[10px]" : "mt-1 text-xs"
                }`}
              >
                Phulwariya, Varanasi, Uttar Pradesh
              </p>

              {!extraDense && (
                <p
                  className={`italic text-slate-500 ${
                    dense ? "mt-0.5 text-[9px]" : "mt-1 text-[10px]"
                  }`}
                >
                  Learn Today • Lead Tomorrow
                </p>
              )}
            </div>

            <div />
          </div>

          {/* ================================= */}
          {/* REPORT TITLE */}
          {/* ================================= */}

          <div
            className={`text-center ${
              extraDense ? "py-1" : dense ? "py-1.5" : compact ? "py-2" : "py-3"
            }`}
          >
            <h2
              className={`font-extrabold uppercase tracking-[0.18em] ${
                dense ? "text-base" : "text-lg"
              }`}
            >
              Report Card
            </h2>

            {!dense && (
              <div className="mx-auto mt-1 h-[2px] w-16 bg-[#0F4C81]" />
            )}

            <div
              className={`flex items-center justify-center gap-3 ${
                dense ? "mt-1" : "mt-2"
              }`}
            >
              <p className="text-xs font-bold">
                {result.exam?.name || "Examination"}
              </p>

              <span className="text-slate-400">•</span>

              <p className="text-[10px] text-slate-600">
                Academic Session:{" "}
                <span className="font-bold text-slate-900">
                  {result.academicSession?.name || "-"}
                </span>
              </p>
            </div>
          </div>

          {/* ================================= */}
          {/* STUDENT INFORMATION */}
          {/* ================================= */}

          <div className="border border-slate-400">
            <div
              className={`bg-[#0F4C81] text-white ${
                dense ? "px-3 py-1" : "px-4 py-1.5"
              }`}
            >
              <h3
                className={`font-bold uppercase tracking-wider ${
                  dense ? "text-[9px]" : "text-[10px]"
                }`}
              >
                Student Information
              </h3>
            </div>

            <div className="grid grid-cols-2">
              <Info
                label="Student Name"
                value={result.student?.fullName}
                dense={dense}
              />

              <Info
                label="Admission No."
                value={result.student?.admissionNo}
                dense={dense}
              />

              <Info
                label="Roll No."
                value={result.student?.rollNo}
                dense={dense}
              />

              <Info
                label="Class / Section"
                value={`${result.student?.className || "-"}${
                  result.student?.section ? ` / ${result.student.section}` : ""
                }`}
                dense={dense}
              />

              <Info
                label="Father's Name"
                value={result.student?.fatherName}
                dense={dense}
              />

              <Info
                label="Mother's Name"
                value={result.student?.motherName}
                dense={dense}
              />
            </div>
          </div>

          {/* ================================= */}
          {/* ACADEMIC PERFORMANCE */}
          {/* ================================= */}

          <div className={`report-card-academic ${sectionGap}`}>
            <SectionHeading dense={dense}>Academic Performance</SectionHeading>

            <table
              className={`report-card-table mt-1.5 w-full table-fixed border-collapse ${tableText}`}
            >
              <thead>
                <tr className="bg-[#0F4C81] text-white">
                  <th
                    className={`w-[28%] border border-[#0F4C81] px-2 text-left ${tablePadding}`}
                  >
                    Subject
                  </th>

                  <th
                    className={`w-[18%] border border-[#0F4C81] px-1 text-center ${tablePadding}`}
                  >
                    Maximum
                  </th>

                  <th
                    className={`w-[18%] border border-[#0F4C81] px-1 text-center ${tablePadding}`}
                  >
                    Obtained
                  </th>

                  <th
                    className={`w-[12%] border border-[#0F4C81] px-1 text-center ${tablePadding}`}
                  >
                    Grade
                  </th>

                  <th
                    className={`w-[24%] border border-[#0F4C81] px-2 text-left ${tablePadding}`}
                  >
                    Remarks
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.subjects?.map((subject) => (
                  <tr key={subject.id}>
                    <td
                      className={`border border-slate-400 px-2 font-semibold ${tablePadding}`}
                    >
                      {subject.subject}
                    </td>

                    <td
                      className={`border border-slate-400 px-1 text-center ${tablePadding}`}
                    >
                      {subject.maximum}
                    </td>

                    <td
                      className={`border border-slate-400 px-1 text-center font-bold ${tablePadding}`}
                    >
                      {subject.obtained}
                    </td>

                    <td
                      className={`border border-slate-400 px-1 text-center font-bold ${tablePadding}`}
                    >
                      {subject.grade}
                    </td>

                    <td
                      className={`border border-slate-400 px-2 ${tablePadding}`}
                    >
                      {subject.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================================= */}
          {/* OVERALL PERFORMANCE */}
          {/* ================================= */}

          <div className={sectionGap}>
            <SectionHeading dense={dense}>Overall Performance</SectionHeading>
            <div className="mt-1.5 grid grid-cols-5 border border-slate-400">
              <Summary
                label="Total"
                value={`${result.totalObtained}/${result.totalMaximum}`}
                dense={dense}
              />

              <Summary
                label="Percentage"
                value={`${result.percentage}%`}
                dense={dense}
              />

              <Summary
                label="Overall Grade"
                value={result.grade}
                dense={dense}
              />

              <Summary
                label="Rank"
                value={result.rank ? result.rank : "-"}
                dense={dense}
              />

              <Summary
                label="Result"
                value={result.result}
                dense={dense}
                last
              />
            </div>
          </div>

          {/* ================================= */}
          {/* OVERALL REMARK */}
          {/* ================================= */}

          <div className={`${sectionGap} border border-slate-400`}>
            <div
              className={`bg-slate-100 ${dense ? "px-3 py-1" : "px-4 py-1.5"}`}
            >
              <p
                className={`font-bold uppercase tracking-wide ${
                  dense ? "text-[8px]" : "text-[9px]"
                }`}
              >
                Overall Remark
              </p>
            </div>

            <div className={dense ? "px-3 py-1" : "px-4 py-1.5"}>
              <p className={dense ? "text-[9px]" : "text-[10px]"}>
                {getOverallRemark(result.percentage)}
              </p>
            </div>
          </div>

          {/* ================================= */}
          {/* GRADING SCALE */}
          {/* ================================= */}

          <div className={extraDense ? "mt-1.5" : dense ? "mt-2" : "mt-3"}>
            <p
              className={`mb-1 font-bold uppercase tracking-wide text-slate-600 ${
                dense ? "text-[8px]" : "text-[9px]"
              }`}
            >
              Grading Scale
            </p>

            <div
              className={`grid grid-cols-8 border border-slate-300 text-center ${
                dense ? "text-[8px]" : "text-[9px]"
              }`}
            >
              <GradeBox grade="A+" range="91-100" dense={dense} />

              <GradeBox grade="A" range="81-90" dense={dense} />

              <GradeBox grade="B+" range="71-80" dense={dense} />

              <GradeBox grade="B" range="61-70" dense={dense} />

              <GradeBox grade="C+" range="51-60" dense={dense} />

              <GradeBox grade="C" range="41-50" dense={dense} />

              <GradeBox grade="D" range="33-40" dense={dense} />

              <GradeBox grade="F" range="<33" dense={dense} last />
            </div>
          </div>

          {/* ================================= */}
          {/* SIGNATURES */}
          {/* ================================= */}

          <div
            className={`report-card-signatures grid grid-cols-3 gap-10 ${
              extraDense ? "mt-3" : dense ? "mt-4" : compact ? "mt-5" : "mt-6"
            }`}
          >
            <Signature title="Class Teacher" dense={dense} />

            <Signature title="Examination Controller" dense={dense} />

            <Signature title="Principal" dense={dense} />
          </div>

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div
            className={`border-t border-slate-300 text-center ${
              dense ? "mt-3 pt-1.5" : "mt-4 pt-2"
            }`}
          >
            <p
              className={
                dense
                  ? "text-[7px] text-slate-500"
                  : "text-[8px] text-slate-500"
              }
            >
              This report card is an official academic performance record of
              Dynamic English School.
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

function Info({ label, value, dense }) {
  return (
    <div
      className={`flex border-b border-r border-slate-300 ${
        dense ? "px-2 py-1" : "px-3 py-1.5"
      }`}
    >
      <span
        className={`shrink-0 font-semibold text-slate-500 ${
          dense ? "w-24 text-[8px]" : "w-28 text-[9px]"
        }`}
      >
        {label}
      </span>

      <span className={`font-bold ${dense ? "text-[9px]" : "text-[10px]"}`}>
        {value || "-"}
      </span>
    </div>
  );
}

// ===================================
// Section Heading
// ===================================

function SectionHeading({ children, dense }) {
  return (
    <div className="flex items-center gap-2">
      <h3
        className={`whitespace-nowrap font-extrabold uppercase tracking-wider text-[#0F4C81] ${
          dense ? "text-[8px]" : "text-[9px]"
        }`}
      >
        {children}
      </h3>

      <div className="h-px flex-1 bg-[#0F4C81]" />
    </div>
  );
}

// ===================================
// Summary
// ===================================

function Summary({ label, value, dense, last = false }) {
  return (
    <div
      className={`text-center ${dense ? "px-1 py-1" : "px-2 py-1.5"} ${
        last ? "" : "border-r border-slate-400"
      }`}
    >
      <p
        className={`font-semibold uppercase text-slate-500 ${
          dense ? "text-[7px]" : "text-[8px]"
        }`}
      >
        {label}
      </p>

      <p
        className={`font-extrabold ${
          dense ? "mt-0.5 text-[10px]" : "mt-1 text-xs"
        }`}
      >
        {value ?? "-"}
      </p>
    </div>
  );
}

// ===================================
// Grading Scale
// ===================================

function GradeBox({ grade, range, dense, last = false }) {
  return (
    <div
      className={`${dense ? "py-1" : "py-1.5"} ${
        last ? "" : "border-r border-slate-300"
      }`}
    >
      <p className="font-bold">{grade}</p>

      <p className="mt-0.5 text-slate-500">{range}</p>
    </div>
  );
}

// ===================================
// Signature
// ===================================

function Signature({ title, dense }) {
  return (
    <div className="text-center">
      <div className={dense ? "h-4" : "h-6"} />

      <div className="border-t border-slate-600 pt-1">
        <p className={`font-bold ${dense ? "text-[8px]" : "text-[9px]"}`}>
          {title}
        </p>

        <p
          className={`mt-0.5 uppercase tracking-wide text-slate-500 ${
            dense ? "text-[6px]" : "text-[7px]"
          }`}
        >
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
