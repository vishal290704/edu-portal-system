"use server";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";
import Student from "@/models/Student";
import Exam from "@/models/Exam";
import AcademicSession from "@/models/AcademicSession";
import Teacher from "@/models/Teacher";
import TeacherAssignment from "@/models/TeacherAssignment";
import { getCurrentUser } from "@/lib/auth";

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

    const examDoc = await Exam.findById(exam)
      .select("examName resultMode includedExams")
      .lean();

    if (!examDoc) {
      return {
        success: false,
        message: "Exam not found.",
      };
    }
    // ===================================
    // Get Student Marks
    // ===================================

    let examIds = [exam];

    if (examDoc.resultMode === "CUMULATIVE") {
      examIds = [exam, ...(examDoc.includedExams || [])];
    }

    const marks = await Mark.find({
      academicSession,
      exam: { $in: examIds },
      student,
    })
      .populate("subject", "_id subjectName subjectCode")
      .populate("exam", "_id examName")
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

    const subjectMap = new Map();

    for (const mark of marks) {
      const subjectId = mark.subject?._id?.toString();

      if (!subjectMap.has(subjectId)) {
        subjectMap.set(subjectId, {
          id: subjectId,
          subject: mark.subject?.subjectName || "",
          code: mark.subject?.subjectCode || "",

          exams: [],

          obtained: 0,
          maximum: 0,
        });
      }

      const subject = subjectMap.get(subjectId);

      subject.exams.push({
        examId: mark.exam._id.toString(),
        examName: mark.exam.examName,
        obtained: Number(mark.obtainedMarks),
        maximum: Number(mark.maximumMarks),
      });

      subject.obtained += Number(mark.obtainedMarks);
      subject.maximum += Number(mark.maximumMarks);
    }

    let totalObtained = 0;
    let totalMaximum = 0;

    const subjects = Array.from(subjectMap.values()).map((subject) => {
      totalObtained += subject.obtained;
      totalMaximum += subject.maximum;

      const subjectResult = calculateSubjectResult(
        subject.obtained,
        subject.maximum,
      );

      return {
        ...subject,

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
      exam: { $in: examIds },
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

// ===================================
// Get Teacher Students
// ===================================

export async function getTeacherStudents() {
  try {
    await connectDB();

    // ===================================
    // Current User
    // ===================================

    const user = await getCurrentUser();

    if (!user || user.role !== "TEACHER") {
      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    // ===================================
    // Teacher
    // ===================================

    const teacher = await Teacher.findById(user.teacherId)
      .select("_id status")
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

    // ===================================
    // Active Session
    // ===================================

    const session = await AcademicSession.findOne({
      isActive: true,
    })
      .select("_id name")
      .lean();

    if (!session) {
      return {
        success: false,
        message: "No active academic session.",
      };
    }

    // ===================================
    // Class Teacher Assignment
    // ===================================

    const assignment = await TeacherAssignment.findOne({
      teacher: teacher._id,
      academicSession: session._id,
      isClassTeacher: true,
      status: true,
    })
      .select("className section")
      .lean();

    if (!assignment) {
      return {
        success: false,
        message: "You are not assigned as a class teacher.",
      };
    }

    // ===================================
    // Students
    // ===================================

    // ===================================
    // Students
    // ===================================

    const students = await Student.find({
      className: assignment.className,
      section: assignment.section,
    })
      .select(
        "_id admissionNo rollNo firstName lastName className section status",
      )
      .lean();

    if (students.length === 0) {
      return {
        success: false,
        message: "No students found for your class.",
      };
    }

    return {
      success: true,

      classInfo: {
        className: assignment.className,
        section: assignment.section,
      },

      academicSession: {
        id: session._id.toString(),
        name: session.name,
      },

      students: students.map((student) => ({
        id: student._id.toString(),
        admissionNo: student.admissionNo,
        rollNo: student.rollNo,
        firstName: student.firstName,
        lastName: student.lastName,
        fullName: `${student.firstName} ${student.lastName}`.trim(),
      })),
    };
  } catch (error) {
    console.error("Get Teacher Students Error:", error);

    return {
      success: false,
      message: "Failed to load students.",
    };
  }
}

// ===================================
// Get Teacher Student Result
// ===================================

export async function getTeacherStudentResult({
  academicSession,
  exam,
  student,
}) {
  try {
    await connectDB();

    // ===================================
    // Current User
    // ===================================

    const user = await getCurrentUser();

    if (!user || user.role !== "TEACHER") {
      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    // ===================================
    // Teacher
    // ===================================

    const teacher = await Teacher.findById(user.teacherId)
      .select("_id status")
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

    // ===================================
    // Active Session
    // ===================================

    const session = await AcademicSession.findOne({
      _id: academicSession,
      isActive: true,
    })
      .select("_id")
      .lean();

    if (!session) {
      return {
        success: false,
        message: "Academic session not found.",
      };
    }

    // ===================================
    // Class Teacher Assignment
    // ===================================

    const assignment = await TeacherAssignment.findOne({
      teacher: teacher._id,
      academicSession: session._id,
      isClassTeacher: true,
      status: true,
    })
      .select("className section")
      .lean();

    if (!assignment) {
      return {
        success: false,
        message: "You are not assigned as a class teacher.",
      };
    }

    // ===================================
    // Verify Student
    // ===================================

    const studentDoc = await Student.findOne({
      _id: student,
      className: assignment.className,
      section: assignment.section,
      status: "Active",
    })
      .select("_id")
      .lean();

    if (!studentDoc) {
      return {
        success: false,
        message: "This student does not belong to your class.",
      };
    }

    // ===================================
    // Get Result
    // ===================================

    const result = await getStudentResult({
      academicSession,
      exam,
      student,
    });

    return result;
  } catch (error) {
    console.error("Get Teacher Student Result Error:", error);

    return {
      success: false,
      message: "Failed to load student result.",
    };
  }
}

// ===================================
// Get Current Student Result
// ===================================

export async function getCurrentStudentResult(exam) {
  try {
    await connectDB();

    // ===================================
    // Current User
    // ===================================

    const user = await getCurrentUser();

    if (!user || user.role !== "STUDENT") {
      return {
        success: false,
        message: "Unauthorized access.",
      };
    }

    if (!user.studentId) {
      return {
        success: false,
        message: "Student profile is not linked.",
      };
    }

    // ===================================
    // Active Academic Session
    // ===================================

    const session = await AcademicSession.findOne({
      isActive: true,
    })
      .select("_id")
      .lean();

    if (!session) {
      return {
        success: false,
        message: "No active academic session found.",
      };
    }

    // ===================================
    // Verify Student
    // ===================================

    const student = await Student.findOne({
      _id: user.studentId,
      status: "Active",
    })
      .select("_id")
      .lean();

    if (!student) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    // ===================================
    // Get Result
    // ===================================

    return await getStudentResult({
      academicSession: session._id,
      exam,
      student: student._id,
    });
  } catch (error) {
    console.error("Get Current Student Result Error:", error);

    return {
      success: false,
      message: "Failed to load student result.",
    };
  }
}
