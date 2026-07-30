"use client";

import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";

import ClassResultFilters from "@/components/results/ClassResultFilters";
import ResultsTable from "@/components/results/ResultsTable";
import StudentResultCard from "@/components/results/StudentResultCard";
import PrintableReportCard from "@/components/results/PrintableReportCard";

import { getClassResults } from "@/app/actions/resultTableActions";
import { getStudentResult } from "@/app/actions/resultActions";

export default function ResultsPage() {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState(null);

  const [result, setResult] = useState(null);

  const [showReportCard, setShowReportCard] = useState(false);

  // ===================================
  // Load Class Results
  // ===================================

  const handleFiltersChange = useCallback(async (filters) => {
    try {
      setLoading(true);

      setSelectedFilters(filters);

      setResult(null);
      setShowResult(false);

      setShowReportCard(false);

      const response = await getClassResults(filters);

      if (response.success) {
        setStudents(response.students);

        setStatistics(response.statistics);
      } else {
        setStudents([]);
        setStatistics(null);

        setResult(null);
        setShowResult(false);
        setShowReportCard(false);
      }
    } catch (error) {
      console.error(error);

      setStudents([]);
      setStatistics(null);

      setResult(null);
      setShowResult(false);
      setShowReportCard(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===================================
  // View Student Result
  // ===================================

  const handleViewStudent = async (student) => {
    if (!selectedFilters) return;

    try {
      setLoading(true);

      const response = await getStudentResult({
        academicSession: selectedFilters.academicSession,

        exam: selectedFilters.exam,

        student: student.id,
      });

      if (response.success) {
        setResult(response);
        setShowResult(true);

        setShowReportCard(false);
      } else {
        setResult(null);
        setShowResult(false);
        setShowReportCard(false);
      }
    } catch (error) {
      console.error(error);

      setResult(null);
      setShowResult(false);
      setShowReportCard(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================================ */}
      {/* Header */}
      {/* ================================ */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Results</h1>

          <p className="text-muted-foreground">
            View class results and report cards.
          </p>
        </div>

        {result && showResult && !loading && (
          <Button onClick={() => setShowReportCard(!showReportCard)}>
            {showReportCard ? "Hide Report Card" : "View Report Card"}
          </Button>
        )}
      </div>

      {/* ================================ */}
      {/* Filters */}
      {/* ================================ */}

      <ClassResultFilters onFilterChange={handleFiltersChange} />

      {/* ================================ */}
      {/* Statistics */}
      {/* ================================ */}

      {statistics && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">Students</p>

            <h2 className="mt-2 text-3xl font-bold">
              {statistics.totalStudents}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">Pass</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {statistics.pass}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">Fail</p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {statistics.fail}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">Highest %</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {statistics.highestPercentage.toFixed(2)}%
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">Average %</p>

            <h2 className="mt-2 text-3xl font-bold">
              {statistics.averagePercentage.toFixed(2)}%
            </h2>
          </div>
        </div>
      )}

      {/* ================================ */}
      {/* Results Table */}
      {/* ================================ */}

      {loading ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          Loading...
        </div>
      ) : selectedFilters ? (
        <ResultsTable students={students} onView={handleViewStudent} />
      ) : (
        <div className="rounded-xl border bg-white p-12 text-center text-muted-foreground">
          Select an Exam, Class and Section to view results.
        </div>
      )}

      {/* ================================ */}
      {/* Student Result */}
      {/* ================================ */}

      {result && showResult && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowResult(false);
                setShowReportCard(false);
                setResult(null);
              }}
            >
              Close Result
            </Button>
          </div>

          <StudentResultCard result={result} />
        </div>
      )}
      {/* ================================ */}
      {/* Report Card */}
      {/* ================================ */}

      {result && showReportCard && (
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Report Card Preview</h2>

              <p className="text-sm text-muted-foreground">
                Preview before printing.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReportCard(false)}
              >
                Close
              </Button>

              <Button onClick={() => window.print()}>Print</Button>
            </div>
          </div>

          <div className="report-preview-viewport">
            <div className="report-preview-paper">
              <PrintableReportCard result={result} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
