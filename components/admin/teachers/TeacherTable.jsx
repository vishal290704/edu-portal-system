"use client";

import { Pencil, UserCheck, UserX } from "lucide-react";

export default function TeacherTable({
  teachers,
  onEdit,
  onStatusChange,
}) {
  // ===================================
  // Empty State
  // ===================================

  if (!teachers || teachers.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No teachers found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Add a teacher to start managing teacher records.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* ================================= */}
          {/* TABLE HEADER */}
          {/* ================================= */}

          <thead className="bg-slate-50">
            <tr className="border-b">
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                Employee ID
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                Teacher
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                Qualification
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                Specialization
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* ================================= */}
          {/* TABLE BODY */}
          {/* ================================= */}

          <tbody>
            {teachers.map((teacher) => {
              const isActive = teacher.status === "ACTIVE";

              return (
                <tr
                  key={teacher._id}
                  className="border-b last:border-b-0 hover:bg-slate-50/70"
                >
                  {/* Employee ID */}

                  <td className="px-5 py-4">
                    <span className="font-medium text-slate-700">
                      {teacher.employeeId}
                    </span>
                  </td>

                  {/* Teacher */}

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {teacher.firstName} {teacher.lastName || ""}
                      </p>

                      {teacher.email && (
                        <p className="mt-0.5 text-xs text-slate-500">
                          {teacher.email}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Contact */}

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {teacher.mobile || "-"}
                  </td>

                  {/* Qualification */}

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {teacher.qualification || "-"}
                  </td>

                  {/* Specialization */}

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {teacher.specialization || "-"}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() => onEdit(teacher)}
                        title="Edit Teacher"
                        className="rounded-lg border p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Activate / Deactivate */}

                      <button
                        type="button"
                        onClick={() => onStatusChange(teacher)}
                        title={
                          isActive
                            ? "Deactivate Teacher"
                            : "Activate Teacher"
                        }
                        className={`rounded-lg border p-2 transition ${
                          isActive
                            ? "text-red-600 hover:border-red-200 hover:bg-red-50"
                            : "text-green-600 hover:border-green-200 hover:bg-green-50"
                        }`}
                      >
                        {isActive ? (
                          <UserX size={17} />
                        ) : (
                          <UserCheck size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}