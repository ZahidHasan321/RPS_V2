import CatmCourseDetails from "@/components/pageComponents/catm/catmCourseDetails";
import FillupCatm from "@/components/pageComponents/catm/fillupCatm";
import ShowCatm from "@/components/pageComponents/catm/showCatm";
import secureAxios from "@/lib/interceptor";
import { CatmItem } from "@/type";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { Suspense } from "react";

const catmQueryOption = ({
  teacher_id,
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
  teacher_id: string;
}) =>
  queryOptions({
    queryKey: ["catm", exam_id, course_id, teacher_id],
    queryFn: () => getCourseDetails(teacher_id, exam_id, course_id),
  });

export const Route = createFileRoute(
  "/_protected/catm/$teacher_id/$exam_id/$course_id",
)({
  component: CatmPage,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(catmQueryOption(params)),
});

function CatmPage() {
  const { teacher_id, exam_id, course_id } = Route.useParams();
  const { data, isLoading, error, isError } = useSuspenseQuery(
    catmQueryOption({ teacher_id, exam_id, course_id }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;
  return (
    <div className="flex flex-col gap-6 p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <CatmCourseDetails data={data} />
        {data.is_catm_submitted === 1 ? (
          <ShowCatm exam_id={exam_id} course_id={course_id} />
        ) : (
          <FillupCatm exam_id={exam_id} course_id={course_id} />
        )}
      </Suspense>
    </div>
  );
}

async function getCourseDetails(
  teacher_id: string,
  exam_id: string,
  course_id: string,
): Promise<CatmItem> {
  const data = await secureAxios
    .get(`/course-teacher/${teacher_id}`, {
      params: {
        exam_id: parseInt(exam_id),
        course_id: parseInt(course_id),
      },
    })
    .then((res) => res.data);

  return data[0];
}
