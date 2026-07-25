"use client";

import { useEffect, useState } from "react";

import {
  createTeacher,
  updateTeacher,
} from "@/app/actions/teacherActions";

const initialForm = {
  employeeId: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  mobile: "",
  email: "",
  address: "",
  qualification: "",
  specialization: "",
  joiningDate: "",
  experience: "",
};

export default function TeacherForm({
  teacher,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===================================
  // Load Teacher Data During Edit
  // ===================================

  useEffect(() => {
    if (teacher) {
      setForm({
        employeeId: teacher.employeeId || "",
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        gender: teacher.gender || "",
        dob: teacher.dob
          ? teacher.dob.substring(0, 10)
          : "",
        mobile: teacher.mobile || "",
        email: teacher.email || "",
        address: teacher.address || "",
        qualification: teacher.qualification || "",
        specialization: teacher.specialization || "",
        joiningDate: teacher.joiningDate
          ? teacher.joiningDate.substring(0, 10)
          : "",
        experience:
          teacher.experience !== undefined &&
          teacher.experience !== null
            ? teacher.experience
            : "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [teacher]);

  // ===================================
  // Handle Input Change
  // ===================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================
  // Submit
  // ===================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.employeeId.trim()) {
      setError("Employee ID is required.");
      return;
    }

    if (!form.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    try {
      setLoading(true);

      let result;

      if (teacher?._id) {
        result = await updateTeacher(
          teacher._id,
          form,
        );
      } else {
        result = await createTeacher(form);
      }

      if (!result.success) {
        setError(
          result.message ||
            "Failed to save teacher.",
        );
        return;
      }

      setForm(initialForm);

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while saving the teacher.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ================================= */}
      {/* BASIC INFORMATION */}
      {/* ================================= */}

      <div>
        <h3 className="mb-4 font-semibold text-slate-900">
          Basic Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Employee ID
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              placeholder="e.g. TCH001"
              required
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:border-blue-600"
            >
              <option value="">
                Select gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">
                Female
              </option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              First Name
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* CONTACT INFORMATION */}
      {/* ================================= */}

      <div className="border-t pt-5">
        <h3 className="mb-4 font-semibold text-slate-900">
          Contact Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="teacher@example.com"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              placeholder="Teacher address"
              className="w-full resize-none rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* PROFESSIONAL INFORMATION */}
      {/* ================================= */}

      <div className="border-t pt-5">
        <h3 className="mb-4 font-semibold text-slate-900">
          Professional Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Qualification
            </label>

            <input
              type="text"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="e.g. M.Sc, B.Ed"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Joining Date
            </label>

            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Experience (Years)
            </label>

            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              min="0"
              step="1"
              placeholder="e.g. 5"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ACTIONS */}
      {/* ================================= */}

      <div className="flex justify-end gap-3 border-t pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : teacher
              ? "Update Teacher"
              : "Add Teacher"}
        </button>
      </div>
    </form>
  );
}