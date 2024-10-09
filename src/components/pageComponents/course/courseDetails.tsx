import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import secureAxios from "@/lib/interceptor";
import { CourseData } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
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

  const color = {
    Unassigned: "text-red-500",
    Pending: "text-yellow-500",
    Completed: "text-green-500",
  };

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
        <CardDescription className="text-lg">
          {course?.course_code}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col text-md">
        <p>
          <span className="font-bold mr-1">Credit:</span>
          {course?.credit}
        </p>
        <p>
          <span className="font-bold mr-1">Course Type:</span>
          {course?.course_type}
        </p>
        {course.course_type === "Theory" ? (
          <>
            <p>
              {" "}
              <span className="font-bold mr-1">First Examiner:</span>{" "}
              {course.set_A_submitted ? (
                <span className="text-green-500">Submitted</span>
              ) : (
                <span className="text-red-500">Pending</span>
              )}
            </p>
            <p>
              {" "}
              <span className="font-bold mr-1">Second Examiner:</span>
              {course.set_B_submitted ? (
                <span className="text-green-500">Submitted</span>
              ) : (
                <span className="text-red-500">Pending</span>
              )}
            </p>
          </>
        ) : (
          <p>
            <span className="font-bold mr-1">Examiner Submitted:</span>
            {course?.set_A_submitted ? (
              <span className="text-green-500">Submitted</span>
            ) : (
              <span className="text-red-500">Pending</span>
            )}
          </p>
        )}
        <p>
          <span className="font-bold mr-1">Catm status:</span>
          {course.is_catm_submitted ? (
            <span className="text-green-500">Submitted</span>
          ) : (
            <span className="text-red-500">Pending</span>
          )}
        </p>
        <p>
          <span className="font-bold mr-1">Result status:</span>
          <span className={color[course?.result_status]}>
            {course?.result_status}
          </span>
        </p>
        <Link
          className="mt-4"
          to="/exam/pdf/summation/$exam_id/$course_id"
          params={{
            exam_id: exam_id,
            course_id: course_id,
          }}
          target="_blank"
        >
          <Button className="bg-blue-500 hover:bg-blue-600">
            Summation sheet
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

async function getCourseDetails(
  exam_id: string,
  course_id: string,
): Promise<CourseData> {
  const data = await secureAxios
    .get(`/course-semester/${exam_id}`, {
      params: {
        course_id,
      },
    })
    .then((res) => res.data);

  return data[0];
}

export default CourseDetalis;
