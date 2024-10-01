import BasicTable from "@/components/basicTable/basicTable";
import AssignExaminer from "@/components/modals/assignExaminer";
import { formatDate } from "@/helper/dateFormatter";
import secureAxios from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";

const column: ColumnDef<totalPaperMarkListType>[] = [
  {
    header: "Paper Code",
    accessorKey: "paper_code",
    cell: (info) => info.getValue(),
  },
  {
    header: "Total Mark",
    accessorKey: "total_mark",
    cell: (info) => info.getValue(),
  },
];

const SetTab = ({
  exam_id,
  course_id,
  set,
}: {
  exam_id: string;
  course_id: string;
  set: string;
}) => {
  const {
    data: examinerData,
    isLoading: isLoadingExaminer,
    error: examinerError,
    isError: isErrorExaminer,
  } = useQuery({
    queryKey: ["examiner", set, exam_id, course_id],
    queryFn: () => getExaminerData(exam_id, course_id, set),
  });

  const {
    data: SetAList,
    error,
    isError,
  } = useQuery({
    queryKey: ["SetTab", set, exam_id, course_id, examinerData?.is_submitted],
    queryFn: () => getSetList(exam_id, course_id, set),
    enabled: examinerData?.is_submitted === 1,
  });

  if (isError && error instanceof AxiosError)
    return <div>{error.response?.data?.message}</div>;

  return (
    <div className="flex flex-col gap-2 px-2 mb-2">
      <ExaminerSection
        data={examinerData}
        isError={isErrorExaminer}
        error={examinerError}
        isLoading={isLoadingExaminer}
        course_id={course_id}
        exam_id={exam_id}
        set={set}
      />
      <BasicTable
        className="w-[60%]"
        data={SetAList?.totalPaperMarkList || []}
        columns={column}
      />
    </div>
  );
};

function ExaminerSection({
  data,
  isLoading,
  error,
  isError,
  exam_id,
  course_id,
  set,
}: {
  data?: ExaminerType;
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  exam_id: string;
  course_id: string;
  set: string;
}) {
  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof AxiosError)
    return <div>{error.response?.data?.message}</div>;

  if (data === undefined) return <div>No data found</div>;

  if (data.examiner_assigned === false) {
    return (
      <div className="flex flex-col gap-2 border p-4 items-start">
        <p className="text-red-500">No Examiner Assinged</p>
        <AssignExaminer exam_id={exam_id} course_id={course_id} set={set} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 border p-4 items-start">
      <p>
        <span className="font-bold mr-1">Name:</span>
        {data.designation} {data.first_name} {data.last_name}
      </p>
      <p>
        <span className="font-bold mr-1">Assigned Date:</span>
        {formatDate(new Date(data.assigned_date))}
      </p>

      {data.is_submitted === 1 ? (
        <p>
          <span className="font-bold mr-1">Submitted Date:</span>
          {formatDate(new Date(data.submit_date))}
        </p>
      ) : (
        <p className="text-red-500">Not Submitted</p>
      )}
    </div>
  );
}

type totalPaperMarkListType = {
  paper_code: number;
  total_mark: number;
};

type SetList = {
  exam_id: string;
  course_id: string;
  set: string;
  totalPaperMarkList: totalPaperMarkListType[];
};

async function getSetList(
  exam_id: string,
  course_id: string,
  set: string,
): Promise<SetList> {
  return await secureAxios
    .get(`/total-papermark/${exam_id}/${course_id}/${set}`)
    .then((res) => res.data);
}

type ExaminerType = {
  assigned_date: string;
  first_name: string;
  last_name: string;
  is_submitted: number;
  designation: string;
  submit_date: string;
  examiner_assigned?: boolean;
};

async function getExaminerData(
  exam_id: string,
  course_id: string,
  set: string,
): Promise<ExaminerType> {
  return await secureAxios
    .get(`/examiner/${exam_id}/${course_id}/${set}`)
    .then((res) => res.data);
}

export default SetTab;
