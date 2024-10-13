import { ExamDetails, TabulationStudentDataType } from "@/type";
import { View } from "@react-pdf/renderer";
import { tw } from "../styles";
import GradingTable from "./gradingTable";
import HeaderDetails from "./headerDetails";


export default function GradesheetHeader({ examDetails, student, index }: { examDetails: ExamDetails, student: TabulationStudentDataType[0], index: number }) {
  return (
    <View style={tw("flex flex-row justify-between")}>
      <HeaderDetails examDetails={examDetails} student={student} index={index} />
      <GradingTable classname="w-[40%] text-sm" />
    </View>
  );
}
