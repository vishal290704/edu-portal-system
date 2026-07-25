"use client";

import { useState, useCallback } from "react";

import ResultFilters from "@/components/admin/results/ResultFilters";
import StudentResultCard from "@/components/admin/results/StudentResultCard";
import PrintableReportCard from "@/components/admin/results/PrintableReportCard";

import { Button } from "@/components/ui/button";

import { getStudentResult } from "@/app/actions/resultActions";

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Controls whether report card is visible
  const [showReportCard, setShowReportCard] =
    useState(false);

  const handleStudentChange = useCallback(
    async (filters) => {
      try {
        setLoading(true);

        // Hide previous report card
        setShowReportCard(false);

        const response =
          await getStudentResult(filters);

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
    },
    []
  );

  return (
    <div className="space-y-6">

      {/* ============================= */}
      {/* Page Header */}
      {/* ============================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Results
          </h1>

          <p className="text-muted-foreground">
            View student examination results.
          </p>
        </div>


        {/* Report Card Button */}

        {result && !loading && (
          <Button
            onClick={() =>
              setShowReportCard((prev) => !prev)
            }
          >
            {showReportCard
              ? "Hide Report Card"
              : "View Report Card"}
          </Button>
        )}

      </div>


      {/* ============================= */}
      {/* Result Filters */}
      {/* ============================= */}

      <ResultFilters
        onStudentChange={handleStudentChange}
      />


      {/* ============================= */}
      {/* Loading / Result */}
      {/* ============================= */}

      {loading ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          Loading result...
        </div>
      ) : (
        <StudentResultCard result={result} />
      )}


      {/* ============================= */}
      {/* Printable Report Card */}
      {/* ============================= */}

      {result && showReportCard && (
        <div className="rounded-xl border bg-slate-100 p-4 sm:p-8">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Report Card Preview
              </h2>

              <p className="text-sm text-gray-500">
                Preview the student's report card.
              </p>
            </div>

          </div>


          <div className="overflow-x-auto">

            <PrintableReportCard
              result={result}
            />

          </div>

        </div>
      )}

    </div>
  );
}