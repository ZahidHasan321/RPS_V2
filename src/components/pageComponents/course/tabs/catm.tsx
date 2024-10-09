import secureAxios from "@/lib/interceptor";
import { courseTeacherType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import CourseTeacherDetails from "../../catm/courseTeacherDetails";
import ShowCatm from "../../catm/showCatm";

const CatmTab = ({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courseTeacherDetails", exam_id, course_id],
    queryFn: () => getCourseTeacher(exam_id, course_id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="flex flex-col gap-2 px-2 mb-2 items-center">
      <CourseTeacherDetails data={data} className="w-[60%]" />
      {data?.is_catm_submitted === 1 ? (
        <ShowCatm exam_id={exam_id} course_id={course_id} />
      ) : null}
    </div>
  );
};

function getCourseTeacher(
  exam_id: string,
  course_id: string,
): Promise<courseTeacherType> {
  return secureAxios
    .get(`/course-teacher/${exam_id}/${course_id}`)
    .then((res) => res.data);
}

export default CatmTab;
