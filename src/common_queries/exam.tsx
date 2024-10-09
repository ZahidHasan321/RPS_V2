import secureAxios from "@/lib/interceptor";
import { ExamDetails } from "@/type";

export async function getExamDetails(exam_id: string): Promise<ExamDetails> {
  const data = await secureAxios
    .get(`/exam/${exam_id}`)
    .then((res) => res.data);
  return data;
}
