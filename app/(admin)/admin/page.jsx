import {
  Users,
  FileText,
  ClipboardList,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "486",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Results Published",
    value: "8",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Admission Enquiries",
    value: "12",
    icon: ClipboardList,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Success Rate",
    value: "98%",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentStudents = [
  {
    name: "Aarav Sharma",
    class: "Class 5",
    admission: "DES24001",
  },
  {
    name: "Ananya Singh",
    class: "Class 3",
    admission: "DES24002",
  },
  {
    name: "Rohan Verma",
    class: "Class 7",
    admission: "DES24003",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-slate-600">
          Here's a quick overview of your school.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`rounded-xl p-3 ${item.color}`}
                >
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h3 className="text-xl font-semibold">
              Recently Added Students
            </h3>

            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
              View All
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="space-y-4">

            {recentStudents.map((student) => (
              <div
                key={student.admission}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <h4 className="font-semibold">
                    {student.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {student.class}
                  </p>
                </div>

                <span className="text-sm font-medium text-slate-500">
                  {student.admission}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h3 className="mb-6 text-xl font-semibold">
            Quick Actions
          </h3>

          <div className="grid gap-4">

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
              Add Student
            </button>

            <button className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-100">
              Publish Results
            </button>

            <button className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-100">
              View Admissions
            </button>

            <button className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-100">
              Website Settings
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}