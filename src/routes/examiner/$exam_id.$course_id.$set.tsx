import ExamSection from "@/components/pageComponents/examiner/examSection";
import MarkFillupTable from "@/components/pageComponents/examiner/markFillupTable";
import MarkShowTable from "@/components/pageComponents/examiner/markShowTable";
import { PaperData } from "@/type";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { Suspense } from "react";

const ExamPaperQuery = ({
  exam_id,
  course_id,
  set,
}: {
  exam_id: string;
  course_id: string;
  set: string;
}) =>
  queryOptions({
    queryKey: ["Paper", exam_id, course_id, set],
    queryFn: () => getPaper(exam_id, course_id, set),
  });

export const Route = createFileRoute("/examiner/$exam_id/$course_id/$set")({
  component: Home,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(ExamPaperQuery(params)),
});

function Home() {
  const { exam_id, course_id, set } = Route.useParams();
  const { data, isLoading, error, isError } = useSuspenseQuery(
    ExamPaperQuery({ exam_id, course_id, set }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;
  if (!data) return <div>No Data Found</div>;

  return (
    <div className="flex flex-col p-10 gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ExamSection data={data} />
        {data.is_submitted === 1 ? (
          <MarkShowTable exam_id={exam_id} course_id={course_id} set={set} />
        ) : (
          <MarkFillupTable exam_id={exam_id} course_id={course_id} set={set} />
        )}
      </Suspense>
    </div>
  );
}

async function getPaper(
  exam_id: string,
  course_id: string,
  set: string,
): Promise<PaperData | undefined> {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + `/examiner`, {
      params: {
        exam_id: exam_id,
        course_id: course_id,
        set: set,
      },
    })
    .then((res) => res.data);

  return data[0];
}
