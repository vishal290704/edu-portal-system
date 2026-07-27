import {
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { getCurrentTeacherStudents } from "@/app/actions/studentActions";

export default async function TeacherStudentsPage() {
  const result =
    await getCurrentTeacherStudents();

  const students = result.students || [];
  const assignments =
    result.assignments || [];
  const session = result.session || null;

  // ===================================
  // Unique Classes
  // ===================================

  const classMap = new Map();

  assignments.forEach((assignment) => {
    const key =
      `${assignment.className}-${assignment.section}`;

    if (!classMap.has(key)) {
      classMap.set(key, {
        className: assignment.className,
        section: assignment.section,
      });
    }
  });

  const classes = Array.from(
    classMap.values()
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Students
        </h1>

        <p className="mt-1 text-muted-foreground">
          Students from your assigned
          classes and sections.
        </p>
      </div>

      {/* Error */}

      {!result.success && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {result.message}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Students
              </p>

              <p className="mt-2 text-3xl font-bold">
                {students.length}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Assigned Classes
              </p>

              <p className="mt-2 text-3xl font-bold">
                {classes.length}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Academic Session
              </p>

              <p className="mt-2 text-xl font-bold">
                {session?.name || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Assigned Classes */}

      {classes.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold">
              Assigned Classes
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {classes.map((item) => (
                <div
                  key={`${item.className}-${item.section}`}
                  className="rounded-lg border bg-muted/40 px-4 py-2 text-sm font-medium"
                >
                  Class {item.className}-
                  {item.section}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students Table */}

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Student List
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Only students from your
              assigned classes are shown.
            </p>
          </div>

          {students.length === 0 ? (
            <div className="p-10 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-4 font-medium">
                No students found
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                There are currently no
                active students in your
                assigned classes.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="border-b text-left">
                    <th className="px-6 py-4 font-medium">
                      Roll No.
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Admission No.
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Student
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Class
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Section
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Father Name
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map(
                    (student) => (
                      <tr
                        key={student._id}
                        className="border-b last:border-0"
                      >
                        <td className="px-6 py-4">
                          {student.rollNo ||
                            "—"}
                        </td>

                        <td className="px-6 py-4">
                          {
                            student.admissionNo
                          }
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {
                            student.firstName
                          }{" "}
                          {student.lastName ||
                            ""}
                        </td>

                        <td className="px-6 py-4">
                          {
                            student.className
                          }
                        </td>

                        <td className="px-6 py-4">
                          {student.section}
                        </td>

                        <td className="px-6 py-4">
                          {student.fatherName ||
                            "—"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}