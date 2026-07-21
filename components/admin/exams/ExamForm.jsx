"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createExam, updateExam } from "@/app/actions/examActions";

import { getActiveAcademicSession } from "@/app/actions/academicSessionActions";

import { CLASS_OPTIONS } from "@/constants/classes";
import { EXAM_TYPES } from "@/constants/examTypes";

export default function ExamForm({ initialData = {}, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState(null);

  const [formData, setFormData] = useState(getFormData());

  function getFormData() {
    const data = initialData || {};

    return {
      examName: data.examName || "",
      examType: data.examType || "",
      academicSession: data.academicSession?._id || "",
      applicableClasses: data.applicableClasses || [],
      startDate: data.startDate ? data.startDate.slice(0, 10) : "",
      endDate: data.endDate ? data.endDate.slice(0, 10) : "",
      status: data.status ?? true,
    };
  }

  useEffect(() => {
    setFormData(getFormData());
  }, [initialData]);

  useEffect(() => {
  async function loadActiveSession() {
    const session = await getActiveAcademicSession();

    if (!session) return;

    setActiveSession(session);

    // Only auto-set the session when creating a new exam
    if (!initialData?._id) {
      setFormData((prev) => ({
        ...prev,
        academicSession: session._id,
      }));
    }
  }

  loadActiveSession();
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
        ? prev.applicableClasses.filter((cls) => cls !== className)
        : [...prev.applicableClasses, className],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let result;

    if (initialData._id) {
      result = await updateExam(initialData._id, formData);
    } else {
      result = await createExam(formData);
    }

    setLoading(false);

    alert(result.message);

    if (result.success) {
      onSuccess?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Exam Name</Label>

        <Input
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          placeholder="Half Yearly Examination"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Exam Type</Label>

        <select
          name="examType"
          value={formData.examType}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">Select Exam Type</option>

          {EXAM_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Academic Session</Label>

        <Input value={activeSession?.name || ""} disabled />
      </div>

      <div className="space-y-3">
        <Label>Applicable Classes</Label>

        <div className="grid grid-cols-3 gap-3">
          {CLASS_OPTIONS.map((cls) => (
            <label key={cls} className="flex items-center gap-2 text-sm">
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>

          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>

          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : initialData._id
              ? "Update Exam"
              : "Create Exam"}
        </Button>
      </div>
    </form>
  );
}
