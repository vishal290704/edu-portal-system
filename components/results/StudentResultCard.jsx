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

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="border-b p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Student Result
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {result.exam?.name} • Academic Session{" "}
              {result.academicSession?.name}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Rank:{" "}
            <span className="font-semibold text-gray-900">
              {result.rank ?? "-"}
            </span>
          </div>

        </div>
      </div>


      {/* ============================= */}
      {/* Student Details */}
      {/* ============================= */}

      <div className="border-b bg-slate-50 p-6">

        <h3 className="mb-4 font-semibold">
          Student Information
        </h3>

        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs text-gray-500">
              Student Name
            </p>

            <p className="font-medium">
              {result.student?.fullName || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Admission No.
            </p>

            <p className="font-medium">
              {result.student?.admissionNo || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Roll No.
            </p>

            <p className="font-medium">
              {result.student?.rollNo || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Class
            </p>

            <p className="font-medium">
              {result.student?.className || "-"}
              {result.student?.section
                ? ` - ${result.student.section}`
                : ""}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Father's Name
            </p>

            <p className="font-medium">
              {result.student?.fatherName || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Mother's Name
            </p>

            <p className="font-medium">
              {result.student?.motherName || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Examination
            </p>

            <p className="font-medium">
              {result.exam?.name || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500">
              Academic Session
            </p>

            <p className="font-medium">
              {result.academicSession?.name || "-"}
            </p>
          </div>

        </div>
      </div>


      {/* ============================= */}
      {/* Marks Table */}
      {/* ============================= */}

      <div className="overflow-x-auto">

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

              <th className="px-5 py-3 text-left">
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

                <td className="px-5 py-3 font-medium">
                  {subject.subject}
                </td>


                <td className="px-5 py-3 text-center text-gray-600">
                  {subject.code || "-"}
                </td>


                <td className="px-5 py-3 text-center font-semibold">
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


                <td className="px-5 py-3">
                  {subject.remarks || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      
      {/* Result Summary */}
      <div className="border-t bg-slate-50 p-6">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* Total */}

          <div className="rounded-lg border bg-white p-4">

            <p className="text-sm text-gray-500">
              Total Marks
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {result.totalObtained} /{" "}
              {result.totalMaximum}
            </h3>

          </div>


          {/* Percentage */}

          <div className="rounded-lg border bg-white p-4">

            <p className="text-sm text-gray-500">
              Percentage
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {result.percentage}%
            </h3>

          </div>


          {/* Grade */}

          <div className="rounded-lg border bg-white p-4">

            <p className="text-sm text-gray-500">
              Overall Grade
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {result.grade}
            </h3>

          </div>


          {/* Rank */}

          <div className="rounded-lg border bg-white p-4">

            <p className="text-sm text-gray-500">
              Rank
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {result.rank ?? "-"}
            </h3>

          </div>


          {/* Result */}

          <div className="rounded-lg border bg-white p-4">

            <p className="text-sm text-gray-500">
              Result
            </p>

            <h3
              className={`mt-1 text-xl font-bold ${
                result.result === "PASS"
                  ? "text-green-600"
                  : "text-red-600"
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