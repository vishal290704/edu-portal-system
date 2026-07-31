export default function StudentMarksTable({ result }) {
  if (!result?.subjects?.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <p className="text-slate-500">
          No marks available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left">
              Subject
            </th>

            <th className="px-5 py-3 text-center">
              Code
            </th>

            <th className="px-5 py-3 text-center">
              Obtained
            </th>

            <th className="px-5 py-3 text-center">
              Maximum
            </th>

            <th className="px-5 py-3 text-center">
              Percentage
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
              className="border-t hover:bg-slate-50"
            >
              <td className="px-5 py-3 font-medium">
                {subject.subject}
              </td>

              <td className="px-5 py-3 text-center">
                {subject.code}
              </td>

              <td className="px-5 py-3 text-center">
                {subject.obtained}
              </td>

              <td className="px-5 py-3 text-center">
                {subject.maximum}
              </td>

              <td className="px-5 py-3 text-center">
                {subject.percentage}%
              </td>

              <td className="px-5 py-3 text-center font-semibold">
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

            <td></td>

            <td className="px-5 py-3 text-center">
              {result.totalObtained}
            </td>

            <td className="px-5 py-3 text-center">
              {result.totalMaximum}
            </td>

            <td className="px-5 py-3 text-center">
              {result.percentage}%
            </td>

            <td className="px-5 py-3 text-center">
              {result.grade}
            </td>

            <td className="px-5 py-3 text-center">
              {result.result}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}