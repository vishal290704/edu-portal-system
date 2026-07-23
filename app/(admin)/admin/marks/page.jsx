"use client";

import { useCallback, useState } from "react";

import MarksFilters from "@/components/admin/marks/MarksFilters";
import StudentInfoCard from "@/components/admin/marks/StudentInfoCard";
import StudentMarksForm from "@/components/admin/marks/StudentMarksForm";

export default function MarksPage() {
  const [filters, setFilters] = useState(null);

  const handleSelectionChange = useCallback((data) => {
    setFilters(data);
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Student Marks Entry
        </h1>

        <p className="mt-2 text-gray-500">
          Enter and update marks student-wise.
        </p>
      </div>

      <MarksFilters
        onSelectionChange={handleSelectionChange}
      />

      {filters && (
        <>
          <StudentInfoCard
            studentId={filters.student}
          />

          <StudentMarksForm
            filters={filters}
          />
        </>
      )}

    </div>
  );
}