"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import TeacherForm from "./TeacherForm";

export default function TeacherDialog({
  open,
  onOpenChange,
  teacher,
  onSuccess,
}) {
  // ===================================
  // Form Success
  // ===================================

  const handleSuccess = async () => {
    if (onSuccess) {
      await onSuccess();
    }

    onOpenChange(false);
  };

  // ===================================
  // Cancel
  // ===================================

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <DialogHeader>
          <DialogTitle className="text-xl">
            {teacher ? "Edit Teacher" : "Add Teacher"}
          </DialogTitle>

          <DialogDescription>
            {teacher
              ? "Update the teacher's personal and professional information."
              : "Enter the teacher's personal and professional information."}
          </DialogDescription>
        </DialogHeader>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <div className="mt-2">
          <TeacherForm
            teacher={teacher}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}