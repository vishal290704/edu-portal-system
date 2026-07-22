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
        message:
          "Obtained marks cannot exceed maximum marks.",
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

    if (
      !examDoc.applicableClasses.includes(
        studentDoc.className
      )
    ) {
      return {
        success: false,
        message:
          "Student's class is not applicable for this exam.",
      };
    }

    if (
      !subjectDoc.applicableClasses.includes(
        studentDoc.className
      )
    ) {
      return {
        success: false,
        message:
          "Subject is not applicable for this student's class.",
      };
    }

    const existing = await Mark.findOne({
      exam,
      student,
      subject,
    });

    if (existing) {
      return {
        success: false,
        message:
          "Marks already exist for this student and subject.",
      };
    }

    const mark = await Mark.create({
      academicSession,
      exam,
      student,
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

    if (
      Number(data.obtainedMarks) >
      Number(data.maximumMarks)
    ) {
      return {
        success: false,
        message:
          "Obtained marks cannot exceed maximum marks.",
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

// ============================
// Save Bulk Marks
// ============================

export async function saveBulkMarks(data) {
  try {
    await connectDB();

    const {
      academicSession,
      exam,
      subject,
      maximumMarks,
      marks,
    } = data;

    if (!exam || !subject || !academicSession) {
      return {
        success: false,
        message: "Please select exam and subject.",
      };
    }

    for (const item of marks) {
      if (
        item.obtainedMarks === "" ||
        item.obtainedMarks === null ||
        item.obtainedMarks === undefined
      ) {
        continue;
      }

      const obtained = Number(item.obtainedMarks);
      const maximum = Number(maximumMarks);

      if (obtained > maximum) {
        return {
          success: false,
          message: `${item.studentName}: Marks cannot exceed maximum marks.`,
        };
      }

      await Mark.findOneAndUpdate(
        {
          academicSession,
          exam,
          subject,
          student: item.student,
        },
        {
          academicSession,
          exam,
          subject,
          student: item.student,
          obtainedMarks: obtained,
          maximumMarks: maximum,
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks saved successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}