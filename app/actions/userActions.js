"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { requireRole } from "@/lib/authorize";
import { createUserSchema, updateUserSchema } from "@/lib/validations/user";

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
      username: formData.get("username")?.trim().toLowerCase(),
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

//Update User
export async function updateUser(formData) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Only SUPER_ADMIN can update users
    requireRole(currentUser, ["SUPER_ADMIN"]);

    const validation = updateUserSchema.safeParse({
      id: formData.get("id"),
      username: formData.get("username")?.trim().toLowerCase(),
      role: formData.get("role"),
    });

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }

    const { id, username, role } = validation.data;

    // Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Prevent duplicate usernames
    const existingUser = await User.findOne({
      username,
      _id: { $ne: id },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Username already exists.",
      };
    }

    user.username = username;
    user.role = role;

    await user.save();

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User updated successfully.",
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error("Update User Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}

//Delete User
export async function deleteUser(id) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    requireRole(currentUser, ["SUPER_ADMIN"]);

    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    if (currentUser.id === id) {
      return {
        success: false,
        message: "You cannot delete your own account.",
      };
    }

    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    await User.findByIdAndDelete(id);

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message || "Failed to delete user.",
    };
  }
}

export async function getUsers() {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Only SUPER_ADMIN can view users
    requireRole(currentUser, ["SUPER_ADMIN"]);

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
    };
  } catch (error) {
    console.error("Get Users Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}

export async function toggleUserStatus(id) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    requireRole(currentUser, ["SUPER_ADMIN"]);

    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    if (currentUser.id === id) {
      return {
        success: false,
        message: "You cannot deactivate your own account.",
      };
    }

    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    user.isActive = !user.isActive;

    await user.save();

    revalidatePath("/admin/users");

    return {
      success: true,
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message || "Failed to update user status.",
    };
  }
}


// Reset User Password
export async function resetUserPassword(formData) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Only SUPER_ADMIN can reset passwords
    requireRole(currentUser, ["SUPER_ADMIN"]);

    const id = formData.get("id");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters.",
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    user.password = await bcrypt.hash(password, 10);
    user.mustChangePassword = true;

    await user.save();

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Password reset successfully.",
    };
  } catch (error) {
    console.error("Reset Password Error:", error);

    return {
      success: false,
      message: error.message || "Failed to reset password.",
    };
  }
}