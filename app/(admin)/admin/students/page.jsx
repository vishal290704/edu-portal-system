"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import StudentDialog from "@/components/admin/students/StudentDialog";

const students = [
  {
    id: 1,
    admissionNo: "DES24001",
    name: "Aarav Sharma",
    class: "5",
    section: "A",
    mobile: "9876543210",
  },
  {
    id: 2,
    admissionNo: "DES24002",
    name: "Ananya Singh",
    class: "3",
    section: "B",
    mobile: "9123456780",
  },
  {
    id: 3,
    admissionNo: "DES24003",
    name: "Rohan Verma",
    class: "7",
    section: "A",
    mobile: "9988776655",
  },
];

export default function StudentsPage() {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAdd = () => {
    setSelectedStudent(null);
    setOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Students</h2>
          <p className="text-slate-500">
            Manage all student records.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search student..."
          className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-600"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Admission No.</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Class</th>
              <th className="px-6 py-4 text-left">Section</th>
              <th className="px-6 py-4 text-left">Mobile</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {student.admissionNo}
                </td>

                <td className="px-6 py-4 font-medium">
                  {student.name}
                </td>

                <td className="px-6 py-4">
                  {student.class}
                </td>

                <td className="px-6 py-4">
                  {student.section}
                </td>

                <td className="px-6 py-4">
                  {student.mobile}
                </td>

                <td className="space-x-3 px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StudentDialog
        open={open}
        onOpenChange={setOpen}
        student={selectedStudent}
      />
    </div>
  );
}