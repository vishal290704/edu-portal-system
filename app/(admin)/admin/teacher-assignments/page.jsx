import TeacherAssignments from "@/components/admin/teacher-assignments/TeacherAssignments";

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Teacher Assignments
        </h1>

        <p className="mt-1 text-slate-500">
          Assign teachers to subjects for each class and section.
        </p>
      </div>

      <TeacherAssignments />
    </div>
  );
}