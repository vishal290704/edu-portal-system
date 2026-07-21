"use server";

import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";

import { revalidatePath } from "next/cache";

// ============================
// Create Subject
// ============================

export async function createSubject(data) {
  try {
    await connectDB();

    const subjectName = data.subjectName.trim();
    const subjectCode = data.subjectCode.trim().toUpperCase();

    const existingSubject = await Subject.findOne({
      subjectCode,
    });

    if (existingSubject) {
      return {
        success: false,
        message: "Subject code already exists.",
      };
    }

    if (
      !data.applicableClasses ||
      data.applicableClasses.length === 0
    ) {
      return {
        success: false,
        message: "Select at least one class.",
      };
    }

    const subject = await Subject.create({
      subjectName,
      subjectCode,
      applicableClasses: data.applicableClasses,
      assignedTeacher: data.assignedTeacher || null,
      status: data.status ?? true,
    });

    revalidatePath("/admin/subjects");

    return {
      success: true,
      message: "Subject created successfully.",
      subject: JSON.parse(JSON.stringify(subject)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// ============================
// Get Subjects
// ============================

export async function getSubjects() {
  try {
    await connectDB();

    const subjects = await Subject.find()
      .sort({ subjectName: 1 });

    return JSON.parse(JSON.stringify(subjects));
  } catch (error) {
    console.error(error);

    return [];
  }
}

// ============================
// Update Subject
// ============================

export async function updateSubject(id, data) {
  try {
    await connectDB();

    const subjectName = data.subjectName.trim();
    const subjectCode = data.subjectCode.trim().toUpperCase();

    const existingSubject = await Subject.findOne({
      subjectCode,
      _id: { $ne: id },
    });

    if (existingSubject) {
      return {
        success: false,
        message: "Subject code already exists.",
      };
    }

    if (
      !data.applicableClasses ||
      data.applicableClasses.length === 0
    ) {
      return {
        success: false,
        message: "Select at least one class.",
      };
    }

    await Subject.findByIdAndUpdate(id, {
      subjectName,
      subjectCode,
      applicableClasses: data.applicableClasses,
      assignedTeacher: data.assignedTeacher || null,
      status: data.status,
    });

    revalidatePath("/admin/subjects");

    return {
      success: true,
      message: "Subject updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// ============================
// Delete Subject
// ============================

export async function deleteSubject(id) {
  try {
    await connectDB();

    await Subject.findByIdAndDelete(id);

    revalidatePath("/admin/subjects");

    return {
      success: true,
      message: "Subject deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}