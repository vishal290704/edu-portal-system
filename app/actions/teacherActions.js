"use server";

import connectDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { getCurrentUser } from "@/lib/auth";
// ===================================
// Create Teacher
// ===================================

export async function createTeacher(data) {
  try {
    await connectDB();

    const {
      employeeId,
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      email,
      address,
      qualification,
      specialization,
      joiningDate,
      experience,
    } = data;

    // ===================================
    // Validate Required Fields
    // ===================================

    if (!employeeId || !firstName) {
      return {
        success: false,
        message: "Employee ID and first name are required.",
      };
    }

    // ===================================
    // Check Duplicate Employee ID
    // ===================================

    const existingTeacher = await Teacher.findOne({
      employeeId: employeeId.trim().toUpperCase(),
    });

    if (existingTeacher) {
      return {
        success: false,
        message: "A teacher with this Employee ID already exists.",
      };
    }

    // ===================================
    // Create Teacher
    // ===================================

    const teacher = await Teacher.create({
      employeeId: employeeId.trim(),

      firstName: firstName.trim(),
      lastName: lastName?.trim() || "",

      gender: gender || null,
      dob: dob || null,

      mobile: mobile?.trim() || "",
      email: email?.trim() || "",
      address: address?.trim() || "",

      qualification: qualification?.trim() || "",
      specialization: specialization?.trim() || "",

      joiningDate: joiningDate || null,

      experience:
        experience === "" ||
        experience === null ||
        experience === undefined
          ? 0
          : Number(experience),

      status: "ACTIVE",
    });

    return {
      success: true,
      message: "Teacher created successfully.",
      teacher: JSON.parse(JSON.stringify(teacher)),
    };
  } catch (error) {
    console.error("Create Teacher Error:", error);

    return {
      success: false,
      message: "Failed to create teacher.",
    };
  }
}

// ===================================
// Get Teachers
// ===================================

export async function getTeachers() {
  try {
    await connectDB();

    const teachers = await Teacher.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return {
      success: true,

      teachers: JSON.parse(
        JSON.stringify(teachers),
      ),
    };
  } catch (error) {
    console.error("Get Teachers Error:", error);

    return {
      success: false,
      message: "Failed to load teachers.",
      teachers: [],
    };
  }
}

// ===================================
// Get Single Teacher
// ===================================

export async function getTeacherById(teacherId) {
  try {
    await connectDB();

    if (!teacherId) {
      return {
        success: false,
        message: "Teacher ID is required.",
      };
    }

    const teacher = await Teacher.findById(
      teacherId,
    ).lean();

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    return {
      success: true,

      teacher: JSON.parse(
        JSON.stringify(teacher),
      ),
    };
  } catch (error) {
    console.error(
      "Get Teacher Error:",
      error,
    );

    return {
      success: false,
      message: "Failed to load teacher.",
    };
  }
}

// ===================================
// Update Teacher
// ===================================

export async function updateTeacher(
  teacherId,
  data,
) {
  try {
    await connectDB();

    if (!teacherId) {
      return {
        success: false,
        message: "Teacher ID is required.",
      };
    }

    const teacher = await Teacher.findById(
      teacherId,
    );

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    // ===================================
    // Employee ID Duplicate Check
    // ===================================

    if (data.employeeId) {
      const employeeId = data.employeeId
        .trim()
        .toUpperCase();

      const duplicateTeacher =
        await Teacher.findOne({
          employeeId,
          _id: {
            $ne: teacherId,
          },
        });

      if (duplicateTeacher) {
        return {
          success: false,
          message:
            "Another teacher already uses this Employee ID.",
        };
      }

      teacher.employeeId = employeeId;
    }

    // ===================================
    // Update Fields
    // ===================================

    if (data.firstName !== undefined) {
      teacher.firstName =
        data.firstName.trim();
    }

    if (data.lastName !== undefined) {
      teacher.lastName =
        data.lastName?.trim() || "";
    }

    if (data.gender !== undefined) {
      teacher.gender =
        data.gender || null;
    }

    if (data.dob !== undefined) {
      teacher.dob =
        data.dob || null;
    }

    if (data.mobile !== undefined) {
      teacher.mobile =
        data.mobile?.trim() || "";
    }

    if (data.email !== undefined) {
      teacher.email =
        data.email?.trim() || "";
    }

    if (data.address !== undefined) {
      teacher.address =
        data.address?.trim() || "";
    }

    if (
      data.qualification !== undefined
    ) {
      teacher.qualification =
        data.qualification?.trim() || "";
    }

    if (
      data.specialization !== undefined
    ) {
      teacher.specialization =
        data.specialization?.trim() || "";
    }

    if (
      data.joiningDate !== undefined
    ) {
      teacher.joiningDate =
        data.joiningDate || null;
    }

    if (data.experience !== undefined) {
      teacher.experience =
        data.experience === "" ||
        data.experience === null
          ? 0
          : Number(data.experience);
    }

    await teacher.save();

    return {
      success: true,
      message: "Teacher updated successfully.",

      teacher: JSON.parse(
        JSON.stringify(teacher),
      ),
    };
  } catch (error) {
    console.error(
      "Update Teacher Error:",
      error,
    );

    return {
      success: false,
      message: "Failed to update teacher.",
    };
  }
}

// ===================================
// Change Teacher Status
// ===================================

export async function updateTeacherStatus(
  teacherId,
  status,
) {
  try {
    await connectDB();

    if (
      !["ACTIVE", "INACTIVE"].includes(status)
    ) {
      return {
        success: false,
        message: "Invalid teacher status.",
      };
    }

    const teacher =
      await Teacher.findByIdAndUpdate(
        teacherId,
        {
          status,
        },
        {
          new: true,
        },
      );

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    return {
      success: true,
      message:
        status === "ACTIVE"
          ? "Teacher activated successfully."
          : "Teacher deactivated successfully.",
    };
  } catch (error) {
    console.error(
      "Update Teacher Status Error:",
      error,
    );

    return {
      success: false,
      message:
        "Failed to update teacher status.",
    };
  }
}

export async function getCurrentTeacher() {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    if (currentUser.role !== "TEACHER") {
      return {
        success: false,
        message: "Teacher access required.",
      };
    }

    if (!currentUser.teacherId) {
      return {
        success: false,
        message: "Teacher profile is not linked to this account.",
      };
    }

    const teacher = await Teacher.findById(
      currentUser.teacherId,
    ).lean();

    if (!teacher) {
      return {
        success: false,
        message: "Teacher profile not found.",
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message: "Teacher profile is inactive.",
      };
    }

    return {
      success: true,
      teacher: JSON.parse(JSON.stringify(teacher)),
    };
  } catch (error) {
    console.error("Get Current Teacher Error:", error);

    return {
      success: false,
      message: "Failed to load teacher profile.",
    };
  }
}