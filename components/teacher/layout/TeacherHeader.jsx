"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentTeacher } from "@/app/actions/teacherActions";

export default function TeacherHeader() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    async function loadTeacher() {
      try {
        const result = await getCurrentTeacher();

        if (result.success) {
          setTeacher(result.teacher);
        }
      } catch (error) {
        console.error("Load Teacher Error:", error);
      }
    }

    loadTeacher();
  }, []);

  const teacherName = teacher
  ? `${teacher.firstName} ${teacher.lastName || ""}`.trim()
  : "Loading...";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left */}

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-lg font-semibold">
            Teacher Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Notification */}

        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Teacher Profile */}

        <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
          <UserCircle2 className="h-8 w-8 text-primary" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">
              {teacherName}
            </p>

            <p className="text-xs text-muted-foreground">
              Teacher
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}