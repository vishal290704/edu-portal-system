"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveBulkMarks } from "@/app/actions/markActions";
import { CLASS_OPTIONS } from "@/constants/classes";

import {
  getActiveSession,
  getActiveSessionExams,
  getStudentsByClass,
  getSubjectsByClass,
} from "@/app/actions/markHelperActions";

export default function BulkMarksForm() {
  const [activeSession, setActiveSession] = useState(null);

  const [examId, setExamId] = useState("");

  const [className, setClassName] = useState("");

  const [subjectId, setSubjectId] = useState("");

  const [maximumMarks, setMaximumMarks] = useState(100);

  const [exams, setExams] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [students, setStudents] = useState([]);

  const [marks, setMarks] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const session = await getActiveSession();

      const exams = await getActiveSessionExams();

      setActiveSession(session);

      setExams(exams);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!className) return;

    async function loadClassData() {
      const students = await getStudentsByClass(className);

      const subjects = await getSubjectsByClass(className);

      setStudents(students);

      setSubjects(subjects);
    }

    loadClassData();
  }, [className]);

  function handleMarksChange(studentId, value) {
    setMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  }

  async function handleSave() {
    if (!activeSession) {
      alert("Active academic session not found.");
      return;
    }

    if (students.length === 0) {
      alert("No students found.");
      return;
    }
    if (!examId) {
      alert("Please select an exam.");
      return;
    }

    if (!subjectId) {
      alert("Please select a subject.");
      return;
    }

    const payload = students.map((student) => ({
      student: student._id,
      studentName: `${student.firstName} ${student.lastName}`,
      obtainedMarks: marks[student._id] ?? "",
    }));
    setSaving(true);

    const result = await saveBulkMarks({
      academicSession: activeSession._id,
      exam: examId,
      subject: subjectId,
      maximumMarks,
      marks: payload,
    });
    setSaving(false);

    alert(result.message);

    if (result.success) {
      setMarks({});
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label>Academic Session</Label>

          <Input value={activeSession?.name || ""} disabled />
        </div>

        <div>
          <Label>Exam</Label>

          <select
            className="w-full rounded-md border px-3 py-2"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
          >
            <option value="">Select Exam</option>

            {exams.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.examName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Class</Label>

          <select
            className="w-full rounded-md border px-3 py-2"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>

            {CLASS_OPTIONS.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Subject</Label>

          <select
            className="w-full rounded-md border px-3 py-2"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Maximum Marks */}

      <div className="max-w-xs">
        <Label>Maximum Marks</Label>

        <Input
          type="number"
          value={maximumMarks}
          onChange={(e) => setMaximumMarks(e.target.value)}
        />
      </div>

      {/* Students Table */}

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Roll No.</th>

              <th className="px-6 py-4 text-left">Admission No.</th>

              <th className="px-6 py-4 text-left">Student</th>

              <th className="px-6 py-4 text-center">Marks</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">
                  Select a class to load students.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="px-6 py-4">{student.rollNo}</td>

                  <td className="px-6 py-4">{student.admissionNo}</td>

                  <td className="px-6 py-4 font-medium">
                    {student.firstName} {student.lastName}
                  </td>

                  <td className="px-6 py-4">
                    <Input
                      type="number"
                      min={0}
                      max={maximumMarks}
                      value={marks[student._id] || ""}
                      onChange={(e) =>
                        handleMarksChange(student._id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Marks"}
        </Button>
      </div>
    </div>
  );
}
