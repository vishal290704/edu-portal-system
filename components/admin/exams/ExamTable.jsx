"use client";

import { Button } from "@/components/ui/button";

import { deleteExam } from "@/app/actions/examActions";

export default function ExamTable({
  exams,
  onEdit,
  onRefresh,
}) {
  async function handleDelete(id) {
    const confirmed = confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmed) return;

    const result = await deleteExam(id);

    alert(result.message);

    if (result.success) {
      onRefresh?.();
    }
  }

  if (exams.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
        No exams found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Exam</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Session</th>
            <th className="px-4 py-3 text-left">Classes</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {exams.map((exam) => (
            <tr
              key={exam._id}
              className="border-t"
            >
              <td className="px-4 py-3 font-medium">
                {exam.examName}
              </td>

              <td className="px-4 py-3">
                {exam.examType}
              </td>

              <td className="px-4 py-3">
                {exam.academicSession?.name}
              </td>

              <td className="px-4 py-3">
                {exam.applicableClasses.join(", ")}
              </td>

              <td className="px-4 py-3">
                {exam.startDate
                  ? new Date(
                      exam.startDate
                    ).toLocaleDateString()
                  : "-"}{" "}
                -{" "}
                {exam.endDate
                  ? new Date(
                      exam.endDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    exam.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {exam.status
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(exam)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleDelete(exam._id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}