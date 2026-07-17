"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StudentForm from "./StudentForm";

export default function StudentDialog({
  open,
  onOpenChange,
  student = null,
  onSuccess,
}) {
  function handleSuccess() {
    onOpenChange(false);

    if (onSuccess) {
      onSuccess();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {student ? "Edit Student" : "Add Student"}
          </DialogTitle>
        </DialogHeader>

        <StudentForm
          initialData={student || {}}
          onCancel={() => onOpenChange(false)}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}