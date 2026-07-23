"use client";

import { useEffect, useState } from "react";

import { getStudentById } from "@/app/actions/markHelperActions";

export default function StudentInfoCard({ studentId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      if (!studentId) {
        setStudent(null);
        return;
      }

      const data = await getStudentById(studentId);
      setStudent(data);
    }

    loadStudent();
  }, [studentId]);

  if (!student) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-8 text-center text-gray-500">
        Select a student to view details.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Student Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <InfoItem
          label="Student Name"
          value={`${student.firstName} ${student.lastName || ""}`}
        />

        <InfoItem
          label="Admission No"
          value={student.admissionNo}
        />

        <InfoItem
          label="Roll No"
          value={student.rollNo || "-"}
        />

        <InfoItem
          label="Father Name"
          value={student.fatherName}
        />

        <InfoItem
          label="Class"
          value={student.className}
        />

        <InfoItem
          label="Section"
          value={student.section}
        />

      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}