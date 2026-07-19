import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Today's Classes",
    value: "4",
    icon: BookOpen,
  },
  {
    title: "Assigned Students",
    value: "128",
    icon: Users,
  },
  {
    title: "Attendance Pending",
    value: "2",
    icon: ClipboardCheck,
  },
  {
    title: "Pending Marks",
    value: "5",
    icon: FileText,
  },
];

const schedule = [
  {
    time: "09:00 AM",
    class: "Class 5A",
    subject: "English",
  },
  {
    time: "10:00 AM",
    class: "Class 6B",
    subject: "English",
  },
  {
    time: "11:30 AM",
    class: "Class 7A",
    subject: "English",
  },
  {
    time: "01:00 PM",
    class: "Class 8A",
    subject: "English",
  },
];

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

const activities = [
  "Attendance submitted for Class 5A",
  "Marks updated for Unit Test",
  "Student profile reviewed",
  "Homework shared with Class 7A",
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}

      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Good Morning 👋
            </h1>

            <p className="mt-2 text-muted-foreground">
              Welcome back! Here's an overview of your day.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-5 py-4">
            <CalendarDays className="h-6 w-6 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">Today</p>

              <p className="font-semibold">Monday, 20 July 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}

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
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

{/* Quick Actions */}

<Card>
  <CardContent className="p-6">
    <h2 className="mb-1 text-xl font-semibold">
      Quick Actions
    </h2>

    <p className="mb-6 text-sm text-muted-foreground">
      Frequently used actions.
    </p>

    <div className="grid gap-4 md:grid-cols-3">
      {quickActions.map((action) => {
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
      })}
    </div>
  </CardContent>
</Card>

      {/* Recent Activities */}

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Activities</h2>

              <p className="text-sm text-muted-foreground">
                Your latest actions in the portal.
              </p>
            </div>

            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border p-4"
              >
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>

                <p className="text-sm font-medium">{activity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
