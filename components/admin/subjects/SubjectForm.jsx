"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createSubject,
  updateSubject,
} from "@/app/actions/subjectActions";

const classes = [
  "Nursery",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

export default function SubjectForm({
  initialData = {},
  onSuccess,
  onCancel,
}) {
  const [formData, setFormData] = useState(getFormData());
  const [loading, setLoading] = useState(false);

  function getFormData() {
    return {
      subjectName: initialData.subjectName || "",
      subjectCode: initialData.subjectCode || "",
      applicableClasses: initialData.applicableClasses || [],
      assignedTeacher: initialData.assignedTeacher || "",
      status: initialData.status ?? true,
    };
  }

  useEffect(() => {
    setFormData(getFormData());
  }, [initialData]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "status") {
      setFormData((prev) => ({
        ...prev,
        status: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClassChange(className) {
    setFormData((prev) => ({
      ...prev,
      applicableClasses: prev.applicableClasses.includes(className)
        ? prev.applicableClasses.filter(
            (cls) => cls !== className
          )
        : [...prev.applicableClasses, className],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let result;

    if (initialData._id) {
      result = await updateSubject(initialData._id, formData);
    } else {
      result = await createSubject(formData);
    }

    setLoading(false);

    alert(result.message);

    if (result.success) {
      onSuccess?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Subject Name</Label>

        <Input
          name="subjectName"
          value={formData.subjectName}
          onChange={handleChange}
          placeholder="English"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Subject Code</Label>

        <Input
          name="subjectCode"
          value={formData.subjectCode}
          onChange={handleChange}
          placeholder="ENG101"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Applicable Classes</Label>

        <div className="grid grid-cols-3 gap-3">
          {classes.map((cls) => (
            <label
              key={cls}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={formData.applicableClasses.includes(cls)}
                onChange={() => handleClassChange(cls)}
              />

              {cls}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />

        <Label>Active</Label>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : initialData._id
            ? "Update Subject"
            : "Create Subject"}
        </Button>
      </div>
    </form>
  );
}