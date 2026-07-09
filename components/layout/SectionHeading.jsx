export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
}) {
  return (
    <div
      className={`mb-16 max-w-3xl ${
        align === "center"
          ? "mx-auto text-center"
          : "text-left"
      }`}
    >
      {/* Badge */}

      <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0F4C81]">
        {badge}
      </span>

      {/* Main Heading */}

      <h2 className="heading-font mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        {title}

        {highlight && (
          <span className="mt-2 block text-[#0F4C81]">
            {highlight}
          </span>
        )}
      </h2>

      {/* Description */}

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}