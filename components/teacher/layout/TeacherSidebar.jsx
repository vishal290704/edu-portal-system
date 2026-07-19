"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  FileText,
  User,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    href: "/teacher/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: Users,
  },
  {
    title: "Results",
    href: "/teacher/results",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/teacher/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/teacher/settings",
    icon: Settings,
  },
];

export default function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="rounded-xl bg-primary p-2 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-semibold leading-none">
            Dynamic English
          </h2>

          <p className="text-xs text-muted-foreground">
            Teacher Portal
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}