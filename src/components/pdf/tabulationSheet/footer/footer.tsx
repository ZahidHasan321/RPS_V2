import { tabulationExamCommitee } from "@/type";
import { View, Text } from "@react-pdf/renderer";
import { tw } from "../../styles";
export default function Footer({
  exam_committee,
}: {
  exam_committee: tabulationExamCommitee[];
}) {
  return (
    <View style={tw("flex flex-row w-full gap-20 text-sm")}>
      <View style={tw("flex flex-col gap-2 w-1/4")}>
        <Text style={tw("font-bold mb-3")}>Tabulators</Text>
        {exam_committee.map(
          ({ title, first_name, last_name, role }, idx) =>
            role === "Tabulator" && (
              <View key={idx} style={tw("flex flex-row")}>
                <Text>
                  {title} {first_name} {last_name}
                </Text>
                <View style={tw("border-b grow border-dashed")} />
              </View>
            ),
        )}
      </View>

      <View style={tw("flex flex-col gap-2 w-2/4")}>
        <Text style={tw("font-bold mb-3")}>Examination Committee</Text>
        {exam_committee.map(({ title, first_name, last_name, role }, idx) => (
          <View key={idx} style={tw("flex flex-row")}>
            <Text>
              {idx + 1}. {title} {first_name} {last_name}({role})
            </Text>
            <View style={tw("border-b grow border-dashed")} />
          </View>
        ))}
      </View>

      <View style={tw("flex flex-col  w-1/4 pt-10 gap-14")}>
        <View style={tw("flex flex-row")}>
          <Text>Result publish date</Text>
          <View style={tw("border-b grow border-dashed")} />
        </View>
        <View style={tw("flex flex-col items-center")}>
          <Text>Controller of Examinations</Text>
          <Text>University of Chittagong</Text>
        </View>
      </View>
    </View>
  );
}
