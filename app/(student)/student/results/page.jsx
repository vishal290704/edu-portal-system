import {
  getCurrentStudentResult,
} from "@/app/actions/resultActions";

import {
  getActiveSessionExams,
} from "@/app/actions/markHelperActions";

export default async function StudentResultsPage({
  searchParams,
}) {
  const exams = await getActiveSessionExams();

  const selectedExam =
    searchParams?.exam || exams?.[0]?._id || "";

  let result = null;

  if (selectedExam) {
    result = await getCurrentStudentResult(selectedExam);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          My Results
        </h1>

        <p className="text-slate-500">
          View your examination results.
        </p>
      </div>

      {/* Exam Selector */}

      <form>
        <select
          name="exam"
          defaultValue={selectedExam}
          className="rounded-xl border px-4 py-3"
          onChange={(e) => e.target.form.submit()}
        >
          {exams.map((exam) => (
            <option
              key={exam._id}
              value={exam._id}
            >
              {exam.examName}
            </option>
          ))}
        </select>
      </form>

      {/* Result */}

      {!result?.success ? (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-red-600">
            {result?.message || "No result found."}
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}

          <div className="grid gap-5 md:grid-cols-4">
            <Card
              title="Percentage"
              value={`${result.percentage}%`}
            />

            <Card
              title="Grade"
              value={result.grade}
            />

            <Card
              title="Rank"
              value={result.rank || "-"}
            />

            <Card
              title="Result"
              value={result.result}
            />
          </div>

          {/* Marks Table */}

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-5 py-3 text-left">
                    Subject
                  </th>

                  <th className="px-5 py-3 text-center">
                    Marks
                  </th>

                  <th className="px-5 py-3 text-center">
                    Grade
                  </th>

                  <th className="px-5 py-3 text-center">
                    Remarks
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-t"
                  >
                    <td className="px-5 py-3">
                      {subject.subject}
                    </td>

                    <td className="px-5 py-3 text-center">
                      {subject.obtained}/
                      {subject.maximum}
                    </td>

                    <td className="px-5 py-3 text-center">
                      {subject.grade}
                    </td>

                    <td className="px-5 py-3 text-center">
                      {subject.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-slate-50 font-semibold">
                <tr>
                  <td className="px-5 py-3">
                    Total
                  </td>

                  <td className="px-5 py-3 text-center">
                    {result.totalObtained}/
                    {result.totalMaximum}
                  </td>

                  <td></td>

                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}