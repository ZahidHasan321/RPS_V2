import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

type CourseData = {
  course_id: number;
  academic_session_id: number;
  result_status: "unassigned" | "Pending" | "Completed";
  result_submit_date: string;
  is_catm_submitted: number;
  catm_submit_date: string | null;
  set_a_decoded: number;
  set_b_decoded: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
};

async function getCourses(exam_id: string): Promise<CourseData[]> {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + `/course-semester/${exam_id}`)
    .then((res) => res.data);

  return data;
}

const Course_List = ({ exam_id }: { exam_id: string }) => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["exam", exam_id],
    queryFn: () => getCourses(exam_id),
  });

  if (isLoading)
    return (
      <div className="h-52 flex flex-row items-start justify-center">
        <Loader2 size={32} />
      </div>
    );
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full text-3xl">Course List</div>
      {courses &&
        courses.map((course, idx) => (
          <Card
            key={idx}
            className="w-96 min-h-52 bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl"
          >
            <Link
              to={"/exam/$exam_id/$course_id"}
              params={{
                exam_id: exam_id,
                course_id: course.course_id.toString(),
              }}
            >
              <CardHeader>
                <CardTitle>{course.course_title}</CardTitle>
                <CardDescription>{course.course_code}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {" "}
                  <span className="font-bold mr-1">Type:</span>
                  {course.course_type}
                </p>

                <p>
                  {" "}
                  <span className="font-bold mr-1">Credit:</span>
                  {course.credit}
                </p>

                <p>
                  <span className="font-bold mr-1">Result Status:</span>{" "}
                  {course.result_status}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
    </div>
  );
};

export default Course_List;
