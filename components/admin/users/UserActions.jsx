"use client";

import { useState } from "react";

import { MoreHorizontal } from "lucide-react";

import DeleteUserDialog from "./DeleteUserDialog";
import UserStatusDialog from "./UserStatusDialog";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserActions({
  user,
  onEdit,
  onSuccess,
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(user)}>
            Edit User
          </DropdownMenuItem>

          <DropdownMenuItem>
            Reset Password
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setStatusOpen(true)}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={user}
        onSuccess={onSuccess}
      />

      <UserStatusDialog
        open={statusOpen}
        onOpenChange={setStatusOpen}
        user={user}
        onSuccess={onSuccess}
      />
    </>
  );
}