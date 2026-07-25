"use server";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";
import Student from "@/models/Student";
import Exam from "@/models/Exam";
import AcademicSession from "@/models/AcademicSession";

import {
  calculatePercentage,
  calculateGrade,
  calculatePassFail,
  calculateSubjectResult,
  calculateRemark,
} from "@/lib/resultUtils";

// ===================================
// Get Student Result
// ===================================

export async function getStudentResult({ academicSession, exam, student }) {
  try {
    await connectDB();

    // ===================================
    // Validate Required Data
    // ===================================

    if (!academicSession || !exam || !student) {
      return {
        success: false,
        message: "Session, exam and student are required.",
      };
    }

    // ===================================
    // Get Student
    // ===================================

    const studentDoc = await Student.findById(student)
      .select(
        "admissionNo rollNo firstName lastName fatherName motherName dob className section",
      )
      .lean();

    if (!studentDoc) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    // ===================================
    // Get Academic Session
    // ===================================

    const sessionDoc = await AcademicSession.findById(academicSession)
      .select("name")
      .lean();

    if (!sessionDoc) {
      return {
        success: false,
        message: "Academic session not found.",
      };
    }

    // ===================================
    // Get Exam
    // ===================================

    const examDoc = await Exam.findById(exam).select("examName").lean();

    if (!examDoc) {
      return {
        success: false,
        message: "Exam not found.",
      };
    }

    // ===================================
    // Get Student Marks
    // ===================================

    const marks = await Mark.find({
      academicSession,
      exam,
      student,
    })
      .populate("subject", "_id subjectName subjectCode")
      .lean();

    if (marks.length === 0) {
      return {
        success: false,
        message: "No marks found for this student.",
      };
    }

    // ===================================
    // Calculate Subject Results
    // ===================================

    let totalObtained = 0;
    let totalMaximum = 0;

    const subjects = marks.map((mark) => {
      const obtained = Number(mark.obtainedMarks);
      const maximum = Number(mark.maximumMarks);

      totalObtained += obtained;
      totalMaximum += maximum;

      const subjectResult = calculateSubjectResult(obtained, maximum);

      return {
        id: mark.subject?._id?.toString() || "",
        subject: mark.subject?.subjectName || "",
        code: mark.subject?.subjectCode || "",

        obtained,
        maximum,

        percentage: subjectResult.percentage,
        grade: subjectResult.grade,

        remarks: calculateRemark(subjectResult.percentage),
      };
    });

    // ===================================
    // Overall Result
    // ===================================

    const percentage = calculatePercentage(totalObtained, totalMaximum);

    const grade = calculateGrade(percentage);

    const result = calculatePassFail(totalObtained, totalMaximum);

    // ===================================
    // Student Historical Class Snapshot
    // ===================================

    const className = marks[0]?.className || studentDoc.className;

    const section = marks[0]?.section || studentDoc.section;

    // ===================================
    // Calculate Class Rank
    // ===================================

    const classMarks = await Mark.find({
      academicSession,
      exam,
      className,
      section,
    })
      .select("student obtainedMarks maximumMarks")
      .lean();

    const studentTotals = {};

    for (const mark of classMarks) {
      const studentId = mark.student.toString();

      if (!studentTotals[studentId]) {
        studentTotals[studentId] = {
          obtained: 0,
          maximum: 0,
        };
      }

      studentTotals[studentId].obtained += Number(mark.obtainedMarks);

      studentTotals[studentId].maximum += Number(mark.maximumMarks);
    }

    const rankedStudents = Object.entries(studentTotals)
      .map(([studentId, totals]) => ({
        studentId,

        percentage: calculatePercentage(totals.obtained, totals.maximum),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const studentRankIndex = rankedStudents.findIndex(
      (item) => item.studentId === student.toString(),
    );

    const rank = studentRankIndex === -1 ? null : studentRankIndex + 1;

    // ===================================
    // Return Result
    // ===================================

    return {
      success: true,

      student: {
        id: studentDoc._id.toString(),

        admissionNo: studentDoc.admissionNo || "",

        rollNo: studentDoc.rollNo || "",

        firstName: studentDoc.firstName || "",

        lastName: studentDoc.lastName || "",

        fullName: `${studentDoc.firstName || ""} ${
          studentDoc.lastName || ""
        }`.trim(),

        fatherName: studentDoc.fatherName || "",

        motherName: studentDoc.motherName || "",

        dob: studentDoc.dob ? studentDoc.dob.toISOString() : null,

        className,
        section,
      },

      academicSession: {
        id: sessionDoc._id.toString(),
        name: sessionDoc.name,
      },

      exam: {
        id: examDoc._id.toString(),
        name: examDoc.examName,
      },

      subjects,

      totalObtained,
      totalMaximum,

      percentage,
      grade,
      result,
      rank,
    };
  } catch (error) {
    console.error("Get Student Result Error:", error);

    return {
      success: false,
      message: "Failed to generate student result.",
    };
  }
}
