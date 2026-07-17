"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import StudentDialog from "@/components/admin/students/StudentDialog";
import {
  getStudents,
  deleteStudent,
} from "@/app/actions/studentActions";
import StudentTable from "@/components/admin/students/StudentTable";

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

const handleDelete = async (student) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
  );

  if (!confirmed) return;

  try {
    const result = await deleteStudent(student._id);

    if (result.success) {
      await loadStudents();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
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

      <StudentTable
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StudentDialog
        open={open}
        onOpenChange={setOpen}
        student={selectedStudent}
        onSuccess={loadStudents}
      />
    </div>
  );
}
