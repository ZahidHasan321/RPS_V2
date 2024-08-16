import { tw } from "../../styles";
import { Text, View } from "@react-pdf/renderer";

export default function Abbreviations() {
  return (
    <View style={tw("flex flex-col")}>
      <Text style={tw("font-bold self-center")}>ABBREVIATIONS</Text>
      <View style={tw("border-t border-b h-[3px]")} />
      <View style={tw("flex flex-col")}>
        <Text>LG = Letter Grade</Text>
        <Text>GP = Grade Points</Text>
        <Text>CT = Class Test</Text>
        <Text>FEM = Final Exam</Text>
        <Text>MO = Marks Obtained</Text>
        <Text>CP = Credit Points = Credit</Text>
        <Text>TCE = Total Credit Earned</Text>
        <Text>TCP = Total Credit Points</Text>
        <Text>TCO = Total Credits Offered</Text>
        <Text>GPA = Grade Point Average=TCP/TCO</Text>
      </View>
    </View>
  );
}
