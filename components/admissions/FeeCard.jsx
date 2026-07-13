import { motion } from "framer-motion";
import {
  GraduationCap,
  BadgeIndianRupee,
  ShieldCheck,
} from "lucide-react";

import FeeRow from "./FeeRow";

export default function FeeCard({ fee }) {
  return (
    <motion.div
      key={fee.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-700 px-8 py-10 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <GraduationCap size={32} />
          </div>

          <p className="text-sm uppercase tracking-[0.35em] text-blue-100">
            {fee.badge}
          </p>

          <h3 className="mt-2 text-4xl font-extrabold">
            {fee.className}
          </h3>
        </div>
      </div>

      {/* Monthly Fee */}
      <div className="border-b border-slate-200 bg-slate-50 px-8 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Monthly Tuition Fee
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <BadgeIndianRupee className="text-primary" size={34} />

          <span className="text-6xl font-black tracking-tight text-slate-900">
            {fee.monthly.replace("₹", "")}
          </span>
        </div>

        <p className="mt-2 text-slate-500">
          Per Month
        </p>
      </div>

      {/* Charges */}
      <div className="space-y-4 p-8">
        <FeeRow
          label="Registration Fee"
          value={fee.registration}
        />

        <FeeRow
          label="Development Fee"
          value={fee.development}
        />

        <FeeRow
          label="Uniform Fee"
          value={fee.uniform}
        />

        <FeeRow
          label="ID Card & Diary"
          value={fee.idCardDiary}
        />

        <FeeRow
          label="Examination Fee"
          value={fee.examination}
          highlight
        />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-600" />

          <div>
            <p className="font-semibold text-slate-900">
              Transparent Fee Policy
            </p>

            <p className="text-sm text-slate-600">
              No hidden charges. Fees are subject to school policy.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}