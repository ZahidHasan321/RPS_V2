import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { CourseData } from "@/type";
import { Cell, Row, Table } from "../tableComponents";
import { useMemo } from "react";

export default function CourseList({ courses }: { courses: CourseData[] }) {
  const total_credit = useMemo(() => {
    return courses.reduce((acc, { credit }) => acc + credit, 0);
  }, [courses]);

  return (
    <Table className="grow w-[40%]">
      <Row>
        <Cell>
          <Text style={tw("font-bold w-[60px]")}>Course No.</Text>
        </Cell>
        <Cell className="grow items-center">
          <Text style={tw("font-bold px-1 ")}>Course Title</Text>
        </Cell>
        <Cell>
          <Text style={tw("font-bold text-[9px]")}>Credit</Text>
        </Cell>
      </Row>
      {courses.map(({ course_code, course_title, credit }, idx) => (
        <Row key={idx}>
          <Cell>
            <Text style={tw("w-[60px]")}>{course_code}</Text>
          </Cell>
          <Cell className="grow">
            <Text style={tw("px-1")}>{course_title}</Text>
          </Cell>
          <Cell>
            <Text style={tw("px-3")}>{credit}</Text>
          </Cell>
        </Row>
      ))}
      <Row>
        <Cell className="w-[61px]">
          <View> </View>
        </Cell>
        <Cell className="grow">
          <Text style={tw("font-bold")}>Total Credits Offered (TCO): </Text>
        </Cell>
        <Cell>
          <Text style={tw("font-bold px-2")}>{total_credit}</Text>
        </Cell>
      </Row>
    </Table>
  );
}
