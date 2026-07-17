import Link from "next/link";
import {
  Users,
  User,
  UserCheck,
  Plus,
  ClipboardList,
  FileText,
  Settings,
  ArrowRight,
} from "lucide-react";

import { getDashboardData } from "@/app/actions/dashboardActions";

export default async function DashboardPage() {
  const { stats: dashboardStats, recentStudents } =
    await getDashboardData();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = [
    {
      title: "Total Students",
      value: dashboardStats.totalStudents,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Boys",
      value: dashboardStats.boys,
      icon: User,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Girls",
      value: dashboardStats.girls,
      icon: UserCheck,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Active Students",
      value: dashboardStats.activeStudents,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
  ];

  const quickActions = [
    {
      title: "Add Student",
      description: "Register a new student",
      href: "/admin/students",
      icon: Plus,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Admissions",
      description: "Manage enquiries",
      href: "/admin/admissions",
      icon: ClipboardList,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Results",
      description: "Publish report cards",
      href: "/admin/results",
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Settings",
      description: "School configuration",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {greeting}
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome back, Admin. Here's a quick overview of your school.
          </p>
        </div>

        <div className="rounded-xl border bg-white px-5 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Today
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {today}
          </p>
        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${item.color}`}
                >
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>
            {/* Main Content */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Students */}

        <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold text-slate-900">
                Recently Added Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest student registrations.
              </p>

            </div>

            <Link
              href="/admin/students"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          {recentStudents.length === 0 ? (

            <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed">

              <Users className="mb-3 text-slate-300" size={48} />

              <h3 className="text-lg font-semibold text-slate-700">
                No Students Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your first student to get started.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-xl border">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                      Student
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                      Admission No.
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                      Class
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentStudents.map((student) => (

                    <tr
                      key={student._id}
                      className="border-t transition hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">

                            {student.firstName?.charAt(0)}
                            {student.lastName?.charAt(0)}

                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {student.firstName} {student.lastName}
                            </p>

                            <p className="text-sm text-slate-500">
                              Student
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {student.admissionNo}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.className} - {student.section}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
                {/* Quick Actions */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used shortcuts.
            </p>

          </div>

          <div className="space-y-4">

            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`rounded-xl p-3 ${action.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {action.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {action.description}
                      </p>

                    </div>

                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}