import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    obtainedMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    maximumMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate marks for the same student, exam and subject
markSchema.index(
  {
    student: 1,
    exam: 1,
    subject: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Mark ||
  mongoose.model("Mark", markSchema);