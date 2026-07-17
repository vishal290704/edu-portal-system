import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    admissionNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      trim: true,
    },

    class: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      default: "A",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
      type: Date,
    },

    mobile: {
      type: String,
    },

    address: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);