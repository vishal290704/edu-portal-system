"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ExamForm from "./ExamForm";

export default function ExamDialog({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData?._id ? "Edit Exam" : "Create Exam"}
          </DialogTitle>
        </DialogHeader>

        <ExamForm
          initialData={initialData || {}}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess?.();
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
