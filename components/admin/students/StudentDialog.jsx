"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-2xl font-bold">
            {student ? "Edit Student" : "Add New Student"}
          </DialogTitle>

          <DialogDescription className="mt-2 text-base text-slate-500">
            {student
              ? "Update the student's information below."
              : "Fill in the student's details below to create a new student record."}
          </DialogDescription>
        </DialogHeader>

        <div className="p-8">
          <StudentForm
            initialData={student || {}}
            onCancel={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}