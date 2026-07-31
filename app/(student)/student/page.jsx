export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Student Dashboard
        </h2>

        <p className="text-muted-foreground">
          Welcome to the Dynamic English School Student Portal.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">
            Overall Percentage
          </h3>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">
            Current Class
          </h3>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">
            Latest Exam
          </h3>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">
            Result Status
          </h3>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>
      </div>
    </div>
  );
}