"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

// Create Student
export async function createStudent(data) {
  try {
    await connectDB();

    const student = await Student.create(data);

    revalidatePath("/admin/students");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(student)),
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
