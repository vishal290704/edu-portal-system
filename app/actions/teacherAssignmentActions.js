"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";

import TeacherAssignment from "@/models/TeacherAssignment";
import Teacher from "@/models/Teacher";
import Subject from "@/models/Subject";
import AcademicSession from "@/models/AcademicSession";

// ===================================
// Create Teacher Assignment
// ===================================

export async function createTeacherAssignment(data) {
  try {
    await connectDB();

    const {
      teacherId,
      className,
      section,
      subjectId,
    } = data;

    // ===================================
    // Validate Required Fields
    // ===================================

    if (
      !teacherId ||
      !className ||
      !section ||
      !subjectId
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // ===================================
    // Get Active Academic Session
    // ===================================

    const activeSession =
      await AcademicSession.findOne({
        isActive: true,
      });

    if (!activeSession) {
      return {
        success: false,
        message:
          "No active academic session found.",
      };
    }

    // ===================================
    // Validate Teacher
    // ===================================

    const teacher = await Teacher.findById(
      teacherId,
    );

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message:
          "Cannot assign an inactive teacher.",
      };
    }

    // ===================================
    // Validate Subject
    // ===================================

    const subject = await Subject.findById(
      subjectId,
    );

    if (!subject) {
      return {
        success: false,
        message: "Subject not found.",
      };
    }

    if (!subject.status) {
      return {
        success: false,
        message:
          "Cannot assign an inactive subject.",
      };
    }

    // ===================================
    // Validate Subject Class
    // ===================================

    if (
      !subject.applicableClasses.includes(
        className,
      )
    ) {
      return {
        success: false,
        message:
          "This subject is not applicable to the selected class.",
      };
    }

    const normalizedSection = section
      .trim()
      .toUpperCase();

    // ===================================
    // Check Existing Assignment
    // ===================================

    const existingAssignment =
      await TeacherAssignment.findOne({
        academicSession: activeSession._id,
        className,
        section: normalizedSection,
        subject: subjectId,
      });

    if (existingAssignment) {
      return {
        success: false,
        message:
          "This subject is already assigned for the selected class and section.",
      };
    }

    // ===================================
    // Create Assignment
    // ===================================

    const assignment =
      await TeacherAssignment.create({
        teacher: teacherId,
        academicSession: activeSession._id,
        className,
        section: normalizedSection,
        subject: subjectId,
        status: true,
      });

    revalidatePath("/admin/teacher-assignments");

    return {
      success: true,
      message:
        "Teacher assigned successfully.",
      assignment: JSON.parse(
        JSON.stringify(assignment),
      ),
    };
  } catch (error) {
    console.error(
      "Create Teacher Assignment Error:",
      error,
    );

    // MongoDB unique index fallback
    if (error?.code === 11000) {
      return {
        success: false,
        message:
          "This subject is already assigned for the selected class and section.",
      };
    }

    return {
      success: false,
      message:
        "Failed to create teacher assignment.",
    };
  }
}

// ===================================
// Get Teacher Assignments
// ===================================

export async function getTeacherAssignments() {
  try {
    await connectDB();

    const activeSession =
      await AcademicSession.findOne({
        isActive: true,
      });

    if (!activeSession) {
      return {
        success: false,
        message:
          "No active academic session found.",
        assignments: [],
      };
    }

    const assignments =
      await TeacherAssignment.find({
        academicSession: activeSession._id,
      })
        .populate(
          "teacher",
          "employeeId firstName lastName status",
        )
        .populate(
          "subject",
          "subjectName subjectCode status",
        )
        .populate(
          "academicSession",
          "name startDate endDate isActive",
        )
        .sort({
          className: 1,
          section: 1,
        })
        .lean();

    return {
      success: true,
      assignments: JSON.parse(
        JSON.stringify(assignments),
      ),
    };
  } catch (error) {
    console.error(
      "Get Teacher Assignments Error:",
      error,
    );

    return {
      success: false,
      message:
        "Failed to load teacher assignments.",
      assignments: [],
    };
  }
}

// ===================================
// Update Teacher Assignment
// ===================================

