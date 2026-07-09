export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
  light = false,
}) {
  return (
    <div
      className={`mb-16 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {/* Badge */}

      <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0F4C81]">
        {badge}
      </span>

      {/* Main Heading */}

      <h2
        className={`heading-font mt-6 text-4xl font-extrabold leading-tight md:text-5xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}

        {highlight && (
          <span
            className={`mt-2 block ${
              light ? "text-blue-200" : "text-[#0F4C81]"
            }`}
          >
            {highlight}
          </span>
        )}
      </h2>

      {/* Description */}

      {description && (
        <p
          className={`mt-6 text-lg leading-8 ${
            light ? "text-white/80" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
