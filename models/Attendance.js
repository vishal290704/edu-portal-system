import mongoose from "mongoose";

// ===================================
// Student Attendance Record
// ===================================

const attendanceRecordSchema =
  new mongoose.Schema(
    {
      // ===================================
      // Student
      // ===================================

      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      // ===================================
      // Attendance Status
      // ===================================

      status: {
        type: String,
        enum: [
          "PRESENT",
          "ABSENT",
          "MEDICAL",
        ],
        default: "PRESENT",
        required: true,
      },

      // ===================================
      // Medical Information
      // ===================================

      medicalReason: {
        type: String,
        trim: true,
        default: "",
      },

      certificateSubmitted: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    }
  );

// ===================================
// Attendance Schema
// ===================================

const attendanceSchema =
  new mongoose.Schema(
    {
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
      },

      // ===================================
      // Attendance Date
      // ===================================

      date: {
        type: Date,
        required: true,
      },

      // ===================================
      // Student Attendance Records
      // ===================================

      records: {
        type: [attendanceRecordSchema],
        default: [],
      },

      // ===================================
      // Marked By
      // ===================================

      markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

// ===================================
// Unique Daily Attendance
// ===================================

// Only one attendance sheet can exist
// for the same class-section and date
// in the same academic session.

attendanceSchema.index(
  {
    academicSession: 1,
    className: 1,
    section: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model(
    "Attendance",
    attendanceSchema
  );