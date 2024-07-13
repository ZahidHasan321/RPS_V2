import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaperData } from "@/type";

export default function ExamSection({ data }: { data: PaperData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.course_title}</CardTitle>
        <CardDescription>{data.course_code}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Exam name:</span> {data.exam_name}
        </p>
        <p>
          <span className="font-bold">Semester:</span> {data.semester}
        </p>
        <p>
          <span className="font-bold">Submit status:</span>{" "}
          {data.is_submitted ? (
            <span className="text-green-500">Submitted</span>
          ) : (
            <span className="text-red-500">Pending</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
