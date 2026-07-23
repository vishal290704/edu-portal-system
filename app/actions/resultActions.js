"use server";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";

import {
  calculatePercentage,
  calculateGrade,
  calculatePassFail,
} from "@/lib/resultUtils";

export async function getStudentResult({ academicSession, exam, student }) {
  try {
    await connectDB();
    console.log("1. Connected");
    const marks = await Mark.find({
      academicSession,
      exam,
      student,
    }).populate("subject", "_id subjectName subjectCode");
    console.log("2. Marks found:", marks.length);

    marks.sort((a, b) =>
      a.subject.subjectName.localeCompare(b.subject.subjectName),
    );
    console.log("3. Sorting done");

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
console.log("4. Returning result");
      return {
        id: mark.subject._id.toString(),
        subject: mark.subject.subjectName,
        code: mark.subject.subjectCode,
        obtained: mark.obtainedMarks,
        maximum: mark.maximumMarks,
        remarks: mark.remarks,
      };
    });

    const percentage = calculatePercentage(totalObtained, totalMaximum);

    const grade = calculateGrade(percentage);

    const result = calculatePassFail(totalObtained, totalMaximum);

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
