"use client";

import { useEffect, useState } from "react";

import { getCurrentStudentResult } from "@/app/actions/resultActions";

import StudentResultCard from "./StudentResultCard";
import StudentMarksTable from "./StudentMarksTable";

export default function StudentResults({ exams }) {
  const [selectedExam, setSelectedExam] = useState(
    exams?.[0]?._id || ""
  );

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadResult(examId) {
    if (!examId) {
      setResult(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await getCurrentStudentResult(examId);
      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        success: false,
        message: "Failed to load result.",
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    loadResult(selectedExam);
  }, [selectedExam]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Results
          </h1>

          <p className="text-slate-500">
            View your examination results.
          </p>
        </div>

        <select
          value={selectedExam}
          onChange={(e) =>
            setSelectedExam(e.target.value)
          }
          className="rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
        >
          {exams.map((exam) => (
            <option
              key={exam._id}
              value={exam._id}
            >
              {exam.examName}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          Loading result...
        </div>
      )}

      {/* Error */}

      {!loading && (!result || !result.success) && (
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <p className="text-red-600">
            {result?.message || "No result found."}
          </p>
        </div>
      )}

      {/* Result */}
      {!loading && result?.success && (
        <>
          {/* Summary Cards */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StudentResultCard
              title="Percentage"
              value={`${result.percentage}%`}
              color="blue"
            />

            <StudentResultCard
              title="Grade"
              value={result.grade}
              color="green"
            />

            <StudentResultCard
              title="Rank"
              value={result.rank ?? "-"}
              color="purple"
            />

            <StudentResultCard
              title="Result"
              value={result.result}
              color={
                result.result === "PASS"
                  ? "green"
                  : "red"
              }
            />
          </div>

          {/* Student Info */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Student Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Info
                label="Name"
                value={result.student.fullName}
              />

              <Info
                label="Admission No."
                value={result.student.admissionNo}
              />

              <Info
                label="Roll No."
                value={result.student.rollNo}
              />

              <Info
                label="Class"
                value={`${result.student.className} - ${result.student.section}`}
              />

              <Info
                label="Academic Session"
                value={result.academicSession.name}
              />

              <Info
                label="Exam"
                value={result.exam.name}
              />
            </div>
          </div>

          {/* Marks Table */}

          <StudentMarksTable result={result} />
        </>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value || "-"}
      </p>
    </div>
  );
}