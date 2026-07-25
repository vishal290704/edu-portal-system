"use client";

import { useEffect, useState } from "react";

import {
  createUser,
  updateUser,
} from "@/app/actions/userActions";

import { getTeachers } from "@/app/actions/teacherActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

export default function UserForm({
  mode,
  user,
  onSuccess,
  onClose,
}) {
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    teacherId: "",
  });

  // ===================================
  // Load Form Data
  // ===================================

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        username: user.username || "",
        password: "",
        role: user.role || "",
        teacherId: user.teacherId?._id || user.teacherId || "",
      });
    } else {
      setFormData({
        username: "",
        password: "",
        role: "",
        teacherId: "",
      });
    }
  }, [isEdit, user]);

  // ===================================
  // Load Teachers
  // ===================================

  useEffect(() => {
    async function loadTeachers() {
      try {
        setTeachersLoading(true);

        const result = await getTeachers();

        if (result.success) {
          setTeachers(result.teachers || []);
        } else {
          setTeachers([]);
        }
      } catch (error) {
        console.error("Load Teachers Error:", error);
        setTeachers([]);
      } finally {
        setTeachersLoading(false);
      }
    }

    loadTeachers();
  }, []);

  // ===================================
  // Input Change
  // ===================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===================================
  // Role Change
  // ===================================

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,

      // Administrator should never remain
      // connected to a teacher.
      teacherId: value === "TEACHER" ? prev.teacherId : "",
    }));
  };

  // ===================================
  // Teacher Change
  // ===================================

  const handleTeacherChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      teacherId: value,
    }));
  };

  // ===================================
  // Submit
  // ===================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.role === "TEACHER" && !formData.teacherId) {
      toast.error("Please select a teacher.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      if (isEdit) {
        data.append("id", user._id);
      }

      data.append("username", formData.username);
      data.append("role", formData.role);

      if (formData.role === "TEACHER") {
        data.append("teacherId", formData.teacherId);
      }

      if (!isEdit) {
        data.append("password", formData.password);
      }

      const result = isEdit
        ? await updateUser(data)
        : await createUser(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setFormData({
        username: "",
        password: "",
        role: "",
        teacherId: "",
      });

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}

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

      {/* Temporary Password */}

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
            autoComplete="new-password"
          />
        </div>
      )}

      {/* Role */}

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

      {/* Teacher Selection */}

      {formData.role === "TEACHER" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Teacher
          </label>

          <Select
            value={formData.teacherId}
            onValueChange={handleTeacherChange}
            disabled={teachersLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  teachersLoading
                    ? "Loading teachers..."
                    : "Select teacher"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.employeeId} - {teacher.firstName}{" "}
                  {teacher.lastName || ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {!teachersLoading && teachers.length === 0 && (
            <p className="text-sm text-slate-500">
              No teachers available. Create a teacher record first.
            </p>
          )}
        </div>
      )}

      {/* Submit */}

      <Button
        type="submit"
        className="w-full"
        disabled={loading || teachersLoading}
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