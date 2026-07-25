"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import {
  getTeachers,
  updateTeacherStatus,
} from "@/app/actions/teacherActions";

import TeacherTable from "@/components/admin/teachers/TeacherTable";
import TeacherDialog from "@/components/admin/teachers/TeacherDialog";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // ===================================
  // Load Teachers
  // ===================================

  async function loadTeachers() {
    try {
      const result = await getTeachers();

      if (result.success) {
        setTeachers(result.teachers);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error(error);
      setTeachers([]);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  // ===================================
  // Add Teacher
  // ===================================

  const handleAdd = () => {
    setSelectedTeacher(null);
    setOpen(true);
  };

  // ===================================
  // Edit Teacher
  // ===================================

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  // ===================================
  // Activate / Deactivate Teacher
  // ===================================

  const handleStatusChange = async (teacher) => {
    const newStatus =
      teacher.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const action =
      newStatus === "ACTIVE" ? "activate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${teacher.firstName} ${
        teacher.lastName || ""
      }?`,
    );

    if (!confirmed) return;

    try {
      const result = await updateTeacherStatus(
        teacher._id,
        newStatus,
      );

      if (result.success) {
        await loadTeachers();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  // ===================================
  // Search
  // ===================================

  const filteredTeachers = teachers.filter((teacher) => {
    const searchValue = search.toLowerCase();

    const fullName =
      `${teacher.firstName} ${teacher.lastName || ""}`.toLowerCase();

    const employeeId =
      teacher.employeeId?.toLowerCase() || "";

    const mobile =
      teacher.mobile?.toLowerCase() || "";

    const specialization =
      teacher.specialization?.toLowerCase() || "";

    return (
      fullName.includes(searchValue) ||
      employeeId.includes(searchValue) ||
      mobile.includes(searchValue) ||
      specialization.includes(searchValue)
    );
  });

  return (
    <div className="space-y-6">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Teachers</h2>

          <p className="text-slate-500">
            Manage all teacher records.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div className="relative max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search teacher..."
          className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-600"
        />
      </div>

      {/* ================================= */}
      {/* TABLE */}
      {/* ================================= */}

      <TeacherTable
        teachers={filteredTeachers}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      {/* ================================= */}
      {/* ADD / EDIT DIALOG */}
      {/* ================================= */}

      <TeacherDialog
        open={open}
        onOpenChange={setOpen}
        teacher={selectedTeacher}
        onSuccess={loadTeachers}
      />
    </div>
  );
}