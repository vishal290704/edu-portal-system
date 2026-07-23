"use client";

import { useState, useCallback } from "react";

import ResultFilters from "@/components/admin/results/ResultFilters";
import StudentResultCard from "@/components/admin/results/StudentResultCard";

import { getStudentResult } from "@/app/actions/resultActions";

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleStudentChange = useCallback(async (filters) => {
  try {
    setLoading(true);

    const response = await getStudentResult(filters);

    if (response.success) {
      setResult(response);
    } else {
      setResult(null);
    }
  } catch (error) {
    console.error(error);
    setResult(null);
  } finally {
    setLoading(false);
  }
}, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Results
        </h1>

        <p className="text-muted-foreground">
          View student examination results.
        </p>
      </div>

      <ResultFilters
        onStudentChange={handleStudentChange}
      />

      {loading ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          Loading result...
        </div>
      ) : (
        <StudentResultCard result={result} />
      )}

    </div>
  );
}