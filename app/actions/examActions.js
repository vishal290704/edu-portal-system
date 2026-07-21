"use server";

import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";

import { revalidatePath } from "next/cache";

// ============================
// Create Exam
// ============================

export async function createExam(data) {
  try {
    await connectDB();

    const examName = data.examName.trim();
    const examType = data.examType.trim();

    if (
      !data.applicableClasses ||
      data.applicableClasses.length === 0
    ) {
      return {
        success: false,
        message: "Select at least one class.",
      };
    }

    if (
      data.startDate &&
      data.endDate &&
      new Date(data.endDate) < new Date(data.startDate)
    ) {
      return {
        success: false,
        message: "End date cannot be before start date.",
      };
    }

    const existingExam = await Exam.findOne({
      examName,
      academicSession: data.academicSession,
    });

    if (existingExam) {
      return {
        success: false,
        message:
          "Exam with the same name already exists in this academic session.",
      };
    }

    const exam = await Exam.create({
      examName,
      examType,
      academicSession: data.academicSession,
      applicableClasses: data.applicableClasses,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      status: data.status ?? true,
    });

    revalidatePath("/admin/exams");

    return {
      success: true,
      message: "Exam created successfully.",
      exam: JSON.parse(JSON.stringify(exam)),
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
// Get Exams
// ============================

export async function getExams() {
  try {
    await connectDB();

    const exams = await Exam.find()
      .populate("academicSession", "name")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(exams));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ============================
// Update Exam
// ============================

export async function updateExam(id, data) {
  try {
    await connectDB();

    const examName = data.examName.trim();
    const examType = data.examType.trim();

    if (
      !data.applicableClasses ||
      data.applicableClasses.length === 0
    ) {
      return {
        success: false,
        message: "Select at least one class.",
      };
    }

    if (
      data.startDate &&
      data.endDate &&
      new Date(data.endDate) < new Date(data.startDate)
    ) {
      return {
        success: false,
        message: "End date cannot be before start date.",
      };
    }

    const existingExam = await Exam.findOne({
      examName,
      academicSession: data.academicSession,
      _id: { $ne: id },
    });

    if (existingExam) {
      return {
        success: false,
        message:
          "Exam with the same name already exists in this academic session.",
      };
    }

    await Exam.findByIdAndUpdate(id, {
      examName,
      examType,
      academicSession: data.academicSession,
      applicableClasses: data.applicableClasses,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      status: data.status,
    });

    revalidatePath("/admin/exams");

    return {
      success: true,
      message: "Exam updated successfully.",
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
// Delete Exam
// ============================

export async function deleteExam(id) {
  try {
    await connectDB();

    await Exam.findByIdAndDelete(id);

    revalidatePath("/admin/exams");

    return {
      success: true,
      message: "Exam deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}