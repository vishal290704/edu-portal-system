"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";
import Mark from "@/models/Mark";
import Student from "@/models/Student";
import Subject from "@/models/Subject";
import Exam from "@/models/Exam";

// ============================
// Create Mark
// ============================

export async function createMark(data) {
  try {
    await connectDB();

    const {
      academicSession,
      exam,
      student,
      subject,
      obtainedMarks,
      maximumMarks,
      remarks,
      enteredBy,
    } = data;

    if (Number(obtainedMarks) > Number(maximumMarks)) {
      return {
        success: false,
        message: "Obtained marks cannot exceed maximum marks.",
      };
    }

    const examDoc = await Exam.findById(exam);

    if (!examDoc) {
      return {
        success: false,
        message: "Exam not found.",
      };
    }

    const studentDoc = await Student.findById(student);

    if (!studentDoc) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    const subjectDoc = await Subject.findById(subject);

    if (!subjectDoc) {
      return {
        success: false,
        message: "Subject not found.",
      };
    }

    if (!examDoc.applicableClasses.includes(studentDoc.className)) {
      return {
        success: false,
        message: "Student's class is not applicable for this exam.",
      };
    }

    if (!subjectDoc.applicableClasses.includes(studentDoc.className)) {
      return {
        success: false,
        message: "Subject is not applicable for this student's class.",
      };
    }

  const existing = await Mark.findOne({
  academicSession,
  exam,
  student,
  subject,
});

    if (existing) {
      return {
        success: false,
        message: "Marks already exist for this student and subject.",
      };
    }
    const mark = await Mark.create({
      academicSession,
      exam,
      student,

      // Historical snapshot
      className: studentDoc.className,
      section: studentDoc.section,

      subject,
      obtainedMarks,
      maximumMarks,
      remarks,
      enteredBy,
    });
    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks saved successfully.",
      mark: JSON.parse(JSON.stringify(mark)),
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
// Get Marks
// ============================

export async function getMarks() {
  try {
    await connectDB();

    const marks = await Mark.find()
      .populate("student", "firstName lastName admissionNo className")
      .populate("subject", "subjectName subjectCode")
      .populate("exam", "examName")
      .populate("academicSession", "name")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(marks));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ============================
// Update Mark
// ============================

export async function updateMark(id, data) {
  try {
    await connectDB();

    if (Number(data.obtainedMarks) > Number(data.maximumMarks)) {
      return {
        success: false,
        message: "Obtained marks cannot exceed maximum marks.",
      };
    }

    await Mark.findByIdAndUpdate(id, {
      ...data,
    });

    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks updated successfully.",
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
// Delete Mark
// ============================

export async function deleteMark(id) {
  try {
    await connectDB();

    await Mark.findByIdAndDelete(id);

    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function getStudentMarks({ academicSession, exam, student }) {
  try {
    await connectDB();

    const marks = await Mark.find({
      academicSession,
      exam,
      student,
    }).populate("subject", "_id subjectName subjectCode");

    return JSON.parse(JSON.stringify(marks));
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function saveStudentMarks({
  academicSession,
  exam,
  student,
  marks,
}) {
  try {
    await connectDB();

    if (!academicSession || !exam || !student) {
      return {
        success: false,
        message: "Please select session, exam and student.",
      };
    }

    if (!marks || marks.length === 0) {
      return {
        success: false,
        message: "No marks to save.",
      };
    }

    // Get student's current class and section
    const studentDoc = await Student.findById(student).select(
      "className section rollNo admissionNo",
    );

    if (!studentDoc) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    for (const mark of marks) {
      if (!mark.subject) {
        return {
          success: false,
          message: "Invalid subject.",
        };
      }

      // Skip empty marks
      if (
        mark.obtainedMarks === "" ||
        mark.obtainedMarks === null ||
        mark.obtainedMarks === undefined
      ) {
        continue;
      }

      const obtainedMarks = Number(mark.obtainedMarks);
      const maximumMarks = Number(mark.maximumMarks);

      if (isNaN(obtainedMarks) || isNaN(maximumMarks)) {
        return {
          success: false,
          message: "Marks must be numeric.",
        };
      }

      if (obtainedMarks < 0) {
        return {
          success: false,
          message: "Obtained marks cannot be negative.",
        };
      }

      if (maximumMarks <= 0) {
        return {
          success: false,
          message: "Maximum marks must be greater than zero.",
        };
      }

      if (obtainedMarks > maximumMarks) {
        return {
          success: false,
          message: `Obtained marks cannot exceed ${maximumMarks}.`,
        };
      }

      await Mark.findOneAndUpdate(
        {
          academicSession,
          exam,
          student,
          subject: mark.subject,
        },
        {
          academicSession,
          exam,
          student,

          // Snapshot for historical records
          className: studentDoc.className,
          section: studentDoc.section,

          subject: mark.subject,
          obtainedMarks,
          maximumMarks,
          remarks: mark.remarks?.trim() || "",
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks saved successfully.",
    };
  } catch (error) {
    console.error("Save Student Marks Error:", error);

    return {
      success: false,
      message: "Failed to save marks.",
    };
  }
}
