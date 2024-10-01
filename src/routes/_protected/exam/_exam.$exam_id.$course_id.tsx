import CourseDetalis from "@/components/pageComponents/course/courseDetails";
import CourseTabs from "@/components/pageComponents/course/courseTabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/exam/_exam/$exam_id/$course_id",
)({
  validateSearch: (search): {courseType: string} => {
    return {
      courseType: search.courseType as string
    }
  }, 
  component: CoursePage,
});

function CoursePage() {
  const { exam_id, course_id } = Route.useParams();
  const { courseType } = Route.useSearch();

  return (
    <div className="flex flex-col gap-6 p-10">
      <CourseDetalis course_id={course_id} exam_id={exam_id} />
      <CourseTabs courseType={courseType} exam_id={exam_id} course_id={course_id} />
    </div>
  );
}
