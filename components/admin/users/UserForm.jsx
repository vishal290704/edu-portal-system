"use client";

import { useEffect, useState } from "react";

import {
  createUser,
  updateUser,
} from "@/app/actions/userActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserForm({
  mode,
  user,
  onSuccess,
  onClose,
}) {
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        username: user.username,
        password: "",
        role: user.role,
      });
    } else {
      setFormData({
        username: "",
        password: "",
        role: "",
      });
    }
  }, [isEdit, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    if (isEdit) {
      data.append("id", user._id);
    }

    data.append("username", formData.username);
    data.append("role", formData.role);

    if (!isEdit) {
      data.append("password", formData.password);
    }

    const result = isEdit
      ? await updateUser(data)
      : await createUser(data);

    setLoading(false);

    if (!result.success) {
      alert(result.message); // Replace with Sonner later
      return;
    }

    setFormData({
      username: "",
      password: "",
      role: "",
    });

    onSuccess?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Username
        </label>

        <Input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          autoComplete="off"
        />
      </div>

      {!isEdit && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Temporary Password
          </label>

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter temporary password"
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Role
        </label>

        <Select
          value={formData.role}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="w-full">
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
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
            ? "Update User"
            : "Create User"}
      </Button>
    </form>
  );
}