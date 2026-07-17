import { cookies } from "next/headers";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

const COOKIE_NAME = "des_token";

/**
 * Returns the authenticated user or null.
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const payload = await verifyToken(token);

    if (!payload) return null;

    await connectDB();

  const user = await User.findById(payload.id)
  .select("-password")
  .lean();

if (!user || !user.isActive) {
  return null;
}

return {
  id: user._id.toString(),
  username: user.username,
  role: user.role,
  mustChangePassword: user.mustChangePassword,
  isActive: user.isActive,
  lastLogin: user.lastLogin,
};
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
}