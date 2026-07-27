"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";

import TeacherAssignment from "@/models/TeacherAssignment";
import Teacher from "@/models/Teacher";
import Subject from "@/models/Subject";
import AcademicSession from "@/models/AcademicSession";

import { getCurrentUser } from "@/lib/auth";

// ===================================
// Duplicate Key Error Helper
// ===================================

function getDuplicateErrorMessage(error) {
  if (error?.code !== 11000) {
    return null;
  }

  // Unique class teacher index
  if (
    error?.keyPattern?.academicSession &&
    error?.keyPattern?.className &&
    error?.keyPattern?.section &&
    !error?.keyPattern?.subject
  ) {
    return "A class teacher is already assigned to this class and section.";
  }

  // Unique subject assignment index
  return "This subject is already assigned for the selected class and section.";
}

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
      isClassTeacher = false,
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

    const normalizedSection = section
      .trim()
      .toUpperCase();

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

    const teacher =
      await Teacher.findById(teacherId);

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

    const subject =
      await Subject.findById(subjectId);

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
        className
      )
    ) {
      return {
        success: false,
        message:
          "This subject is not applicable to the selected class.",
      };
    }

    // ===================================
    // Check Existing Subject Assignment
    // ===================================

    const existingAssignment =
      await TeacherAssignment.findOne({
        academicSession:
          activeSession._id,

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
    // Check Existing Class Teacher
    // ===================================

    if (isClassTeacher) {
      const existingClassTeacher =
        await TeacherAssignment.findOne({
          academicSession:
            activeSession._id,

          className,

          section: normalizedSection,

          isClassTeacher: true,
        });

      if (existingClassTeacher) {
        return {
          success: false,
          message:
            "A class teacher is already assigned to this class and section.",
        };
      }
    }

    // ===================================
    // Create Assignment
    // ===================================

    const assignment =
      await TeacherAssignment.create({
        teacher: teacherId,

        academicSession:
          activeSession._id,

        className,

        section: normalizedSection,

        subject: subjectId,

        isClassTeacher:
          Boolean(isClassTeacher),

        status: true,
      });

    revalidatePath(
      "/admin/teacher-assignments"
    );

    revalidatePath("/teacher");

    return {
      success: true,
      message:
        "Teacher assigned successfully.",

      assignment: JSON.parse(
        JSON.stringify(assignment)
      ),
    };
  } catch (error) {
    console.error(
      "Create Teacher Assignment Error:",
      error
    );

    const duplicateMessage =
      getDuplicateErrorMessage(error);

    if (duplicateMessage) {
      return {
        success: false,
        message: duplicateMessage,
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
        academicSession:
          activeSession._id,
      })
        .populate(
          "teacher",
          "employeeId firstName lastName status"
        )
        .populate(
          "subject",
          "subjectName subjectCode status"
        )
        .populate(
          "academicSession",
          "name startDate endDate isActive"
        )
        .sort({
          className: 1,
          section: 1,
        })
        .lean();

    return {
      success: true,

      assignments: JSON.parse(
        JSON.stringify(assignments)
      ),
    };
  } catch (error) {
    console.error(
      "Get Teacher Assignments Error:",
      error
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
  data
) {
  try {
    await connectDB();

    if (!assignmentId) {
      return {
        success: false,
        message:
          "Assignment ID is required.",
      };
    }

    const {
      teacherId,
      className,
      section,
      subjectId,
      isClassTeacher = false,
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

    const normalizedSection = section
      .trim()
      .toUpperCase();

    // ===================================
    // Find Assignment
    // ===================================

    const assignment =
      await TeacherAssignment.findById(
        assignmentId
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

    const teacher =
      await Teacher.findById(teacherId);

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

    const subject =
      await Subject.findById(subjectId);

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
        className
      )
    ) {
      return {
        success: false,
        message:
          "This subject is not applicable to the selected class.",
      };
    }

    // ===================================
    // Check Duplicate Subject Assignment
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
    // Check Existing Class Teacher
    // ===================================

    if (isClassTeacher) {
      const existingClassTeacher =
        await TeacherAssignment.findOne({
          academicSession:
            assignment.academicSession,

          className,

          section: normalizedSection,

          isClassTeacher: true,

          _id: {
            $ne: assignmentId,
          },
        });

      if (existingClassTeacher) {
        return {
          success: false,
          message:
            "A class teacher is already assigned to this class and section.",
        };
      }
    }

    // ===================================
    // Update Assignment
    // ===================================

    assignment.teacher = teacherId;

    assignment.className =
      className;

    assignment.section =
      normalizedSection;

    assignment.subject =
      subjectId;

    assignment.isClassTeacher =
      Boolean(isClassTeacher);

    await assignment.save();

    revalidatePath(
      "/admin/teacher-assignments"
    );

    revalidatePath("/teacher");

    return {
      success: true,
      message:
        "Teacher assignment updated successfully.",
    };
  } catch (error) {
    console.error(
      "Update Teacher Assignment Error:",
      error
    );

    const duplicateMessage =
      getDuplicateErrorMessage(error);

    if (duplicateMessage) {
      return {
        success: false,
        message: duplicateMessage,
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
  assignmentId
) {
  try {
    await connectDB();

    if (!assignmentId) {
      return {
        success: false,
        message:
          "Assignment ID is required.",
      };
    }

    const assignment =
      await TeacherAssignment.findById(
        assignmentId
      );

    if (!assignment) {
      return {
        success: false,
        message: "Assignment not found.",
      };
    }

    await TeacherAssignment.findByIdAndDelete(
      assignmentId
    );

    revalidatePath(
      "/admin/teacher-assignments"
    );

    revalidatePath("/teacher");

    return {
      success: true,
      message:
        "Teacher assignment deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete Teacher Assignment Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to delete teacher assignment.",
    };
  }
}

// ===================================
// Get Assignments By Teacher
// ===================================

export async function getAssignmentsByTeacher(
  teacherId
) {
  try {
    await connectDB();

    if (!teacherId) {
      return {
        success: false,
        message:
          "Teacher ID is required.",
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

        academicSession:
          activeSession._id,

        status: true,
      })
        .populate(
          "subject",
          "subjectName subjectCode"
        )
        .populate(
          "academicSession",
          "name startDate endDate"
        )
        .sort({
          className: 1,
          section: 1,
        })
        .lean();

    return {
      success: true,

      assignments: JSON.parse(
        JSON.stringify(assignments)
      ),
    };
  } catch (error) {
    console.error(
      "Get Teacher Assignments Error:",
      error
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
// Get Logged-In Teacher Assignments
// ===================================

export async function getCurrentTeacherAssignments() {
  try {
    await connectDB();

    // ===================================
    // Current User
    // ===================================

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
        assignments: [],
        session: null,
      };
    }

    if (
      currentUser.role !== "TEACHER"
    ) {
      return {
        success: false,
        message:
          "Teacher access required.",
        assignments: [],
        session: null,
      };
    }

    if (!currentUser.teacherId) {
      return {
        success: false,
        message:
          "Teacher profile is not linked to this account.",
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Active Academic Session
    // ===================================

    const activeSession =
      await AcademicSession.findOne({
        isActive: true,
      }).lean();

    if (!activeSession) {
      return {
        success: false,
        message:
          "No active academic session found.",
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Validate Teacher
    // ===================================

    const teacher =
      await Teacher.findById(
        currentUser.teacherId
      ).lean();

    if (!teacher) {
      return {
        success: false,
        message:
          "Teacher profile not found.",
        assignments: [],
        session: null,
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message:
          "Teacher profile is inactive.",
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Teacher Assignments
    // ===================================

    const assignments =
      await TeacherAssignment.find({
        teacher:
          currentUser.teacherId,

        academicSession:
          activeSession._id,

        status: true,
      })
        .populate(
          "subject",
          "subjectName subjectCode"
        )
        .sort({
          className: 1,
          section: 1,
        })
        .lean();

    return {
      success: true,

      teacher: JSON.parse(
        JSON.stringify(teacher)
      ),

      session: JSON.parse(
        JSON.stringify(activeSession)
      ),

      assignments: JSON.parse(
        JSON.stringify(assignments)
      ),
    };
  } catch (error) {
    console.error(
      "Get Current Teacher Assignments Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to load teacher assignments.",
      assignments: [],
      session: null,
    };
  }
}