import { ExamDetails } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { formatDate } from "@/helper/dateFormatter";
import { Loader2 } from "lucide-react";
import { getExamDetails } from "@/common_queries/exam";

const Exam_Details = ({ exam_id }: { exam_id: string }) => {
  const { data: examDetails, isLoading } = useQuery({
    queryKey: ["examDetails", exam_id],
    queryFn: () => getExamDetails(exam_id),
  });

  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 size={32} />
        </CardContent>
      </Card>
    );

  if (!examDetails)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No Data Found</p>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold mr-1">Exam Name:</span>
          {examDetails.exam_name}
        </p>
        <p>
          <span className="font-bold mr-1">Exam Centre:</span>
          {examDetails.exam_centre}
        </p>
        <p>
          <span className="font-bold mr-1">Exam Session:</span>
          {examDetails.exam_session}
        </p>
        <p>
          <span className="font-bold mr-1">Start Date:</span>
          {formatDate(new Date(examDetails.exam_start_date))}
        </p>
        <p>
          <span className="font-bold mr-1">End Date:</span>
          {formatDate(new Date(examDetails.exam_end_date))}
        </p>

        <p>
          <span className="font-bold mr-1">Result Status:</span>
          {examDetails.is_result_completed ? (
            <span className="text-green-500">Completed</span>
          ) : (
            <span className="text-red-500">Pending</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default Exam_Details;
