"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createExam,
  updateExam,
  getExamsBySession,
} from "@/app/actions/examActions";

import { getActiveAcademicSession } from "@/app/actions/academicSessionActions";

import { CLASS_OPTIONS } from "@/constants/classes";
import { EXAM_TYPES } from "@/constants/examTypes";

export default function ExamForm({ initialData = {}, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionExams, setSessionExams] = useState([]);

  const [formData, setFormData] = useState(getFormData());

  function getFormData() {
    const data = initialData || {};

    return {
      examName: data.examName || "",
      examType: data.examType || "",

      resultMode: data.resultMode || "INDIVIDUAL",
      includedExams: data.includedExams?.map((exam) => exam._id || exam) || [],

      academicSession: data.academicSession?._id || "",
      applicableClasses: data.applicableClasses || [],

      maximumMarksPerSubject: data.maximumMarksPerSubject ?? "",

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

      const exams = await getExamsBySession(session._id);

      setSessionExams(exams.filter((exam) => exam._id !== initialData?._id));

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

  function handleIncludedExam(examId) {
    setFormData((prev) => ({
      ...prev,
      includedExams: prev.includedExams.includes(examId)
        ? prev.includedExams.filter((id) => id !== examId)
        : [...prev.includedExams, examId],
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
      {/* Exam Name */}

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

      {/* Exam Type */}

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

      {/* Result Mode */}

      <div className="space-y-2">
        <Label>Result Mode</Label>

        <select
          name="resultMode"
          value={formData.resultMode}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="INDIVIDUAL">Individual Result</option>

          <option value="CUMULATIVE">Cumulative Result</option>
        </select>
      </div>

      {/* Included Exams */}

      {formData.resultMode === "CUMULATIVE" && (
        <div className="space-y-3">
          <Label>Included Exams</Label>

          {sessionExams.length === 0 ? (
            <p className="text-sm text-gray-500">
              No previous exams available.
            </p>
          ) : (
            <div className="space-y-2 rounded-md border p-3">
              {sessionExams.map((exam) => (
                <label
                  key={exam._id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={formData.includedExams.includes(exam._id)}
                    onChange={() => handleIncludedExam(exam._id)}
                  />

                  {exam.examName}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Maximum Marks */}

      <div className="space-y-2">
        <Label>Maximum Marks Per Subject</Label>

        <Input
          type="number"
          name="maximumMarksPerSubject"
          min={1}
          step={1}
          value={formData.maximumMarksPerSubject}
          onChange={handleChange}
          placeholder="25"
          required
        />

        <p className="text-xs text-muted-foreground">
          Example: Unit Test = 25, Half Yearly = 50, Annual = 50
        </p>
      </div>

      {/* Academic Session */}

      <div className="space-y-2">
        <Label>Academic Session</Label>

        <Input value={activeSession?.name || ""} disabled />
      </div>

      {/* Classes */}

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

      {/* Dates */}

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

      {/* Status */}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />

        <Label>Active</Label>
      </div>

      {/* Buttons */}

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
