import MarksManager from "@/components/teacher/MarksManager";

export default function TeacherResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Marks Entry
        </h1>

        <p className="mt-1 text-muted-foreground">
          Enter and manage examination marks for your class.
        </p>
      </div>

      <MarksManager />
    </div>
  );
}