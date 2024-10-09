import { Course, ExamDetails } from "@/type";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../styles";

export default function Header({
  exam_details,
  course,
}: {
  exam_details: ExamDetails;
  course: Course;
}) {
  return (
    <View style={tw("flex flex-col text-xs items-center gap-1")}>
      <Text style={tw("ml-auto")}>Date: {new Date().toLocaleDateString()}</Text>
      <Text style={tw("font-bold text-lg leading-5")}>
        University of Chittagong
      </Text>
      <Text>{exam_details.department_name}</Text>
      <Text>
        {exam_details.exam_name} Examination {exam_details.exam_session}
      </Text>
      <Text style={tw("font-bold text-lg leading-5")}>Summation Sheet</Text>
      <Text>
        Course No: {course.course_code}, Credit: {course.credit}, Mark:{" "}
        {course.credit * 25}
      </Text>
      <Text>Course Title: {course.course_type}</Text>
    </View>
  );
}
