"use server";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";

import {
  calculatePercentage,
  calculateGrade,
  calculatePassFail,
} from "@/lib/resultUtils";

export async function getStudentResult({
  academicSession,
  exam,
  student,
}) {
  try {
    await connectDB();

    const marks = await Mark.find({
      academicSession,
      exam,
      student,
    })
      .populate("subject", "subjectName subjectCode")
      .sort({
        "subject.subjectName": 1,
      });

    if (marks.length === 0) {
      return {
        success: false,
        message: "No marks found.",
      };
    }

    let totalObtained = 0;
    let totalMaximum = 0;

    const subjects = marks.map((mark) => {
      totalObtained += mark.obtainedMarks;
      totalMaximum += mark.maximumMarks;

      return {
        subject: mark.subject.subjectName,
        code: mark.subject.subjectCode,
        obtained: mark.obtainedMarks,
        maximum: mark.maximumMarks,
        remarks: mark.remarks,
      };
    });

    const percentage = calculatePercentage(
      totalObtained,
      totalMaximum
    );

    const grade = calculateGrade(percentage);

    const result = calculatePassFail(
      totalObtained,
      totalMaximum
    );

    return {
      success: true,
      student,
      subjects,
      totalObtained,
      totalMaximum,
      percentage,
      grade,
      result,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}