import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";

export default function TeacherLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TeacherHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}