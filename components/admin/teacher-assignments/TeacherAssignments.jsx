"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { getTeachers } from "@/app/actions/teacherActions";
import { getSubjects } from "@/app/actions/subjectActions";
import { getActiveAcademicSession } from "@/app/actions/academicSessionActions";

import {
  createTeacherAssignment,
  getTeacherAssignments,
  updateTeacherAssignment,
  deleteTeacherAssignment,
} from "@/app/actions/teacherAssignmentActions";

import { CLASS_OPTIONS } from "@/constants/classes";

const SECTION_OPTIONS = [
  "A",
  "B",
  "C",
  "D",
];

export default function TeacherAssignments() {
  const [teachers, setTeachers] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [
    assignments,
    setAssignments,
  ] = useState([]);

  const [
    activeSession,
    setActiveSession,
  ] = useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      teacherId: "",
      className: "",
      section: "A",
      subjectId: "",
      isClassTeacher: false,
    });

  const [loading, setLoading] =
    useState(false);

  const [
    pageLoading,
    setPageLoading,
  ] = useState(true);

  // ===================================
  // Load Data
  // ===================================

  async function loadData() {
    try {
      setPageLoading(true);

      const [
        teacherResult,
        subjectData,
        assignmentResult,
        sessionData,
      ] = await Promise.all([
        getTeachers(),
        getSubjects(),
        getTeacherAssignments(),
        getActiveAcademicSession(),
      ]);

      // Active Teachers

      if (teacherResult.success) {
        const activeTeachers =
          teacherResult.teachers.filter(
            (teacher) =>
              teacher.status ===
              "ACTIVE"
          );

        setTeachers(activeTeachers);
      } else {
        setTeachers([]);
      }

      // Active Subjects

      const activeSubjects =
        subjectData.filter(
          (subject) =>
            subject.status === true
        );

      setSubjects(activeSubjects);

      // Assignments

      if (assignmentResult.success) {
        setAssignments(
          assignmentResult.assignments
        );
      } else {
        setAssignments([]);
      }

      // Active Session

      setActiveSession(sessionData);
    } catch (error) {
      console.error(
        "Load Teacher Assignment Data Error:",
        error
      );
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // ===================================
  // Filter Subjects By Class
  // ===================================

  const filteredSubjects =
    subjects.filter((subject) => {
      if (!formData.className) {
        return false;
      }

      return (
        subject.applicableClasses?.includes(
          formData.className
        )
      );
    });

  // ===================================
  // Handle Input Change
  // ===================================

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    // Reset subject when class changes

    if (name === "className") {
      setFormData((prev) => ({
        ...prev,
        className: value,
        subjectId: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // ===================================
  // Reset Form
  // ===================================

  function resetForm() {
    setEditingId(null);

    setFormData({
      teacherId: "",
      className: "",
      section: "A",
      subjectId: "",
      isClassTeacher: false,
    });
  }

  // ===================================
  // Submit Assignment
  // ===================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!activeSession) {
      alert(
        "Please activate an academic session first."
      );

      return;
    }

    setLoading(true);

    try {
      let result;

      if (editingId) {
        result =
          await updateTeacherAssignment(
            editingId,
            formData
          );
      } else {
        result =
          await createTeacherAssignment(
            formData
          );
      }

      alert(result.message);

      if (result.success) {
        resetForm();

        await loadData();
      }
    } catch (error) {
      console.error(
        "Save Teacher Assignment Error:",
        error
      );

      alert(
        "Something went wrong while saving the assignment."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================
  // Edit Assignment
  // ===================================

  function handleEdit(assignment) {
    setEditingId(assignment._id);

    setFormData({
      teacherId:
        assignment.teacher?._id ||
        "",

      className:
        assignment.className || "",

      section:
        assignment.section || "A",

      subjectId:
        assignment.subject?._id ||
        "",

      isClassTeacher:
        assignment.isClassTeacher ||
        false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ===================================
  // Delete Assignment
  // ===================================

  async function handleDelete(
    assignmentId
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this teacher assignment?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const result =
        await deleteTeacherAssignment(
          assignmentId
        );

      alert(result.message);

      if (result.success) {
        if (
          editingId === assignmentId
        ) {
          resetForm();
        }

        await loadData();
      }
    } catch (error) {
      console.error(
        "Delete Teacher Assignment Error:",
        error
      );

      alert(
        "Something went wrong while deleting the assignment."
      );
    }
  }

  // ===================================
  // Loading
  // ===================================

  if (pageLoading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-slate-500">
          Loading teacher
          assignments...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Session */}

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-slate-500">
          Active Academic Session
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {activeSession
            ? activeSession.name
            : "No active academic session"}
        </p>

        {!activeSession && (
          <p className="mt-2 text-sm text-red-600">
            Activate an academic
            session before creating
            teacher assignments.
          </p>
        )}
      </div>

      {/* Assignment Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6"
      >
        <div>
          <h2 className="text-lg font-semibold">
            {editingId
              ? "Edit Assignment"
              : "New Assignment"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a teacher, class,
            section and subject.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Teacher */}

          <div className="space-y-2">
            <Label>Teacher</Label>

            <select
              name="teacherId"
              value={
                formData.teacherId
              }
              onChange={handleChange}
              required
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map(
                (teacher) => (
                  <option
                    key={teacher._id}
                    value={teacher._id}
                  >
                    {
                      teacher.firstName
                    }{" "}
                    {teacher.lastName ||
                      ""}
                    {" - "}
                    {
                      teacher.employeeId
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* Class */}

          <div className="space-y-2">
            <Label>Class</Label>

            <select
              name="className"
              value={
                formData.className
              }
              onChange={handleChange}
              required
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">
                Select Class
              </option>

              {CLASS_OPTIONS.map(
                (className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    {className}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Section */}

          <div className="space-y-2">
            <Label>Section</Label>

            <select
              name="section"
              value={
                formData.section
              }
              onChange={handleChange}
              required
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {SECTION_OPTIONS.map(
                (section) => (
                  <option
                    key={section}
                    value={section}
                  >
                    {section}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Subject */}

          <div className="space-y-2">
            <Label>Subject</Label>

            <select
              name="subjectId"
              value={
                formData.subjectId
              }
              onChange={handleChange}
              required
              disabled={
                !formData.className
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">
                {formData.className
                  ? "Select Subject"
                  : "Select Class First"}
              </option>

              {filteredSubjects.map(
                (subject) => (
                  <option
                    key={subject._id}
                    value={subject._id}
                  >
                    {
                      subject.subjectName
                    }{" "}
                    (
                    {
                      subject.subjectCode
                    }
                    )
                  </option>
                )
              )}
            </select>

            {formData.className &&
              filteredSubjects.length ===
                0 && (
                <p className="text-xs text-slate-500">
                  No active subjects
                  are available for
                  this class.
                </p>
              )}
          </div>
        </div>

        {/* Class Teacher */}

        <div className="rounded-lg border bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <input
              id="isClassTeacher"
              name="isClassTeacher"
              type="checkbox"
              checked={
                formData.isClassTeacher
              }
              onChange={handleChange}
              className="mt-1 h-4 w-4"
            />

            <div>
              <Label
                htmlFor="isClassTeacher"
                className="cursor-pointer font-medium"
              >
                Set as Class Teacher
              </Label>

              <p className="mt-1 text-sm text-slate-500">
                Class teachers will
                manage daily attendance
                for this class and
                section.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3">
          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            disabled={
              loading ||
              !activeSession
            }
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Assignment"
                : "Assign Teacher"}
          </Button>
        </div>
      </form>

      {/* Assignment Table */}

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">
            Existing Assignments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assignments for{" "}
            {activeSession?.name ||
              "the active academic session"}
          </p>
        </div>

        {assignments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">
              No teacher assignments
              found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b text-left">
                  <th className="px-6 py-3 font-medium">
                    Teacher
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Employee ID
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Class
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Section
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Subject
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Role
                  </th>

                  <th className="px-6 py-3 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {assignments.map(
                  (assignment) => (
                    <tr
                      key={
                        assignment._id
                      }
                      className="border-b last:border-0"
                    >
                      <td className="px-6 py-4 font-medium">
                        {assignment
                          .teacher
                          ?.firstName ||
                          "-"}{" "}
                        {assignment
                          .teacher
                          ?.lastName ||
                          ""}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {assignment
                          .teacher
                          ?.employeeId ||
                          "-"}
                      </td>

                      <td className="px-6 py-4">
                        {
                          assignment.className
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          assignment.section
                        }
                      </td>

                      <td className="px-6 py-4">
                        {assignment
                          .subject
                          ?.subjectName ||
                          "-"}
                      </td>

                      <td className="px-6 py-4">
                        {assignment.isClassTeacher ? (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Class Teacher
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            Subject Teacher
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleEdit(
                                assignment
                              )
                            }
                          >
                            <Pencil
                              size={16}
                            />
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleDelete(
                                assignment._id
                              )
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2
                              size={16}
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}