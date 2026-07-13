"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ClassSelector({
  feeStructure,
  selectedClass,
  setSelectedClass,
}) {
  return (
    <div className="mb-12">
      <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
        {feeStructure.map((item) => {
          const active = selectedClass.id === item.id;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedClass(item)}
              className={cn(
                "relative overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                active
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              {active && (
                <motion.div
                  layoutId="activeClass"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              {item.className}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}