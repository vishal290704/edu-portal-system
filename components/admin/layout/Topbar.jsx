"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-200 py-2 pl-10 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        <button className="rounded-xl border p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-100">
          <UserCircle2 size={28} />
          <span className="hidden font-medium md:block">
            Admin
          </span>
        </button>

      </div>

    </header>
  );
}