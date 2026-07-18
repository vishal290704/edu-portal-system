"use client";

import { useState } from "react";
import { toast } from "sonner";

import { resetUserPassword } from "@/app/actions/userActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function ResetPasswordDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (loading) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("id", user._id);
    formData.append("password", password);
    formData.append(
      "confirmPassword",
      confirmPassword
    );

    const result = await resetUserPassword(formData);

    if (!result.success) {
      toast.error(result.message);
      setLoading(false);
      return;
    }

    toast.success(result.message);

    setPassword("");
    setConfirmPassword("");

    onOpenChange(false);

    onSuccess?.();

    setLoading(false);
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Reset Password
          </AlertDialogTitle>

          <AlertDialogDescription>
            Set a temporary password for{" "}
            <strong>{user.username}</strong>.
            <br />
            The user will be required to change
            this password after the next login.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password">
              New Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter temporary password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm temporary password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}