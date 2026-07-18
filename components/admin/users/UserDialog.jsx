"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import UserForm from "./UserForm";

export default function UserDialog({
  open,
  onOpenChange,
  onSuccess,
  onCreate,
  mode,
  user,
}) {
  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={<Button />}
        onClick={onCreate}
      >
        Create User
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Create User"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update the selected user's information."
              : "Create a new administrator or teacher account."}
          </DialogDescription>
        </DialogHeader>

        <UserForm
          mode={mode}
          user={user}
          onSuccess={onSuccess}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}