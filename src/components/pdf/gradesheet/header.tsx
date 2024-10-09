import { View, Text } from "@react-pdf/renderer";
import GradingTable from "./gradingTable";
import { tw } from "../styles";
export default function GradesheetHeader() {
  return (
    <View style={tw("flex flex-row border")}>
      <View style={tw("flex flex-row w-1/2 h-[40%]")} />
      <GradingTable classname="w-[40%] text-md" />
    </View>
  );
}
