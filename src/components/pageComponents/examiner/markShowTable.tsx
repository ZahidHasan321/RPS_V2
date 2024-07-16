import BasicTable from "@/components/basicTable/basicTable";
import { PaperTableColumns } from "@/constants/paperTableColumn";
import { PaperMark } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { promises } from "dns";

export default function MarkShowTable({
  exam_id,
  course_id,
  set,
}: {
  exam_id: string;
  course_id: string;
  set: string;
}) {
  const { data } = useQuery({
    queryKey: ["MarkShowTable", exam_id, course_id, set],
    queryFn: () => getMarkList(exam_id, course_id, set),
  });

  return (
    <div>
      <BasicTable data={data || []} columns={PaperTableColumns} />
    </div>
  );
}

type MarkListItem = {
  paper_code: number;
  q_no:
    | "q1"
    | "q2"
    | "q3"
    | "q4"
    | "q5"
    | "q6"
    | "q7"
    | "q8"
    | "q9"
    | "q10"
    | "q11"
    | "q12"
    | "q13"
    | "q14"
    | "q15";
  q_mark: number;
};

async function getMarkList(
  exam_id: string,
  course_id: string,
  set: string,
): Promise<PaperMark[]> {
  const data: MarkListItem[] = await axios
    .get(import.meta.env.VITE_API_URL + "/question-mark", {
      params: {
        exam_id: exam_id,
        course_id: course_id,
        set: set,
      },
    })
    .then((res) => res.data);

  const processedData: PaperMark[] = [];

  data.map((item) => {
    const index = processedData.findIndex(
      (paper) => paper.paper_code === item.paper_code,
    );

    if (index === -1) {
      processedData.push({
        paper_code: item.paper_code,
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
        q8: null,
        q9: null,
        q10: null,
        q11: null,
        q12: null,
        q13: null,
        q14: null,
        q15: null,
      });

      processedData[processedData.length - 1][item.q_no] = item.q_mark;
    } else {
      processedData[index][item.q_no] = item.q_mark;
    }
  });
  return processedData;
}
