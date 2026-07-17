"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import StudentDialog from "@/components/admin/students/StudentDialog";
import { getStudents } from "@/app/actions/studentActions";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  async function loadStudents() {
    const data = await getStudents();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = () => {
    setSelectedStudent(null);
    setOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.lastName || ""}`.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Students</h2>

          <p className="text-slate-500">Manage all student records.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Search */}

      <div className="relative max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search student..."
          className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-600"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Admission No.</th>

              <th className="px-6 py-4 text-left">Student Name</th>

              <th className="px-6 py-4 text-left">Class</th>

              <th className="px-6 py-4 text-left">Section</th>

              <th className="px-6 py-4 text-left">Mobile</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{student.admissionNo}</td>

                  <td className="px-6 py-4 font-medium">
                    {student.firstName} {student.lastName}
                  </td>

                  <td className="px-6 py-4">{student.className}</td>

                  <td className="px-6 py-4">{student.section}</td>

                  <td className="px-6 py-4">{student.mobile}</td>

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
              ))
            )}
          </tbody>
        </table>
      </div>

      <StudentDialog
        open={open}
        onOpenChange={setOpen}
        student={selectedStudent}
        onSuccess={loadStudents}
      />
    </div>
  );
}
