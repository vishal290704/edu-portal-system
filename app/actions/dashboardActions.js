"use server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function getDashboardData() {
  try {
    await connectDB();

    const [
      totalStudents,
      boys,
      girls,
      activeStudents,
      recentStudents,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ gender: "Male" }),
      Student.countDocuments({ gender: "Female" }),
      Student.countDocuments({ status: "Active" }),
      Student.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "firstName lastName admissionNo className section status"
        )
        .lean(),
    ]);

    return {
      success: true,
      stats: {
        totalStudents,
        boys,
        girls,
        activeStudents,
      },
      recentStudents: JSON.parse(JSON.stringify(recentStudents)),
    };
  } catch (error) {
    console.error("Dashboard Error:", error);

    return {
      success: false,
      stats: {
        totalStudents: 0,
        boys: 0,
        girls: 0,
        activeStudents: 0,
      },
      recentStudents: [],
    };
  }
}