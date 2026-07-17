"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children, user }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar user={user} />

      <div className="ml-64 min-h-screen">
        <Topbar user={user} />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}