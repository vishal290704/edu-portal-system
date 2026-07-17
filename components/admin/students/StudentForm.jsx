"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentForm({
  onSubmit,
  onCancel,
  initialData = {},
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="admissionNo">Admission No.</Label>
          <Input
            id="admissionNo"
            defaultValue={initialData.admissionNo}
            placeholder="DES24001"
          />
        </div>

        <div>
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            defaultValue={initialData.name}
            placeholder="Enter student name"
          />
        </div>

        <div>
          <Label htmlFor="fatherName">Father's Name</Label>
          <Input
            id="fatherName"
            defaultValue={initialData.fatherName}
            placeholder="Enter father's name"
          />
        </div>

        <div>
          <Label htmlFor="motherName">Mother's Name</Label>
          <Input
            id="motherName"
            defaultValue={initialData.motherName}
            placeholder="Enter mother's name"
          />
        </div>

        <div>
          <Label htmlFor="class">Class</Label>
          <Input
            id="class"
            defaultValue={initialData.class}
            placeholder="Class"
          />
        </div>

        <div>
          <Label htmlFor="section">Section</Label>
          <Input
            id="section"
            defaultValue={initialData.section}
            placeholder="Section"
          />
        </div>

        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            defaultValue={initialData.dob}
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            defaultValue={initialData.mobile}
            placeholder="9876543210"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          defaultValue={initialData.address}
          placeholder="Enter address"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          Save Student
        </Button>
      </div>
    </form>
  );
}