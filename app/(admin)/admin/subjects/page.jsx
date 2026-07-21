"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { getSubjects } from "@/app/actions/subjectActions";

import SubjectDialog from "@/components/admin/subjects/SubjectDialog";
import SubjectTable from "@/components/admin/subjects/SubjectTable";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  async function loadSubjects() {
    const data = await getSubjects();
    setSubjects(data);
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  function handleAdd() {
    setSelectedSubject(null);
    setOpen(true);
  }

  function handleEdit(subject) {
    setSelectedSubject(subject);
    setOpen(true);
  }

  function handleSuccess() {
    setOpen(false);
    loadSubjects();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>

          <p className="mt-1 text-slate-500">
            Manage school subjects.
          </p>
        </div>

        <Button onClick={handleAdd}>
          Add Subject
        </Button>
      </div>

      <SubjectTable
        subjects={subjects}
        onEdit={handleEdit}
        onRefresh={loadSubjects}
      />

      <SubjectDialog
        open={open}
        onOpenChange={setOpen}
        subject={selectedSubject}
        onSuccess={handleSuccess}
      />
    </div>
  );
}