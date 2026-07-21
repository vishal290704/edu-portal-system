"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { getExams } from "@/app/actions/examActions";

import ExamDialog from "@/components/admin/exams/ExamDialog";
import ExamTable from "@/components/admin/exams/ExamTable";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  async function loadExams() {
    const data = await getExams();
    setExams(data);
  }

  useEffect(() => {
    loadExams();
  }, []);

  function handleAdd() {
    setSelectedExam(null);
    setOpen(true);
  }

  function handleEdit(exam) {
    setSelectedExam(exam);
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Exam Management
          </h1>

          <p className="text-muted-foreground">
            Create and manage school examinations.
          </p>
        </div>

        <Button onClick={handleAdd}>
          Add Exam
        </Button>
      </div>

      <ExamTable
        exams={exams}
        onEdit={handleEdit}
        onRefresh={loadExams}
      />

      <ExamDialog
        open={open}
        onOpenChange={setOpen}
        initialData={selectedExam}
        onSuccess={loadExams}
      />
    </div>
  );
}