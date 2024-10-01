import { getExamDetails } from "@/common_queries/exam";
import { formatDate } from "@/helper/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
        {examDetails.is_result_completed ? (
          <Link
            to="/exam/pdf/tabulation/$exam_id"
            params={{ exam_id: exam_id }}
            target="_blank"
          >
            <Button>Tabulation sheet</Button>
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Exam_Details;
