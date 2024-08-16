import { Text, View, Image } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { ExamDetails } from "@/type";
import logo from "/logo.png";

export default function ExamInfo({
  exam_details,
}: {
  exam_details: ExamDetails;
}) {
  return (
    <View style={tw("flex flex-col justify-center items-center")}>
      <View style={tw("h-20 w-12")}>
        <Image src={logo} cache />
      </View>
      <View
        style={tw(
          "flex flex-col justify-center items-center text-base p-0 leading-5",
        )}
      >
        <Text style={tw("p-0")}>University of Chittagong</Text>
        <Text style={tw("p-0")}>Faculty of {exam_details.faculty}</Text>
        <Text style={tw("p-0")}>
          Department of {exam_details.department_name}
        </Text>
        <Text style={tw("p-0")}>
          {exam_details.exam_name} Examination {exam_details.exam_session}
        </Text>
        <Text style={tw("p-0")}>
          Held in:{" "}
          {new Date(exam_details.exam_start_date).toLocaleString("default", {
            month: "long",
          })}{" "}
          -{" "}
          {new Date(exam_details.exam_end_date).toLocaleString("default", {
            month: "long",
          })}
        </Text>
        <Text>Tabulation Sheet</Text>
      </View>
    </View>
  );
}
