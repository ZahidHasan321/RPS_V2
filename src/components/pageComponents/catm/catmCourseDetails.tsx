import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CatmItem } from "@/type";

export default function CatmCourseDetails({ data }: { data: CatmItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.course_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold mr-1">Course Code:</span>
          {data.course_code}
        </p>
        <p>
          <span className="font-bold mr-1">Course Title:</span>
          {data.course_title}
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
