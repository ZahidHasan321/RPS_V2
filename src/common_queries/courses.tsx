import secureAxios from "@/lib/interceptor";
import { CourseData } from "@/type";

export async function getCourses(exam_id: string): Promise<CourseData[]> {
  const data = await secureAxios
    .get(`/course-semester/${exam_id}`)
    .then((res) => res.data);

  return data;
}
