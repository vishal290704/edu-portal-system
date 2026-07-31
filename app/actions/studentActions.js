"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Student from "@/models/Student";

import Teacher from "@/models/Teacher";
import TeacherAssignment from "@/models/TeacherAssignment";
import AcademicSession from "@/models/AcademicSession";

import { getCurrentUser } from "@/lib/auth";

// Create Student
export async function createStudent(data) {
  try {
    await connectDB();

    await Student.create(data);

    revalidatePath("/admin/students");

    return {
      success: true,
      message: "Student created successfully.",
    };
  } catch (error) {
    console.error("Create Student Error:", error);

    if (error.code === 11000) {
      return {
        success: false,
        message: "Student portal already exists.",
      };
    }

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// Update Student
export async function updateStudent(id, data) {
  try {
    await connectDB();

    await Student.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    revalidatePath("/admin/students");

    return {
      success: true,
      message: "Student updated successfully.",
    };
  } catch (error) {
    console.error("Update Student Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

//delete student
export async function deleteStudent(id) {
  try {
    await connectDB();

    await Student.findByIdAndDelete(id);

    revalidatePath("/admin/students");

    return {
      success: true,
      message: "Student deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Student Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// Get All Students
export async function getStudents() {
  try {
    await connectDB();

    const students = await Student.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    const users = await User.find(
      {
        role: "STUDENT",
      },
      "studentId",
    ).lean();

    const activatedStudents = new Set(
      users.map((user) => user.studentId?.toString()),
    );

    const formattedStudents = students.map((student) => ({
      ...student,
      portalActivated: activatedStudents.has(student._id.toString()),
    }));

    return JSON.parse(JSON.stringify(formattedStudents));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ===================================
// Get Logged-In Teacher Students
// ===================================

export async function getCurrentTeacherStudents() {
  try {
    await connectDB();

    // ===================================
    // Current User
    // ===================================

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    if (currentUser.role !== "TEACHER") {
      return {
        success: false,
        message: "Teacher access required.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    if (!currentUser.teacherId) {
      return {
        success: false,
        message: "Teacher profile is not linked to this account.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Validate Teacher
    // ===================================

    const teacher = await Teacher.findById(currentUser.teacherId).lean();

    if (!teacher) {
      return {
        success: false,
        message: "Teacher profile not found.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    if (teacher.status !== "ACTIVE") {
      return {
        success: false,
        message: "Teacher profile is inactive.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Active Academic Session
    // ===================================

    const activeSession = await AcademicSession.findOne({
      isActive: true,
    }).lean();

    if (!activeSession) {
      return {
        success: false,
        message: "No active academic session found.",
        students: [],
        assignments: [],
        session: null,
      };
    }

    // ===================================
    // Teacher Assignments
    // ===================================

    const assignments = await TeacherAssignment.find({
      teacher: currentUser.teacherId,
      academicSession: activeSession._id,
      status: true,
    })
      .populate("subject", "subjectName subjectCode")
      .lean();

    if (assignments.length === 0) {
      return {
        success: true,
        teacher: JSON.parse(JSON.stringify(teacher)),
        session: JSON.parse(JSON.stringify(activeSession)),
        assignments: [],
        students: [],
      };
    }

    // ===================================
    // Unique Class + Section
    // ===================================

    const classSectionMap = new Map();

    assignments.forEach((assignment) => {
      const key = `${assignment.className}-${assignment.section}`;

      if (!classSectionMap.has(key)) {
        classSectionMap.set(key, {
          className: assignment.className,
          section: assignment.section,
        });
      }
    });

    const classSections = Array.from(classSectionMap.values());

    // ===================================
    // Get Accessible Students
    // ===================================

    const students = await Student.find({
      status: "Active",

      $or: classSections.map((item) => ({
        className: item.className,
        section: item.section,
      })),
    })
      .sort({
        className: 1,
        section: 1,
        rollNo: 1,
        firstName: 1,
      })
      .lean();

    return {
      success: true,

      teacher: JSON.parse(JSON.stringify(teacher)),

      session: JSON.parse(JSON.stringify(activeSession)),

      assignments: JSON.parse(JSON.stringify(assignments)),

      students: JSON.parse(JSON.stringify(students)),
    };
  } catch (error) {
    console.error("Get Current Teacher Students Error:", error);

    return {
      success: false,
      message: "Failed to load students.",
      students: [],
      assignments: [],
      session: null,
    };
  }
}

// ===================================
// Get Current Student
// ===================================

export async function getCurrentStudent() {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
        student: null,
      };
    }

    if (currentUser.role !== "STUDENT") {
      return {
        success: false,
        message: "Student access required.",
        student: null,
      };
    }

    if (!currentUser.studentId) {
      return {
        success: false,
        message: "Student profile is not linked to this account.",
        student: null,
      };
    }

    const student = await Student.findById(currentUser.studentId).lean();

    if (!student) {
      return {
        success: false,
        message: "Student not found.",
        student: null,
      };
    }

    if (student.status !== "Active") {
      return {
        success: false,
        message: "Student account is inactive.",
        student: null,
      };
    }

    return {
      success: true,
      student: JSON.parse(JSON.stringify(student)),
    };
  } catch (error) {
    console.error("Get Current Student Error:", error);

    return {
      success: false,
      message: "Failed to load student.",
      student: null,
    };
  }
}

// ===================================
// Activate Student Portal
// ===================================

export async function activateStudentPortal(studentId) {
  try {
    await connectDB();

    const student = await Student.findById(studentId);

    if (!student) {
      return {
        success: false,
        message: "Student not found.",
      };
    }

    // Check if portal is already activated
    const existingUser = await User.findOne({
      studentId,
      role: "STUDENT",
    });

    if (existingUser) {
      return {
        success: false,
        message: "Student portal is already activated.",
      };
    }

    // Random password (students won't use it)
    const randomPassword = Date.now().toString() + Math.random().toString(36);

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    await User.create({
      username: student.admissionNo,
      password: hashedPassword,
      role: "STUDENT",
      studentId: student._id,
      mustChangePassword: false,
      isActive: true,
    });
    revalidatePath("/admin/students");

    return {
      success: true,
      message: "Student portal activated successfully.",
    };
  } catch (error) {
    console.error("Activate Student Portal Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function getCurrentStudentProfile() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    throw new Error("Unauthorized");
  }

  const student = await Student.findById(user.studentId).lean();

  if (!student) {
    throw new Error("Student not found");
  }

  return JSON.parse(JSON.stringify(student));
}