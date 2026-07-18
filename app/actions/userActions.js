"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { requireRole } from "@/lib/authorize";
import { createUserSchema } from "@/lib/validations/user";

export async function createUser(formData) {
  try {
    await connectDB();

    // Logged in user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Only SUPER_ADMIN can create users
    requireRole(currentUser, ["SUPER_ADMIN"]);

    const validation = createUserSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role"),
    });

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }

    const { username, password, role } = validation.data;

    // Check duplicate username
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return {
        success: false,
        message: "Username already exists.",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
      mustChangePassword: true,
      isActive: true,
      createdBy: currentUser.id,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User created successfully.",
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error("Create User Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}
