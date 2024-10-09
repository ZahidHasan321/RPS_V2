import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CatmItem } from "@/type";

export default function CatmCourseDetails({ data }: { data: CatmItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.course_title}</CardTitle>
        <CardDescription>{data.course_code}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {" "}
          <span className="font-bold">Program:</span> {data.program_name}
        </p>
        <p>
          <span className="font-bold">Semester:</span> {data.semester}
        </p>
        <p>
          <span className="font-bold mr-1">Credit:</span>
          {data.credit}
        </p>
        <p>
          <span className="font-bold mr-1">Course Type:</span>
          {data.course_type}
        </p>
      </CardContent>
    </Card>
  );
}
