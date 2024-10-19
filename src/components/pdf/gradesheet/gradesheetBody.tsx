import { CourseData, TabulationStudentDataType } from "@/type";
import { Text, View } from "@react-pdf/renderer"
import { tw } from "../styles";
import { Cell, Row, Table } from "../tableComponents";
import { getLetterGrade } from "@/constants/grades";
import { useEffect, useMemo, useState } from "react";
export default function GradesheetBody({ student, courses }: { student: TabulationStudentDataType[0], courses: CourseData[] }) {

  const [TCP, setTCP] = useState(0);
  const [TCE, setTCE] = useState(0);

  const total_credit = useMemo(() => {
    return courses.reduce((acc, { credit }) => acc + credit, 0);
  }, [courses]);

  useEffect(() => {
    courses.map(course => {
      let gpa = 0;

      if (student.student_status === "Improvement" && student.improves?.get(course.course_id)) {
        let currentGPA = student.improves?.get(course.course_id)?.gpa ?? 0
        let prevGPA = student.courses.get(course.course_id)?.gpa ?? 0

        if (currentGPA > prevGPA) gpa = currentGPA
        else gpa = prevGPA

        if (gpa > 3.25) gpa = 3.25
      }
      else {
        gpa = student.courses.get(course.course_id)?.gpa ?? 0
      }

      if (gpa > 0) {
        setTCP(TCP => TCP + (gpa * course.credit))
        setTCE(TCE => TCE + course.credit)
      }
    })
  }, [])


  return (
    <View style={tw("w-full flex flex-col text-sm gap-4")}>
      <Table className="w-full">
        <Row className="w-full">
          <Cell className="w-[10%]"><Text style={tw("font-bold")}>Course Code</Text></Cell>
          <Cell className="w-[50%]"><Text style={tw("font-bold")}>Course Title</Text></Cell>
          <Cell className="w-[10%]"><Text style={tw("font-bold")}>Credit</Text></Cell>
          <Cell className="w-[10%]"><Text style={tw("font-bold")}>Letter Grade</Text></Cell>
          <Cell className="w-[10%]"><Text style={tw("font-bold")}>Grade Point</Text></Cell>
          <Cell className="w-[10%]"><Text style={tw("font-bold")}>Credit Points</Text></Cell>
        </Row>
        {
          courses.map((course) => (
            <Row key={course.course_code} className="w-full">
              <Cell className="w-[10%]"><Text style={tw("font-bold")}>{course.course_code}</Text></Cell>
              <Cell className="w-[50%]"><Text style={tw("text-left pl-2")}>{course.course_title}</Text></Cell>
              <Cell className="w-[10%]"><Text style={tw("font-bold")}>{course.credit}</Text></Cell>
              <Cell className="w-[10%]"><Text style={tw("font-bold")}>{getLetterGrade(student.student_status == "Improvement" ? student.improves?.get(course.course_id)?.total : student.courses.get(course.course_id)?.total, course.credit)}</Text></Cell>
              <Cell className="w-[10%]"><Text style={tw("font-bold")}>{student.student_status == "Improvement" ? student.improves?.get(course.course_id)?.gpa : student.courses.get(course.course_id)?.gpa}</Text></Cell>
              <Cell className="w-[10%]"><Text style={tw("font-bold")}>{(student.courses.get(course.course_id)?.credit ?? 0) * (student.student_status === "Improvement" ? (student.improves?.get(course.course_id)?.gpa ?? 0) : (student.courses.get(course.course_id)?.gpa ?? 0))}</Text></Cell>
            </Row>
          ))
        }
      </Table>

      <View style={tw("flex flex-col gap-2")}>
        <View style={tw("flex flex-row gap-6")}>
          <Text style={tw("font-bold")}>Total Credit Offered: {total_credit}</Text>
          <Text>Total Credit Earned: {TCE}</Text>
        </View>

        <View style={tw("flex flex-row gap-6")}>
          <Text >Total Credit Points: {TCP}</Text>
          <Text>Grade Point Average: {(TCP / TCE).toFixed(2)}</Text>
          <Text style={tw("font-bold")}> Result: {TCP / TCE > 2.20 ? "P" : "F"}</Text>
        </View>
      </View>
    </View>
  )
}
