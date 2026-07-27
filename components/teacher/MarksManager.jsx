"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Save,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  getTeacherMarkAssignments,
  getTeacherMarksData,
  saveTeacherMarks,
} from "@/app/actions/markActions";

// ===================================
// Create Snapshot
// ===================================

function createSnapshot(
  maximumMarks,
  marks
) {
  return JSON.stringify({
    maximumMarks: String(
      maximumMarks
    ),

    marks: marks.map(
      (mark) => ({
        student: mark.student,

        obtainedMarks:
          String(
            mark.obtainedMarks
          ),

        remarks:
          mark.remarks || "",
      })
    ),
  });
}

export default function MarksManager() {
  // ===================================
  // Basic Data
  // ===================================

  const [session, setSession] =
    useState(null);

  const [
    assignments,
    setAssignments,
  ] = useState([]);

  const [exams, setExams] =
    useState([]);

  const [
    selectedAssignment,
    setSelectedAssignment,
  ] = useState("");

  const [
    selectedExam,
    setSelectedExam,
  ] = useState("");

  // ===================================
  // Marks Data
  // ===================================

  const [students, setStudents] =
    useState([]);

  const [marks, setMarks] =
    useState([]);

  const [
    maximumMarks,
    setMaximumMarks,
  ] = useState("");

  const [
    savedSnapshot,
    setSavedSnapshot,
  ] = useState("");

  const [
    hasExistingMarks,
    setHasExistingMarks,
  ] = useState(false);

  // ===================================
  // UI State
  // ===================================

  const [loading, setLoading] =
    useState(true);

  const [
    loadingStudents,
    setLoadingStudents,
  ] = useState(false);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // ===================================
  // Load Teacher Assignments
  // ===================================

  async function loadInitialData() {
    try {
      setLoading(true);
      setMessage("");

      const result =
        await getTeacherMarkAssignments();

      if (!result.success) {
        setSession(null);
        setAssignments([]);
        setExams([]);

        setMessage(
          result.message ||
            "Failed to load marks data."
        );

        return;
      }

      setSession(
        result.session || null
      );

      setAssignments(
        result.assignments || []
      );

      setExams(
        result.exams || []
      );
    } catch (error) {
      console.error(
        "Load Teacher Marks Error:",
        error
      );

      setMessage(
        "Failed to load marks data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  // ===================================
  // Current Assignment
  // ===================================

  const assignment =
    useMemo(() => {
      return assignments.find(
        (item) =>
          item._id ===
          selectedAssignment
      );
    }, [
      assignments,
      selectedAssignment,
    ]);

  // ===================================
  // Applicable Exams
  // ===================================

  const applicableExams =
    useMemo(() => {
      if (!assignment) {
        return [];
      }

      return exams.filter(
        (exam) =>
          exam.applicableClasses?.includes(
            assignment.className
          )
      );
    }, [exams, assignment]);

  // ===================================
  // Reset Marks Sheet
  // ===================================

  function resetMarksSheet() {
    setStudents([]);
    setMarks([]);
    setMaximumMarks("");
    setSavedSnapshot("");
    setHasExistingMarks(false);
  }

  // ===================================
  // Assignment Change
  // ===================================

  function handleAssignmentChange(
    e
  ) {
    const value =
      e.target.value;

    setSelectedAssignment(value);

    setSelectedExam("");

    resetMarksSheet();

    setMessage("");
  }

  // ===================================
  // Exam Change
  // ===================================

  function handleExamChange(e) {
    const value =
      e.target.value;

    setSelectedExam(value);

    resetMarksSheet();

    setMessage("");
  }

  // ===================================
  // Load Students + Existing Marks
  // ===================================

  useEffect(() => {
    if (
      !selectedAssignment ||
      !selectedExam
    ) {
      return;
    }

    async function loadMarksData() {
      try {
        setLoadingStudents(true);
        setMessage("");

        const result =
          await getTeacherMarksData({
            assignmentId:
              selectedAssignment,

            examId:
              selectedExam,
          });

        if (!result.success) {
          resetMarksSheet();

          setMessage(
            result.message ||
              "Failed to load marks."
          );

          return;
        }

        const loadedStudents =
          result.students || [];

        const existingMarks =
          result.marks || [];

        setStudents(
          loadedStudents
        );

        // ===================================
        // Existing Marks Map
        // ===================================

        const existingMap =
          new Map(
            existingMarks.map(
              (mark) => [
                mark.student.toString(),
                mark,
              ]
            )
          );

        const initialMarks =
          loadedStudents.map(
            (student) => {
              const studentId =
                student._id.toString();

              const existing =
                existingMap.get(
                  studentId
                );

              return {
                student:
                  studentId,

                obtainedMarks:
                  existing
                    ? String(
                        existing.obtainedMarks
                      )
                    : "",

                remarks:
                  existing?.remarks ||
                  "",
              };
            }
          );

        setMarks(initialMarks);

        // ===================================
        // Existing Maximum Marks
        // ===================================

        const existingMaximum =
          existingMarks.length > 0
            ? String(
                existingMarks[0]
                  .maximumMarks
              )
            : "";

        setMaximumMarks(
          existingMaximum
        );

        const existing =
          existingMarks.length > 0;

        setHasExistingMarks(
          existing
        );

        if (existing) {
          setSavedSnapshot(
            createSnapshot(
              existingMaximum,
              initialMarks
            )
          );
        } else {
          setSavedSnapshot("");
        }
      } catch (error) {
        console.error(
          "Load Marks Data Error:",
          error
        );

        resetMarksSheet();

        setMessage(
          "Failed to load marks."
        );
      } finally {
        setLoadingStudents(false);
      }
    }

    loadMarksData();
  }, [
    selectedAssignment,
    selectedExam,
  ]);

  // ===================================
  // Marks Map
  // ===================================

  const markMap =
    useMemo(() => {
      return new Map(
        marks.map((mark) => [
          mark.student,
          mark,
        ])
      );
    }, [marks]);

  // ===================================
  // Entered Count
  // ===================================

  const enteredCount =
    useMemo(() => {
      return marks.filter(
        (mark) =>
          mark.obtainedMarks !== ""
      ).length;
    }, [marks]);

  // ===================================
  // Unsaved Changes
  // ===================================

  const hasChanges =
    useMemo(() => {
      if (
        students.length === 0
      ) {
        return false;
      }

      const hasAnyMarks =
        marks.some(
          (mark) =>
            mark.obtainedMarks !== ""
        );

      if (!hasAnyMarks) {
        return false;
      }

      if (
        !hasExistingMarks
      ) {
        return true;
      }

      return (
        createSnapshot(
          maximumMarks,
          marks
        ) !== savedSnapshot
      );
    }, [
      students,
      marks,
      maximumMarks,
      savedSnapshot,
      hasExistingMarks,
    ]);

  // ===================================
  // Update Student Mark
  // ===================================

  function updateMark(
    studentId,
    value
  ) {
    setMessage("");

    // Prevent negative values.

    if (
      value !== "" &&
      Number(value) < 0
    ) {
      return;
    }

    setMarks((prev) =>
      prev.map((mark) =>
        mark.student ===
        studentId
          ? {
              ...mark,

              obtainedMarks:
                value,
            }
          : mark
      )
    );
  }

  // ===================================
  // Update Remarks
  // ===================================

  function updateRemarks(
    studentId,
    value
  ) {
    setMessage("");

    setMarks((prev) =>
      prev.map((mark) =>
        mark.student ===
        studentId
          ? {
              ...mark,

              remarks: value,
            }
          : mark
      )
    );
  }

  // ===================================
  // Save
  // ===================================

  async function handleSave() {
    if (
      saving ||
      students.length === 0
    ) {
      return;
    }

    const maxMarks =
      Number(maximumMarks);

    if (
      !maximumMarks ||
      Number.isNaN(maxMarks) ||
      maxMarks <= 0
    ) {
      setMessage(
        "Enter valid maximum marks."
      );

      return;
    }

    const invalidMark =
      marks.find(
        (mark) =>
          mark.obtainedMarks !== "" &&
          Number(
            mark.obtainedMarks
          ) > maxMarks
      );

    if (invalidMark) {
      setMessage(
        `Obtained marks cannot exceed ${maxMarks}.`
      );

      return;
    }

    const hasAnyMarks =
      marks.some(
        (mark) =>
          mark.obtainedMarks !== ""
      );

    if (!hasAnyMarks) {
      setMessage(
        "Enter marks for at least one student."
      );

      return;
    }

    if (
      hasExistingMarks &&
      !hasChanges
    ) {
      setMessage(
        "No changes to save."
      );

      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const result =
        await saveTeacherMarks({
          assignmentId:
            selectedAssignment,

          examId:
            selectedExam,

          maximumMarks:
            maxMarks,

          marks,
        });

      if (!result.success) {
        setMessage(
          result.message ||
            "Failed to save marks."
        );

        return;
      }

      // ===================================
      // No reload after save.
      // Local state is already current.
      // ===================================

      setHasExistingMarks(true);

      setSavedSnapshot(
        createSnapshot(
          maximumMarks,
          marks
        )
      );

      setMessage(
        result.message ||
          "Marks saved successfully."
      );
    } catch (error) {
      console.error(
        "Save Marks Error:",
        error
      );

      setMessage(
        "Failed to save marks."
      );
    } finally {
      setSaving(false);
    }
  }

  // ===================================
  // Loading
  // ===================================

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-sm text-muted-foreground">
            Loading marks module...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===================================
          Selection
      =================================== */}

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Select Class & Exam
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Academic Session:{" "}
              {session?.name || "—"}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Assignment */}

            <div className="space-y-2">
              <Label>
                Assigned Class & Subject
              </Label>

              <select
                value={
                  selectedAssignment
                }
                onChange={
                  handleAssignmentChange
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  Select assignment
                </option>

                {assignments.map(
                  (item) => (
                    <option
                      key={item._id}
                      value={item._id}
                    >
                      Class{" "}
                      {
                        item.className
                      }
                      -
                      {item.section} •{" "}
                      {
                        item.subject
                          ?.subjectName
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Exam */}

            <div className="space-y-2">
              <Label>
                Exam
              </Label>

              <select
                value={
                  selectedExam
                }
                onChange={
                  handleExamChange
                }
                disabled={
                  !selectedAssignment
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  Select exam
                </option>

                {applicableExams.map(
                  (exam) => (
                    <option
                      key={exam._id}
                      value={exam._id}
                    >
                      {
                        exam.examName
                      }{" "}
                      (
                      {
                        exam.examType
                      }
                      )
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {assignments.length ===
            0 && (
            <p className="mt-5 text-sm text-muted-foreground">
              No active subject
              assignments found for
              this academic session.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ===================================
          Message Before Selection
      =================================== */}

      {!selectedAssignment ||
      !selectedExam ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <ClipboardList className="h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              Select an assignment and
              exam
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              The student marks sheet
              will appear here.
            </p>

            {message && (
              <p className="mt-4 text-sm">
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      ) : loadingStudents ? (
        <Card>
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground">
              Loading students and
              marks...
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ===================================
              Summary
          =================================== */}

          <section className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Students
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {
                      students.length
                    }
                  </p>
                </div>

                <Users className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Marks Entered
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {enteredCount}
                  </p>
                </div>

                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Subject
                  </p>

                  <p className="mt-1 font-semibold">
                    {assignment
                      ?.subject
                      ?.subjectName ||
                      "—"}
                  </p>
                </div>

                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          </section>

          {/* ===================================
              Marks Sheet
          =================================== */}

          <Card>
            <CardContent className="p-0">
              {/* Header */}

              <div className="flex flex-col gap-5 border-b p-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />

                    <h2 className="text-xl font-semibold">
                      Class{" "}
                      {
                        assignment
                          ?.className
                      }
                      -
                      {
                        assignment
                          ?.section
                      }
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {
                      assignment
                        ?.subject
                        ?.subjectName
                    }
                  </p>
                </div>

                <div className="w-full space-y-2 sm:w-52">
                  <Label htmlFor="maximumMarks">
                    Maximum Marks
                  </Label>

                  <Input
                    id="maximumMarks"
                    type="number"
                    min="1"
                    value={
                      maximumMarks
                    }
                    disabled={saving}
                    onChange={(e) => {
                      setMaximumMarks(
                        e.target.value
                      );

                      setMessage("");
                    }}
                    placeholder="Example: 100"
                  />
                </div>
              </div>

              {/* Students */}

              {students.length ===
              0 ? (
                <div className="p-10 text-center">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground" />

                  <p className="mt-4 font-medium">
                    No students found
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {students.map(
                    (
                      student,
                      index
                    ) => {
                      const studentId =
                        student._id.toString();

                      const mark =
                        markMap.get(
                          studentId
                        );

                      if (!mark) {
                        return null;
                      }

                      return (
                        <div
                          key={
                            studentId
                          }
                          className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_160px_minmax(180px,1fr)] md:items-center"
                        >
                          {/* Student */}

                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                              {student.rollNo ||
                                index +
                                  1}
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold">
                                {
                                  student.firstName
                                }{" "}
                                {student.lastName ||
                                  ""}
                              </p>

                              <p className="text-sm text-muted-foreground">
                                Admission
                                No:{" "}
                                {
                                  student.admissionNo
                                }
                              </p>
                            </div>
                          </div>

                          {/* Marks */}

                          <div className="space-y-2">
                            <Label>
                              Marks
                            </Label>

                            <Input
                              type="number"
                              min="0"
                              max={
                                maximumMarks ||
                                undefined
                              }
                              value={
                                mark.obtainedMarks
                              }
                              disabled={
                                saving
                              }
                              onChange={(
                                e
                              ) =>
                                updateMark(
                                  studentId,
                                  e.target
                                    .value
                                )
                              }
                              placeholder="Marks"
                            />
                          </div>

                          {/* Remarks */}

                          <div className="space-y-2">
                            <Label>
                              Remarks
                            </Label>

                            <Input
                              value={
                                mark.remarks
                              }
                              disabled={
                                saving
                              }
                              onChange={(
                                e
                              ) =>
                                updateRemarks(
                                  studentId,
                                  e.target
                                    .value
                                )
                              }
                              placeholder="Optional"
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* Save */}

              {students.length >
                0 && (
                <div className="flex flex-col gap-3 border-t bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {
                        enteredCount
                      }{" "}
                      of{" "}
                      {
                        students.length
                      }{" "}
                      students entered
                    </p>

                    {hasExistingMarks &&
                      hasChanges && (
                        <p className="mt-1 text-xs font-medium">
                          Unsaved
                          changes
                        </p>
                      )}

                    {message && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    disabled={
                      saving ||
                      !hasChanges
                    }
                    onClick={
                      handleSave
                    }
                  >
                    <Save className="mr-2 h-4 w-4" />

                    {saving
                      ? "Saving..."
                      : hasExistingMarks
                        ? hasChanges
                          ? "Update Marks"
                          : "Marks Saved"
                        : "Save Marks"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}