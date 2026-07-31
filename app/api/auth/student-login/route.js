import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const { admissionNo, dob } = await req.json();

    // Validate input
    if (!admissionNo || !dob) {
      return NextResponse.json(
        {
          success: false,
          message: "Admission Number and Date of Birth are required.",
        },
        { status: 400 }
      );
    }

    // Find student
    const student = await Student.findOne({
      admissionNo: admissionNo.trim(),
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Admission Number or Date of Birth.",
        },
        { status: 401 }
      );
    }

    // Check student status
    if (student.status !== "Active") {
      return NextResponse.json(
        {
          success: false,
          message: "Student account is inactive.",
        },
        { status: 403 }
      );
    }

    // Compare DOB
    const storedDOB = new Date(student.dob).toISOString().split("T")[0];
    const enteredDOB = new Date(dob).toISOString().split("T")[0];

    if (storedDOB !== enteredDOB) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Admission Number or Date of Birth.",
        },
        { status: 401 }
      );
    }

    // Find linked user account
    const user = await User.findOne({
      studentId: student._id,
      role: "STUDENT",
      isActive: true,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Student login is not available.",
        },
        { status: 404 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = await generateToken(user);

    // Response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      role: "STUDENT",
    });

    response.cookies.set({
      name: "des_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Student Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}