"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: ShieldCheck,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Results",
    href: "/admin/results",
    icon: FileText,
  },
  {
    title: "Admissions",
    href: "/admin/admissions",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          <GraduationCap size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">Dynamic English</h2>

          <p className="text-sm text-slate-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
