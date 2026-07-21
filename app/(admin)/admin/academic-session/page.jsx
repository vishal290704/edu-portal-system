"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { getAcademicSessions } from "@/app/actions/academicSessionActions";

import AcademicSessionDialog from "@/components/admin/academic/AcademicSessionDialog";
import AcademicSessionTable from "@/components/admin/academic/AcademicSessionTable";

export default function AcademicSessionPage() {
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  async function loadSessions() {
    const data = await getAcademicSessions();
    setSessions(data);
  }

  useEffect(() => {
    loadSessions();
  }, []);

  function handleAdd() {
    setSelectedSession(null);
    setOpen(true);
  }

  function handleEdit(session) {
    setSelectedSession(session);
    setOpen(true);
  }

  function handleSuccess() {
    setOpen(false);
    loadSessions();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Sessions</h1>

          <p className="mt-1 text-slate-500">
            Manage school academic sessions.
          </p>
        </div>

        <Button onClick={handleAdd}>
          Add Academic Session
        </Button>
      </div>

      <AcademicSessionTable
        sessions={sessions}
        onEdit={handleEdit}
        onRefresh={loadSessions}
      />

      <AcademicSessionDialog
        open={open}
        onOpenChange={setOpen}
        session={selectedSession}
        onSuccess={handleSuccess}
      />
    </div>
  );
}