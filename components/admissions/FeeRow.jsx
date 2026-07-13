import { ChevronRight } from "lucide-react";

export default function FeeRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div
      className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300
      ${
        highlight
          ? "border-primary/20 bg-primary/5"
          : "border-slate-200 bg-white hover:border-primary/20 hover:bg-slate-50"
      }`}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300
          ${
            highlight
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white"
          }`}
        >
          <ChevronRight size={16} />
        </div>

        <span className="font-medium text-slate-700">
          {label}
        </span>
      </div>

      {/* Right Side */}
      <span
        className={`text-lg font-bold tracking-tight
        ${
          highlight
            ? "text-primary"
            : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}