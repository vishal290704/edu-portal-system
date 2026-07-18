"use client";

import { useState } from "react";

import { toggleUserStatus } from "@/app/actions/userActions";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UserStatusDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const isActive = user?.isActive;

  const handleSubmit = async () => {
    setLoading(true);

    const result = await toggleUserStatus(user._id);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message); // Sonner later
      return;
    }
    toast.success(result.message);
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? "Deactivate User" : "Activate User"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to{" "}
            <strong>
              {isActive ? "deactivate" : "activate"}
            </strong>{" "}
            <strong>{user?.username}</strong>?
            <br />
            <br />
            {isActive
              ? "The user will no longer be able to log in."
              : "The user will be able to log in again."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? isActive
                ? "Deactivating..."
                : "Activating..."
              : isActive
                ? "Deactivate"
                : "Activate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}