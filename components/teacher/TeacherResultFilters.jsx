"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";

import { getTeacherExams } from "@/app/actions/examActions";
import { getTeacherStudents } from "@/app/actions/resultActions";

export default function TeacherResultFilters({ onStudentChange }) {
  const [academicSession, setAcademicSession] = useState(null);

  const [examId, setExamId] = useState("");

  const [studentId, setStudentId] = useState("");

  const [exams, setExams] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const examResponse = await getTeacherExams();

      console.log("Exam Response:", examResponse);

      if (examResponse.success) {
        setAcademicSession(examResponse.academicSession);
        setExams(examResponse.exams);
      }

      const studentResponse = await getTeacherStudents();

      console.log("Student Response:", studentResponse);

      if (studentResponse.success) {
        setStudents(studentResponse.students);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (examId && studentId && academicSession) {
      onStudentChange({
        academicSession: academicSession.id,
        exam: examId,
        student: studentId,
      });
    }
  }, [examId, studentId, academicSession, onStudentChange]);

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Academic Session */}

        <div>
          <Label>Academic Session</Label>

          <input
            disabled
            value={academicSession?.name || ""}
            className="mt-2 w-full rounded-md border bg-slate-100 px-3 py-2"
          />
        </div>

        {/* Exam */}

        <div>
          <Label>Exam</Label>

          <select
            className="mt-2 w-full rounded-md border px-3 py-2"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
          >
            <option value="">Select Exam</option>

            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.examName}
              </option>
            ))}
          </select>
        </div>

        {/* Student */}

        <div>
          <Label>Student</Label>

          <select
            className="mt-2 w-full rounded-md border px-3 py-2"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option
                key={student.id || student._id}
                value={student.id || student._id}
              >
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
