"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AcademicSessionForm from "./AcademicSessionForm";

export default function AcademicSessionDialog({
  open,
  onOpenChange,
  session = null,
  onSuccess,
}) {
  function handleSuccess() {
    onOpenChange(false);

    onSuccess?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {session ? "Edit Academic Session" : "Add Academic Session"}
          </DialogTitle>

          <DialogDescription>
            {session
              ? "Update the academic session."
              : "Create a new academic session."}
          </DialogDescription>
        </DialogHeader>

        <AcademicSessionForm
          initialData={session || {}}
          onCancel={() => onOpenChange(false)}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}