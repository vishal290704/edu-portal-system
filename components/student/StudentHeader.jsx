"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserCircle2 } from "lucide-react";

import { getCurrentStudent } from "@/app/actions/studentActions";

export default function StudentHeader() {
  const router = useRouter();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      const res = await getCurrentStudent();

      if (res.success) {
        setStudent(res.student);
      }
    }

    loadStudent();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-xl font-semibold">
          Student Portal
        </h1>

        <p className="text-sm text-gray-500">
          Welcome Back
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-lg border px-4 py-2">
          <UserCircle2 className="h-9 w-9 text-blue-600" />

          <div>
            <p className="font-medium">
              {student
                ? `${student.firstName} ${student.lastName}`
                : "Loading..."}
            </p>

            <p className="text-xs text-gray-500">
              {student?.admissionNumber}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}