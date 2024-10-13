import { cn } from "@/lib/utils";
import { ExamDetails, TabulationStudentDataType } from "@/type";
import { Image, Text, View } from "@react-pdf/renderer";
import { tw } from "../styles";
import logo from "/logo.png";


export default function HeaderDetails({ examDetails, student, index, className = "" }: { examDetails: ExamDetails, student: TabulationStudentDataType[0], className?: string, index: number }) {
  return (
    <View style={tw(cn("flex flex-col gap-6 text-sm font-bold", className))}>
      <View style={tw("flex flex-row h-20")}>
        <Image src={logo} cache style={tw("w-16 p-2")} />
        <View style={tw("flex flex-col gap-1")}>
          <Text>University of Chittagong</Text>
          <Text>{examDetails?.faculty}</Text>
          <Text>{examDetails.department_name}</Text>
          <Text>{examDetails.exam_name} Examination {examDetails.exam_session}</Text>
          <Text>Held in: {new Date(examDetails.exam_start_date).toLocaleString("default", { month: "long", })} - {new Date(examDetails.exam_end_date).toLocaleString("default", { month: "long", })}</Text>
          <Text>Grade Sheet</Text>
        </View>
      </View>
      <View style={tw("flex flex-col gap-1")}>
        <View style={tw("flex flex-row")}>
          <Text>Serial No</Text>
          <Text style={tw("ml-4 mr-6")}>:</Text>
          <Text>{index + 1}</Text>
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Student Id{" "}</Text>
          <Text style={tw("ml-[4.px] mr-6")}>:</Text>
          <Text>{student.student_id}</Text>
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Name</Text>
          <Text style={tw("ml-[26px] mr-6")}>:</Text>
          <Text>{student.student_name}</Text>
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Hall{" "}</Text>
          <Text style={tw("ml-[25px] mr-6")}>:</Text>
          <Text>{student.hall_name}</Text>
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Session</Text>
          <Text style={tw("ml-[11px] mr-6")}>:</Text>
          <Text>{student.session}</Text>
        </View>
      </View>
    </View>
  );
}
