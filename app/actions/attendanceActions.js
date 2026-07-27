"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";

import Attendance from "@/models/Attendance";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import TeacherAssignment from "@/models/TeacherAssignment";
import AcademicSession from "@/models/AcademicSession";

import { getCurrentUser } from "@/lib/auth";

// ===================================
// Normalize Date
// ===================================

function normalizeDate(date) {
  if (!date) {
    return null;
  }

  // Expected format: YYYY-MM-DD

  const [year, month, day] = date
    .split("-")
    .map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const normalizedDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      0,
      0,
      0,
      0
    )
  );

  // Prevent invalid dates such as
  // 2026-02-31 being silently converted.

  if (
    normalizedDate.getUTCFullYear() !==
      year ||
    normalizedDate.getUTCMonth() !==
      month - 1 ||
    normalizedDate.getUTCDate() !== day
  ) {
    return null;
  }

  return normalizedDate;
}

// ===================================
// Get Class Teacher Context
// ===================================

async function getClassTeacherContext() {
  const currentUser =
    await getCurrentUser();

  // ===================================
  // Authentication
  // ===================================

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  if (
    currentUser.role !== "TEACHER"
  ) {
    return {
      success: false,
      message:
        "Teacher access required.",
    };
  }

  if (!currentUser.teacherId) {
    return {
      success: false,
      message:
        "Teacher profile is not linked to this account.",
    };
  }

  // ===================================
  // Teacher + Active Session
  //
  // These two queries don't depend
  // on each other, so run them together.
  // ===================================

  const [teacher, activeSession] =
    await Promise.all([
      Teacher.findById(
        currentUser.teacherId
      )
        .select(
          "_id employeeId firstName lastName status"
        )
        .lean(),

      AcademicSession.findOne({
        isActive: true,
      })
        .select(
          "_id name startDate endDate isActive"
        )
        .lean(),
    ]);

  // ===================================
  // Validate Teacher
  // ===================================

  if (!teacher) {
    return {
      success: false,
      message:
        "Teacher profile not found.",
    };
  }

  if (
    teacher.status !== "ACTIVE"
  ) {
    return {
      success: false,
      message:
        "Teacher profile is inactive.",
    };
  }

  // ===================================
  // Validate Academic Session
  // ===================================

  if (!activeSession) {
    return {
      success: false,
      message:
        "No active academic session found.",
    };
  }

  // ===================================
  // Class Teacher Assignment
  // ===================================

  const classTeacherAssignment =
    await TeacherAssignment.findOne({
      teacher: teacher._id,

      academicSession:
        activeSession._id,

      isClassTeacher: true,

      status: true,
    })
      .select(
        "_id className section"
      )
      .lean();

  if (!classTeacherAssignment) {
    return {
      success: false,
      message:
        "You are not assigned as a class teacher.",
    };
  }

  return {
    success: true,

    teacher,

    activeSession,

    classTeacherAssignment,
  };
}

// ===================================
// Get Attendance Page Data
// ===================================

export async function getAttendanceData(
  date
) {
  try {
    await connectDB();

    // ===================================
    // Validate Date Early
    // ===================================

    let normalizedDate = null;

    if (date) {
      normalizedDate =
        normalizeDate(date);

      if (!normalizedDate) {
        return {
          success: false,
          message:
            "Invalid attendance date.",
          students: [],
          attendance: null,
          classInfo: null,
          session: null,
        };
      }
    }

    // ===================================
    // Get Teacher Context
    // ===================================

    const context =
      await getClassTeacherContext();

    if (!context.success) {
      return {
        success: false,
        message: context.message,
        students: [],
        attendance: null,
        classInfo: null,
        session: null,
      };
    }

    const {
      teacher,
      activeSession,
      classTeacherAssignment,
    } = context;

    const className =
      classTeacherAssignment.className;

    const section =
      classTeacherAssignment.section;

    // ===================================
    // Students + Attendance
    //
    // They are independent once we know
    // class/session, so run in parallel.
    // ===================================

    const studentsQuery =
      Student.find({
        className,
        section,
        status: "Active",
      })
        .select(
          "_id admissionNo rollNo firstName lastName"
        )
        .sort({
          rollNo: 1,
          firstName: 1,
        })
        .lean();

    const attendanceQuery =
      normalizedDate
        ? Attendance.findOne({
            academicSession:
              activeSession._id,

            className,

            section,

            date: normalizedDate,
          })
            .select(
              "_id date records markedBy"
            )
            .lean()
        : Promise.resolve(null);

    const [students, attendance] =
      await Promise.all([
        studentsQuery,
        attendanceQuery,
      ]);

    // ===================================
    // Response
    // ===================================

    return {
      success: true,

      teacher: JSON.parse(
        JSON.stringify(teacher)
      ),

      session: JSON.parse(
        JSON.stringify(
          activeSession
        )
      ),

      classInfo: {
        className,
        section,
      },

      students: JSON.parse(
        JSON.stringify(students)
      ),

      attendance: attendance
        ? JSON.parse(
            JSON.stringify(
              attendance
            )
          )
        : null,
    };
  } catch (error) {
    console.error(
      "Get Attendance Data Error:",
      error
    );

    return {
      success: false,

      message:
        "Failed to load attendance data.",

      students: [],

      attendance: null,

      classInfo: null,

      session: null,
    };
  }
}

