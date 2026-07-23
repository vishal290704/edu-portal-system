"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";

import { CLASS_OPTIONS } from "@/constants/classes";

import {
  getActiveSession,
  getActiveSessionExams,
  getStudentsByClass,
} from "@/app/actions/markHelperActions";

export default function MarksFilters({
  onSelectionChange,
}) {
  const [activeSession, setActiveSession] =
    useState(null);

  const [examId, setExamId] = useState("");

  const [className, setClassName] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  const [exams, setExams] = useState([]);

  const [students, setStudents] =
    useState([]);

  // Load Active Session & Exams
  useEffect(() => {
    async function loadInitialData() {
      const session = await getActiveSession();

      const examList =
        await getActiveSessionExams();

      setActiveSession(session);

      setExams(examList);
    }

    loadInitialData();
  }, []);

  // Load students whenever class changes
  useEffect(() => {
    if (!className) {
      setStudents([]);
      setStudentId("");
      return;
    }

    async function loadStudents() {
      const data =
        await getStudentsByClass(className);

      setStudents(data);
    }

    loadStudents();
  }, [className]);

  // Send selected values to parent
  useEffect(() => {
    if (
      activeSession &&
      examId &&
      className &&
      studentId
    ) {
      onSelectionChange({
        academicSession: activeSession._id,
        exam: examId,
        className,
        student: studentId,
      });
    }
  }, [
    activeSession,
    examId,
    className,
    studentId,
    onSelectionChange,
  ]);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

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
          <Label>Examination</Label>

          <select
            value={examId}
            onChange={(e) =>
              setExamId(e.target.value)
            }
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Examination
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
            onChange={(e) =>
              setClassName(e.target.value)
            }
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

        {/* Student */}

        <div>
          <Label>Student</Label>

          <select
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.rollNo} - {student.firstName}{" "}
                {student.lastName}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
}