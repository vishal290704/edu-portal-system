"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function UserTable({ users }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Must Change Password</TableHead>
            <TableHead>Last Login</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {user.username}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={user.isActive ? "default" : "destructive"}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                <TableCell>
                  {user.mustChangePassword ? "Yes" : "No"}
                </TableCell>

                <TableCell>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}