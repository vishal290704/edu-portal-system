"use server";

import connectDB from "@/lib/mongodb";
import AcademicSession from "@/models/AcademicSession";
import { revalidatePath } from "next/cache";

export async function createAcademicSession(data) {
  try {
    await connectDB();

    const { name, startDate, endDate } = data;
    if (!name || !startDate || !endDate) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return {
        success: false,
        message: "End date must be after start date.",
      };
    }

    const exists = await AcademicSession.findOne({
      name: name.trim(),
    });

    if (exists) {
      return {
        success: false,
        message: "Academic Session already exists.",
      };
    }

    const session = await AcademicSession.create({
      name: name.trim(),
      startDate,
      endDate,
    });

    revalidatePath("/admin/academic-session");

    return {
      success: true,
      message: "Academic Session created successfully.",
      data: JSON.parse(JSON.stringify(session)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

//GetAcademicSession
export async function getAcademicSessions() {
  try {
    await connectDB();

    const sessions = await AcademicSession.find().sort({
      startDate: -1,
    });

    return JSON.parse(JSON.stringify(sessions));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateAcademicSession(id, data) {
  try {
    await connectDB();

    const { name, startDate, endDate } = data;

    if (!name || !startDate || !endDate) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return {
        success: false,
        message: "End date must be after start date.",
      };
    }

    const duplicate = await AcademicSession.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (duplicate) {
      return {
        success: false,
        message: "Academic Session already exists.",
      };
    }

    await AcademicSession.findByIdAndUpdate(id, {
      name: name.trim(),
      startDate,
      endDate,
    });

    revalidatePath("/admin/academic-session");

    return {
      success: true,
      message: "Academic Session updated.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

//Delete AcademicSession
export async function deleteAcademicSession(id) {
  try {
    await connectDB();

    const session = await AcademicSession.findById(id);

    if (!session) {
      return {
        success: false,
        message: "Academic Session not found.",
      };
    }

    if (session.isActive) {
      return {
        success: false,
        message: "Cannot delete active academic session.",
      };
    }

    await AcademicSession.findByIdAndDelete(id);

    revalidatePath("/admin/academic-session");

    return {
      success: true,
      message: "Academic Session deleted.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
export async function setActiveAcademicSession(id) {
  try {
    await connectDB();

    const session = await AcademicSession.findById(id);

    if (!session) {
      return {
        success: false,
        message: "Academic Session not found.",
      };
    }

    await AcademicSession.updateMany({}, { isActive: false });

    await AcademicSession.findByIdAndUpdate(id, {
      isActive: true,
    });

    revalidatePath("/admin/academic-session");

    return {
      success: true,
      message: "Academic Session activated.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

// ============================
// Get Active Academic Session
// ============================

export async function getActiveAcademicSession() {
  try {
    await connectDB();

    const session = await AcademicSession.findOne({
      isActive: true,
    });

    return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.error(error);
    return null;
  }
}