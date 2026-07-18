"use client";

import { useEffect, useState } from "react";
import UserTable from "@/components/admin/users/UserTable";
import UserDialog from "@/components/admin/users/UserDialog";
import { getUsers } from "@/app/actions/userActions";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    const result = await getUsers();

    if (result.success) {
      setUsers(result.data);
    }

    setLoading(false);
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedUser(null);
    setOpen(true);
  };

  const handleEdit = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="mt-1 text-muted-foreground">
            Manage administrator and teacher accounts.
          </p>
        </div>

        <UserDialog
          open={open}
          onOpenChange={setOpen}
          mode={mode}
          user={selectedUser}
          onSuccess={loadUsers}
          onCreate={handleCreate}
        />
      </div>

      <div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserTable users={users} onEdit={handleEdit} onSuccess={loadUsers} />
        )}
      </div>
    </div>
  );
}
