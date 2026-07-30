"use server";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";

import {
  calculatePercentage,
  calculateGrade,
  calculatePassFail,
} from "@/lib/resultUtils";

export async function getClassResults({
  academicSession,
  exam,
  className,
  section,
}) {
  try {
    await connectDB();

    if (!academicSession || !exam || !className || !section) {
      return {
        success: false,
        message: "Please select all filters.",
        students: [],
        statistics: null,
      };
    }

    const marks = await Mark.find({
      academicSession,
      exam,
      className,
      section,
    })
      .populate("student", "_id admissionNo rollNo firstName lastName")
      .lean();

    if (marks.length === 0) {
      return {
        success: true,
        students: [],
        statistics: {
          totalStudents: 0,
          pass: 0,
          fail: 0,
          highestPercentage: 0,
          averagePercentage: 0,
        },
      };
    }

    // Continue...
    const studentMap = new Map();

    for (const mark of marks) {
      if (!mark.student) continue;

      const studentId = mark.student._id.toString();

      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, {
          id: studentId,
          admissionNo: mark.student.admissionNo,
          rollNo: mark.student.rollNo,
          fullName: [mark.student.firstName, mark.student.lastName]
            .filter(Boolean)
            .join(" "),

          totalObtained: 0,
          totalMaximum: 0,
        });
      }

      const student = studentMap.get(studentId);

      student.totalObtained += mark.obtainedMarks;
      student.totalMaximum += mark.maximumMarks;
    }

    const students = Array.from(studentMap.values()).map((student) => {
      const percentage = calculatePercentage(
        student.totalObtained,
        student.totalMaximum,
      );

      return {
        ...student,

        percentage,

        grade: calculateGrade(percentage),

        result: calculatePassFail(student.totalObtained, student.totalMaximum),
      };
    });

    students.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }

      return (a.rollNo || 0) - (b.rollNo || 0);
    });

    let previousPercentage = null;
    let currentRank = 0;

    students.forEach((student, index) => {
      if (student.percentage !== previousPercentage) {
        currentRank = index + 1;
        previousPercentage = student.percentage;
      }

      student.rank = currentRank;
    });

    const pass = students.filter((student) => student.result === "PASS").length;

    const fail = students.length - pass;

    const highestPercentage = students[0]?.percentage || 0;

    const averagePercentage =
      students.length > 0
        ? Number(
            (
              students.reduce((sum, student) => sum + student.percentage, 0) /
              students.length
            ).toFixed(2),
          )
        : 0;

    return {
      success: true,

      students,

      statistics: {
        totalStudents: students.length,

        pass,

        fail,

        highestPercentage,

        averagePercentage,
      },
    };
  } catch (error) {
    console.error("Get Class Results Error:", error);

    return {
      success: false,
      message: "Failed to load results.",
      students: [],
      statistics: null,
    };
  }
}
