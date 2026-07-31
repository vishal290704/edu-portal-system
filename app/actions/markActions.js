"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";

import Mark from "@/models/Mark";
import Student from "@/models/Student";
import Subject from "@/models/Subject";
import Exam from "@/models/Exam";
import Teacher from "@/models/Teacher";
import TeacherAssignment from "@/models/TeacherAssignment";
import AcademicSession from "@/models/AcademicSession";

import { getCurrentUser } from "@/lib/auth";

// ======================================================
// ADMIN MARKS
// ======================================================

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

    const obtained = Number(obtainedMarks);
    const maximum = Number(maximumMarks);

    if (Number.isNaN(obtained) || Number.isNaN(maximum)) {
      return {
        success: false,
        message: "Marks must be numeric.",
      };
    }

    if (obtained < 0) {
      return {
        success: false,
        message: "Obtained marks cannot be negative.",
      };
    }

    if (maximum <= 0) {
      return {
        success: false,
        message: "Maximum marks must be greater than zero.",
      };
    }

    if (obtained > maximum) {
      return {
        success: false,
        message: "Obtained marks cannot exceed maximum marks.",
      };
    }

    const [examDoc, studentDoc, subjectDoc] = await Promise.all([
      Exam.findById(exam),
      Student.findById(student),
      Subject.findById(subject),
    ]);

    if (!examDoc) {
      return {
        success: false,
        message: "Exam not found.",
      };
    }

    if (!studentDoc) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    if (!subjectDoc) {
      return {
        success: false,
        message: "Subject not found.",
      };
    }

    if (examDoc.academicSession.toString() !== academicSession.toString()) {
      return {
        success: false,
        message: "Exam does not belong to the selected academic session.",
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

      className: studentDoc.className,
      section: studentDoc.section,

      subject,

      obtainedMarks: obtained,
      maximumMarks: maximum,

      remarks: remarks?.trim() || "",
      enteredBy: enteredBy || null,
    });

    revalidatePath("/admin/marks");

    return {
      success: true,
      message: "Marks saved successfully.",

      mark: JSON.parse(JSON.stringify(mark)),
    };
  } catch (error) {
    console.error("Create Mark Error:", error);

    if (error?.code === 11000) {
      return {
        success: false,
        message: "Marks already exist for this student and subject.",
      };
    }

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
      .populate(
        "student",
        "firstName lastName admissionNo className section rollNo",
      )
      .populate("subject", "subjectName subjectCode")
      .populate("exam", "examName examType")
      .populate("academicSession", "name")
      .sort({
        createdAt: -1,
      })
      .lean();

    return JSON.parse(JSON.stringify(marks));
  } catch (error) {
    console.error("Get Marks Error:", error);

    return [];
  }
}

// ============================
// Update Mark
// ============================

