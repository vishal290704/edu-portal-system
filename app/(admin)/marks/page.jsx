"use client";

import BulkMarksForm from "@/components/admin/marks/BulkMarksForm";

export default function MarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Marks Management
        </h1>

        <p className="text-muted-foreground">
          Enter and manage students' examination marks.
        </p>
      </div>

      <BulkMarksForm />
    </div>
  );
}