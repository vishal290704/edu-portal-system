"use client";

import { useState } from "react";
import { createStudent, updateStudent } from "@/app/actions/studentActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentForm({ onCancel, onSuccess, initialData = {} }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    admissionNo: initialData.admissionNo || "",
    rollNo: initialData.rollNo || "",
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    fatherName: initialData.fatherName || "",
    motherName: initialData.motherName || "",
    className: initialData.className || "",
    section: initialData.section || "",
    dob: initialData.dob?.slice(0, 10) || "",
    mobile: initialData.mobile || "",
    address: initialData.address || "",
    gender: initialData.gender || "",
    status: initialData.status || "Active",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let result;

    if (initialData?._id) {
      result = await updateStudent(initialData._id, formData);
    } else {
      result = await createStudent(formData);
    }

    setLoading(false);

    if (result.success) {
      if (onSuccess) onSuccess();
    } else {
      alert(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label>Admission No.</Label>
          <Input
            name="admissionNo"
            value={formData.admissionNo}
            onChange={handleChange}
            placeholder="DES24001"
          />
        </div>

        <div>
          <Label>Roll No.</Label>
          <Input
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="01"
          />
        </div>

        <div>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Father's Name</Label>
          <Input
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Mother's Name</Label>
          <Input
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Class</Label>
          <Input
            name="className"
            value={formData.className}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Section</Label>
          <Input
            name="section"
            value={formData.section}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Male / Female"
          />
        </div>

        <div>
          <Label>Mobile</Label>
          <Input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Input
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label>Address</Label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? initialData?._id
              ? "Updating..."
              : "Saving..."
            : initialData?._id
              ? "Update Student"
              : "Save Student"}
        </Button>
      </div>
    </form>
  );
}
