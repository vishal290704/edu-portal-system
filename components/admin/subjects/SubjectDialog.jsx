"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SubjectForm from "./SubjectForm";

export default function SubjectDialog({
  open,
  onOpenChange,
  subject = null,
  onSuccess,
}) {
  function handleSuccess() {
    onOpenChange(false);
    onSuccess?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {subject ? "Edit Subject" : "Add Subject"}
          </DialogTitle>

          <DialogDescription>
            {subject
              ? "Update subject details."
              : "Create a new subject."}
          </DialogDescription>
        </DialogHeader>

        <SubjectForm
          initialData={subject || {}}
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}