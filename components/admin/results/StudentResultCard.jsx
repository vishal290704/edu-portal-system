"use client";

export default function StudentResultCard({ result }) {
  if (!result) {
    return (
      <div className="mt-6 rounded-xl border border-dashed bg-white p-12 text-center text-gray-500">
        Select an exam, class and student to view the result.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">Student Result</h2>

        <p className="mt-1 text-sm text-gray-500">Result Summary</p>
      </div>

      {/* Marks Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left">Subject</th>

              <th className="px-5 py-3 text-center">Code</th>

              <th className="px-5 py-3 text-center">Obtained</th>

              <th className="px-5 py-3 text-center">Maximum</th>

              <th className="px-5 py-3 text-left">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {result.subjects.map((subject) => (
              <tr key={subject.id} className="border-t">
                <td className="px-5 py-3">{subject.subject}</td>

                <td className="px-5 py-3 text-center">{subject.code}</td>

                <td className="px-5 py-3 text-center font-medium">
                  {subject.obtained}
                </td>

                <td className="px-5 py-3 text-center">{subject.maximum}</td>

                <td className="px-5 py-3">{subject.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}

      <div className="border-t bg-slate-50 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Total Marks</p>

            <h3 className="mt-1 text-xl font-bold">
              {result.totalObtained} / {result.totalMaximum}
            </h3>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Percentage</p>

            <h3 className="mt-1 text-xl font-bold">{result.percentage}%</h3>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Grade</p>

            <h3 className="mt-1 text-xl font-bold">{result.grade}</h3>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Result</p>

            <h3
              className={`mt-1 text-xl font-bold ${
                result.result === "PASS" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.result}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
