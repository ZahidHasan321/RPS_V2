import { formatOrdinals } from "@/helper/formatOrdinals";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Link } from "@tanstack/react-router";
import { formatDate } from "@/helper/dateFormatter";
const exams = [
  {
    exam_id: 1,
    exam_session: "2022-23",
    semester: 1,
    program_name: "Bachelor of Computer Science",
    program_abbr: "BSC",
    start_date: new Date("01-01-2024"),
    end_date: new Date("01-02-2024"),
    total_courses: 10,
    result_completed: 8,
  },
  {
    exam_id: 2,
    exam_session: "2022-23",
    semester: 2,
    program_name: "Bachelor of Computer Science",
    program_abbr: "BSC",
    start_date: new Date("01-01-2024"),
    end_date: new Date("01-02-2024"),
    total_courses: 11,
    result_completed: 6,
  },
  {
    exam_id: 3,
    exam_session: "2019-20",
    semester: 6,
    program_name: "Bachelor of Computer Science",
    program_abbr: "BSC",
    start_date: new Date("01-01-2024"),
    end_date: new Date("01-02-2024"),
    total_courses: 10,
    result_completed: 2,
  },
];

const Exams = () => {
  return (
    <div className="flex flex-row flex-wrap gap-5">
      {exams.map((exam) => (
        <Card
          onClick={() => {
            console.log(exam.exam_id);
          }}
          className="w-96 h-fit bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl"
          key={exam.exam_id}
        >
          <Link
            to={"/exam/$session/$semester"}
            params={{
              session: exam.exam_session,
              semester: exam.semester.toString(),
            }}
          >
            <CardHeader>
              <CardTitle>{formatOrdinals(exam.semester)} semester</CardTitle>
              <CardDescription>{exam.program_name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-bold mr-1">Session:</span>{" "}
                {exam.exam_session}
              </p>
              <p>
                <span className="font-bold mr-1">Exam Period: </span>
                {formatDate(exam.start_date)} - {formatDate(exam.end_date)}
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Progress
                value={exam.result_completed}
                max={exam.total_courses}
              />
              <p>
                {exam.result_completed}/{exam.total_courses}
              </p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Exams;
