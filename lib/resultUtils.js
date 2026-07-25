// ===================================
// Calculate Percentage
// ===================================

export function calculatePercentage(
  obtainedMarks,
  maximumMarks
) {
  if (!maximumMarks || maximumMarks <= 0) {
    return 0;
  }

  const percentage =
    (Number(obtainedMarks) / Number(maximumMarks)) * 100;

  return Number(percentage.toFixed(2));
}


// ===================================
// Calculate Grade
// Used for both subject and overall grade
// ===================================

export function calculateGrade(percentage) {
  const value = Number(percentage);

  if (value >= 91) return "A+";
  if (value >= 81) return "A";
  if (value >= 71) return "B+";
  if (value >= 61) return "B";
  if (value >= 51) return "C+";
  if (value >= 41) return "C";
  if (value >= 33) return "D";

  return "F";
}


// ===================================
// Calculate Overall Pass / Fail
// IMPORTANT:
// Result depends only on TOTAL percentage.
// Individual subject failure does not make
// the overall result FAIL.
// ===================================

export function calculatePassFail(
  totalObtained,
  totalMaximum
) {
  const percentage = calculatePercentage(
    totalObtained,
    totalMaximum
  );

  return percentage >= 33 ? "PASS" : "FAIL";
}


// ===================================
// Calculate Subject Result
// ===================================

export function calculateSubjectResult(
  obtainedMarks,
  maximumMarks
) {
  const percentage = calculatePercentage(
    obtainedMarks,
    maximumMarks
  );

  const grade = calculateGrade(percentage);

  return {
    percentage,
    grade,
  };
}

// ===================================
// Calculate Subject Remark
// ===================================

export function calculateRemark(percentage) {
  const value = Number(percentage);

  if (value >= 91) return "Outstanding";
  if (value >= 81) return "Excellent";
  if (value >= 71) return "Very Good";
  if (value >= 61) return "Good";
  if (value >= 51) return "Satisfactory";
  if (value >= 41) return "Fair";
  if (value >= 33) return "Needs Improvement";

  return "Needs Attention";
}