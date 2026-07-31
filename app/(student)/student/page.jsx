import { User, GraduationCap, Hash, BadgeCheck } from "lucide-react";

import { getCurrentStudent } from "@/app/actions/studentActions";

export default async function StudentDashboard() {
  const result = await getCurrentStudent();

  if (!result.success) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-red-600">{result.message}</h2>
      </div>
    );
  }

  const student = result.student;

  return (
    <div className="space-y-6">
      {/* Welcome */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow">
        <h1 className="text-3xl font-bold">Welcome, {student.firstName} 👋</h1>

        <p className="mt-2 text-blue-100">
          Welcome to Dynamic English School Student Portal.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<GraduationCap size={28} />}
          title="Class"
          value={`${student.className} - ${student.section}`}
        />

        <StatCard
          icon={<Hash size={28} />}
          title="Roll Number"
          value={student.rollNo}
        />

        <StatCard
          icon={<User size={28} />}
          title="Admission No."
          value={student.admissionNo}
        />

        <StatCard
          icon={<BadgeCheck size={28} />}
          title="Status"
          value={student.status}
        />
      </div>

      {/* Student Information */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Student Information</h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Info
            label="Full Name"
            value={`${student.firstName} ${student.lastName || ""}`}
          />

          <Info label="Admission Number" value={student.admissionNo} />

          <Info label="Roll Number" value={student.rollNo} />

          <Info label="Class" value={student.className} />

          <Info label="Section" value={student.section} />

          <Info label="Gender" value={student.gender} />

          <Info
            label="Date of Birth"
            value={
              student.dob
                ? new Date(student.dob).toLocaleDateString("en-IN")
                : "-"
            }
          />

          <Info label="Father's Name" value={student.fatherName} />

          <Info label="Mother's Name" value={student.motherName} />

          <Info label="Mobile Number" value={student.mobile} />

          <Info label="Address" value={student.address} />

          <Info label="Account Status" value={student.status} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-blue-600">{icon}</div>

        <p className="text-sm text-slate-500">{title}</p>
      </div>

      <h3 className="text-2xl font-bold">{value || "-"}</h3>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}