export async function updateTeacherAssignment(
  assignmentId,
  data,
) {
  try {
    await connectDB();

    if (!assignmentId) {
      return {
        success: false,
        message: "Assignment ID is required.",
      };
    }

    const {
      teacherId,
      className,
      section,
      subjectId,
    } = data;

    if (
      !teacherId ||
      !className ||
      !section ||
      !subjectId
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // ===================================
    // Find Assignment
    // ===================================

    const assignment =
      await TeacherAssignment.findById(
        assignmentId,
      );

    if (!assignment) {
      return {
        success: false,
        message: "Assignment not found.",
      };
    }

    // ===================================
    // Validate Teacher
    // ===================================

    const teacher = await Teacher.findById(
      teacherId,
    );

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message:
          "Cannot assign an inactive teacher.",
      };
    }

    // ===================================
    // Validate Subject
    // ===================================

    const subject = await Subject.findById(
      subjectId,
    );

    if (!subject) {
      return {
        success: false,
        message: "Subject not found.",
      };
    }

    if (!subject.status) {
      return {
        success: false,
        message:
          "Cannot assign an inactive subject.",
      };
    }

    // ===================================
    // Validate Subject Class
    // ===================================

    if (
      !subject.applicableClasses.includes(
        className,
      )
    ) {
      return {
        success: false,
        message:
          "This subject is not applicable to the selected class.",
      };
    }

    const normalizedSection = section
      .trim()
      .toUpperCase();

    // ===================================
    // Duplicate Check
    // ===================================

    const duplicateAssignment =
      await TeacherAssignment.findOne({
        academicSession:
          assignment.academicSession,
        className,
        section: normalizedSection,
        subject: subjectId,
        _id: {
          $ne: assignmentId,
        },
      });

    if (duplicateAssignment) {
      return {
        success: false,
        message:
          "This subject is already assigned for the selected class and section.",
      };
    }

    // ===================================
    // Update Assignment
    // ===================================

    assignment.teacher = teacherId;
    assignment.className = className;
    assignment.section = normalizedSection;
    assignment.subject = subjectId;

    await assignment.save();

    revalidatePath("/admin/teacher-assignments");

    return {
      success: true,
      message:
        "Teacher assignment updated successfully.",
    };
  } catch (error) {
    console.error(
      "Update Teacher Assignment Error:",
      error,
    );

    if (error?.code === 11000) {
      return {
        success: false,
        message:
          "This subject is already assigned for the selected class and section.",
      };
    }

    return {
      success: false,
      message:
        "Failed to update teacher assignment.",
    };
  }
}

// ===================================
// Delete Teacher Assignment
// ===================================

export async function deleteTeacherAssignment(
  assignmentId,
) {
  try {
    await connectDB();

    if (!assignmentId) {
      return {
        success: false,
        message: "Assignment ID is required.",
      };
    }

    const assignment =
      await TeacherAssignment.findById(
        assignmentId,
      );

    if (!assignment) {
      return {
        success: false,
        message: "Assignment not found.",
      };
    }

    await TeacherAssignment.findByIdAndDelete(
      assignmentId,
    );

    revalidatePath("/admin/teacher-assignments");

    return {
      success: true,
      message:
        "Teacher assignment deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete Teacher Assignment Error:",
      error,
    );

    return {
      success: false,
      message:
        "Failed to delete teacher assignment.",
    };
  }
}

// ===================================
// Get Current Teacher Assignments
// ===================================

export async function getAssignmentsByTeacher(
  teacherId,
) {
  try {
    await connectDB();

    if (!teacherId) {
      return {
        success: false,
        message: "Teacher ID is required.",
        assignments: [],
      };
    }

    const activeSession =
      await AcademicSession.findOne({
        isActive: true,
      });

    if (!activeSession) {
      return {
        success: false,
        message:
          "No active academic session found.",
        assignments: [],
      };
    }

    const assignments =
      await TeacherAssignment.find({
        teacher: teacherId,
        academicSession: activeSession._id,
        status: true,
      })
        .populate(
          "subject",
          "subjectName subjectCode",
        )
        .populate(
          "academicSession",
          "name startDate endDate",
        )
        .sort({
          className: 1,
          section: 1,
        })
        .lean();

    return {
      success: true,
      assignments: JSON.parse(
        JSON.stringify(assignments),
      ),
    };
  } catch (error) {
    console.error(
      "Get Teacher Assignments Error:",
      error,
    );

    return {
      success: false,
      message:
        "Failed to load teacher assignments.",
      assignments: [],
    };
  }
}