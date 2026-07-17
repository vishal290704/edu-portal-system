import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    // Check if Super Admin already exists
    const existingAdmin = await User.findOne({
      role: "SUPER_ADMIN",
    });


    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Super Admin already exists.",
        },
        { status: 403 },
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username: username.trim(),
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
      mustChangePassword: false,
      lastLogin: null,
    });


    return NextResponse.json({
      success: true,
      message: "Super Admin created successfully.",
    });
  } catch (error) {
    console.error("Setup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
}
