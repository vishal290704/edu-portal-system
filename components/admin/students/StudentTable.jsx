"use client";

export default function StudentTable({
  students,
  onEdit,
  onDelete,
  onActivatePortal,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Admission No.</th>
            <th className="px-6 py-4 text-left">Student Name</th>
            <th className="px-6 py-4 text-left">Class</th>
            <th className="px-6 py-4 text-left">Section</th>
            <th className="px-6 py-4 text-left">Mobile</th>
            <th className="px-6 py-4 text-center">Portal</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-slate-500">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-4">{student.admissionNo}</td>

                <td className="px-6 py-4 font-medium">
                  {student.firstName} {student.lastName}
                </td>

                <td className="px-6 py-4">{student.className}</td>

                <td className="px-6 py-4">{student.section}</td>

                <td className="px-6 py-4">{student.mobile}</td>

                <td className="px-6 py-4 text-center">
                  {student.portalActivated ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      Not Activated
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex flex-nowrap items-center justify-center gap-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                    {!student.portalActivated && (
                      <button
                        onClick={() => onActivatePortal(student)}
                        className="text-green-600 hover:underline"
                      >
                        Activate Portal
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
