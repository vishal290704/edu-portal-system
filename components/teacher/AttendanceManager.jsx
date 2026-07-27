"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  Check,
  CircleAlert,
  HeartPulse,
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
  getAttendanceData,
  saveAttendance,
} from "@/app/actions/attendanceActions";

// ===================================
// Get Today's Local Date
// ===================================

function getToday() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ===================================
// Normalize Records
// ===================================

function normalizeRecords(records) {
  return records.map((record) => ({
    student: record.student.toString(),

    status: record.status,

    medicalReason:
      record.medicalReason || "",

    certificateSubmitted:
      Boolean(
        record.certificateSubmitted
      ),
  }));
}

// ===================================
// Create Snapshot
// Used to detect unsaved changes
// ===================================

function createSnapshot(records) {
  return JSON.stringify(
    normalizeRecords(records)
  );
}

export default function AttendanceManager() {
  const [date, setDate] = useState(
    getToday()
  );

  const [students, setStudents] =
    useState([]);

  const [records, setRecords] =
    useState([]);

  const [savedSnapshot, setSavedSnapshot] =
    useState("");

  const [classInfo, setClassInfo] =
    useState(null);

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [
    hasExistingAttendance,
    setHasExistingAttendance,
  ] = useState(false);

  // ===================================
  // Load Attendance
  // ===================================

  async function loadAttendance(
    selectedDate
  ) {
    try {
      setLoading(true);
      setMessage("");

      const result =
        await getAttendanceData(
          selectedDate
        );

      if (!result.success) {
        setStudents([]);
        setRecords([]);
        setSavedSnapshot("");
        setClassInfo(null);
        setSession(null);

        setHasExistingAttendance(false);

        setMessage(
          result.message ||
            "Failed to load attendance."
        );

        return;
      }

      const loadedStudents =
        result.students || [];

      setStudents(loadedStudents);

      setClassInfo(
        result.classInfo || null
      );

      setSession(
        result.session || null
      );

      // ===================================
      // Existing Attendance
      // ===================================

      if (result.attendance) {
        setHasExistingAttendance(true);

        const savedRecordsMap =
          new Map(
            (
              result.attendance.records ||
              []
            ).map((record) => [
              record.student.toString(),
              record,
            ])
          );

        const mergedRecords =
          loadedStudents.map(
            (student) => {
              const studentId =
                student._id.toString();

              const saved =
                savedRecordsMap.get(
                  studentId
                );

              if (saved) {
                return {
                  student: studentId,

                  status:
                    saved.status,

                  medicalReason:
                    saved.medicalReason ||
                    "",

                  certificateSubmitted:
                    Boolean(
                      saved.certificateSubmitted
                    ),
                };
              }

              // Student may have been added
              // after attendance was saved.

              return {
                student: studentId,

                status: "PRESENT",

                medicalReason: "",

                certificateSubmitted:
                  false,
              };
            }
          );

        setRecords(mergedRecords);

        setSavedSnapshot(
          createSnapshot(
            mergedRecords
          )
        );

        return;
      }

      // ===================================
      // New Attendance
      // Everyone Present By Default
      // ===================================

      setHasExistingAttendance(false);

      const initialRecords =
        loadedStudents.map(
          (student) => ({
            student:
              student._id.toString(),

            status: "PRESENT",

            medicalReason: "",

            certificateSubmitted:
              false,
          })
        );

      setRecords(initialRecords);

      // No attendance exists yet.
      // Keep empty snapshot so first save
      // is still available.

      setSavedSnapshot("");
    } catch (error) {
      console.error(
        "Load Attendance Error:",
        error
      );

      setStudents([]);
      setRecords([]);
      setSavedSnapshot("");

      setMessage(
        "Failed to load attendance."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================
  // Load When Date Changes
  // ===================================

  useEffect(() => {
    loadAttendance(date);
  }, [date]);

  // ===================================
  // Record Map
  //
  // Prevents records.find() from
  // running for every student render.
  // ===================================

  const recordMap = useMemo(() => {
    return new Map(
      records.map((record) => [
        record.student,
        record,
      ])
    );
  }, [records]);

  // ===================================
  // Attendance Counts
  // ===================================

  const counts = useMemo(() => {
    let present = 0;
    let absent = 0;
    let medical = 0;

    for (const record of records) {
      if (
        record.status === "PRESENT"
      ) {
        present++;
      } else if (
        record.status === "ABSENT"
      ) {
        absent++;
      } else if (
        record.status === "MEDICAL"
      ) {
        medical++;
      }
    }

    return {
      present,
      absent,
      medical,
    };
  }, [records]);

  // ===================================
  // Detect Unsaved Changes
  // ===================================

  const hasChanges = useMemo(() => {
    if (records.length === 0) {
      return false;
    }

    // New attendance must be saved
    // at least once.

    if (!hasExistingAttendance) {
      return true;
    }

    return (
      createSnapshot(records) !==
      savedSnapshot
    );
  }, [
    records,
    savedSnapshot,
    hasExistingAttendance,
  ]);

  // ===================================
  // Update Status
  // ===================================

  function updateStatus(
    studentId,
    status
  ) {
    setMessage("");

    setRecords((prev) =>
      prev.map((record) => {
        if (
          record.student !== studentId
        ) {
          return record;
        }

        // Don't create unnecessary
        // state update.

        if (
          record.status === status
        ) {
          return record;
        }

        return {
          ...record,

          status,

          medicalReason:
            status === "MEDICAL"
              ? record.medicalReason
              : "",

          certificateSubmitted:
            status === "MEDICAL"
              ? record.certificateSubmitted
              : false,
        };
      })
    );
  }

  // ===================================
  // Update Medical Reason
  // ===================================

  function updateMedicalReason(
    studentId,
    value
  ) {
    setMessage("");

    setRecords((prev) =>
      prev.map((record) =>
        record.student === studentId
          ? {
              ...record,
              medicalReason: value,
            }
          : record
      )
    );
  }

  // ===================================
  // Certificate Submitted
  // ===================================

  function updateCertificate(
    studentId,
    checked
  ) {
    setMessage("");

    setRecords((prev) =>
      prev.map((record) =>
        record.student === studentId
          ? {
              ...record,

              certificateSubmitted:
                checked,
            }
          : record
      )
    );
  }

  // ===================================
  // Mark All Present
  // ===================================

  function markAllPresent() {
    setMessage("");

    setRecords((prev) =>
      prev.map((record) => ({
        ...record,

        status: "PRESENT",

        medicalReason: "",

        certificateSubmitted:
          false,
      }))
    );
  }

  // ===================================
  // Save Attendance
  // ===================================

  async function handleSave() {
    if (
      students.length === 0 ||
      records.length === 0 ||
      saving
    ) {
      return;
    }

    // Existing attendance hasn't changed.
    // No database request required.

    if (
      hasExistingAttendance &&
      !hasChanges
    ) {
      setMessage(
        "No changes to save."
      );

      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const recordsToSave =
        normalizeRecords(records);

      const result =
        await saveAttendance({
          date,
          records:
            recordsToSave,
        });

      if (!result.success) {
        setMessage(
          result.message ||
            "Failed to save attendance."
        );

        return;
      }

      // ===================================
      // IMPORTANT PERFORMANCE CHANGE
      //
      // Do NOT call loadAttendance()
      // here.
      //
      // The local records are already
      // exactly what we saved.
      // ===================================

      setHasExistingAttendance(true);

      setSavedSnapshot(
        createSnapshot(
          recordsToSave
        )
      );

      setMessage(
        result.message ||
          "Attendance saved successfully."
      );
    } catch (error) {
      console.error(
        "Save Attendance Error:",
        error
      );

      setMessage(
        "Failed to save attendance."
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
            Loading attendance...
          </p>
        </CardContent>
      </Card>
    );
  }

  // ===================================
  // No Class Teacher Assignment
  // ===================================

  if (!classInfo) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 h-5 w-5 text-muted-foreground" />

            <div>
              <h2 className="font-semibold">
                Attendance unavailable
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {message ||
                  "You are not assigned as a class teacher."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===================================
          Class / Date
      =================================== */}

      <Card>
        <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Class Teacher Attendance
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Class{" "}
              {classInfo.className}-
              {classInfo.section}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Academic Session:{" "}
              {session?.name || "—"}
            </p>
          </div>

          <div className="w-full space-y-2 sm:w-64">
            <Label htmlFor="attendanceDate">
              Attendance Date
            </Label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="attendanceDate"
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================
          Existing Attendance Notice
      =================================== */}

      {hasExistingAttendance && (
        <div className="rounded-lg border bg-muted/40 px-4 py-3">
          <p className="text-sm font-medium">
            Attendance already exists
            for this date.
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Any changes you save will
            update the existing
            attendance.
          </p>
        </div>
      )}

      {/* ===================================
          Statistics
      =================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Students
              </p>

              <p className="mt-1 text-2xl font-bold">
                {students.length}
              </p>
            </div>

            <Users className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Present
              </p>

              <p className="mt-1 text-2xl font-bold">
                {counts.present}
              </p>
            </div>

            <Check className="h-6 w-6 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Absent
              </p>

              <p className="mt-1 text-2xl font-bold">
                {counts.absent}
              </p>
            </div>

            <CircleAlert className="h-6 w-6 text-red-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Medical
              </p>

              <p className="mt-1 text-2xl font-bold">
                {counts.medical}
              </p>
            </div>

            <HeartPulse className="h-6 w-6 text-blue-600" />
          </CardContent>
        </Card>
      </section>

      {/* ===================================
          Attendance Sheet
      =================================== */}

      <Card>
        <CardContent className="p-0">
          {/* Header */}

          <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Attendance Sheet
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Everyone is Present by
                default. Change only
                Absent or Medical
                students.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={
                markAllPresent
              }
              disabled={
                students.length === 0 ||
                saving
              }
            >
              <Check className="mr-2 h-4 w-4" />

              Mark All Present
            </Button>
          </div>

          {/* No Students */}

          {students.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-4 font-medium">
                No students found
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                There are no active
                students in this class.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {students.map(
                (student, index) => {
                  const studentId =
                    student._id.toString();

                  const record =
                    recordMap.get(
                      studentId
                    );

                  if (!record) {
                    return null;
                  }

                  return (
                    <div
                      key={studentId}
                      className="p-5"
                    >
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        {/* Student */}

                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                            {student.rollNo ||
                              index + 1}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {
                                student.firstName
                              }{" "}
                              {student.lastName ||
                                ""}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              Admission No:{" "}
                              {
                                student.admissionNo
                              }
                            </p>
                          </div>
                        </div>

                        {/* Status */}

                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant={
                              record.status ===
                              "PRESENT"
                                ? "default"
                                : "outline"
                            }
                            disabled={
                              saving
                            }
                            onClick={() =>
                              updateStatus(
                                studentId,
                                "PRESENT"
                              )
                            }
                          >
                            <Check className="mr-2 h-4 w-4" />

                            Present
                          </Button>

                          <Button
                            type="button"
                            variant={
                              record.status ===
                              "ABSENT"
                                ? "destructive"
                                : "outline"
                            }
                            disabled={
                              saving
                            }
                            onClick={() =>
                              updateStatus(
                                studentId,
                                "ABSENT"
                              )
                            }
                          >
                            Absent
                          </Button>

                          <Button
                            type="button"
                            variant={
                              record.status ===
                              "MEDICAL"
                                ? "secondary"
                                : "outline"
                            }
                            disabled={
                              saving
                            }
                            onClick={() =>
                              updateStatus(
                                studentId,
                                "MEDICAL"
                              )
                            }
                          >
                            <HeartPulse className="mr-2 h-4 w-4" />

                            Medical
                          </Button>
                        </div>
                      </div>

                      {/* ===================================
                          Medical Details
                      =================================== */}

                      {record.status ===
                        "MEDICAL" && (
                        <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>
                                Medical Reason
                              </Label>

                              <Input
                                value={
                                  record.medicalReason
                                }
                                disabled={
                                  saving
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateMedicalReason(
                                    studentId,
                                    e.target
                                      .value
                                  )
                                }
                                placeholder="Example: Fever"
                              />
                            </div>

                            <div className="flex items-end">
                              <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-background px-4 py-3">
                                <input
                                  type="checkbox"
                                  checked={
                                    record.certificateSubmitted
                                  }
                                  disabled={
                                    saving
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateCertificate(
                                      studentId,
                                      e
                                        .target
                                        .checked
                                    )
                                  }
                                  className="h-4 w-4"
                                />

                                <div>
                                  <p className="text-sm font-medium">
                                    Physical
                                    Certificate
                                    Submitted
                                  </p>

                                  <p className="text-xs text-muted-foreground">
                                    Optional
                                  </p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* ===================================
              Save
          =================================== */}

          {students.length > 0 && (
            <div className="flex flex-col gap-3 border-t bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">
                  Present:{" "}
                  {counts.present}
                  {" • "}
                  Absent:{" "}
                  {counts.absent}
                  {" • "}
                  Medical:{" "}
                  {counts.medical}
                </p>

                {hasExistingAttendance &&
                  hasChanges && (
                    <p className="mt-1 text-xs font-medium">
                      Unsaved changes
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
                  : hasExistingAttendance
                    ? hasChanges
                      ? "Update Attendance"
                      : "Attendance Saved"
                    : "Save Attendance"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}