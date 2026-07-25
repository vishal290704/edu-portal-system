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
  const [showReportCard, setShowReportCard] = useState(false);

  // ===================================
  // Load Student Result
  // ===================================

  const handleStudentChange = useCallback(async (filters) => {
    try {
      setLoading(true);

      setShowReportCard(false);

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

      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Results
          </h1>

          <p className="text-muted-foreground">
            View student examination results.
          </p>
        </div>

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


      {/* ================================= */}
      {/* RESULT FILTERS */}
      {/* ================================= */}

      <ResultFilters
        onStudentChange={handleStudentChange}
      />


      {/* ================================= */}
      {/* RESULT DETAILS */}
      {/* ================================= */}

      {loading ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          Loading result...
        </div>
      ) : (
        <StudentResultCard result={result} />
      )}


      {/* ================================= */}
      {/* REPORT CARD PREVIEW */}
      {/* ================================= */}

      {result && showReportCard && (

        <div className="report-preview-section rounded-xl border bg-white shadow-sm">

          {/* ============================= */}
          {/* TOOLBAR */}
          {/* ============================= */}

          <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Report Card Preview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Preview the final A4 report card before printing.
              </p>

            </div>


            <div className="flex items-center gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  setShowReportCard(false)
                }
              >
                Close Preview
              </Button>


              <Button
                onClick={() => window.print()}
                className="bg-[#0F4C81] hover:bg-[#0C3D68]"
              >
                Print Report Card
              </Button>

            </div>

          </div>


          {/* ============================= */}
          {/* A4 PREVIEW */}
          {/* ============================= */}

          <div className="report-preview-viewport">

            <div className="report-preview-paper">

              <PrintableReportCard
                result={result}
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
}