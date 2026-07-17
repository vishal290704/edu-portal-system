"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

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
        message: "Admission Number already exists.",
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

// Get All Students
export async function getStudents() {
  try {
    await connectDB();

    const students = await Student.find().sort({
      createdAt: -1,
    });

    return JSON.parse(JSON.stringify(students));
  } catch (error) {
    console.error(error);
    return [];
  }
}
