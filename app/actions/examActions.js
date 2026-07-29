"use server";

import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";

import { revalidatePath } from "next/cache";
import Teacher from "@/models/Teacher";
import TeacherAssignment from "@/models/TeacherAssignment";
import AcademicSession from "@/models/AcademicSession";
import { getCurrentUser } from "@/lib/auth";

// ============================
// Create Exam
// ============================

export async function createExam(data) {
  try {
    await connectDB();

    const examName = data.examName.trim();
    const examType = data.examType.trim();

    if (!data.applicableClasses || data.applicableClasses.length === 0) {
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
      .sort({ createdAt: -1 })
      .lean();

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

    if (!data.applicableClasses || data.applicableClasses.length === 0) {
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

    await Exam.findByIdAndUpdate(
      id,
      {
        examName,
        examType,
        academicSession: data.academicSession,
        applicableClasses: data.applicableClasses,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        status: data.status,
      },
      { new: true },
    );
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

// ============================
// Get Teacher Exams
// ============================

// ============================
// Get Teacher Exams
// ============================

export async function getTeacherExams() {
  try {
    await connectDB();

    // ============================
    // Current User
    // ============================

    const user = await getCurrentUser();

    
    if (!user || user.role !== "TEACHER") {
      console.log("❌ Unauthorized User");

      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    // ============================
    // Teacher
    // ============================



    const teacher = await Teacher.findById(user.teacherId)
      .select("_id firstName lastName status")
      .lean();



    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found.",
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message: "Teacher account is inactive.",
      };
    }

    // ============================
    // Active Session
    // ============================

    const session = await AcademicSession.findOne({
      isActive: true,
    })
      .select("_id name")
      .lean();

    if (!session) {
      console.log("❌ No Active Session");

      return {
        success: false,
        message: "No active academic session.",
      };
    }

    // ============================
    // Teacher Assignment
    // ============================

    const assignment = await TeacherAssignment.findOne({
      teacher: teacher._id,
      academicSession: session._id,
      // isClassTeacher: true,
      status: true,
    })
      .select("className section")
      .lean();


    if (!assignment) {
      console.log("❌ Assignment not found");

      return {
        success: false,
        message: "You are not assigned as a class teacher.",
      };
    }

    // ============================
    // Exams
    // ============================

    const exams = await Exam.find({
      academicSession: session._id,
      applicableClasses: assignment.className,
      status: true,
    })
      .select("_id examName examType startDate endDate")
      .sort({
        startDate: 1,
        createdAt: 1,
      })
      .lean();

    if (exams.length === 0) {
      console.log("❌ No Exams Found");

      return {
        success: false,
        message: "No exams found for your class.",
      };
    }

    return {
      success: true,

      academicSession: {
        id: session._id.toString(),
        name: session.name,
      },

      exams: exams.map((exam) => ({
        id: exam._id.toString(),
        examName: exam.examName,
        examType: exam.examType,
        startDate: exam.startDate,
        endDate: exam.endDate,
      })),
    };
  } catch (error) {
    console.error("❌ Get Teacher Exams Error:", error);

    return {
      success: false,
      message: "Failed to load exams.",
    };
  }
}
