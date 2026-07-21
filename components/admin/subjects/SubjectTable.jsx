"use client";

import { deleteSubject } from "@/app/actions/subjectActions";
import { Button } from "@/components/ui/button";

export default function SubjectTable({
  subjects,
  onEdit,
  onRefresh,
}) {
  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    const result = await deleteSubject(id);

    alert(result.message);

    if (result.success) {
      onRefresh();
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              Subject
            </th>

            <th className="px-4 py-3 text-left font-semibold">
              Code
            </th>

            <th className="px-4 py-3 text-left font-semibold">
              Classes
            </th>

            <th className="px-4 py-3 text-left font-semibold">
              Status
            </th>

            <th className="px-4 py-3 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {subjects.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-8 text-center text-slate-500"
              >
                No subjects found.
              </td>
            </tr>
          ) : (
            subjects.map((subject) => (
              <tr
                key={subject._id}
                className="border-t"
              >
                <td className="px-4 py-3 font-medium">
                  {subject.subjectName}
                </td>

                <td className="px-4 py-3">
                  {subject.subjectCode}
                </td>

                <td className="px-4 py-3">
                  {subject.applicableClasses.join(", ")}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      subject.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subject.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(subject)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDelete(subject._id)
                      }
                    >
                      Delete
                    </Button>
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