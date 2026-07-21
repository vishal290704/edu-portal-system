import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    applicableClasses: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Select at least one class.",
      },
    },

    assignedTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
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

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema);