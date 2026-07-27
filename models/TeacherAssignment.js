import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema(
  {
    // ===================================
    // Teacher
    // ===================================

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    // ===================================
    // Academic Session
    // ===================================

    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
    },

    // ===================================
    // Class & Section
    // ===================================

    className: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "A",
    },

    // ===================================
    // Subject
    // ===================================

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    // ===================================
    // Class Teacher
    // ===================================

    isClassTeacher: {
      type: Boolean,
      default: false,
    },

    // ===================================
    // Status
    // ===================================

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ===================================
// Unique Subject Assignment
// ===================================

// One subject of a class-section should
// have only one teacher in the same session.

teacherAssignmentSchema.index(
  {
    academicSession: 1,
    className: 1,
    section: 1,
    subject: 1,
  },
  {
    unique: true,
  }
);

// ===================================
// Unique Class Teacher
// ===================================

// One class-section should have only
// one class teacher in the same session.

teacherAssignmentSchema.index(
  {
    academicSession: 1,
    className: 1,
    section: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isClassTeacher: true,
    },
    name: "unique_class_teacher_per_section",
  }
);

export default mongoose.models.TeacherAssignment ||
  mongoose.model(
    "TeacherAssignment",
    teacherAssignmentSchema
  );