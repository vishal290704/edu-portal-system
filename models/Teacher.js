import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    // ===================================
    // Basic Information
    // ===================================

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: null,
    },

    dob: {
      type: Date,
      default: null,
    },

    // ===================================
    // Contact Information
    // ===================================

    mobile: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    // ===================================
    // Professional Information
    // ===================================

    qualification: {
      type: String,
      trim: true,
      default: "",
    },

    specialization: {
      type: String,
      trim: true,
      default: "",
    },

    joiningDate: {
      type: Date,
      default: null,
    },

    experience: {
      type: Number,
      min: 0,
      default: 0,
    },

    // ===================================
    // Employment Status
    // ===================================

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", TeacherSchema);