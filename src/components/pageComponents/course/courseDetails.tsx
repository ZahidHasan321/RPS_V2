import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CourseDetalis = ({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) => {
  const { data: course, isLoading } = useQuery({
    queryKey: ["courseDetails", exam_id, course_id],
    queryFn: () => getCourseDetails(exam_id, course_id),
  });

  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course information</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 size={32} />
        </CardContent>
      </Card>
    );

  if (!course)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No Data Found</p>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course?.course_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold mr-1">Course Code:</span>
          {course?.course_code}
        </p>
        <p>
          <span className="font-bold mr-1">Course Title:</span>
          {course?.course_title}
        </p>
        <p>
          <span className="font-bold mr-1">Credit:</span>
          {course?.credit}
        </p>
        <p>
          <span className="font-bold mr-1">Course Type:</span>
          {course?.course_type}
        </p>
        <p>
          <span className="font-bold mr-1">Result status:</span>
          {course?.result_status}
        </p>
      </CardContent>
    </Card>
  );
};

type CourseData = {
  course_id: number;
  academic_session_id: number;
  result_status: "unassigned" | "Pending" | "Completed";
  result_submit_date: string;
  is_catm_submitted: number;
  catm_submit_date: string | null;
  is_decoded: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
};

async function getCourseDetails(
  exam_id: string,
  course_id: string,
): Promise<CourseData> {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + `/course-semester/${exam_id}`, {
      params: {
        course_id,
      },
    })
    .then((res) => res.data);

  return data[0];
}

export default CourseDetalis;
