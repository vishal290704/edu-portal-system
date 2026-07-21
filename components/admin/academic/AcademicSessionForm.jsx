"use client";

import { useEffect, useState } from "react";
import {
  createAcademicSession,
  updateAcademicSession,
} from "@/app/actions/academicSessionActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getFormData = (session = {}) => ({
  name: session.name || "",
  startDate: session.startDate?.slice(0, 10) || "",
  endDate: session.endDate?.slice(0, 10) || "",
});

export default function AcademicSessionForm({
  onCancel,
  onSuccess,
  initialData = {},
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(getFormData());

  useEffect(() => {
    setFormData(getFormData(initialData));
  }, [initialData]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let result;

      if (initialData?._id) {
        result = await updateAcademicSession(
          initialData._id,
          formData
        );
      } else {
        result = await createAcademicSession(formData);
      }

      if (result.success) {
        onSuccess?.();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label>Academic Session</Label>

          <Input
            name="name"
            placeholder="2026-27"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Start Date</Label>

          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>End Date</Label>

          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? initialData?._id
              ? "Updating..."
              : "Saving..."
            : initialData?._id
            ? "Update Session"
            : "Save Session"}
        </Button>
      </div>
    </form>
  );
}