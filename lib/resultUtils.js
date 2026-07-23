export function calculatePercentage(obtainedMarks, maximumMarks) {
  if (!maximumMarks) return 0;

  return Number(
    ((obtainedMarks / maximumMarks) * 100).toFixed(2)
  );
}

export function calculateGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";

  return "F";
}

export function calculatePassFail(
  obtainedMarks,
  maximumMarks,
  passingPercentage = 33
) {
  const percentage = calculatePercentage(
    obtainedMarks,
    maximumMarks
  );

  return percentage >= passingPercentage
    ? "PASS"
    : "FAIL";
}