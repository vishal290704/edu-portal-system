"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/student",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: User,
  },
  {
    title: "Results",
    href: "/student/results",
    icon: GraduationCap,
  },
  {
    title: "Report Card",
    href: "/student/report-card",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/student/settings",
    icon: Settings,
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Student Portal
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/student" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}