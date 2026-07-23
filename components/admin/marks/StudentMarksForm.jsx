"use client";

import { useEffect, useState } from "react";

import { getSubjectsByClass } from "@/app/actions/markHelperActions";

import { getStudentMarks, saveStudentMarks } from "@/app/actions/markActions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StudentMarksForm({ filters }) {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (
        !filters?.academicSession ||
        !filters?.exam ||
        !filters?.className ||
        !filters?.student
      ) {
        setSubjects([]);
        setMarks([]);
        return;
      }

      setLoading(true);

      try {
        const subjectList = await getSubjectsByClass(filters.className);

        const existingMarks = await getStudentMarks({
          academicSession: filters.academicSession,
          exam: filters.exam,
          student: filters.student,
        });

        const formattedMarks = subjectList.map((subject) => {
          const existing = existingMarks.find(
            (m) => String(m.subject._id) === String(subject._id),
          );

          return {
            subject: subject._id,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            maximumMarks: subject.maximumMarks || 100,
            obtainedMarks: existing?.obtainedMarks ?? "",
            remarks: existing?.remarks ?? "",
          };
        });

        setSubjects(subjectList);
        setMarks(formattedMarks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [
    filters?.academicSession,
    filters?.exam,
    filters?.className,
    filters?.student,
  ]);
  const handleMarksChange = (index, field, value) => {
    const updatedMarks = [...marks];

    if (field === "obtainedMarks") {
      value = value === "" ? "" : Number(value);

      if (value !== "" && value > updatedMarks[index].maximumMarks) {
        value = updatedMarks[index].maximumMarks;
      }

      if (value !== "" && value < 0) {
        value = 0;
      }
    }

    updatedMarks[index][field] = value;

    setMarks(updatedMarks);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await saveStudentMarks({
        academicSession: filters.academicSession,
        exam: filters.exam,
        student: filters.student,
        marks,
      });

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (!filters?.student) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-8 text-center text-gray-500">
        Select a student to enter marks.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading subjects...
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-red-500">
        No subjects found for this class.
      </div>
    );
  }
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold">Student Marks Entry</h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter obtained marks for each subject.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Subject</th>

              <th className="px-4 py-3 text-center">Maximum Marks</th>

              <th className="px-4 py-3 text-center">Obtained Marks</th>

              <th className="px-4 py-3 text-left">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark, index) => (
              <tr key={mark.subject} className="border-b">
                <td className="px-4 py-4">
                  <div className="font-medium">{mark.subjectName}</div>

                  <div className="text-xs text-gray-500">
                    {mark.subjectCode}
                  </div>
                </td>

                <td className="px-4 py-4 text-center">{mark.maximumMarks}</td>

                <td className="px-4 py-4">
                  <Input
                    type="number"
                    min={0}
                    max={mark.maximumMarks}
                    value={mark.obtainedMarks}
                    onChange={(e) =>
                      handleMarksChange(index, "obtainedMarks", e.target.value)
                    }
                  />
                </td>

                <td className="px-4 py-4">
                  <Input
                    value={mark.remarks}
                    placeholder="Optional"
                    onChange={(e) =>
                      handleMarksChange(index, "remarks", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 border-t p-6">
        <Button
          variant="outline"
          disabled={saving}
          onClick={() => window.location.reload()}
        >
          Cancel
        </Button>

        <Button disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save Marks"}
        </Button>
      </div>
    </div>
  );
}
