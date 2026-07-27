"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Save,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  getClassTeacherMarksSetup,
  getClassTeacherMarksData,
  saveClassTeacherMarks,
} from "@/app/actions/markActions";

// ===================================
// Create Marks Key
// ===================================

function getMarkKey(studentId, subjectId) {
  return `${studentId}:${subjectId}`;
}

// ===================================
// Create Saved Snapshot
// ===================================

function createSnapshot(maximumMarks, marks) {
  return JSON.stringify({
    maximumMarks: String(maximumMarks),

    marks: marks.map((mark) => ({
      student: mark.student,
      subject: mark.subject,
      obtainedMarks: String(mark.obtainedMarks),
      remarks: mark.remarks || "",
    })),
  });
}

export default function MarksManager() {
  // ===================================
  // Setup
  // ===================================

  const [session, setSession] = useState(null);
  const [classInfo, setClassInfo] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  const [selectedExam, setSelectedExam] = useState("");

  // ===================================
  // Marks Sheet
  // ===================================

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  const [maximumMarks, setMaximumMarks] = useState("");

  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [hasExistingMarks, setHasExistingMarks] = useState(false);

  // ===================================
  // UI
  // ===================================

  const [loading, setLoading] = useState(true);
  const [loadingMarks, setLoadingMarks] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // ===================================
  // Initial Setup
  // ===================================

  useEffect(() => {
    async function loadSetup() {
      try {
        setLoading(true);
        setMessage("");
        setSuccess(false);

        const result = await getClassTeacherMarksSetup();

        if (!result.success) {
          setMessage(result.message || "Failed to load marks module.");
          return;
        }

        setSession(result.session);
        setClassInfo(result.classInfo);
        setSubjects(result.subjects || []);
        setExams(result.exams || []);
      } catch (error) {
        console.error("Load Marks Setup Error:", error);

        setMessage("Failed to load marks module.");
      } finally {
        setLoading(false);
      }
    }

    loadSetup();
  }, []);

  // ===================================
  // Selected Exam
  // ===================================

  const exam = useMemo(() => {
    return exams.find((item) => item._id === selectedExam);
  }, [exams, selectedExam]);

  // ===================================
  // Reset Sheet
  // ===================================

  function resetSheet() {
    setStudents([]);
    setMarks([]);
    setMaximumMarks("");
    setSavedSnapshot("");
    setHasExistingMarks(false);
  }

  // ===================================
  // Exam Change
  // ===================================

  function handleExamChange(e) {
    setSelectedExam(e.target.value);

    resetSheet();

    setMessage("");
    setSuccess(false);
  }

  // ===================================
  // Load Students + Existing Marks
  // ===================================

  useEffect(() => {
    if (!selectedExam) {
      return;
    }

    async function loadMarks() {
      try {
        setLoadingMarks(true);
        setMessage("");
        setSuccess(false);

        const result = await getClassTeacherMarksData({
          examId: selectedExam,
        });

        if (!result.success) {
          resetSheet();

          setMessage(result.message || "Failed to load marks.");
          return;
        }

        const loadedStudents = result.students || [];
        const loadedSubjects = result.subjects || [];
        const existingMarks = result.marks || [];

        setStudents(loadedStudents);

        // Use subjects returned by secure server lookup.
        setSubjects(loadedSubjects);

        // ===================================
        // Existing Marks Map
        // ===================================

        const existingMap = new Map();

        for (const mark of existingMarks) {
          const studentId = mark.student?.toString();
          const subjectId = mark.subject?.toString();

          existingMap.set(
            getMarkKey(studentId, subjectId),
            mark
          );
        }

        // ===================================
        // Build Complete Student × Subject Grid
        // ===================================

        const initialMarks = [];

        for (const student of loadedStudents) {
          for (const subject of loadedSubjects) {
            const studentId = student._id.toString();
            const subjectId = subject._id.toString();

            const existing = existingMap.get(
              getMarkKey(studentId, subjectId)
            );

            initialMarks.push({
              student: studentId,
              subject: subjectId,

              obtainedMarks:
                existing?.obtainedMarks !== undefined
                  ? String(existing.obtainedMarks)
                  : "",

              remarks: existing?.remarks || "",
            });
          }
        }

        setMarks(initialMarks);

        // ===================================
        // Existing Maximum Marks
        // ===================================

        const existingMaximum =
          existingMarks.length > 0
            ? String(existingMarks[0].maximumMarks)
            : "";

        setMaximumMarks(existingMaximum);

        const hasExisting = existingMarks.length > 0;

        setHasExistingMarks(hasExisting);

        if (hasExisting) {
          setSavedSnapshot(
            createSnapshot(existingMaximum, initialMarks)
          );
        } else {
          setSavedSnapshot("");
        }
      } catch (error) {
        console.error("Load Marks Error:", error);

        resetSheet();

        setMessage("Failed to load marks.");
      } finally {
        setLoadingMarks(false);
      }
    }

    loadMarks();
  }, [selectedExam]);

  // ===================================
  // Marks Map
  // ===================================

  const marksMap = useMemo(() => {
    const map = new Map();

    for (const mark of marks) {
      map.set(
        getMarkKey(mark.student, mark.subject),
        mark
      );
    }

    return map;
  }, [marks]);

  // ===================================
  // Counts
  // ===================================

  const totalCells = students.length * subjects.length;

  const enteredCount = useMemo(() => {
    return marks.filter(
      (mark) => mark.obtainedMarks !== ""
    ).length;
  }, [marks]);

  // ===================================
  // Detect Changes
  // ===================================

  const hasChanges = useMemo(() => {
    if (!selectedExam || marks.length === 0) {
      return false;
    }

    const hasAnyMark = marks.some(
      (mark) => mark.obtainedMarks !== ""
    );

    if (!hasAnyMark) {
      return false;
    }

    if (!hasExistingMarks) {
      return true;
    }

    return (
      createSnapshot(maximumMarks, marks) !== savedSnapshot
    );
  }, [
    selectedExam,
    maximumMarks,
    marks,
    savedSnapshot,
    hasExistingMarks,
  ]);

  // ===================================
  // Update Mark
  // ===================================

  function updateMark(studentId, subjectId, value) {
    setMessage("");
    setSuccess(false);

    if (value !== "" && Number(value) < 0) {
      return;
    }

    setMarks((prev) =>
      prev.map((mark) =>
        mark.student === studentId &&
        mark.subject === subjectId
          ? {
              ...mark,
              obtainedMarks: value,
            }
          : mark
      )
    );
  }

  // ===================================
  // Save
  // ===================================

  async function handleSave() {
    if (saving) {
      return;
    }

    setMessage("");
    setSuccess(false);

    const maxMarks = Number(maximumMarks);

    if (
      maximumMarks === "" ||
      Number.isNaN(maxMarks) ||
      maxMarks <= 0
    ) {
      setMessage("Enter valid maximum marks.");
      return;
    }

    // ===================================
    // Client Validation
    // ===================================

    for (const mark of marks) {
      if (mark.obtainedMarks === "") {
        continue;
      }

      const obtained = Number(mark.obtainedMarks);

      if (Number.isNaN(obtained)) {
        setMessage("Marks must be numeric.");
        return;
      }

      if (obtained < 0) {
        setMessage("Marks cannot be negative.");
        return;
      }

      if (obtained > maxMarks) {
        setMessage(
          `Obtained marks cannot exceed ${maxMarks}.`
        );

        return;
      }
    }

    const hasAnyMarks = marks.some(
      (mark) => mark.obtainedMarks !== ""
    );

    if (!hasAnyMarks) {
      setMessage("Enter marks for at least one student.");
      return;
    }

    if (hasExistingMarks && !hasChanges) {
      setMessage("No changes to save.");
      return;
    }

    // ===================================
    // Save
    // ===================================

    try {
      setSaving(true);

      const result = await saveClassTeacherMarks({
        examId: selectedExam,
        maximumMarks: maxMarks,
        marks,
      });

      if (!result.success) {
        setMessage(result.message || "Failed to save marks.");
        return;
      }

      // No reload required.
      setHasExistingMarks(true);

      setSavedSnapshot(
        createSnapshot(maximumMarks, marks)
      );

      setSuccess(true);

      setMessage(
        result.message || "Marks saved successfully."
      );
    } catch (error) {
      console.error("Save Marks Error:", error);

      setMessage("Failed to save marks.");
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

  // ===================================
  // No Class Teacher Permission
  // ===================================

  if (!classInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <GraduationCap className="h-10 w-10 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">
            Marks Entry Unavailable
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {message ||
              "Only the class teacher can enter marks."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===================================
          Class Information
      =================================== */}

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Your Class
              </p>

              <p className="mt-1 text-xl font-bold">
                Class {classInfo.className}-{classInfo.section}
              </p>
            </div>

            <GraduationCap className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Academic Session
              </p>

              <p className="mt-1 text-xl font-bold">
                {session?.name || "—"}
              </p>
            </div>

            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Subjects
              </p>

              <p className="mt-1 text-xl font-bold">
                {subjects.length}
              </p>
            </div>

            <Users className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>
      </section>

      {/* ===================================
          Exam Selection
      =================================== */}

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Select Exam</Label>

              <select
                value={selectedExam}
                onChange={handleExamChange}
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  Select exam
                </option>

                {exams.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.examName} ({item.examType})
                  </option>
                ))}
              </select>

              {exams.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No active exams are available for your class.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Maximum Marks</Label>

              <Input
                type="number"
                min="1"
                value={maximumMarks}
                disabled={!selectedExam || saving}
                onChange={(e) => {
                  setMaximumMarks(e.target.value);
                  setMessage("");
                  setSuccess(false);
                }}
                placeholder="Example: 20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================
          Nothing Selected
      =================================== */}

      {!selectedExam ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              Select an Exam
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Select an exam to enter marks for your class.
            </p>
          </CardContent>
        </Card>
      ) : loadingMarks ? (
        <Card>
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground">
              Loading students and marks...
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ===================================
              Marks Summary
          =================================== */}

          <section className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Students
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {students.length}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Marks Entered
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {enteredCount} / {totalCells}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Exam
                </p>

                <p className="mt-1 text-lg font-bold">
                  {exam?.examName || "—"}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* ===================================
              Marks Grid
          =================================== */}

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <h2 className="text-xl font-semibold">
                  Class {classInfo.className}-{classInfo.section} Marks
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Enter marks for all students and subjects.
                </p>
              </div>

              {students.length === 0 ? (
                <div className="p-10 text-center">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground" />

                  <p className="mt-4 font-medium">
                    No active students found.
                  </p>
                </div>
              ) : subjects.length === 0 ? (
                <div className="p-10 text-center">
                  <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />

                  <p className="mt-4 font-medium">
                    No subjects found for this class.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="sticky left-0 z-20 min-w-[70px] bg-muted px-4 py-4 text-left text-sm font-semibold">
                          Roll
                        </th>

                        <th className="sticky left-[70px] z-20 min-w-[220px] bg-muted px-4 py-4 text-left text-sm font-semibold">
                          Student
                        </th>

                        {subjects.map((subject) => (
                          <th
                            key={subject._id}
                            className="min-w-[140px] px-4 py-4 text-center text-sm font-semibold"
                          >
                            <div>
                              {subject.subjectName}
                            </div>

                            <div className="mt-1 text-xs font-normal text-muted-foreground">
                              {subject.subjectCode}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {students.map((student, index) => {
                        const studentId =
                          student._id.toString();

                        return (
                          <tr
                            key={studentId}
                            className="border-b last:border-b-0 hover:bg-muted/20"
                          >
                            <td className="sticky left-0 z-10 bg-background px-4 py-3 text-sm font-medium">
                              {student.rollNo || index + 1}
                            </td>

                            <td className="sticky left-[70px] z-10 bg-background px-4 py-3">
                              <p className="font-medium">
                                {student.firstName}{" "}
                                {student.lastName || ""}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {student.admissionNo}
                              </p>
                            </td>

                            {subjects.map((subject) => {
                              const subjectId =
                                subject._id.toString();

                              const mark = marksMap.get(
                                getMarkKey(
                                  studentId,
                                  subjectId
                                )
                              );

                              return (
                                <td
                                  key={subjectId}
                                  className="px-3 py-3"
                                >
                                  <Input
                                    type="number"
                                    min="0"
                                    max={
                                      maximumMarks ||
                                      undefined
                                    }
                                    value={
                                      mark?.obtainedMarks ??
                                      ""
                                    }
                                    disabled={saving}
                                    onChange={(e) =>
                                      updateMark(
                                        studentId,
                                        subjectId,
                                        e.target.value
                                      )
                                    }
                                    className="mx-auto w-24 text-center"
                                    placeholder="—"
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ===================================
                  Save Bar
              =================================== */}

              {students.length > 0 &&
                subjects.length > 0 && (
                  <div className="flex flex-col gap-4 border-t bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {enteredCount} of {totalCells} marks entered
                      </p>

                      {hasExistingMarks &&
                        hasChanges && (
                          <p className="mt-1 text-xs text-amber-600">
                            You have unsaved changes.
                          </p>
                        )}

                      {message && (
                        <p
                          className={`mt-2 text-sm ${
                            success
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      onClick={handleSave}
                      disabled={
                        saving ||
                        !hasChanges
                      }
                    >
                      {success && !hasChanges ? (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}

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