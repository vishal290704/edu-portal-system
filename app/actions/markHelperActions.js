"use server";

import connectDB from "@/lib/mongodb";

import AcademicSession from "@/models/AcademicSession";
import Exam from "@/models/Exam";
import Student from "@/models/Student";
import Subject from "@/models/Subject";

// ===================================
// Active Academic Session
// ===================================

export async function getActiveSession() {
  try {
    await connectDB();

    const session = await AcademicSession.findOne({
      isActive: true,
    }).lean();

    return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.error("getActiveSession:", error);
    return null;
  }
}

// ===================================
// Exams of Active Session
// ===================================

export async function getActiveSessionExams() {
  try {
    await connectDB();

    const session = await AcademicSession.findOne({
      isActive: true,
    }).lean();

    if (!session) return [];

    const exams = await Exam.find({
      academicSession: session._id,
      status: true,
    })
      .sort({ examName: 1 })
      .lean();

    return JSON.parse(JSON.stringify(exams));
  } catch (error) {
    console.error("getActiveSessionExams:", error);
    return [];
  }
}

// ===================================
// Students By Class
// ===================================

export async function getStudentsByClass(className) {
  try {
    await connectDB();

    const students = await Student.find({
      className,
      status: "Active",
    })
      .sort({
        rollNo: 1,
      })
      .select(
        "firstName lastName rollNo admissionNo className"
      )
      .lean();

    return JSON.parse(JSON.stringify(students));
  } catch (error) {
    console.error("getStudentsByClass:", error);
    return [];
  }
}

// ===================================
// Subjects By Class
// ===================================

export async function getSubjectsByClass(className) {
  try {
    await connectDB();

    const subjects = await Subject.find({
      applicableClasses: className,
      status: true,
    })
      .sort({
        subjectName: 1,
      })
      .lean();

    return JSON.parse(JSON.stringify(subjects));
  } catch (error) {
    console.error("getSubjectsByClass:", error);
    return [];
  }
}

// ===================================
// Student By ID
// ===================================

export async function getStudentById(studentId) {
  try {
    await connectDB();

    const student = await Student.findById(studentId)
      .select(
        "admissionNo rollNo firstName lastName fatherName className section"
      )
      .lean();

    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    console.error("getStudentById:", error);
    return null;
  }
}