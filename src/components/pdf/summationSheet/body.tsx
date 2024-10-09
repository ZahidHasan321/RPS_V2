import { CourseResponse } from "@/type";
import { Text, View } from "@react-pdf/renderer";
import { Cell, Row, Table } from "../tableComponents";
import { ReactNode } from "react";
import { tw } from "../styles";

export default function SummationBody({
  courseResult,
}: {
  courseResult: CourseResponse[];
}) {
  return (
    <Table className="w-full">
      <View style={tw("flex flex-row border-l border-b")}>
        <Cell className="w-[20%] justify-center">
          <Text>Student ID</Text>
        </Cell>
        <Cell className="w-[15%] justify-center">
          <Text>CATM</Text>
        </Cell>
        <View style={tw("w-[52%] border-r flex flex-col")}>
          <Text style={tw("font-bold text-center border-b")}>
            Evaluation based on Report
          </Text>
          <View style={tw("flex flex-row text-center border-b")}>
            <View style={tw("w-[50%] border-r")}>
              <Text>1st Examiner</Text>
            </View>
            <View style={tw("w-[50%]")}>
              <Text>2nd Examiner</Text>
            </View>
          </View>
          <View style={tw("flex flex-row w-full text-center")}>
            <View style={tw("w-full border-r")}>
              <Text>Code</Text>
            </View>
            <View style={tw("w-full border-r")}>
              <Text>Mark</Text>
            </View>
            <View style={tw("w-full border-r")}>
              <Text>Code</Text>
            </View>
            <View style={tw("w-full")}>
              <Text>Mark</Text>
            </View>
          </View>
        </View>
        <Cell className="w-[13%] justify-center">
          <Text>Total</Text>
        </Cell>
      </View>
      <TableRows courseResult={courseResult} />
    </Table>
  );
}

function TableRows({ courseResult }: { courseResult: CourseResponse[] }) {
  let total = 0;
  let catm = 0;
  const Rows: ReactNode[] = [];
  courseResult.forEach((student) => {
    catm = student.catm.attendance_mark + student.catm.ct_mark;
    total = (student.setA_mark ?? 0) + (student.setB_mark ?? 0) + catm;

    Rows.push(
      <Row className="w-full" key={student.student_id}>
        <Cell className="w-[20%]">
          <Text>{student.student_id}</Text>
        </Cell>
        <Cell className="w-[15%]">
          <Text>{catm}</Text>
        </Cell>
        <Cell className="w-[13%]">
          <Text>{student.setA_paper_code}</Text>
        </Cell>
        <Cell className="w-[13%]">
          <Text>{student.setA_mark}</Text>
        </Cell>
        <Cell className="w-[13%]">
          <Text>{student.setB_paper_code}</Text>
        </Cell>
        <Cell className="w-[13%]">
          <Text>{student.setB_mark}</Text>
        </Cell>
        <Cell className="w-[13%]">
          <Text>{Math.ceil(total)}</Text>
        </Cell>
      </Row>,
    );
  });

  return Rows;
}
