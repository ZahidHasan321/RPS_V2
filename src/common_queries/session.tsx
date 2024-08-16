import secureAxios from "@/lib/interceptor";
import { ExamDetails } from "@/type";

export async function getExamSessions(
  program: string,
  committee_created?: number,
) {
  const data = await secureAxios
    .get("/exam", {
      params: {
        program_id: program,
        limit: "all",
        committee_created: committee_created,
      },
    })
    .then((res) => res.data);

  const sessions: { label: string; value: string }[] = [];
  const semesters = new Map<string, { value: string; label: string }[]>();

  data.forEach((sessionData: ExamDetails) => {
    const exam_session = sessionData.exam_session;
    const semester = sessionData.semester.toString();

    // Add session if unique
    if (!sessions.find((s) => s.value === exam_session)) {
      sessions.push({ label: exam_session, value: exam_session });
    }

    // Initialize semester list for the session
    if (!semesters.has(exam_session)) {
      semesters.set(exam_session, []);
    }

    const semesterList = semesters.get(exam_session)!;

    // Add semester if not already present
    if (!semesterList.find((s) => s.value === semester)) {
      semesterList.push({ value: semester, label: semester });
    }
  });
  return {
    sessions,
    semesters,
  };
}
