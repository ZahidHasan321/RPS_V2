import Course_List from "@/components/pageComponents/exam/course_list";
import Exam_Details from "@/components/pageComponents/exam/exam_details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exam/$exam_id")({
  component: Home,
});

function Home() {
  const { exam_id } = Route.useParams();

  return (
    <div>
      <div className="flex flex-col gap-10 p-10">
        <Exam_Details exam_id={exam_id} />
        <Course_List exam_id={exam_id} />
      </div>
    </div>
  );
}
