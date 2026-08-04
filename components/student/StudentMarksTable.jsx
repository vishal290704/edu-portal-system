export default function StudentMarksTable({ result }) {
  if (!result?.subjects?.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <p className="text-slate-500">No marks available.</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left">Subject</th>

            <th className="px-5 py-3 text-center">Code</th>

            <th className="px-5 py-3 text-center">Obtained</th>

            <th className="px-5 py-3 text-center">Maximum</th>

            <th className="px-5 py-3 text-center">Percentage</th>

            <th className="px-5 py-3 text-center">Grade</th>

            <th className="px-5 py-3 text-center">Remarks</th>
          </tr>
        </thead>

        <tbody>
          {result.subjects.map((subject) => (
            <tr key={subject.id} className="border-t align-top">
              <td className="px-5 py-3">
                <div className="font-medium">{subject.subject}</div>

                {subject.exams?.length > 1 && (
                  <div className="mt-2 space-y-1 text-xs text-slate-500">
                    {subject.exams.map((exam) => (
                      <div key={exam.examId} className="flex justify-between">
                        <span>{exam.examName}</span>

                        <span>
                          {exam.obtained}/{exam.maximum}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </td>

              <td className="px-5 py-3 text-center">{subject.code}</td>

              <td className="px-5 py-3 text-center font-semibold">
                {subject.obtained}
              </td>

              <td className="px-5 py-3 text-center font-semibold">
                {subject.maximum}
              </td>

              <td className="px-5 py-3 text-center">{subject.percentage}%</td>

              <td className="px-5 py-3 text-center font-semibold">
                {subject.grade}
              </td>

              <td className="px-5 py-3 text-center">{subject.remarks}</td>
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-slate-50 font-semibold">
          <tr>
            <td className="px-5 py-3">Total</td>

            <td></td>

            <td className="px-5 py-3 text-center">{result.totalObtained}</td>

            <td className="px-5 py-3 text-center">{result.totalMaximum}</td>

            <td className="px-5 py-3 text-center">{result.percentage}%</td>

            <td className="px-5 py-3 text-center">{result.grade}</td>

            <td className="px-5 py-3 text-center">{result.result}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}


