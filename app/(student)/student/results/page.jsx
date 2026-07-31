import StudentResults from "@/components/student/StudentResults";
import { getActiveSessionExams } from "@/app/actions/markHelperActions";

export const metadata = {
  title: "My Results",
};

export default async function StudentResultsPage() {
  const exams = await getActiveSessionExams();

  return <StudentResults exams={exams} />;
}