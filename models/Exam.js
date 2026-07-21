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