"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserActions({ user, onEdit }) {
  return (
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

        <DropdownMenuItem>
          {user.isActive ? "Deactivate" : "Activate"}
        </DropdownMenuItem>

        <DropdownMenuItem variant="destructive">
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}