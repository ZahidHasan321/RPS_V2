import { formatOrdinals } from "@/helper/formatOrdinals";
import useAuth from "@/hooks/auth";
import secureAxios from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Progress } from "../../ui/progress";

type Exam = {
  exam_id: number;
  teacher_id: number;
  role: string;
  formation_date: string;
  semester: number;
  exam_name: string;
  exam_session: string;
  total_courses: number;
  completed_courses: number;
};

async function getAssignedExams(teacher_id: number): Promise<Exam[]> {
  const data = await secureAxios
    .get(`/exam-committee/${teacher_id}/assigned-exams`, {
      params: {
        is_result_submitted: 0,
      },
    })
    .then((res) => res.data);

  return data;
}

const Exams = () => {
  const { user } = useAuth();

  const { data: exams, isLoading } = useQuery({
    queryKey: ["assigned_exams", user?.teacher_id],
    queryFn: () => getAssignedExams(user?.teacher_id),
  });

  if (isLoading)
    return (
      <div className="flex flex-row items-start justify-center">
        <Loader2 size={32} />
      </div>
    );

  return (
    <div className="flex flex-row flex-wrap gap-5">
      {exams &&
        exams.map((exam) => (
          <Card
            className="w-96 min-h-52 bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl"
            key={exam.exam_id}
          >
            <Link
              to={"/exam/$exam_id"}
              params={{
                exam_id: exam.exam_id.toString(),
              }}
            >
              <CardHeader>
                <CardTitle>{formatOrdinals(exam.semester)} semester</CardTitle>
                <CardDescription>{exam.exam_name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-bold mr-1">Semester:</span>{" "}
                  {formatOrdinals(exam.semester)}
                </p>
                <p>
                  <span className="font-bold mr-1">Session:</span>{" "}
                  {exam.exam_session}
                </p>

                {/* <p>
                  <span className="font-bold mr-1">Exam Period: </span>
                  {formatDate(new Date(exam.exam_start_date))} -{" "}
                  {formatDate(new Date(exam.exam_end_date))}
                </p> */}
                {/* <p>
                  {" "}
                  <span className="font-bold mr-1">Start date:</span>{" "}
                  {formatDate(new Date(exam.exam_start_date))}
                </p>
                <p>
                  {" "}
                  <span className="font-bold mr-1">End date:</span>{" "}
                  {formatDate(new Date(exam.exam_end_date))}
                </p> */}
                <p>
                  <span className="font-bold mr-1">Role:</span> {exam.role}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Progress
                  value={exam.completed_courses}
                  max={exam.total_courses}
                />
                <p>
                  {exam.completed_courses}/{exam.total_courses}
                </p>
              </CardFooter>
            </Link>
          </Card>
        ))}
    </div>
  );
};

export default Exams;
