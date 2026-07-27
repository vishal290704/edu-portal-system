import AttendanceManager from "@/components/teacher/AttendanceManager";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Attendance
        </h1>

        <p className="mt-1 text-muted-foreground">
          Mark and manage daily student attendance.
        </p>
      </div>

      <AttendanceManager />
    </div>
  );
}