// ===================================
// Save Attendance
// ===================================

export async function saveAttendance(
  data
) {
  try {
    await connectDB();

    // ===================================
    // Basic Payload Validation
    // ===================================

    if (!data) {
      return {
        success: false,
        message:
          "Attendance data is required.",
      };
    }

    const {
      date,
      records,
    } = data;

    // ===================================
    // Validate Date Early
    // ===================================

    const normalizedDate =
      normalizeDate(date);

    if (!normalizedDate) {
      return {
        success: false,
        message:
          "Attendance date is required or invalid.",
      };
    }

    // ===================================
    // Validate Records Early
    // ===================================

    if (
      !Array.isArray(records) ||
      records.length === 0
    ) {
      return {
        success: false,
        message:
          "Attendance records are required.",
      };
    }

    // ===================================
    // Get Teacher Context
    // ===================================

    const context =
      await getClassTeacherContext();

    if (!context.success) {
      return {
        success: false,
        message: context.message,
      };
    }

    const {
      teacher,
      activeSession,
      classTeacherAssignment,
    } = context;

    const className =
      classTeacherAssignment.className;

    const section =
      classTeacherAssignment.section;

    // ===================================
    // Get Allowed Students
    //
    // Only fetch _id because that's all
    // we need for security validation.
    // ===================================

    const allowedStudents =
      await Student.find({
        className,
        section,
        status: "Active",
      })
        .select("_id")
        .lean();

    if (
      allowedStudents.length === 0
    ) {
      return {
        success: false,
        message:
          "No active students found in this class.",
      };
    }

    // ===================================
    // Every Active Student Required
    // ===================================

    if (
      records.length !==
      allowedStudents.length
    ) {
      return {
        success: false,
        message:
          "Attendance must be submitted for every active student.",
      };
    }

    // ===================================
    // Allowed Student Set
    // ===================================

    const allowedStudentIds =
      new Set(
        allowedStudents.map(
          (student) =>
            student._id.toString()
        )
      );

    // ===================================
    // Security Validation + Sanitization
    //
    // Do both in one loop.
    // ===================================

    const submittedIds =
      new Set();

    const validStatuses =
      new Set([
        "PRESENT",
        "ABSENT",
        "MEDICAL",
      ]);

    const sanitizedRecords = [];

    for (const record of records) {
      const studentId =
        record.student?.toString();

      // ===================================
      // Validate Student
      // ===================================

      if (
        !studentId ||
        !allowedStudentIds.has(
          studentId
        )
      ) {
        return {
          success: false,
          message:
            "Invalid student in attendance records.",
        };
      }

      // ===================================
      // Prevent Duplicate Student
      // ===================================

      if (
        submittedIds.has(
          studentId
        )
      ) {
        return {
          success: false,
          message:
            "Duplicate student found in attendance records.",
        };
      }

      submittedIds.add(
        studentId
      );

      // ===================================
      // Validate Status
      // ===================================

      if (
        !validStatuses.has(
          record.status
        )
      ) {
        return {
          success: false,
          message:
            "Invalid attendance status.",
        };
      }

      // ===================================
      // Sanitize
      // ===================================

      const isMedical =
        record.status ===
        "MEDICAL";

      sanitizedRecords.push({
        student: studentId,

        status: record.status,

        medicalReason: isMedical
          ? record.medicalReason
              ?.trim() || ""
          : "",

        certificateSubmitted:
          isMedical
            ? Boolean(
                record.certificateSubmitted
              )
            : false,
      });
    }

    // ===================================
    // Extra Safety
    //
    // Ensures every allowed student
    // appeared exactly once.
    // ===================================

    if (
      submittedIds.size !==
      allowedStudentIds.size
    ) {
      return {
        success: false,
        message:
          "Attendance must be submitted for every active student.",
      };
    }

    // ===================================
    // Create / Update Attendance
    // ===================================

    await Attendance.updateOne(
      {
        academicSession:
          activeSession._id,

        className,

        section,

        date: normalizedDate,
      },
      {
        $set: {
          records:
            sanitizedRecords,

          markedBy:
            teacher._id,
        },

        $setOnInsert: {
          academicSession:
            activeSession._id,

          className,

          section,

          date:
            normalizedDate,
        },
      },
      {
        upsert: true,

        runValidators: true,
      }
    );

    // ===================================
    // Revalidate Teacher Dashboard Only
    //
    // AttendanceManager already has the
    // latest local attendance state.
    // Revalidating /teacher/attendance
    // would add unnecessary work.
    // ===================================

    revalidatePath("/teacher");

    return {
      success: true,

      message:
        "Attendance saved successfully.",
    };
  } catch (error) {
    console.error(
      "Save Attendance Error:",
      error
    );

    // ===================================
    // Duplicate Attendance Protection
    // ===================================

    if (error?.code === 11000) {
      return {
        success: false,

        message:
          "Attendance already exists for this date. Please try again.",
      };
    }

    return {
      success: false,

      message:
        "Failed to save attendance.",
    };
  }
}