"use client";

import {
  deleteAcademicSession,
  setActiveAcademicSession,
} from "@/app/actions/academicSessionActions";

export default function AcademicSessionTable({
  sessions,
  onEdit,
  onRefresh,
}) {
  async function handleDelete(session) {
    const confirmDelete = window.confirm(
      `Delete "${session.name}" academic session?`
    );

    if (!confirmDelete) return;

    const result = await deleteAcademicSession(session._id);

    if (result.success) {
      onRefresh?.();
    } else {
      alert(result.message);
    }
  }

  async function handleActivate(session) {
    const result = await setActiveAcademicSession(session._id);

    if (result.success) {
      onRefresh?.();
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Academic Session</th>
            <th className="px-6 py-4 text-left">Duration</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-slate-500"
              >
                No academic sessions found.
              </td>
            </tr>
          ) : (
            sessions.map((session) => (
              <tr
                key={session._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium">
                  {session.name}
                </td>

                <td className="px-6 py-4">
                  {new Date(session.startDate).toLocaleDateString()} -{" "}
                  {new Date(session.endDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {session.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="space-x-3 px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit(session)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  {!session.isActive && (
                    <>
                      <button
                        onClick={() => handleDelete(session)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleActivate(session)}
                        className="text-green-600 hover:underline"
                      >
                        Activate
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}