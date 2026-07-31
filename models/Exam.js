import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
      trim: true,
    },

    examType: {
      type: String,
      required: true,
      trim: true,
    },

    resultMode: {
      type: String,
      enum: ["INDIVIDUAL", "CUMULATIVE"],
      default: "INDIVIDUAL",
    },

    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
    },

    applicableClasses: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Select at least one class.",
      },
    },

    includedExams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],

    // Maximum marks for each subject in this exam
    maximumMarksPerSubject: {
      type: Number,
      required: true,
      min: 1,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Exam ||
  mongoose.model("Exam", examSchema);