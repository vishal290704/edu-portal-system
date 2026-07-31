export default function StudentResultCard({
  title,
  value,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${colors[color]}`}
    >
      <p className="text-sm font-medium opacity-80">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value ?? "-"}
      </h2>
    </div>
  );
}