import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../styles";
import Abbreviations from "./abbreviations";
import GradingSystems from "./gradingSystems";
import ExamInfo from "./examInfo";
import { CourseData, ExamDetails } from "@/type";
import CourseList from "./courseList";

export default function Header({
  exam_details,
  courses,
}: {
  exam_details: ExamDetails;
  courses: CourseData[];
}) {
  return (
    <View style={tw("flex flex-row gap-6 w-full text-sm")}>
      <Abbreviations />
      <GradingSystems />
      <ExamInfo exam_details={exam_details} />
      <CourseList courses={courses} />
    </View>
  );
}