export async function updateMark(id, data) {
  try {
    await connectDB();

    const obtained = Number(data.obtainedMarks);

    const maximum = Number(data.maximumMarks);

    if (Number.isNaN(obtained) || Number.isNaN(maximum)) {
      return {
        success: false,
        message: "Marks must be numeric.",
      };
    }

    if (obtained < 0) {
      return {
        success: false,
        message: "Obtained marks cannot be negative.",
      };
    }

    if (maximum <= 0) {
      return {
        success: false,
        message: "Maximum marks must be greater than zero.",
      };
    }

    if (obtained > maximum) {
      return {
        success: false,
        message: "Obtained marks cannot exceed maximum marks.",
      };
    }

    const updated = await Mark.findByIdAndUpdate(
      id,
      {
        ...data,
        obtainedMarks: obtained,
        maximumMarks: maximum,
        remarks: data.remarks?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      return {
        success: false,
        message: "Marks record not found.",
      };
    }

    revalidatePath("/admin/marks");
    revalidatePath("/admin/results");

    return {
      success: true,
      message: "Marks updated successfully.",
    };
  } catch (error) {
    console.error("Update Mark Error:", error);

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

    const deleted = await Mark.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "Marks record not found.",
      };
    }

    revalidatePath("/admin/marks");
    revalidatePath("/admin/results");

    return {
      success: true,
      message: "Marks deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Mark Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// ============================
// Get Student Marks
// ============================

export async function getStudentMarks({ academicSession, exam, student }) {
  try {
    await connectDB();

    const marks = await Mark.find({
      academicSession,
      exam,
      student,
    })
      .populate("subject", "_id subjectName subjectCode")
      .sort({
        createdAt: 1,
      })
      .lean();

    return JSON.parse(JSON.stringify(marks));
  } catch (error) {
    console.error("Get Student Marks Error:", error);

    return [];
  }
}

// ============================
// Save Student Marks
// Admin Workflow
// ============================

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

    if (!Array.isArray(marks) || marks.length === 0) {
      return {
        success: false,
        message: "No marks to save.",
      };
    }

    const [studentDoc, examDoc] = await Promise.all([
      Student.findById(student)
        .select("className section rollNo admissionNo")
        .lean(),

      Exam.findOne({
        _id: exam,
        academicSession,
      })
        .select("_id applicableClasses maximumMarksPerSubject")
        .lean(),
    ]);

    if (!studentDoc) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    if (!examDoc) {
      return {
        success: false,
        message: "Exam not found in selected academic session.",
      };
    }

    if (!examDoc.applicableClasses.includes(studentDoc.className)) {
      return {
        success: false,
        message: "Exam is not applicable to this student's class.",
      };
    }

    const subjectIds = marks
      .filter((mark) => mark.subject)
      .map((mark) => mark.subject);

    const subjects = await Subject.find({
      _id: {
        $in: subjectIds,
      },
      applicableClasses: studentDoc.className,
    })
      .select("_id")
      .lean();

    const allowedSubjectIds = new Set(
      subjects.map((subject) => subject._id.toString()),
    );

    const operations = [];

    for (const mark of marks) {
      if (!mark.subject) {
        return {
          success: false,
          message: "Invalid subject.",
        };
      }

      const subjectId = mark.subject.toString();

      if (!allowedSubjectIds.has(subjectId)) {
        return {
          success: false,
          message: "Subject is not applicable to this student's class.",
        };
      }

      if (
        mark.obtainedMarks === "" ||
        mark.obtainedMarks === null ||
        mark.obtainedMarks === undefined
      ) {
        continue;
      }

      const obtainedMarks = Number(mark.obtainedMarks);

      const maximumMarks = examDoc.maximumMarksPerSubject;

      if (Number.isNaN(obtainedMarks) || Number.isNaN(maximumMarks)) {
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

      operations.push({
        updateOne: {
          filter: {
            academicSession,
            exam,
            student,
            subject: mark.subject,
          },

          update: {
            $set: {
              academicSession,
              exam,
              student,

              className: studentDoc.className,

              section: studentDoc.section,

              subject: mark.subject,

              obtainedMarks,
              maximumMarks,

              remarks: mark.remarks?.trim() || "",
            },
          },

          upsert: true,
        },
      });
    }

    if (operations.length === 0) {
      return {
        success: false,
        message: "Enter marks for at least one subject.",
      };
    }

    await Mark.bulkWrite(operations, {
      ordered: false,
    });

    revalidatePath("/admin/marks");
    revalidatePath("/admin/results");

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

// ======================================================
// CLASS TEACHER MARKS
// ======================================================

// ============================
// Get Class Teacher Context
// ============================

async function getClassTeacherMarksContext() {
  const currentUser = await getCurrentUser();

  // ============================
  // Authentication
  // ============================

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  if (currentUser.role !== "TEACHER") {
    return {
      success: false,
      message: "Teacher access required.",
    };
  }

  if (!currentUser.teacherId) {
    return {
      success: false,
      message: "Teacher profile is not linked to this account.",
    };
  }

  // ============================
  // Teacher + Active Session
  // ============================

  const [teacher, activeSession] = await Promise.all([
    Teacher.findById(currentUser.teacherId)
      .select("_id employeeId firstName lastName status")
      .lean(),

    AcademicSession.findOne({
      isActive: true,
    })
      .select("_id name startDate endDate")
      .lean(),
  ]);

  if (!teacher) {
    return {
      success: false,
      message: "Teacher profile not found.",
    };
  }

  if (teacher.status !== "ACTIVE") {
    return {
      success: false,
      message: "Teacher profile is inactive.",
    };
  }

  if (!activeSession) {
    return {
      success: false,
      message: "No active academic session found.",
    };
  }

  // ============================
  // Class Teacher Assignment
  // ============================

  const classTeacherAssignment = await TeacherAssignment.findOne({
    teacher: teacher._id,

    academicSession: activeSession._id,

    isClassTeacher: true,

    status: true,
  })
    .select("_id className section isClassTeacher")
    .lean();

  if (!classTeacherAssignment) {
    return {
      success: false,
      message: "Only the class teacher can enter marks.",
    };
  }

  return {
    success: true,

    currentUser,
    teacher,
    activeSession,
    classTeacherAssignment,
  };
}

// ============================
// Get Class Teacher Marks Setup
// ============================

export async function getClassTeacherMarksSetup() {
  try {
    await connectDB();

    const context = await getClassTeacherMarksContext();

    if (!context.success) {
      return {
        success: false,
        message: context.message,
        classInfo: null,
        session: null,
        subjects: [],
        exams: [],
      };
    }

    const { activeSession, classTeacherAssignment } = context;

    const className = classTeacherAssignment.className;

    const section = classTeacherAssignment.section;

    // ============================
    // Subjects + Exams
    // ============================

    const [subjects, exams] = await Promise.all([
      Subject.find({
        applicableClasses: className,

        status: true,
      })
        .select("_id subjectName subjectCode")
        .sort({
          subjectName: 1,
        })
        .lean(),

      Exam.find({
        academicSession: activeSession._id,

        applicableClasses: className,

        status: true,
      })
        .select("_id examName examType startDate endDate")
        .sort({
          startDate: 1,
          createdAt: 1,
        })
        .lean(),
    ]);

    return {
      success: true,

      session: JSON.parse(JSON.stringify(activeSession)),

      classInfo: {
        className,
        section,
      },

      subjects: JSON.parse(JSON.stringify(subjects)),

      exams: JSON.parse(JSON.stringify(exams)),
    };
  } catch (error) {
    console.error("Get Class Teacher Marks Setup Error:", error);

    return {
      success: false,
      message: "Failed to load marks setup.",
      classInfo: null,
      session: null,
      subjects: [],
      exams: [],
    };
  }
}

// ============================
// Get Students + Existing Marks
// ============================

export async function getClassTeacherMarksData({ examId }) {
  try {
    await connectDB();

    if (!examId) {
      return {
        success: false,
        message: "Exam is required.",
        students: [],
        subjects: [],
        marks: [],
        exam: null,
        classInfo: null,
      };
    }

    const context = await getClassTeacherMarksContext();

    if (!context.success) {
      return {
        success: false,
        message: context.message,
        students: [],
        subjects: [],
        marks: [],
        exam: null,
        classInfo: null,
      };
    }

    const { activeSession, classTeacherAssignment } = context;

    const className = classTeacherAssignment.className;

    const section = classTeacherAssignment.section;

    // ============================
    // Validate Exam
    // ============================

    const exam = await Exam.findOne({
      _id: examId,

      academicSession: activeSession._id,

      status: true,
    })
      .select("_id examName examType applicableClasses startDate endDate")
      .lean();

    if (!exam) {
      return {
        success: false,
        message: "Exam not found or inactive.",
        students: [],
        subjects: [],
        marks: [],
        exam: null,
        classInfo: null,
      };
    }

    if (!exam.applicableClasses.includes(className)) {
      return {
        success: false,
        message: "This exam is not applicable to your class.",
        students: [],
        subjects: [],
        marks: [],
        exam: null,
        classInfo: null,
      };
    }

    // ============================
    // Load Data In Parallel
    // ============================

    const [subjects, students, existingMarks] = await Promise.all([
      Subject.find({
        applicableClasses: className,

        status: true,
      })
        .select("_id subjectName subjectCode")
        .sort({
          subjectName: 1,
        })
        .lean(),

      Student.find({
        className,
        section,
        status: "Active",
      })
        .select("_id admissionNo rollNo firstName lastName")
        .sort({
          rollNo: 1,
          firstName: 1,
        })
        .lean(),

      Mark.find({
        academicSession: activeSession._id,

        exam: exam._id,

        className,
        section,
      })
        .select(
          "_id student subject obtainedMarks maximumMarks remarks enteredBy",
        )
        .lean(),
    ]);

    return {
      success: true,

      exam: JSON.parse(JSON.stringify(exam)),

      classInfo: {
        className,
        section,
      },

      subjects: JSON.parse(JSON.stringify(subjects)),

      students: JSON.parse(JSON.stringify(students)),

      marks: JSON.parse(JSON.stringify(existingMarks)),
    };
  } catch (error) {
    console.error("Get Class Teacher Marks Data Error:", error);

    return {
      success: false,
      message: "Failed to load marks data.",
      students: [],
      subjects: [],
      marks: [],
      exam: null,
      classInfo: null,
    };
  }
}

// ============================
// Save Class Teacher Marks
// ============================

export async function saveClassTeacherMarks({ examId, marks }) {
  try {
    await connectDB();

    // ============================
    // Basic Validation
    // ============================

    if (!examId) {
      return {
        success: false,
        message: "Exam is required.",
      };
    }

    if (!Array.isArray(marks) || marks.length === 0) {
      return {
        success: false,
        message: "No marks to save.",
      };
    }

    // ============================
    // Secure Class Teacher Context
    // ============================

    const context = await getClassTeacherMarksContext();

    if (!context.success) {
      return {
        success: false,
        message: context.message,
      };
    }

    const { currentUser, activeSession, classTeacherAssignment } = context;

    const className = classTeacherAssignment.className;

    const section = classTeacherAssignment.section;

    // ============================
    // Validate Exam
    // ============================

    const exam = await Exam.findOne({
      _id: examId,

      academicSession: activeSession._id,

      status: true,
    })
      .select("_id applicableClasses maximumMarksPerSubject")
      .lean();

    if (!exam) {
      return {
        success: false,
        message: "Exam not found or inactive.",
      };
    }

    if (!exam.applicableClasses.includes(className)) {
      return {
        success: false,
        message: "This exam is not applicable to your class.",
      };
    }
    const maxMarks = exam.maximumMarksPerSubject;

    if (Number.isNaN(maxMarks) || maxMarks <= 0) {
      return {
        success: false,
        message: "Maximum marks must be greater than zero.",
      };
    }

    // ============================
    // Allowed Students + Subjects
    // ============================

    const [students, subjects] = await Promise.all([
      Student.find({
        className,
        section,
        status: "Active",
      })
        .select("_id")
        .lean(),

      Subject.find({
        applicableClasses: className,

        status: true,
      })
        .select("_id")
        .lean(),
    ]);

    if (students.length === 0) {
      return {
        success: false,
        message: "No active students found in this class.",
      };
    }

    if (subjects.length === 0) {
      return {
        success: false,
        message: "No active subjects found for this class.",
      };
    }

    const allowedStudentIds = new Set(
      students.map((student) => student._id.toString()),
    );

    const allowedSubjectIds = new Set(
      subjects.map((subject) => subject._id.toString()),
    );

    // ============================
    // Validate + Build Bulk Writes
    // ============================

    const submittedPairs = new Set();

    const operations = [];

    for (const mark of marks) {
      const studentId = mark.student?.toString();

      const subjectId = mark.subject?.toString();

      // ============================
      // Student Validation
      // ============================

      if (!studentId || !allowedStudentIds.has(studentId)) {
        return {
          success: false,
          message: "Invalid student in marks data.",
        };
      }

      // ============================
      // Subject Validation
      // ============================

      if (!subjectId || !allowedSubjectIds.has(subjectId)) {
        return {
          success: false,
          message: "Invalid subject in marks data.",
        };
      }

      // ============================
      // Prevent Duplicate Pair
      // ============================

      const pairKey = `${studentId}:${subjectId}`;

      if (submittedPairs.has(pairKey)) {
        return {
          success: false,
          message: "Duplicate student and subject marks found.",
        };
      }

      submittedPairs.add(pairKey);

      // ============================
      // Blank = Not Entered
      // ============================

      if (
        mark.obtainedMarks === "" ||
        mark.obtainedMarks === null ||
        mark.obtainedMarks === undefined
      ) {
        continue;
      }

      const obtainedMarks = Number(mark.obtainedMarks);

      // ============================
      // Marks Validation
      // ============================

      if (Number.isNaN(obtainedMarks)) {
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

      if (obtainedMarks > maxMarks) {
        return {
          success: false,
          message: `Obtained marks cannot exceed ${maxMarks}.`,
        };
      }

      // ============================
      // Bulk Upsert
      // ============================

      operations.push({
        updateOne: {
          filter: {
            academicSession: activeSession._id,

            exam: exam._id,

            student: studentId,

            subject: subjectId,
          },

          update: {
            $set: {
              academicSession: activeSession._id,

              exam: exam._id,

              student: studentId,

              className,

              section,

              subject: subjectId,

              obtainedMarks,

              maximumMarks: maxMarks,

              remarks: mark.remarks?.trim() || "",

              enteredBy: currentUser.id,
            },
          },

          upsert: true,
        },
      });
    }

    // ============================
    // Nothing Entered
    // ============================

    if (operations.length === 0) {
      return {
        success: false,
        message: "Enter marks for at least one student.",
      };
    }

    // ============================
    // Fast Bulk Save
    // ============================

    await Mark.bulkWrite(operations, {
      ordered: false,
    });

    revalidatePath("/teacher");
    revalidatePath("/teacher/results");

    revalidatePath("/admin/marks");
    revalidatePath("/admin/results");

    return {
      success: true,

      message: "Marks saved successfully.",

      savedCount: operations.length,
    };
  } catch (error) {
    console.error("Save Class Teacher Marks Error:", error);

    if (error?.code === 11000) {
      return {
        success: false,
        message: "Duplicate marks record detected. Please try again.",
      };
    }

    return {
      success: false,
      message: "Failed to save marks.",
    };
  }
}
