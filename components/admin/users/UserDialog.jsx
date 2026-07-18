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

export default function UserDialog({ open, onOpenChange, onSuccess }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button />}>Create User</DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new administrator or teacher account.
          </DialogDescription>
        </DialogHeader>

        <UserForm onSuccess={onSuccess} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
