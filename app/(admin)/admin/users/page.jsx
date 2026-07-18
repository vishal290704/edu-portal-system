"use client";

import { useEffect, useState } from "react";
import UserTable from "@/components/admin/users/UserTable";
import UserDialog from "@/components/admin/users/UserDialog";
import { getUsers } from "@/app/actions/userActions";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage administrator and teacher accounts.
          </p>
        </div>

        <UserDialog open={open} onOpenChange={setOpen} onSuccess={loadUsers} />
      </div>

      <div>
        {loading ? <p>Loading users...</p> : <UserTable users={users} />}
      </div>
    </div>
  );
}
