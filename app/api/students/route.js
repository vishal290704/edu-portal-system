import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

// GET - Fetch all students
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("GET Students Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students",
      },
      { status: 500 }
    );
  }
}

// POST - Add a new student
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const student = await Student.create(body);

    return NextResponse.json(
      {
        success: true,
        data: student,
        message: "Student added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Student Error:", error);

    // Duplicate Admission Number
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Admission Number already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add student",
      },
      { status: 500 }
    );
  }
}