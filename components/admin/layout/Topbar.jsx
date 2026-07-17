"use client";

import {
  Bell,
  Search,
  UserCircle2,
  LogOut,
  User,
  Settings,
  KeyRound,
  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/lib/logout";

export default function Topbar({ user }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">{today}</p>
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

<DropdownMenu>
  <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100">
    <UserCircle2 size={32} className="text-slate-600" />

    <div className="hidden text-left md:block">
      <p className="font-semibold text-slate-900">
        {user.username}
      </p>

      <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold uppercase text-blue-700">
        {user.role.replace("_", " ")}
      </span>
    </div>

    <ChevronDown size={16} className="text-slate-500" />
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-64">
  <DropdownMenuGroup>
    <DropdownMenuLabel>
      <div className="flex flex-col">
        <span className="font-semibold">{user.username}</span>
        <span className="text-xs text-muted-foreground">
          {user.role.replace("_", " ")}
        </span>
      </div>
    </DropdownMenuLabel>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      My Profile
    </DropdownMenuItem>

    <DropdownMenuItem>
      <KeyRound className="mr-2 h-4 w-4" />
      Change Password
    </DropdownMenuItem>

    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem
      variant="destructive"
      onClick={logout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    </header>
  );
}
