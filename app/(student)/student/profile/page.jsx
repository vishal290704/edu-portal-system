import { getCurrentStudentProfile } from "@/app/actions/studentActions";

export default async function StudentProfilePage() {
  const student = await getCurrentStudentProfile();

  const fullName = `${student.firstName} ${student.lastName || ""}`.trim();

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {student.firstName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>

            <p className="text-gray-500">
              Admission No: {student.admissionNo}
            </p>

            <p className="text-gray-500">
              Roll No: {student.rollNo || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Academic Information
          </h2>

          <div className="space-y-3">
            <ProfileItem label="Class" value={student.className} />
            <ProfileItem label="Section" value={student.section} />
            <ProfileItem label="Status" value={student.status} />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Personal Information
          </h2>

          <div className="space-y-3">
            <ProfileItem label="Gender" value={student.gender} />
            <ProfileItem
              label="Date of Birth"
              value={new Date(student.dob).toLocaleDateString()}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Parents Information
          </h2>

          <div className="space-y-3">
            <ProfileItem
              label="Father's Name"
              value={student.fatherName}
            />
            <ProfileItem
              label="Mother's Name"
              value={student.motherName || "-"}
            />
            <ProfileItem
              label="Mobile"
              value={student.mobile || "-"}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Address
          </h2>

          <p className="text-gray-700">
            {student.address || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}