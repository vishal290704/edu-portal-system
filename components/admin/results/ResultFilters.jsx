"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";

import { CLASS_OPTIONS } from "@/constants/classes";

import {
  getActiveSession,
  getActiveSessionExams,
  getStudentsByClass,
} from "@/app/actions/markHelperActions";

export default function ResultFilters({
  onStudentChange,
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

  useEffect(() => {
    async function loadData() {
      const session = await getActiveSession();

      const exams =
        await getActiveSessionExams();

      setActiveSession(session);

      setExams(exams);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!className) {
      setStudents([]);
      return;
    }

    async function loadStudents() {
      const data =
        await getStudentsByClass(className);

      setStudents(data);
    }

    loadStudents();
  }, [className]);

  useEffect(() => {
    if (
      examId &&
      className &&
      studentId &&
      activeSession
    ) {
      onStudentChange({
        academicSession: activeSession._id,
        exam: examId,
        student: studentId,
      });
    }
  }, [
    examId,
    className,
    studentId,
    activeSession,
    onStudentChange,
  ]);

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <Label>Academic Session</Label>

          <input
            disabled
            value={activeSession?.name || ""}
            className="mt-2 w-full rounded-md border bg-slate-100 px-3 py-2"
          />
        </div>

        <div>
          <Label>Exam</Label>

          <select
            className="mt-2 w-full rounded-md border px-3 py-2"
            value={examId}
            onChange={(e) =>
              setExamId(e.target.value)
            }
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

        <div>
          <Label>Class</Label>

          <select
            className="mt-2 w-full rounded-md border px-3 py-2"
            value={className}
            onChange={(e) =>
              setClassName(e.target.value)
            }
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

        <div>
          <Label>Student</Label>

          <select
            className="mt-2 w-full rounded-md border px-3 py-2"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.firstName}{" "}
                {student.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}