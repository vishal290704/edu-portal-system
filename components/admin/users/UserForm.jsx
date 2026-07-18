"use client";

import { useState } from "react";

import { createUser } from "@/app/actions/userActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserForm() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  async function handleSubmit(formData) {
    formData.set("role", role);

    setLoading(true);

    const result = await createUser(formData);

    console.log(result);

    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Username
        </label>

        <Input
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Password
        </label>

        <Input
          name="password"
          type="password"
          placeholder="Enter temporary password"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Role
        </label>

        <Select
          value={role}
          onValueChange={setRole}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ADMIN">
              Administrator
            </SelectItem>

            <SelectItem value="TEACHER">
              Teacher
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create User"}
      </Button>
    </form>
  );
}