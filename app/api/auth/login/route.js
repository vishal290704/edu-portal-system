import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required.",
        },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({
      username: username.trim(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    // Check account status
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = generateToken(user);

    // Response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    });

    // Store JWT in HttpOnly Cookie
    response.cookies.set({
      name: "des_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 Days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}