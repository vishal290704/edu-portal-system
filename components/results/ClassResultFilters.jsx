"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";

import { CLASS_OPTIONS } from "@/constants/classes";

import {
  getActiveSession,
  getActiveSessionExams,
  getSectionsByClass,
} from "@/app/actions/markHelperActions";

export default function ClassResultFilters({
  onFilterChange,
}) {
  const [activeSession, setActiveSession] = useState(null);

  const [examId, setExamId] = useState("");

  const [className, setClassName] = useState("");

  const [section, setSection] = useState("");

  const [exams, setExams] = useState([]);

  const [sections, setSections] = useState([]);

  // ===================================
  // Initial Load
  // ===================================

  useEffect(() => {
    async function loadData() {
      const session = await getActiveSession();

      const exams = await getActiveSessionExams();

      setActiveSession(session);

      setExams(exams);
    }

    loadData();
  }, []);

  // ===================================
  // Load Sections
  // ===================================

  useEffect(() => {
    if (!className) {
      setSections([]);
      setSection("");
      return;
    }

    async function loadSections() {
      const data = await getSectionsByClass(className);

      setSections(data);
    }

    loadSections();
  }, [className]);

  // ===================================
  // Notify Parent
  // ===================================

  useEffect(() => {
    if (
      activeSession &&
      examId &&
      className &&
      section
    ) {
      onFilterChange({
        academicSession: activeSession._id,
        exam: examId,
        className,
        section,
      });
    }
  }, [
    activeSession,
    examId,
    className,
    section,
    onFilterChange,
  ]);

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        {/* Academic Session */}

        <div>
          <Label>Academic Session</Label>

          <input
            disabled
            value={activeSession?.name || ""}
            className="mt-2 w-full rounded-md border bg-slate-100 px-3 py-2"
          />
        </div>

        {/* Exam */}

        <div>
          <Label>Exam</Label>

          <select
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Exam
            </option>

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

        {/* Class */}

        <div>
          <Label>Class</Label>

          <select
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
              setSection("");
            }}
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Class
            </option>

            {CLASS_OPTIONS.map((cls) => (
              <option
                key={cls}
                value={cls}
              >
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Section */}

        <div>
          <Label>Section</Label>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            disabled={!className}
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Section
            </option>

            {sections.map((sec) => (
              <option
                key={sec}
                value={sec}
              >
                {sec}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}