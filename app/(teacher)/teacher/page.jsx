import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { getCurrentTeacherAssignments } from "@/app/actions/teacherAssignmentActions";

const quickActions = [
  {
    title: "Take Attendance",
    href: "/teacher/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Enter Marks",
    href: "/teacher/results",
    icon: FileText,
  },
  {
    title: "View Students",
    href: "/teacher/students",
    icon: GraduationCap,
  },
];

export default async function TeacherDashboard() {
  const result =
    await getCurrentTeacherAssignments();

  const teacher = result.teacher || null;
  const session = result.session || null;
  const assignments =
    result.assignments || [];

  // ===================================
  // Unique Classes
  // ===================================

  const uniqueClasses = new Set(
    assignments.map(
      (assignment) =>
        `${assignment.className}-${assignment.section}`
    )
  );

  // ===================================
  // Dashboard Statistics
  // ===================================

  const stats = [
    {
      title: "Assigned Classes",
      value: uniqueClasses.size,
      icon: Users,
    },
    {
      title: "Assigned Subjects",
      value: assignments.length,
      icon: BookOpen,
    },
    {
      title: "Attendance",
      value: "—",
      icon: ClipboardCheck,
    },
    {
      title: "Marks",
      value: "—",
      icon: FileText,
    },
  ];

  // ===================================
  // Current Date
  // ===================================

  const today = new Intl.DateTimeFormat(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(new Date());

  return (
    <div className="space-y-8">
      {/* ===================================
          Hero
      =================================== */}

      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome
              {teacher
                ? `, ${teacher.firstName}`
                : ""}
              👋
            </h1>

            <p className="mt-2 text-muted-foreground">
              Here's an overview of your
              teaching assignments.
            </p>

            {session && (
              <p className="mt-2 text-sm font-medium text-primary">
                Academic Session:{" "}
                {session.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-5 py-4">
            <CalendarDays className="h-6 w-6 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Today
              </p>

              <p className="font-semibold">
                {today}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================
          Error / No Session
      =================================== */}

      {!result.success && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {result.message}
            </p>
          </CardContent>
        </Card>
      )}

      {/* ===================================
          Statistics
      =================================== */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* ===================================
          My Teaching Assignments
      =================================== */}

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              My Teaching Assignments
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Classes and subjects assigned
              to you for the active academic
              session.
            </p>
          </div>

          {assignments.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">
                No teaching assignments
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                No classes or subjects have
                been assigned to you yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {assignments.map(
                (assignment) => (
                  <div
                    key={assignment._id}
                    className="rounded-xl border p-5 transition hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Class
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {
                            assignment.className
                          }
                          -
                          {
                            assignment.section
                          }
                        </h3>
                      </div>

                      <div className="rounded-lg bg-primary/10 p-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-sm text-muted-foreground">
                        Subject
                      </p>

                      <p className="mt-1 font-semibold">
                        {assignment.subject
                          ?.subjectName ||
                          "Subject unavailable"}
                      </p>

                      {assignment.subject
                        ?.subjectCode && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {
                            assignment
                              .subject
                              .subjectCode
                          }
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===================================
          Quick Actions
      =================================== */}

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-1 text-xl font-semibold">
            Quick Actions
          </h2>

          <p className="mb-6 text-sm text-muted-foreground">
            Frequently used teaching
            modules.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map(
              (action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="flex items-center gap-4 rounded-xl border p-5 transition hover:bg-muted"
                  >
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {action.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Open Module
                      </p>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}